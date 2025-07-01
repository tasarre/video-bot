import React from 'react';
import { motion } from 'framer-motion';
import { Play, Zap, Sparkles, Clock, Palette, Share2, ArrowRight, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-background-primary">
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
              <Button size="xl" onClick={() => onNavigate('generate')}>
                🚀 Créer ma première vidéo
              </Button>
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

      {/* Pricing Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-text-primary mb-6">
              Tarifs transparents
            </h2>
            <p className="text-xl text-text-secondary">
              Commencez gratuitement, évoluez selon vos besoins
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <PricingCard
              plan="Gratuit"
              price="0€"
              features={[
                "3 vidéos par mois",
                "Durée 60s max",
                "Voix standard",
                "Watermark"
              ]}
              delay={0.1}
            />
            <PricingCard
              plan="Basic"
              price="19€"
              features={[
                "50 vidéos par mois",
                "Durée 60s",
                "Voix premium",
                "Sans watermark",
                "Qualité HD"
              ]}
              popular={true}
              delay={0.2}
            />
            <PricingCard
              plan="Pro"
              price="49€"
              features={[
                "200 vidéos par mois",
                "Durée 5 minutes",
                "Voix personnalisée",
                "Branding custom",
                "Qualité 4K",
                "Accès API"
              ]}
              delay={0.3}
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
            <Button 
              variant="secondary" 
              size="xl"
              onClick={() => onNavigate('generate')}
            >
              Commencer maintenant
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

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

interface PricingCardProps {
  plan: string;
  price: string;
  features: string[];
  popular?: boolean;
  delay: number;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, price, features, popular, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
  >
    <Card hover gradient className={`text-center h-full relative ${popular ? 'ring-2 ring-accent-pink' : ''}`}>
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-primary px-4 py-1 rounded-full text-white text-sm font-medium">
            Populaire
          </div>
        </div>
      )}
      <h3 className="text-2xl font-bold text-text-primary mb-2">{plan}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold text-text-primary">{price}</span>
        <span className="text-text-secondary">/mois</span>
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-text-secondary">
            <Check className="w-4 h-4 text-accent-green mr-2" />
            {feature}
          </li>
        ))}
      </ul>
      <Button 
        variant={popular ? "primary" : "outline"} 
        className="w-full"
      >
        Choisir ce plan
      </Button>
    </Card>
  </motion.div>
);