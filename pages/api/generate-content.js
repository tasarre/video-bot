export default async function handler(req, res) {
  console.log('🚀 API generate-content appelée avec:', req.method);
  
  // CORS headers pour éviter les erreurs
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    console.log('❌ Méthode non autorisée:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, videoType, duration, tone } = req.body;
  console.log('📝 Données reçues:', { prompt, videoType, duration, tone });

  if (!prompt) {
    console.log('❌ Prompt manquant');
    return res.status(400).json({ error: 'Prompt requis' });
  }

  // Script de test personnalisé selon les paramètres
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

  try {
    console.log('✅ Génération réussie pour:', prompt);
    
    // Simulation d'un délai réaliste
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    res.status(200).json({
      success: true,
      script: testScript,
      metadata: {
        duration: duration || 30,
        tone: tone || 'Décontracté',
        type: videoType || 'Éducatif',
        wordCount: testScript.split(' ').length,
        estimatedReadingTime: Math.ceil(testScript.split(' ').length / 150) // mots par minute
      }
    });
  } catch (error) {
    console.error('❌ Erreur:', error);
    res.status(500).json({ 
      error: 'Erreur de génération',
      details: error.message 
    });
  }
}