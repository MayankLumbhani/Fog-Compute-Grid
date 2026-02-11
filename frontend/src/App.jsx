import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Network from './pages/Network';
import Analytics from './pages/Analytics';
import About from './pages/About';

import { SocketProvider } from './components/SocketProvider';

function App() {
  return (
    <SocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Landing />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="network" element={<Network />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SocketProvider>
  );
}

export default App;
