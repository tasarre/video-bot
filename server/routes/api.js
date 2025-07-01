import express from 'express';
import OpenAI from 'openai';

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Route de génération de contenu
router.post('/generate-content', async (req, res) => {
  console.log('🤖 Génération de contenu demandée');
  console.log('Données reçues:', req.body);
  
  try {
    const { prompt, videoType, duration, tone } = req.body;

    if (!prompt) {
      return res.status(400).json({ 
        success: false, 
        error: 'Prompt requis' 
      });
    }

    // Si pas de clé OpenAI, retourner un script de test
    if (!process.env.OPENAI_API_KEY) {
      console.log('⚠️  Pas de clé OpenAI, script de test');
      
      const hooks = {
        'Éducatif': `🎓 Saviez-vous que ${prompt} peut révolutionner votre apprentissage ?`,
        'Divertissement': `🎉 Vous ne devinerez jamais ce que ${prompt} peut faire !`,
        'Storytelling': `📖 Il était une fois... ${prompt} qui a tout changé`,
        'Viral': `🔥 Cette astuce sur ${prompt} va vous choquer !`,
        'Review': `⭐ Mon avis honnête sur ${prompt} après l'avoir testé`,
        'Motivation': `💪 Comment ${prompt} peut transformer votre vie dès aujourd'hui`
      };

      const ctas = {
        'Décontracté': 'Likez si ça vous a plu ! 👍',
        'Professionnel': 'Partagez votre expérience en commentaire.',
        'Énergique': 'LIKEZ ET PARTAGEZ MAINTENANT ! 🚀',
        'Calme': 'Prenez un moment pour réfléchir à cela...'
      };

      const testScript = `${hooks[videoType] || hooks['Éducatif']}

📝 Voici les ${duration <= 30 ? '2' : '3'} points essentiels :

• Point 1: La compréhension change tout
• Point 2: L'action concrète fait la différence${duration > 30 ? '\n• Point 3: La persistance garantit le succès' : ''}

🎯 ${ctas[tone] || ctas['Décontracté']}`;

      return res.json({
        success: true,
        script: testScript,
        metadata: {
          duration: duration || 60,
          tone: tone || 'casual',
          type: videoType || 'educational',
          generated: true,
          wordCount: testScript.split(' ').length,
          estimatedReadingTime: Math.ceil(testScript.split(' ').length / 150)
        }
      });
    }

    // Génération avec OpenAI
    const scriptPrompt = `Crée un script viral de ${duration} secondes pour ${videoType} en français.

Sujet: ${prompt}
Ton: ${tone}
Format: TikTok/YouTube Shorts

Structure obligatoire:
- Hook captivant (3 premières secondes)
- Corps principal (points clés, max 3)  
- Call-to-action final

Contraintes:
- Phrases courtes et punchy
- Langage simple et direct
- Émotions fortes
- Optimisé pour l'engagement
- Utilise des emojis appropriés

Script:`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: scriptPrompt }],
      max_tokens: 500,
      temperature: 0.8
    });

    const generatedScript = response.choices[0].message.content;
    
    console.log('✅ Script généré avec succès');

    res.json({
      success: true,
      script: generatedScript,
      metadata: {
        duration: duration || 60,
        tone: tone || 'casual',
        type: videoType || 'educational',
        wordCount: generatedScript.split(' ').length,
        generated: true,
        estimatedReadingTime: Math.ceil(generatedScript.split(' ').length / 150)
      }
    });

  } catch (error) {
    console.error('❌ Erreur génération:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erreur lors de la génération',
      details: error.message 
    });
  }
});

// Route de génération de vidéo (placeholder)
router.post('/generate-video', async (req, res) => {
  console.log('🎬 Génération vidéo demandée');
  console.log('Données:', req.body);
  
  try {
    const { script, settings } = req.body;
    
    if (!script) {
      return res.status(400).json({
        success: false,
        error: 'Script requis'
      });
    }

    // Simulation pour l'instant
    const jobId = `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    res.json({
      success: true,
      jobId,
      estimatedTime: 300,
      status: 'pending',
      message: 'Génération vidéo démarrée'
    });
  } catch (error) {
    console.error('❌ Erreur génération vidéo:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur lors de la génération vidéo',
      details: error.message
    });
  }
});

// Route de statut de génération
router.get('/generation-status/:jobId', async (req, res) => {
  const { jobId } = req.params;
  
  console.log('📊 Statut demandé pour:', jobId);
  
  // Simulation de statut
  const statuses = ['pending', 'analyzing', 'generating', 'processing', 'ready'];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  
  res.json({
    success: true,
    jobId,
    status: randomStatus,
    progress: Math.floor(Math.random() * 100),
    estimatedTimeLeft: Math.floor(Math.random() * 300)
  });
});

export default router;