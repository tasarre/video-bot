'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Play, Zap, Sparkles, Clock, Palette, Share2, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Navbar } from '@/components/layout/Navbar';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background-primary">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-primary px-6 py-2 rounded-full text-white text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              <span>IA Nouvelle Génération</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-6 leading-tight">
              Créez des vidéos
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                virales en 3 minutes
              </span>
            </h1>
            
            <p className="text-xl text-text-secondary mb-12 max-w-3xl mx-auto leading-relaxed">
              Transformez votre texte en vidéos YouTube Shorts et TikTok engageantes. 
              IA avancée + voix naturelle + visuels uniques = succès garanti.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/generate">
                <Button size="xl">
                  🚀 Créer ma première vidéo
                </Button>
              </Link>
              <Button variant="outline" size="xl">
                <Play className="w-5 h-5 mr-2" />
                Voir la démo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-text-primary mb-6">
              Pourquoi choisir VideoBot ?
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              La solution complète pour dominer les réseaux sociaux avec du contenu viral
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="w-8 h-8 text-accent-pink" />}
              title="Ultra Rapide"
              description="Génération complète en 3-5 minutes. De l'idée à la vidéo finale sans attendre."
              delay={0.1}
            />
            <FeatureCard
              icon={<Palette className="w-8 h-8 text-accent-purple" />}
              title="Visuels Uniques"
              description="IA générative pour des visuels originaux. Fini les templates ennuyeux."
              delay={0.2}
            />
            <FeatureCard
              icon={<Share2 className="w-8 h-8 text-accent-green" />}
              title="Optimisé Viral"
              description="Scripts et formats optimisés pour maximiser l'engagement et les vues."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 bg-background-secondary">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-text-primary mb-6">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-text-secondary">
              Un processus simple et automatisé pour des résultats professionnels
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            <ProcessStep
              step="1"
              title="Saisie"
              description="Collez votre texte ou URL"
              icon={<Clock className="w-6 h-6" />}
              delay={0.1}
            />
            <ProcessStep
              step="2"
              title="IA Script"
              description="Génération du script viral"
              icon={<Sparkles className="w-6 h-6" />}
              delay={0.2}
            />
            <ProcessStep
              step="3"
              title="Voix & Visuels"
              description="Synthèse vocale + images IA"
              icon={<Palette className="w-6 h-6" />}
              delay={0.3}
            />
            <ProcessStep
              step="4"
              title="Vidéo Finale"
              description="Assemblage et téléchargement"
              icon={<Play className="w-6 h-6" />}
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-primary">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Prêt à créer du contenu viral ?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Rejoignez des milliers de créateurs qui font déjà confiance à VideoBot
            </p>
            <Link href="/generate">
              <Button variant="secondary" size="xl">
                Commencer maintenant
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
  >
    <Card hover gradient className="text-center h-full">
      <div className="mb-4 flex justify-center">
        <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold text-text-primary mb-4">{title}</h3>
      <p className="text-text-secondary leading-relaxed">{description}</p>
    </Card>
  </motion.div>
);

interface ProcessStepProps {
  step: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ step, title, description, icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className="text-center"
  >
    <div className="mb-4 flex justify-center">
      <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
        {step}
      </div>
    </div>
    <h3 className="text-lg font-bold text-text-primary mb-2">{title}</h3>
    <p className="text-text-secondary text-sm">{description}</p>
  </motion.div>
);