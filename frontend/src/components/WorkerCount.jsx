import React from 'react';
import { useSocket } from './SocketProvider';
import StatCard from './StatCard';

const WorkerCount = () => {
    const { workerCount, isConnected } = useSocket();

    return (
        <StatCard
            title="Active Workers"
            value={isConnected ? workerCount : '--'}
            icon="👥"
            trend={isConnected ? 0 : null}
            color="primary"
        />
    );
};

export default WorkerCount;
