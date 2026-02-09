import StatCard from '../components/StatCard';
import ProgressBar from '../components/ProgressBar';
import ModeToggle from '../components/ModeToggle';
import '../styles/dashboard.css';

function Dashboard() {
    return (
        <div className="dashboard-page">
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <h1 className="dashboard-title">Compute Dashboard</h1>
                    <p className="dashboard-subtitle">
                        Monitor and manage your distributed computing tasks in real-time
                    </p>
                </div>

                {/* Stats Row */}
                <div className="dashboard-stats">
                    <StatCard
                        title="Active Workers"
                        value="24"
                        icon="👥"
                        trend={12}
                        color="primary"
                    />
                    <StatCard
                        title="Tasks Completed"
                        value="1,847"
                        icon="✓"
                        trend={8}
                        color="emerald"
                    />
                    <StatCard
                        title="Processing Power"
                        value="4.2 TF"
                        icon="⚡"
                        color="cyan"
                    />
                    <StatCard
                        title="Network Latency"
                        value="23ms"
                        icon="📡"
                        color="amber"
                    />
                </div>

                {/* Main Grid */}
                <div className="dashboard-grid">
                    {/* Task Progress Section */}
                    <div className="task-progress-card">
                        <div className="task-progress-header">
                            <div className="task-info">
                                <h3>Prime Number Discovery</h3>
                                <p>Finding prime numbers in range 1 - 10,000,000</p>
                            </div>
                            <div className="task-status">
                                <span className="status-indicator"></span>
                                Running
                            </div>
                        </div>

                        <div className="progress-stats">
                            <div className="progress-stat">
                                <div className="progress-stat-value">847,293</div>
                                <div className="progress-stat-label">Numbers Checked</div>
                            </div>
                            <div className="progress-stat">
                                <div className="progress-stat-value">68,541</div>
                                <div className="progress-stat-label">Primes Found</div>
                            </div>
                            <div className="progress-stat">
                                <div className="progress-stat-value">2.4M/s</div>
                                <div className="progress-stat-label">Processing Speed</div>
                            </div>
                        </div>

                        <div className="main-progress">
                            <ProgressBar
                                progress={67}
                                label="Overall Progress"
                                color="primary"
                                animated={true}
                            />
                        </div>

                        <div className="task-timeline">
                            <div className="timeline-item">
                                <div className="timeline-dot completed"></div>
                                <div className="timeline-content">
                                    <span className="timeline-label">Task initialized</span>
                                    <span className="timeline-time">2 min ago</span>
                                </div>
                            </div>
                            <div className="timeline-item">
                                <div className="timeline-dot completed"></div>
                                <div className="timeline-content">
                                    <span className="timeline-label">Workers connected</span>
                                    <span className="timeline-time">1 min ago</span>
                                </div>
                            </div>
                            <div className="timeline-item">
                                <div className="timeline-dot"></div>
                                <div className="timeline-content">
                                    <span className="timeline-label">Processing chunks</span>
                                    <span className="timeline-time">In progress</span>
                                </div>
                            </div>
                            <div className="timeline-item">
                                <div className="timeline-dot pending"></div>
                                <div className="timeline-content">
                                    <span className="timeline-label">Aggregating results</span>
                                    <span className="timeline-time">Pending</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="dashboard-sidebar">
                        {/* Mode Toggle */}
                        <div className="sidebar-card">
                            <ModeToggle defaultMode="centralized" />
                        </div>

                        {/* Active Workers */}
                        <div className="sidebar-card">
                            <h4 className="sidebar-card-title">
                                👥 Active Workers
                            </h4>
                            <div className="workers-list">
                                <div className="worker-item">
                                    <div className="worker-avatar">α</div>
                                    <div className="worker-info">
                                        <div className="worker-name">Worker Alpha</div>
                                        <div className="worker-status">Processing</div>
                                    </div>
                                    <div className="worker-tasks">12 tasks</div>
                                </div>
                                <div className="worker-item">
                                    <div className="worker-avatar">β</div>
                                    <div className="worker-info">
                                        <div className="worker-name">Worker Beta</div>
                                        <div className="worker-status">Processing</div>
                                    </div>
                                    <div className="worker-tasks">8 tasks</div>
                                </div>
                                <div className="worker-item">
                                    <div className="worker-avatar">γ</div>
                                    <div className="worker-info">
                                        <div className="worker-name">Worker Gamma</div>
                                        <div className="worker-status">Idle</div>
                                    </div>
                                    <div className="worker-tasks">0 tasks</div>
                                </div>
                            </div>
                        </div>

                        {/* Compute Engine */}
                        <div className="sidebar-card">
                            <h4 className="sidebar-card-title">
                                ⚙️ Compute Engine
                            </h4>
                            <div className="engine-options">
                                <div className="engine-option active">
                                    <div className="engine-icon">JS</div>
                                    <div className="engine-info">
                                        <h4>JavaScript</h4>
                                        <p>Native browser execution</p>
                                    </div>
                                </div>
                                <div className="engine-option">
                                    <div className="engine-icon">⚡</div>
                                    <div className="engine-info">
                                        <h4>WebAssembly</h4>
                                        <p>High-performance compute</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
