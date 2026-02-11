import { useState } from 'react';
import { Modal, Form, InputNumber, Button, Space, message, Popconfirm, Tooltip } from 'antd';
import NetworkGraph from '../components/NetworkGraph';
import StatCard from '../components/StatCard';
import ProgressBar from '../components/ProgressBar';
import ModeToggle from '../components/ModeToggle';
import WorkerControls from '../components/WorkerControls';
import WorkerStats from '../components/WorkerStats';
import Leaderboard from '../components/Leaderboard';
import { useSocket } from '../components/SocketProvider';
import '../styles/dashboard.css';

function Dashboard() {
    const { progress, isConnected, workerCount, taskConfig, resetTask, recoveryStats, forceRebalance, leaderboard } = useSocket();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const stats = [
        { title: 'Active Workers', value: workerCount, icon: '👥', color: 'primary' },
        { title: 'Tasks Completed', value: progress.completed, icon: '✓', color: 'emerald' },
        { title: 'Queue Remaining', value: Math.max(0, progress.total - progress.completed), icon: '📋', color: 'cyan' },
        { title: 'Lost Tasks', value: recoveryStats.lostTasks, icon: '⚠️', color: 'amber' },
        { title: 'System Status', value: isConnected ? 'Online' : 'Offline', icon: '⚡', color: isConnected ? 'emerald' : 'amber' }
    ];

    const showModal = () => {
        form.setFieldsValue(taskConfig);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await resetTask(values);
            message.success('Computation resetted successfully!');
            setIsModalOpen(false);
        } catch (error) {
            message.error('Failed to reset computation');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard-page">
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <div className="header-main" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h1 className="dashboard-title">Compute Dashboard</h1>
                            <p className="dashboard-subtitle">
                                Monitor and manage your distributed computing tasks in real-time
                            </p>
                        </div>
                        <Button
                            type="primary"
                            size="large"
                            icon="✙"
                            onClick={showModal}
                            className="new-compute-btn"
                        >
                            New Computation
                        </Button>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="dashboard-stats">
                    {stats.map((stat, index) => (
                        <StatCard
                            key={index}
                            title={stat.title}
                            value={stat.value}
                            icon={stat.icon}
                            color={stat.color}
                        />
                    ))}
                </div>

                {/* Main Grid */}
                <div className="dashboard-grid">
                    {/* Main Monitoring Section */}
                    <div className="monitoring-main">
                        <div className="task-progress-card">
                            <div className="task-progress-header">
                                <div className="task-info">
                                    <h3>Global Task Progress</h3>
                                    <p>Prime Discovery: <span className="task-range-display">{taskConfig.start.toLocaleString()} - {taskConfig.end.toLocaleString()}</span></p>
                                </div>
                                <div className="task-status">
                                    <span className={`status-indicator ${isConnected ? 'active' : ''}`}></span>
                                    {isConnected ? 'Active' : 'Disconnected'}
                                </div>
                            </div>

                            <div className="main-progress">
                                <ProgressBar
                                    progress={progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0}
                                    label="Network Consensus"
                                    color="primary"
                                    animated={isConnected}
                                />
                            </div>
                        </div>

                        {/* Network Visualization */}
                        <div className="network-viz-container" style={{ marginTop: 'var(--spacing-lg)', background: 'var(--glass-bg)', padding: 'var(--spacing-lg)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--glass-border)' }}>
                            <div className="viz-header" style={{ marginBottom: 'var(--spacing-md)' }}>
                                <h3 style={{ color: 'var(--text-primary)' }}>Worker Network Visualization</h3>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Real-time node topology of the compute grid</p>
                            </div>
                            <NetworkGraph activeWorkers={workerCount} leaderboard={leaderboard} />
                        </div>

                        {/* Global Leaderboard */}
                        <div style={{ marginTop: 'var(--spacing-lg)' }}>
                            <Leaderboard />
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="dashboard-sidebar">
                        {/* Worker Controls */}
                        <div className="sidebar-card">
                            <h4 className="sidebar-card-title">🚀 Local Computing</h4>
                            <WorkerControls />
                            <WorkerStats />
                        </div>

                        {/* Mode Toggle */}
                        <div className="sidebar-card">
                            <h4 className="sidebar-card-title">⚙️ Mode Configuration</h4>
                            <ModeToggle defaultMode="centralized" />
                        </div>

                        {/* Network Operations */}
                        <div className="sidebar-card">
                            <h4 className="sidebar-card-title">🛠️ Network Operations</h4>
                            <div style={{ padding: 'var(--spacing-sm) 0' }}>
                                <Popconfirm
                                    title="Force Network Rebalance?"
                                    description="This will return all in-progress tasks to the queue and redistribute them. Use this if nodes are lagging or stuck."
                                    onConfirm={forceRebalance}
                                    okText="Yes, Rebalance"
                                    cancelText="No"
                                    okButtonProps={{ danger: true }}
                                >
                                    <Button
                                        block
                                        danger
                                        icon="🔄"
                                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 600 }}
                                    >
                                        Force Rebalance
                                    </Button>
                                </Popconfirm>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 'var(--spacing-sm)', textAlign: 'center' }}>
                                    Grid Recoveries: <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>{recoveryStats.recoveries}</span>
                                </p>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="sidebar-card info-card">
                            <h4 className="sidebar-card-title">ℹ️ System Info</h4>
                            <div className="info-list" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                                <div className="info-item" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem' }}>
                                    <span className="info-label" style={{ color: 'var(--text-muted)' }}>Current Range</span>
                                    <span className="info-value task-range-display">{taskConfig.start} - {taskConfig.end}</span>
                                </div>
                                <div className="info-item" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem' }}>
                                    <span className="info-label" style={{ color: 'var(--text-muted)' }}>Batch Size</span>
                                    <span className="info-value" style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{taskConfig.chunkSize.toLocaleString()}</span>
                                </div>
                                <div className="info-item" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem' }}>
                                    <span className="info-label" style={{ color: 'var(--text-muted)' }}>Protocol</span>
                                    <span className="info-value" style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Socket.IO v4</span>
                                </div>
                                <div className="info-item" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem' }}>
                                    <span className="info-label" style={{ color: 'var(--text-muted)' }}>Network</span>
                                    <span className="info-value" style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Local:5000</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Config Modal */}
            <Modal
                title="🚀 New Computation Task"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                className="glass-modal"
                centered
                width={500}
            >
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                    Configuring a new task will reset all current progress across the entire grid. Please proceed with caution.
                </p>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={taskConfig}
                >
                    <Space size="large" style={{ display: 'flex', width: '100%' }}>
                        <Form.Item
                            label="Range Start"
                            name="start"
                            rules={[{ required: true, message: 'Required' }]}
                            style={{ flex: 1 }}
                        >
                            <InputNumber min={1} style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            label="Range End"
                            name="end"
                            rules={[{ required: true, message: 'Required' }]}
                            style={{ flex: 1 }}
                        >
                            <InputNumber min={2} style={{ width: '100%' }} />
                        </Form.Item>
                    </Space>

                    <Form.Item
                        label="Chunk Size (Batches)"
                        name="chunkSize"
                        extra={<span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>Optimal performance at 50,000</span>}
                        rules={[
                            { required: true, message: 'Required' },
                            { type: 'number', min: 1000, max: 100000, message: 'Must be 1,000 - 100,000' }
                        ]}
                    >
                        <InputNumber style={{ width: '100%' }} placeholder="e.g. 50000" />
                    </Form.Item>

                    <div className="modal-footer">
                        <Button onClick={handleCancel} ghost>Cancel</Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            danger
                            style={{ background: 'var(--accent-amber)', borderColor: 'var(--accent-amber)', color: '#000', fontWeight: 700 }}
                        >
                            Reset & Start Grid
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
}

export default Dashboard;
