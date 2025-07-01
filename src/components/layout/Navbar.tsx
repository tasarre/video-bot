import React from 'react';
import { motion } from 'framer-motion';
import { Video, Sparkles, Menu, User } from 'lucide-react';
import { Button } from '../ui/Button';

interface NavbarProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background-primary/80 backdrop-blur-lg border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onNavigate?.('home')}
          >
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-text-primary">VideoBot</span>
            <Sparkles className="w-4 h-4 text-accent-pink" />
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink 
              active={currentPage === 'home'} 
              onClick={() => onNavigate?.('home')}
            >
              Accueil
            </NavLink>
            <NavLink 
              active={currentPage === 'dashboard'} 
              onClick={() => onNavigate?.('dashboard')}
            >
              Dashboard
            </NavLink>
            <NavLink 
              active={currentPage === 'generate'} 
              onClick={() => onNavigate?.('generate')}
            >
              Générer
            </NavLink>
            <NavLink 
              active={currentPage === 'library'} 
              onClick={() => onNavigate?.('library')}
            >
              Bibliothèque
            </NavLink>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <div className="px-3 py-1 bg-gradient-primary rounded-full text-sm font-medium text-white">
                3 crédits
              </div>
            </div>
            <Button size="sm" onClick={() => onNavigate?.('generate')}>
              🚀 Créer
            </Button>
            <div className="w-8 h-8 bg-background-card rounded-full flex items-center justify-center cursor-pointer">
              <User className="w-4 h-4 text-text-secondary" />
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

interface NavLinkProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ children, active, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`text-sm font-medium transition-colors duration-200 ${
      active 
        ? 'text-accent-pink' 
        : 'text-text-secondary hover:text-text-primary'
    }`}
  >
    {children}
  </motion.button>
);