import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { useSocket } from '../components/SocketProvider';

function AppLayout() {
    const { isConnected } = useSocket();

    return (
        <div className="page-wrapper">
            <Navbar />
            <div className="connection-status-container">
                <span className={`connection-status ${isConnected ? 'online' : 'offline'}`}>
                    {isConnected ? '● Online' : '○ Offline'}
                </span>
            </div>
            <main className="page-content">
                <Outlet />
            </main>
            <Footer />

            <style>{`
                .connection-status-container {
                    position: fixed;
                    top: 1rem;
                    right: 6rem;
                    z-index: 1001;
                }
                .connection-status {
                    font-size: 0.75rem;
                    font-weight: 600;
                    padding: 4px 12px;
                    border-radius: 20px;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    backdrop-filter: blur(8px);
                }
                .connection-status.online {
                    background: rgba(16, 185, 129, 0.1);
                    color: var(--accent-emerald);
                    border: 1px solid rgba(16, 185, 129, 0.2);
                }
                .connection-status.offline {
                    background: rgba(239, 68, 68, 0.1);
                    color: #ef4444;
                    border: 1px solid rgba(239, 68, 68, 0.2);
                }
            `}</style>
        </div>
    );
}

export default AppLayout;
