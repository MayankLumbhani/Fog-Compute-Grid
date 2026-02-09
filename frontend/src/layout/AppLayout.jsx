import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function AppLayout() {
    return (
        <div className="page-wrapper">
            <Navbar />
            <main className="page-content">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default AppLayout;
