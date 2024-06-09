import './App.css';
import { Route, Routes } from 'react-router';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import Actions from './components/Actions';
import UseApi from './components/api/UseApi';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Actions />} />
        <Route path="/contact" element={<UseApi />} />
      </Routes>

    </div>
  );
}

export default App;
