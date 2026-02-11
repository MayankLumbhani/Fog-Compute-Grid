import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

const SocketContext = createContext();

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [peerId] = useState(() => {
        const saved = sessionStorage.getItem('fog_peer_id');
        if (saved) return saved;
        const newId = uuidv4();
        sessionStorage.setItem('fog_peer_id', newId);
        return newId;
    });
    const [isConnected, setIsConnected] = useState(false);
    const [workerCount, setWorkerCount] = useState(0);
    const [progress, setProgress] = useState({ completed: 0, total: 0 });
    const [error, setError] = useState(null);
    const [taskConfig, setTaskConfig] = useState({ start: 1, end: 1000000, chunkSize: 50000 });
    const [leaderboard, setLeaderboard] = useState([]);
    const [localPerformance, setLocalPerformance] = useState({ lastTime: 0, avgTime: 0, count: 0 });
    const [recoveryStats, setRecoveryStats] = useState({ disconnects: 0, recoveries: 0, lostTasks: 0 });

    // Worker state
    const [isWorkerEnabled, setIsWorkerEnabled] = useState(false);
    const [workerStatus, setWorkerStatus] = useState('IDLE'); // IDLE, BUSY
    const [workerProgress, setWorkerProgress] = useState(0);
    const isWorkerActiveRef = React.useRef(false);

    // Keep ref in sync
    useEffect(() => {
        isWorkerActiveRef.current = isWorkerEnabled;
        if (!isWorkerEnabled) {
            setWorkerStatus('IDLE');
        }
    }, [isWorkerEnabled]);

    const isPrime = (num) => {
        if (num <= 1) return false;
        for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
            if (num % i === 0) return false;
        }
        return true;
    };

    const runTask = useCallback(async (task, socketInstance) => {
        setWorkerStatus('BUSY');
        setWorkerProgress(0);

        const { start, end } = task;
        const total = end - start;
        let found = 0;

        const startTime = performance.now();

        // Process in small batches to avoid blocking UI
        const batchSize = 1000;
        for (let i = start; i <= end; i += batchSize) {
            // Check if worker was disabled mid-task
            if (!isWorkerActiveRef.current) {
                console.log('Worker disabled, canceling task.');
                setWorkerStatus('IDLE');
                return;
            }

            const batchEnd = Math.min(i + batchSize - 1, end);
            for (let j = i; j <= batchEnd; j++) {
                if (isPrime(j)) found++;
            }

            const currentProgress = Math.round(((i - start) / total) * 100);
            setWorkerProgress(currentProgress);

            // Minimal delay to keep UI responsive
            await new Promise(resolve => setTimeout(resolve, 0));
        }

        const duration = Math.round(performance.now() - startTime);
        console.log(`Task complete: found ${found} primes in ${duration}ms`);

        socketInstance.emit('taskResult', { found, duration, peerId });

        setLocalPerformance(prev => {
            const newCount = prev.count + 1;
            const newAvg = (prev.avgTime * prev.count + duration) / newCount;
            return { lastTime: duration, avgTime: newAvg, count: newCount };
        });
        setWorkerStatus('IDLE');
        setWorkerProgress(100);
    }, []);

    const toggleWorker = () => {
        setIsWorkerEnabled(prev => !prev);
    };

    // Emit readiness when enabled
    useEffect(() => {
        if (isConnected && isWorkerEnabled && socket) {
            socket.emit('worker:ready', { peerId });
        } else if (isConnected && !isWorkerEnabled && socket) {
            socket.emit('worker:stop');
        }
    }, [isWorkerEnabled, isConnected, socket, peerId]);

    const resetTask = async (config) => {
        try {
            const response = await fetch('http://localhost:5000/reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config),
            });
            if (!response.ok) throw new Error('Failed to reset task');
            return await response.json();
        } catch (err) {
            console.error('Reset error:', err);
            throw err;
        }
    };

    const lastRebalanceRef = React.useRef(0);
    const forceRebalance = async () => {
        const now = Date.now();
        if (now - lastRebalanceRef.current < 2000) {
            message.warning('Please wait before rebalancing again');
            return;
        }
        lastRebalanceRef.current = now;

        try {
            const response = await fetch('http://localhost:5000/rebalance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) throw new Error('Failed to force rebalance');
            message.info('Network rebalance triggered');
            return await response.json();
        } catch (err) {
            console.error('Rebalance error:', err);
            message.error('Failed to trigger rebalance');
            throw err;
        }
    };

    const connectSocket = useCallback(() => {
        try {
            const newSocket = io('http://localhost:5000', {
                reconnection: true,
                reconnectionAttempts: Infinity,
                reconnectionDelay: 1000,
                transports: ['websocket']
            });

            newSocket.on('connect', () => {
                console.log('Socket connected:', newSocket.id);
                setIsConnected(true);
                setError(null);
            });

            newSocket.on('disconnect', (reason) => {
                console.log('Socket disconnected:', reason);
                setIsConnected(false);
                setWorkerStatus('IDLE');
            });

            newSocket.on('connect_error', (err) => {
                console.error('Socket connection error:', err);
                setIsConnected(false);
                setError('Failed to connect to backend');
            });

            newSocket.on('workerCount', (count) => {
                setWorkerCount(count);
            });

            newSocket.on('progress', (data) => {
                setProgress(data);
            });

            newSocket.on('recovery', (data) => {
                console.log('Recovery event received:', data);
                setRecoveryStats(prev => ({
                    ...prev,
                    lostTasks: prev.lostTasks + (data.count || 0),
                    recoveries: prev.recoveries + 1
                }));
            });

            newSocket.on('init', (data) => {
                setProgress({ completed: data.completedChunks, total: data.totalChunks });
                if (data.config) setTaskConfig(data.config);
                if (data.recoveredTasks !== undefined) {
                    setRecoveryStats(prev => ({ ...prev, lostTasks: data.recoveredTasks }));
                }
            });

            newSocket.on('task', (task) => {
                console.log('Received task:', task);
                runTask(task, newSocket);
            });

            newSocket.on('workerStats', (data) => {
                const enriched = data.leaderboard.map(w => ({
                    ...w,
                    isLocal: w.peerId === peerId
                }));
                setLeaderboard(enriched);
            });

            setSocket(newSocket);

            return () => {
                newSocket.close();
            };
        } catch (err) {
            console.error('Error initializing socket:', err);
            setError('Socket initialization failed');
        }
    }, [runTask]);

    useEffect(() => {
        const cleanup = connectSocket();
        return () => {
            if (cleanup) cleanup();
        };
    }, [connectSocket]);

    useEffect(() => {
        if (isConnected && socket) {
            if (isWorkerEnabled) {
                socket.emit('worker:ready');
            } else {
                socket.emit('worker:stop');
            }
        }
    }, [isConnected, isWorkerEnabled, socket]);

    // Reset stats on disconnect
    useEffect(() => {
        if (!isConnected) {
            setWorkerCount(0);
            setProgress({ completed: 0, total: 0 });
            setWorkerStatus('IDLE');
            setRecoveryStats(prev => ({ ...prev, disconnects: prev.disconnects + 1 }));
        }
    }, [isConnected]);

    const value = {
        socket,
        isConnected,
        workerCount,
        progress,
        error,
        isWorkerEnabled,
        workerStatus,
        workerProgress,
        toggleWorker,
        taskConfig,
        resetTask,
        leaderboard,
        localPerformance,
        recoveryStats,
        forceRebalance
    };

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
};
