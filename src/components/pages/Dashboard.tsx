import React from 'react';
import { motion } from 'framer-motion';
import { Plus, TrendingUp, Video, Clock, Star, Play, Download, Share2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const stats = [
    { label: 'Vidéos créées', value: '12', icon: Video, color: 'text-accent-pink' },
    { label: 'Vues totales', value: '45.2K', icon: TrendingUp, color: 'text-accent-green' },
    { label: 'Temps économisé', value: '8h', icon: Clock, color: 'text-accent-blue' },
    { label: 'Score viral', value: '87%', icon: Star, color: 'text-accent-purple' }
  ];

  const recentVideos = [
    {
      id: 1,
      title: "5 Astuces Marketing Incroyables",
      thumbnail: "https://images.pexels.com/photos/3184300/pexels-photo-3184300.jpeg?auto=compress&cs=tinysrgb&w=400",
      duration: "0:45",
      views: "2.3K",
      status: "ready",
      createdAt: "Il y a 2h"
    },
    {
      id: 2,
      title: "Le Secret des Entrepreneurs",
      thumbnail: "https://images.pexels.com/photos/3184303/pexels-photo-3184303.jpeg?auto=compress&cs=tinysrgb&w=400",
      duration: "0:30",
      views: "1.8K",
      status: "ready",
      createdAt: "Il y a 1j"
    },
    {
      id: 3,
      title: "Tendances Tech 2024",
      thumbnail: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400",
      duration: "1:00",
      views: "3.1K",
      status: "processing",
      createdAt: "Il y a 2j"
    }
  ];

  return (
    <div className="ml-64 pt-16 min-h-screen bg-background-primary p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">
                Bonjour, créateur ! 👋
              </h1>
              <p className="text-text-secondary">
                Prêt à créer du contenu viral aujourd'hui ?
              </p>
            </div>
            <Button size="lg" onClick={() => onNavigate('generate')}>
              <Plus className="w-5 h-5 mr-2" />
              Nouvelle vidéo
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-text-secondary text-sm mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Recent Videos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-text-primary">Vidéos récentes</h2>
            <Button variant="ghost" onClick={() => onNavigate('library')}>
              Voir tout
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <Card hover className="overflow-hidden">
                  <div className="relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-48 object-cover rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                    {video.status === 'processing' && (
                      <div className="absolute top-2 left-2 bg-accent-blue text-white text-xs px-2 py-1 rounded-full">
                        En cours...
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="font-bold text-text-primary mb-2 line-clamp-2">
                      {video.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-text-secondary mb-4">
                      <span>{video.views} vues</span>
                      <span>{video.createdAt}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="ghost" className="flex-1">
                        <Download className="w-4 h-4 mr-1" />
                        Télécharger
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-text-primary mb-6">Actions rapides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card hover className="text-center cursor-pointer" onClick={() => onNavigate('generate')}>
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-text-primary mb-2">Créer une vidéo</h3>
              <p className="text-text-secondary text-sm">Transformez votre idée en contenu viral</p>
            </Card>

            <Card hover className="text-center cursor-pointer" onClick={() => onNavigate('library')}>
              <div className="w-16 h-16 bg-gradient-success rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-text-primary mb-2">Gérer mes vidéos</h3>
              <p className="text-text-secondary text-sm">Organisez votre bibliothèque de contenu</p>
            </Card>

            <Card hover className="text-center cursor-pointer" onClick={() => onNavigate('analytics')}>
              <div className="w-16 h-16 bg-gradient-to-br from-accent-purple to-accent-blue rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-text-primary mb-2">Voir les stats</h3>
              <p className="text-text-secondary text-sm">Analysez les performances de vos vidéos</p>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};