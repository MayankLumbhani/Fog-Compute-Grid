import '../styles/analytics.css';

function Analytics() {
    return (
        <div className="analytics-page">
            <div className="analytics-container">
                <div className="analytics-header">
                    <h1 className="analytics-title">Performance Analytics</h1>
                    <p className="analytics-subtitle">
                        Compare single-threaded vs distributed computing and JavaScript vs WebAssembly
                        performance metrics
                    </p>
                </div>

                {/* Comparison Charts */}
                <div className="comparisons-grid">
                    {/* Single vs Distributed */}
                    <div className="comparison-card">
                        <div className="comparison-header">
                            <div>
                                <h3 className="comparison-title">Single-Thread vs Distributed</h3>
                                <p className="comparison-desc">Prime number computation (1-10M range)</p>
                            </div>
                            <div className="speedup-badge">10.2× faster</div>
                        </div>
                        <div className="bar-chart">
                            <div className="bar-item">
                                <div className="bar-label">
                                    <span className="bar-name">
                                        <span className="bar-icon">1</span>
                                        Single Thread
                                    </span>
                                    <span className="bar-value">48.2s</span>
                                </div>
                                <div className="bar-track">
                                    <div className="bar-fill slow" style={{ width: '100%' }}></div>
                                </div>
                            </div>
                            <div className="bar-item">
                                <div className="bar-label">
                                    <span className="bar-name">
                                        <span className="bar-icon">24</span>
                                        Distributed (24 nodes)
                                    </span>
                                    <span className="bar-value">4.7s</span>
                                </div>
                                <div className="bar-track">
                                    <div className="bar-fill fast" style={{ width: '10%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* JavaScript vs WebAssembly */}
                    <div className="comparison-card">
                        <div className="comparison-header">
                            <div>
                                <h3 className="comparison-title">JavaScript vs WebAssembly</h3>
                                <p className="comparison-desc">Matrix multiplication benchmark</p>
                            </div>
                            <div className="speedup-badge">3.2× faster</div>
                        </div>
                        <div className="bar-chart">
                            <div className="bar-item">
                                <div className="bar-label">
                                    <span className="bar-name">
                                        <span className="bar-icon">JS</span>
                                        JavaScript
                                    </span>
                                    <span className="bar-value">892ms</span>
                                </div>
                                <div className="bar-track">
                                    <div className="bar-fill js" style={{ width: '100%' }}></div>
                                </div>
                            </div>
                            <div className="bar-item">
                                <div className="bar-label">
                                    <span className="bar-name">
                                        <span className="bar-icon">⚡</span>
                                        WebAssembly
                                    </span>
                                    <span className="bar-value">279ms</span>
                                </div>
                                <div className="bar-track">
                                    <div className="bar-fill wasm" style={{ width: '31%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="metrics-section">
                    <h2 className="metrics-title">Key Performance Metrics</h2>
                    <div className="metrics-grid">
                        <div className="metric-card">
                            <div className="metric-header">
                                <div className="metric-icon">⚡</div>
                                <div className="metric-info">
                                    <h4>Throughput</h4>
                                    <p>Operations per second</p>
                                </div>
                            </div>
                            <div className="metric-value">2.4M/s</div>
                            <p className="metric-comparison">
                                <span>↑ 847%</span> vs single-threaded
                            </p>
                        </div>

                        <div className="metric-card">
                            <div className="metric-header">
                                <div className="metric-icon">📡</div>
                                <div className="metric-info">
                                    <h4>Network Latency</h4>
                                    <p>Average round-trip time</p>
                                </div>
                            </div>
                            <div className="metric-value">23ms</div>
                            <p className="metric-comparison">
                                <span>↓ 62%</span> with P2P connections
                            </p>
                        </div>

                        <div className="metric-card">
                            <div className="metric-header">
                                <div className="metric-icon">🎯</div>
                                <div className="metric-info">
                                    <h4>Task Efficiency</h4>
                                    <p>Successful completions</p>
                                </div>
                            </div>
                            <div className="metric-value">99.7%</div>
                            <p className="metric-comparison">
                                <span>↑ 12%</span> with retry mechanism
                            </p>
                        </div>

                        <div className="metric-card">
                            <div className="metric-header">
                                <div className="metric-icon">🔄</div>
                                <div className="metric-info">
                                    <h4>Load Balance</h4>
                                    <p>Worker utilization variance</p>
                                </div>
                            </div>
                            <div className="metric-value">±8%</div>
                            <p className="metric-comparison">
                                Optimal distribution across nodes
                            </p>
                        </div>
                    </div>
                </div>

                {/* Benchmark Table */}
                <div className="benchmark-section">
                    <h3 className="benchmark-title">Benchmark Results by Task Type</h3>
                    <table className="benchmark-table">
                        <thead>
                            <tr>
                                <th>Task Type</th>
                                <th>Single Thread</th>
                                <th>Distributed (JS)</th>
                                <th>Distributed (WASM)</th>
                                <th>Best</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <span className="task-name">
                                        <span className="task-icon">🔢</span>
                                        Prime Computation
                                    </span>
                                </td>
                                <td>48.2s</td>
                                <td>4.7s</td>
                                <td>1.8s</td>
                                <td><span className="winner-badge">WASM 26.8×</span></td>
                            </tr>
                            <tr>
                                <td>
                                    <span className="task-name">
                                        <span className="task-icon">📊</span>
                                        Matrix Multiply
                                    </span>
                                </td>
                                <td>12.4s</td>
                                <td>1.2s</td>
                                <td>0.4s</td>
                                <td><span className="winner-badge">WASM 31.0×</span></td>
                            </tr>
                            <tr>
                                <td>
                                    <span className="task-name">
                                        <span className="task-icon">🔐</span>
                                        Hash Computation
                                    </span>
                                </td>
                                <td>8.7s</td>
                                <td>0.9s</td>
                                <td>0.3s</td>
                                <td><span className="winner-badge">WASM 29.0×</span></td>
                            </tr>
                            <tr>
                                <td>
                                    <span className="task-name">
                                        <span className="task-icon">📈</span>
                                        Data Aggregation
                                    </span>
                                </td>
                                <td>5.2s</td>
                                <td>0.6s</td>
                                <td>0.5s</td>
                                <td><span className="winner-badge">WASM 10.4×</span></td>
                            </tr>
                            <tr>
                                <td>
                                    <span className="task-name">
                                        <span className="task-icon">🧬</span>
                                        Pattern Matching
                                    </span>
                                </td>
                                <td>15.8s</td>
                                <td>1.9s</td>
                                <td>0.7s</td>
                                <td><span className="winner-badge">WASM 22.6×</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Analytics;
