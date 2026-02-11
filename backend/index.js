const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

// workers: socket.id -> { busy, peerId }
const workers = new Map();
// sessionContribution: peerId -> { totalTasks, avgTime, stability, timings: [] }
const sessionContribution = new Map();

// task config
const TASK_START = 1;
const TASK_END = 1000000;
const CHUNK_SIZE = 50000;

// task state
let taskQueue = [];
let inProgress = new Map(); // socket.id -> task
let completedChunks = 0;
let totalChunks = 0;
let recoveredTasks = 0;
let config = {
  start: TASK_START,
  end: TASK_END,
  chunkSize: CHUNK_SIZE
};

function createTaskChunks(newConfig) {
  if (newConfig) {
    config = { ...config, ...newConfig };
  }

  taskQueue = [];
  inProgress.clear();
  completedChunks = 0;

  for (let i = config.start; i <= config.end; i += config.chunkSize) {
    taskQueue.push({
      start: i,
      end: Math.min(i + config.chunkSize - 1, config.end),
    });
  }

  totalChunks = taskQueue.length;
}

createTaskChunks();

app.get("/", (req, res) => {
  res.send("Fog Compute Grid Backend Running");
});

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.emit("init", { totalChunks, completedChunks, config, recoveredTasks });
  broadcastLeaderboard(socket); // Send initial stats to the new client

  socket.on("worker:ready", (data) => {
    const peerId = data?.peerId || socket.id;
    console.log("Worker ready:", socket.id, "Peer:", peerId);

    if (workers.has(socket.id)) return;

    workers.set(socket.id, { busy: false, peerId });

    if (!sessionContribution.has(peerId)) {
      sessionContribution.set(peerId, {
        totalTasks: 0,
        avgTime: 0,
        stability: 100,
        timings: [],
        id: peerId.substring(0, 6)
      });
    }

    io.emit("workerCount", workers.size);
    broadcastLeaderboard();
    assignTask(socket);
  });

  socket.on("worker:stop", () => {
    console.log("Worker stopped:", socket.id);
    if (!workers.has(socket.id)) return;

    // recover lost task if worker was busy
    if (inProgress.has(socket.id)) {
      taskQueue.unshift(inProgress.get(socket.id));
      inProgress.delete(socket.id);
      recoveredTasks++;
      io.emit("recovery", { type: "task_lost", count: 1 });
    }

    workers.delete(socket.id);
    io.emit("workerCount", workers.size);
  });

  socket.on("taskResult", (data) => {
    const { duration } = data;
    const worker = workers.get(socket.id);
    if (!worker) return;

    if (inProgress.has(socket.id)) {
      inProgress.delete(socket.id);
      completedChunks++;
    }

    worker.busy = false;
    const stats = sessionContribution.get(worker.peerId);

    if (stats && duration && typeof duration === 'number') {
      stats.timings.push(duration);
      if (stats.timings.length > 5) stats.timings.shift();
      stats.totalTasks++;

      // Calculate average
      const sum = stats.timings.reduce((a, b) => a + b, 0);
      stats.avgTime = sum / stats.timings.length;

      // Calculate stability
      if (stats.timings.length > 1) {
        const mean = stats.avgTime;
        const squareDiffs = stats.timings.map(t => Math.pow(t - mean, 2));
        const variance = squareDiffs.reduce((a, b) => a + b, 0) / stats.timings.length;
        const stdDev = Math.sqrt(variance);
        const cv = stdDev / mean;
        stats.stability = Math.max(0, Math.min(100, 100 - (cv * 100)));
      } else {
        stats.stability = 100;
      }
    }

    io.emit("progress", {
      completed: completedChunks,
      total: totalChunks,
    });

    broadcastLeaderboard();
    assignTask(socket);
  });

  socket.on("disconnect", () => {
    const worker = workers.get(socket.id);
    console.log("Socket disconnected:", socket.id, worker ? `(Peer: ${worker.peerId})` : "");

    // recover lost task
    if (inProgress.has(socket.id)) {
      taskQueue.unshift(inProgress.get(socket.id));
      inProgress.delete(socket.id);
      recoveredTasks++;
      io.emit("recovery", { type: "worker_disconnect", count: 1 });
    }

    if (workers.has(socket.id)) {
      workers.delete(socket.id);
      io.emit("workerCount", workers.size);
      broadcastLeaderboard();
    }
  });
});

app.post("/reset", (req, res) => {
  const { start, end, chunkSize } = req.body;

  if (start === undefined || end === undefined || chunkSize === undefined) {
    return res.status(400).json({ error: "Missing required fields: start, end, chunkSize" });
  }

  console.log("Resetting task with config:", { start, end, chunkSize });

  createTaskChunks({ start, end, chunkSize });

  // Notify all clients of the reset
  io.emit("init", {
    totalChunks,
    completedChunks,
    config,
    recoveredTasks
  });

  res.json({ success: true, config });
});

app.post("/rebalance", (req, res) => {
  console.log("Forcing network rebalance. Current InProgress:", inProgress.size);
  let rebalancedCount = 0;

  // Return all in-progress tasks to queue safely
  for (const [socketId, task] of inProgress.entries()) {
    if (task) {
      taskQueue.unshift(task);
      const worker = workers.get(socketId);
      if (worker) worker.busy = false;
      rebalancedCount++;
    }
  }
  inProgress.clear();

  // Re-assign to everyone who is actually connected
  for (const [socketId] of workers.entries()) {
    const socket = io.sockets.sockets.get(socketId);
    if (socket && socket.connected) {
      assignTask(socket);
    }
  }

  io.emit("recovery", { type: "force_rebalance", count: rebalancedCount });
  res.json({ success: true, rebalancedCount });
});

function assignTask(socket) {
  if (taskQueue.length === 0) return;

  const worker = workers.get(socket.id);
  if (!worker || worker.busy) return;

  const task = taskQueue.shift();
  worker.busy = true;
  inProgress.set(socket.id, task);

  socket.emit("task", task);
}

function broadcastLeaderboard(target = io) {
  const leaderboard = Array.from(sessionContribution.entries())
    .map(([peerId, stats]) => {
      // Find if this peer is currently active
      const activeWorker = Array.from(workers.values()).find(w => w.peerId === peerId);
      const socketId = Array.from(workers.entries()).find(([sid, w]) => w.peerId === peerId)?.[0];

      return {
        id: stats.id,
        fullId: socketId || peerId, // Use socketId if active, else fallback to peerId
        peerId: peerId,
        avgTime: stats.avgTime,
        stability: stats.stability,
        completed: stats.totalTasks,
        isActive: !!activeWorker
      };
    })
    .filter(w => w.completed > 0)
    .sort((a, b) => b.completed - a.completed || a.avgTime - b.avgTime)
    .slice(0, 5);

  target.emit("workerStats", { leaderboard });
}

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
