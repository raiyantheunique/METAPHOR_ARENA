import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Rosters from './pages/Rosters';
import Achievements from './pages/Achievements';
import Contacts from './pages/Contacts';

function App() {
  return (
    <div className="min-h-screen bg-dark-200">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rosters" element={<Rosters />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
