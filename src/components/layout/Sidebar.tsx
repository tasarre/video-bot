import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Video, 
  Library, 
  Settings, 
  CreditCard,
  TrendingUp,
  FileText,
  Star
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'generate', label: 'Générer', icon: Video },
    { id: 'library', label: 'Bibliothèque', icon: Library },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'projects', label: 'Projets', icon: FileText },
    { id: 'credits', label: 'Crédits', icon: CreditCard },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ];

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-16 bottom-0 w-64 bg-background-secondary border-r border-white/10 z-40"
    >
      <div className="p-6">
        {/* User Stats */}
        <div className="mb-8">
          <div className="bg-gradient-primary rounded-2xl p-4">
            <div className="flex items-center justify-between text-white">
              <div>
                <p className="text-sm opacity-90">Plan Gratuit</p>
                <p className="text-2xl font-bold">3 crédits</p>
              </div>
              <Star className="w-8 h-8" />
            </div>
            <button className="w-full mt-3 bg-white/20 hover:bg-white/30 text-white rounded-xl py-2 text-sm font-medium transition-colors duration-200">
              Passer au Pro
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={currentPage === item.id}
              onClick={() => onNavigate(item.id)}
            />
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

interface SidebarItemProps {
  icon: React.ComponentType<any>;
  label: string;
  active: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, active, onClick }) => (
  <motion.button
    whileHover={{ x: 5 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
      active 
        ? 'bg-gradient-primary text-white shadow-lg shadow-pink-500/25' 
        : 'text-text-secondary hover:text-text-primary hover:bg-background-card'
    }`}
  >
    <Icon className="w-5 h-5" />
    <span className="font-medium">{label}</span>
  </motion.button>
);