import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { HomePage } from './components/pages/HomePage';
import { Dashboard } from './components/pages/Dashboard';
import { GeneratePage } from './components/pages/GeneratePage';
import { Library } from './components/pages/Library';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(true); // For demo purposes

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'generate':
        return <GeneratePage onNavigate={handleNavigate} />;
      case 'library':
        return <Library onNavigate={handleNavigate} />;
      case 'analytics':
      case 'projects':
      case 'credits':
      case 'settings':
        return <Dashboard onNavigate={handleNavigate} />; // Fallback to dashboard for now
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background-primary">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      
      {/* Show sidebar only for authenticated pages */}
      {isAuthenticated && currentPage !== 'home' && (
        <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
      )}
      
      {renderPage()}
    </div>
  );
}

export default App;