
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import SettingsPage from './pages/SettingsPage';
import './App.css';

function App() {
  return (<Router><Layout><Routes><Route path="/" element={<HomePage />} /><Route path="/game" element={<GamePage />} /><Route path="/settings" element={<SettingsPage />} /></Routes></Layout></Router>);
}

export default App;