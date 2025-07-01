import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Play, 
  Download, 
  Share2, 
  MoreVertical,
  Calendar,
  Clock,
  Eye,
  Copy,
  Trash2
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface LibraryProps {
  onNavigate: (page: string) => void;
}

export const Library: React.FC<LibraryProps> = ({ onNavigate }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const videos = [
    {
      id: 1,
      title: "5 Astuces Marketing Incroyables",
      thumbnail: "https://images.pexels.com/photos/3184300/pexels-photo-3184300.jpeg?auto=compress&cs=tinysrgb&w=600",
      duration: "0:45",
      views: "2.3K",
      status: "ready",
      style: "viral",
      createdAt: "2024-01-15",
      fileSize: "12.5 MB"
    },
    {
      id: 2,
      title: "Le Secret des Entrepreneurs",
      thumbnail: "https://images.pexels.com/photos/3184303/pexels-photo-3184303.jpeg?auto=compress&cs=tinysrgb&w=600",
      duration: "0:30",
      views: "1.8K",
      status: "ready",
      style: "educational",
      createdAt: "2024-01-14",
      fileSize: "8.2 MB"
    },
    {
      id: 3,
      title: "Tendances Tech 2024",
      thumbnail: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600",
      duration: "1:00",
      views: "3.1K",
      status: "ready",
      style: "storytelling",
      createdAt: "2024-01-13",
      fileSize: "15.8 MB"
    },
    {
      id: 4,
      title: "Comment Réussir sur TikTok",
      thumbnail: "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=600",
      duration: "0:15",
      views: "4.2K",
      status: "ready",
      style: "entertainment",
      createdAt: "2024-01-12",
      fileSize: "6.3 MB"
    },
    {
      id: 5,
      title: "IA et Avenir du Travail",
      thumbnail: "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=600",
      duration: "0:50",
      views: "5.7K",
      status: "ready",
      style: "educational",
      createdAt: "2024-01-11",
      fileSize: "18.1 MB"
    },
    {
      id: 6,
      title: "Méthode Productivité Ultime",
      thumbnail: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600",
      duration: "0:35",
      views: "2.9K",
      status: "processing",
      style: "viral",
      createdAt: "2024-01-10",
      fileSize: "0 MB"
    }
  ];

  const filters = [
    { id: 'all', label: 'Toutes', count: videos.length },
    { id: 'ready', label: 'Prêtes', count: videos.filter(v => v.status === 'ready').length },
    { id: 'processing', label: 'En cours', count: videos.filter(v => v.status === 'processing').length },
    { id: 'viral', label: 'Viral', count: videos.filter(v => v.style === 'viral').length },
    { id: 'educational', label: 'Éducatif', count: videos.filter(v => v.style === 'educational').length }
  ];

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
                         video.status === selectedFilter || 
                         video.style === selectedFilter;
    return matchesSearch && matchesFilter;
  });

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
                Ma Bibliothèque 📚
              </h1>
              <p className="text-text-secondary">
                Gérez et organisez toutes vos vidéos créées
              </p>
            </div>
            <Button onClick={() => onNavigate('generate')}>
              Créer une vidéo
            </Button>
          </div>
        </motion.div>

        {/* Filters & Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="text"
                  placeholder="Rechercher une vidéo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-background-secondary border border-white/20 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-pink transition-colors duration-200"
                />
              </div>

              {/* View Mode & Filters */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors duration-200 ${
                      viewMode === 'grid' 
                        ? 'bg-accent-pink text-white' 
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors duration-200 ${
                      viewMode === 'list' 
                        ? 'bg-accent-pink text-white' 
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center space-x-2 mt-4 overflow-x-auto">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    selectedFilter === filter.id
                      ? 'bg-gradient-primary text-white'
                      : 'bg-background-secondary text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <span>{filter.label}</span>
                  <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                    {filter.count}
                  </span>
                </button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Videos Grid/List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video, index) => (
                <VideoCard key={video.id} video={video} delay={index * 0.1} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredVideos.map((video, index) => (
                <VideoListItem key={video.id} video={video} delay={index * 0.05} />
              ))}
            </div>
          )}
        </motion.div>

        {filteredVideos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-background-card rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-text-muted" />
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-2">
              Aucune vidéo trouvée
            </h3>
            <p className="text-text-secondary">
              Essayez de modifier vos critères de recherche ou créez votre première vidéo
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

interface VideoCardProps {
  video: any;
  delay: number;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, delay }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card hover className="overflow-hidden">
        <div className="relative group">
          <img 
            src={video.thumbnail} 
            alt={video.title}
            className="w-full h-48 object-cover rounded-2xl"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
            <Button size="sm" variant="secondary">
              <Play className="w-4 h-4 mr-2" />
              Voir
            </Button>
          </div>
          
          {/* Status Badge */}
          <div className="absolute top-3 left-3">
            {video.status === 'processing' ? (
              <div className="bg-accent-blue text-white text-xs px-3 py-1 rounded-full">
                En cours...
              </div>
            ) : (
              <div className="bg-accent-green text-white text-xs px-3 py-1 rounded-full">
                Prête
              </div>
            )}
          </div>
          
          {/* Duration */}
          <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs px-2 py-1 rounded">
            {video.duration}
          </div>
        </div>
        
        {/* Content */}
        <div className="mt-4">
          <h3 className="font-bold text-text-primary mb-2 line-clamp-2">
            {video.title}
          </h3>
          
          <div className="flex items-center justify-between text-sm text-text-secondary mb-3">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{video.views}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(video.createdAt).toLocaleDateString('fr-FR')}</span>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="ghost" disabled={video.status !== 'ready'}>
                <Download className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" disabled={video.status !== 'ready'}>
                <Share2 className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost">
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <Button size="sm" variant="ghost">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

interface VideoListItemProps {
  video: any;
  delay: number;
}

const VideoListItem: React.FC<VideoListItemProps> = ({ video, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
    >
      <Card className="hover:bg-background-card/50 transition-colors duration-200">
        <div className="flex items-center space-x-4">
          {/* Thumbnail */}
          <div className="relative">
            <img 
              src={video.thumbnail} 
              alt={video.title}
              className="w-24 h-16 object-cover rounded-xl"
            />
            <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
              {video.duration}
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1">
            <h3 className="font-bold text-text-primary mb-1">{video.title}</h3>
            <div className="flex items-center space-x-4 text-sm text-text-secondary">
              <span className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{video.views}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(video.createdAt).toLocaleDateString('fr-FR')}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{video.fileSize}</span>
              </span>
            </div>
          </div>
          
          {/* Status */}
          <div>
            {video.status === 'processing' ? (
              <div className="bg-accent-blue text-white text-xs px-3 py-1 rounded-full">
                En cours...
              </div>
            ) : (
              <div className="bg-accent-green text-white text-xs px-3 py-1 rounded-full">
                Prête
              </div>
            )}
          </div>
          
          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="ghost" disabled={video.status !== 'ready'}>
              <Download className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" disabled={video.status !== 'ready'}>
              <Share2 className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};