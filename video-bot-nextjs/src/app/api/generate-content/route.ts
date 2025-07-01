import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { GenerateContentRequest, GenerateContentResponse } from '@/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  console.log('🤖 Génération de contenu demandée');
  
  try {
    const body: GenerateContentRequest = await request.json();
    console.log('Données reçues:', body);
    
    const { prompt, videoType, duration, tone } = body;

    if (!prompt) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Prompt requis' 
        },
        { status: 400 }
      );
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

      const testScript = `${hooks[videoType as keyof typeof hooks] || hooks['Éducatif']}

📝 Voici les ${duration <= 30 ? '2' : '3'} points essentiels :

• Point 1: La compréhension change tout
• Point 2: L'action concrète fait la différence${duration > 30 ? '\n• Point 3: La persistance garantit le succès' : ''}

🎯 ${ctas[tone as keyof typeof ctas] || ctas['Décontracté']}`;

      const response: GenerateContentResponse = {
        success: true,
        script: testScript,
        metadata: {
          duration: duration || 60,
          tone: tone || 'Décontracté',
          type: videoType || 'Éducatif',
          wordCount: testScript.split(' ').length,
          estimatedReadingTime: Math.ceil(testScript.split(' ').length / 150)
        }
      };

      return NextResponse.json(response);
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

    const openaiResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: scriptPrompt }],
      max_tokens: 500,
      temperature: 0.8
    });

    const generatedScript = openaiResponse.choices[0].message.content;
    
    if (!generatedScript) {
      throw new Error('Aucun script généré par OpenAI');
    }
    
    console.log('✅ Script généré avec succès');

    const response: GenerateContentResponse = {
      success: true,
      script: generatedScript,
      metadata: {
        duration: duration || 60,
        tone: tone || 'Décontracté',
        type: videoType || 'Éducatif',
        wordCount: generatedScript.split(' ').length,
        estimatedReadingTime: Math.ceil(generatedScript.split(' ').length / 150)
      }
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('❌ Erreur génération:', error);
    
    const errorResponse: GenerateContentResponse = {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur lors de la génération'
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}