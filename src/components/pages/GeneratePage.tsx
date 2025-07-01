import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Link, Settings, Sparkles, Zap, Video, Bot, Edit3, Globe } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { VideoSettings, VideoStatus } from '../../types';
import { api } from '../../config/api';

interface GeneratePageProps {
  onNavigate: (page: string) => void;
}

export const GeneratePage: React.FC<GeneratePageProps> = ({ onNavigate }) => {
  const [contentMode, setContentMode] = useState<'generate' | 'manual' | 'url'>('generate');
  const [content, setContent] = useState('');
  const [generatedScript, setGeneratedScript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState<VideoStatus>('pending');
  const [showAdvanced, setShowAdvanced] = useState(false);

  // États pour génération IA
  const [aiPrompt, setAiPrompt] = useState('');
  const [videoType, setVideoType] = useState('Éducatif');
  const [targetDuration, setTargetDuration] = useState(30);
  const [tone, setTone] = useState('Décontracté');

  // États pour URL
  const [url, setUrl] = useState('');
  const [urlApproach, setUrlApproach] = useState('Résumé fidèle');

  const [settings, setSettings] = useState<VideoSettings>({
    style: 'viral',
    duration: 30,
    language: 'fr',
    voice: 'feminine',
    pace: 'normal'
  });

  const steps = [
    { id: 'analyzing-content', label: 'Analyse du contenu', icon: FileText },
    { id: 'generating-script', label: 'Génération du script', icon: Sparkles },
    { id: 'creating-audio', label: 'Synthèse vocale', icon: Zap },
    { id: 'generating-visuals', label: 'Création des visuels', icon: Video },
    { id: 'assembling-video', label: 'Assemblage final', icon: Settings }
  ];

  const videoTypes = ['Éducatif', 'Divertissement', 'Storytelling', 'Viral', 'Review', 'Motivation'];
  const tones = ['Décontracté', 'Professionnel', 'Énergique', 'Calme'];
  const urlApproaches = ['Résumé fidèle', 'Réaction/Opinion', 'Guide pratique', 'Points controversés'];

  const handleGenerateScript = async () => {
    if (!aiPrompt.trim()) return;
    
    setIsGeneratingScript(true);
    setGenerationError(null);
    
    try {
      const data = await api.generateContent({
        prompt: aiPrompt,
        videoType,
        duration: targetDuration,
        tone
      });

      if (data.success) {
        setGeneratedScript(data.script);
        setContent(data.script);
        setContentMode('manual');
        console.log('✅ Script généré:', data.metadata);
      } else {
        setGenerationError(data.error || 'Erreur lors de la génération');
      }
    } catch (error) {
      console.error('❌ Erreur:', error);
      setGenerationError('Erreur de connexion au serveur');
    } finally {
      setIsGeneratingScript(false);
    }
  };

  const handleGenerateVideo = async () => {
    const currentContent = contentMode === 'manual' ? content : generatedScript;
    if (!currentContent.trim()) return;
    
    setIsGenerating(true);
    setProgress(0);
    
    try {
      // Appel API pour démarrer la génération
      const response = await api.generateVideo({
        script: currentContent,
        settings
      });

      if (response.success) {
        console.log('🎬 Génération vidéo démarrée:', response.jobId);
        
        // Simulate generation process
        for (let i = 0; i < steps.length; i++) {
          setCurrentStep(steps[i].id as VideoStatus);
          
          // Simulate step progress
          for (let p = 0; p <= 100; p += 10) {
            setProgress((i / steps.length) * 100 + (p / steps.length));
            await new Promise(resolve => setTimeout(resolve, 200));
          }
        }
        
        setCurrentStep('ready');
        setProgress(100);
        setTimeout(() => {
          setIsGenerating(false);
          // Navigate to result or show success
          onNavigate('library');
        }, 1000);
      }
    } catch (error) {
      console.error('❌ Erreur génération vidéo:', error);
      setGenerationError('Erreur lors de la génération vidéo');
      setIsGenerating(false);
    }
  };

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  const getContentForGeneration = () => {
    switch (contentMode) {
      case 'generate':
        return generatedScript;
      case 'manual':
        return content;
      case 'url':
        return url;
      default:
        return '';
    }
  };

  const getCreditCost = () => {
    switch (contentMode) {
      case 'generate':
        return generatedScript ? 3 : 1; // 1 pour génération + 2 pour vidéo
      case 'manual':
        return 2;
      case 'url':
        return 2;
      default:
        return 2;
    }
  };

  return (
    <div className="ml-64 pt-16 min-h-screen bg-background-primary p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            Créer une nouvelle vidéo 🎬
          </h1>
          <p className="text-text-secondary">
            Transformez votre contenu en vidéo virale en quelques minutes
          </p>
        </motion.div>

        {!isGenerating ? (
          <div className="space-y-8">
            {/* Content Mode Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <h2 className="text-xl font-bold text-text-primary mb-4">
                  Type de contenu
                </h2>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <button
                    onClick={() => setContentMode('generate')}
                    className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                      contentMode === 'generate'
                        ? 'border-accent-pink bg-accent-pink/10 text-accent-pink'
                        : 'border-white/20 text-text-secondary hover:border-white/30'
                    }`}
                  >
                    <Bot className="w-8 h-8 mx-auto mb-2" />
                    <span className="font-medium">Générer avec IA</span>
                  </button>
                  <button
                    onClick={() => setContentMode('manual')}
                    className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                      contentMode === 'manual'
                        ? 'border-accent-pink bg-accent-pink/10 text-accent-pink'
                        : 'border-white/20 text-text-secondary hover:border-white/30'
                    }`}
                  >
                    <Edit3 className="w-8 h-8 mx-auto mb-2" />
                    <span className="font-medium">Écrire manuellement</span>
                  </button>
                  <button
                    onClick={() => setContentMode('url')}
                    className={`p-4 rounded-2xl border-2 transition-all duration-200 ${
                      contentMode === 'url'
                        ? 'border-accent-pink bg-accent-pink/10 text-accent-pink'
                        : 'border-white/20 text-text-secondary hover:border-white/30'
                    }`}
                  >
                    <Globe className="w-8 h-8 mx-auto mb-2" />
                    <span className="font-medium">URL</span>
                  </button>
                </div>

                {/* Content based on selected mode */}
                {contentMode === 'generate' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-text-secondary text-sm mb-2">Type de vidéo</label>
                        <select
                          value={videoType}
                          onChange={(e) => setVideoType(e.target.value)}
                          className="w-full bg-background-secondary border border-white/20 rounded-xl p-3 text-text-primary focus:outline-none focus:border-accent-pink"
                        >
                          {videoTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-text-secondary text-sm mb-2">Durée cible</label>
                        <select
                          value={targetDuration}
                          onChange={(e) => setTargetDuration(Number(e.target.value))}
                          className="w-full bg-background-secondary border border-white/20 rounded-xl p-3 text-text-primary focus:outline-none focus:border-accent-pink"
                        >
                          <option value={15}>15 secondes</option>
                          <option value={30}>30 secondes</option>
                          <option value={60}>60 secondes</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-text-secondary text-sm mb-2">Ton/Style</label>
                      <select
                        value={tone}
                        onChange={(e) => setTone(e.target.value)}
                        className="w-full bg-background-secondary border border-white/20 rounded-xl p-3 text-text-primary focus:outline-none focus:border-accent-pink"
                      >
                        {tones.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-text-secondary text-sm mb-2">Décrivez votre vidéo</label>
                      <textarea
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                        placeholder="Ex: Expliquer les bases de l'IA pour débutants..."
                        className="w-full h-32 bg-background-secondary border border-white/20 rounded-2xl p-4 text-text-primary placeholder-text-muted resize-none focus:outline-none focus:border-accent-pink transition-colors duration-200"
                        maxLength={500}
                      />
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-text-muted text-sm">{aiPrompt.length}/500 caractères</span>
                        {generationError && (
                          <span className="text-red-400 text-sm">{generationError}</span>
                        )}
                      </div>
                    </div>

                    <Button
                      onClick={handleGenerateScript}
                      disabled={!aiPrompt.trim() || isGeneratingScript}
                      loading={isGeneratingScript}
                      className="w-full"
                    >
                      🤖 Générer le script (1 crédit)
                    </Button>
                  </div>
                )}

                {contentMode === 'manual' && (
                  <div>
                    <label className="block text-text-secondary text-sm mb-2">Votre script</label>
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Collez votre script ici... (jusqu'à 2000 caractères)"
                      className="w-full h-40 bg-background-secondary border border-white/20 rounded-2xl p-4 text-text-primary placeholder-text-muted resize-none focus:outline-none focus:border-accent-pink transition-colors duration-200"
                      maxLength={2000}
                    />
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-text-muted text-sm">{content.length}/2000 caractères</span>
                      <div className="flex items-center space-x-2 text-sm text-text-secondary">
                        <Zap className="w-4 h-4 text-accent-green" />
                        <span>Coût: 2 crédits</span>
                      </div>
                    </div>
                  </div>
                )}

                {contentMode === 'url' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-text-secondary text-sm mb-2">URL de l'article</label>
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://example.com/article"
                        className="w-full bg-background-secondary border border-white/20 rounded-2xl p-4 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-pink transition-colors duration-200"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-text-secondary text-sm mb-2">Angle d'approche</label>
                      <select
                        value={urlApproach}
                        onChange={(e) => setUrlApproach(e.target.value)}
                        className="w-full bg-background-secondary border border-white/20 rounded-xl p-3 text-text-primary focus:outline-none focus:border-accent-pink"
                      >
                        {urlApproaches.map(approach => (
                          <option key={approach} value={approach}>{approach}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-text-secondary">
                      <Zap className="w-4 h-4 text-accent-green" />
                      <span>Coût: 2 crédits</span>
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>

            {/* Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-text-primary">
                    Paramètres
                  </h2>
                  <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="text-accent-pink hover:text-accent-pink/80 text-sm font-medium"
                  >
                    {showAdvanced ? 'Masquer' : 'Avancé'}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-text-secondary text-sm mb-2">Style</label>
                    <select
                      value={settings.style}
                      onChange={(e) => setSettings({...settings, style: e.target.value as any})}
                      className="w-full bg-background-secondary border border-white/20 rounded-xl p-3 text-text-primary focus:outline-none focus:border-accent-pink"
                    >
                      <option value="viral">Viral</option>
                      <option value="educational">Éducatif</option>
                      <option value="entertainment">Divertissement</option>
                      <option value="storytelling">Storytelling</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-text-secondary text-sm mb-2">Durée</label>
                    <select
                      value={settings.duration}
                      onChange={(e) => setSettings({...settings, duration: Number(e.target.value) as any})}
                      className="w-full bg-background-secondary border border-white/20 rounded-xl p-3 text-text-primary focus:outline-none focus:border-accent-pink"
                    >
                      <option value={15}>15 secondes</option>
                      <option value={30}>30 secondes</option>
                      <option value={60}>60 secondes</option>
                    </select>
                  </div>
                </div>

                {showAdvanced && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="grid grid-cols-3 gap-4"
                  >
                    <div>
                      <label className="block text-text-secondary text-sm mb-2">Langue</label>
                      <select
                        value={settings.language}
                        onChange={(e) => setSettings({...settings, language: e.target.value as any})}
                        className="w-full bg-background-secondary border border-white/20 rounded-xl p-3 text-text-primary focus:outline-none focus:border-accent-pink"
                      >
                        <option value="fr">Français</option>
                        <option value="en">Anglais</option>
                        <option value="es">Espagnol</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-text-secondary text-sm mb-2">Voix</label>
                      <select
                        value={settings.voice}
                        onChange={(e) => setSettings({...settings, voice: e.target.value as any})}
                        className="w-full bg-background-secondary border border-white/20 rounded-xl p-3 text-text-primary focus:outline-none focus:border-accent-pink"
                      >
                        <option value="feminine">Féminine</option>
                        <option value="masculine">Masculine</option>
                        <option value="child">Enfant</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-text-secondary text-sm mb-2">Rythme</label>
                      <select
                        value={settings.pace}
                        onChange={(e) => setSettings({...settings, pace: e.target.value as any})}
                        className="w-full bg-background-secondary border border-white/20 rounded-xl p-3 text-text-primary focus:outline-none focus:border-accent-pink"
                      >
                        <option value="slow">Lent</option>
                        <option value="normal">Normal</option>
                        <option value="fast">Rapide</option>
                      </select>
                    </div>
                  </motion.div>
                )}
              </Card>
            </motion.div>

            {/* Generate Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <Button
                size="xl"
                onClick={handleGenerateVideo}
                disabled={!getContentForGeneration().trim()}
                className="w-full max-w-md"
              >
                🚀 Créer ma vidéo ({getCreditCost()} crédits)
              </Button>
              <p className="text-text-muted text-sm mt-2">
                Temps estimé: 3-5 minutes
              </p>
            </motion.div>
          </div>
        ) : (
          /* Progress Section */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <Card className="max-w-2xl mx-auto">
              <div className="mb-8">
                <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="w-10 h-10 text-white animate-pulse" />
                </div>
                <h2 className="text-2xl font-bold text-text-primary mb-2">
                  Génération en cours...
                </h2>
                <p className="text-text-secondary">
                  Votre vidéo est en cours de création. Restez connecté !
                </p>
              </div>

              <ProgressBar progress={progress} className="mb-8" />

              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 ${
                      index < currentStepIndex
                        ? 'bg-accent-green/20 text-accent-green'
                        : index === currentStepIndex
                        ? 'bg-accent-pink/20 text-accent-pink'
                        : 'bg-background-secondary text-text-muted'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      index < currentStepIndex
                        ? 'bg-accent-green text-white'
                        : index === currentStepIndex
                        ? 'bg-accent-pink text-white animate-pulse'
                        : 'bg-background-primary text-text-muted'
                    }`}>
                      {index < currentStepIndex ? '✓' : <step.icon className="w-5 h-5" />}
                    </div>
                    <span className="font-medium">{step.label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-text-muted text-sm">
                <p>Temps estimé restant: {Math.max(0, Math.round((100 - progress) / 100 * 300))}s</p>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};