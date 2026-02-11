import React from 'react';
import { useSocket } from './SocketProvider';
import { Table, Tag } from 'antd';

const Leaderboard = () => {
    const { leaderboard } = useSocket();

    const columns = [
        {
            title: 'Node ID',
            dataIndex: 'id',
            key: 'id',
            render: (text, record) => (
                <span style={{
                    fontFamily: 'var(--font-mono)',
                    color: record.isLocal ? 'var(--accent-emerald)' : 'var(--accent-primary)',
                    fontWeight: record.isLocal ? 700 : 400
                }}>
                    {text} {record.isLocal && <span style={{ fontSize: '0.65rem', opacity: 0.8 }}>(You)</span>}
                </span>
            ),
        },
        {
            title: 'Avg Time',
            dataIndex: 'avgTime',
            key: 'avgTime',
            sorter: (a, b) => a.avgTime - b.avgTime,
            render: (time) => `${Math.round(time)}ms`,
        },
        {
            title: 'Stability',
            dataIndex: 'stability',
            key: 'stability',
            render: (score) => {
                let color = 'gold';
                if (score > 90) color = 'green';
                else if (score < 70) color = 'red';
                return <Tag color={color}>{Math.round(score)}%</Tag>;
            },
        },
        {
            title: 'Tasks',
            dataIndex: 'completed',
            key: 'completed',
            align: 'right',
        },
    ];

    return (
        <div className="leaderboard-section glass-card" style={{ padding: 'var(--spacing-lg)' }}>
            <div className="viz-header" style={{ marginBottom: 'var(--spacing-md)' }}>
                <h3 style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                    🏆 Network Leaderboard
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Top performing nodes in the current grid session</p>
            </div>

            <Table
                dataSource={leaderboard}
                columns={columns}
                pagination={false}
                size="small"
                rowKey="id"
                className="custom-leaderboard-table"
                rowClassName={(record) => record.isLocal ? 'local-node-row' : ''}
            />

            <style>{`
                .local-node-row td {
                    background: rgba(16, 185, 129, 0.05) !important;
                }
                .custom-leaderboard-table {
                    background: transparent !important;
                }
                .custom-leaderboard-table .ant-table {
                    background: transparent !important;
                    color: var(--text-primary) !important;
                }
                .custom-leaderboard-table .ant-table-thead > tr > th {
                    background: rgba(255, 255, 255, 0.05) !important;
                    color: var(--text-secondary) !important;
                    border-bottom: 1px solid var(--glass-border) !important;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                }
                .custom-leaderboard-table .ant-table-tbody > tr > td {
                    border-bottom: 1px solid var(--glass-border) !important;
                    background: transparent !important;
                }
                .custom-leaderboard-table .ant-table-tbody > tr:hover > td {
                    background: rgba(255, 255, 255, 0.02) !important;
                }
                .custom-leaderboard-table .ant-table-placeholder {
                    background: transparent !important;
                    border: none !important;
                }
                .custom-leaderboard-table .ant-empty-description {
                    color: var(--text-muted) !important;
                }
            `}</style>
        </div>
    );
};

export default Leaderboard;
