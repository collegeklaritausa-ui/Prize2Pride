#!/usr/bin/env node
/**
 * Prize2Pride - Autonomous Avatar & Feedback System
 * Creates comprehensive avatar personalities with dynamic feedback
 * 
 * PROTECTION MODE: This script only BUILDS and AUGMENTS - never destroys
 */

import fs from 'fs';
import path from 'path';

// ============================================================================
// EXPANDED AVATAR DEFINITIONS
// ============================================================================

const avatars = [
  {
    id: 1,
    name: 'Professor Maxwell',
    description: 'A distinguished grammar expert with decades of teaching experience at prestigious universities.',
    personality: 'scholarly',
    specialty: 'Grammar & Syntax',
    imageUrl: '/avatars/professor_maxwell.webp',
    voiceType: 'mature_male',
    backgroundColor: '#1e3a5f',
    accentColor: '#c9a227',
    traits: ['analytical', 'patient', 'thorough', 'encouraging'],
    teachingStyle: 'Socratic method with detailed explanations',
    favoriteTopics: ['Complex grammar structures', 'Etymology', 'Academic writing'],
    catchphrases: [
      'Excellent grammatical precision!',
      'Let\'s analyze this structure together.',
      'Grammar is the backbone of clear communication.',
      'Your understanding is deepening wonderfully!',
      'A scholar in the making!'
    ],
    motivationalQuotes: [
      'Every grammar rule mastered is a step toward eloquence.',
      'Precision in language leads to precision in thought.',
      'The beauty of English lies in its intricate structures.'
    ]
  },
  {
    id: 2,
    name: 'Dr. Sophia Chen',
    description: 'A pronunciation specialist focusing on American English phonetics with a warm, encouraging approach.',
    personality: 'encouraging',
    specialty: 'Pronunciation & Phonetics',
    imageUrl: '/avatars/hostess_prize2pride_silver.webp',
    voiceType: 'professional_female',
    backgroundColor: '#2d4a3e',
    accentColor: '#silver',
    traits: ['warm', 'patient', 'detail-oriented', 'supportive'],
    teachingStyle: 'Demonstration and repetition with positive reinforcement',
    favoriteTopics: ['American accent', 'Intonation patterns', 'Connected speech'],
    catchphrases: [
      'Perfect pronunciation!',
      'Listen to the rhythm of American English.',
      'Your accent is improving beautifully!',
      'I can hear the confidence in your voice!',
      'That\'s exactly how native speakers say it!'
    ],
    motivationalQuotes: [
      'Your voice is your instrument - let\'s tune it together.',
      'Every sound you master brings you closer to fluency.',
      'Confidence in speaking comes from practice and patience.'
    ]
  },
  {
    id: 3,
    name: 'Coach Mike',
    description: 'An energetic vocabulary coach who makes learning fun with games and challenges.',
    personality: 'playful',
    specialty: 'Vocabulary & Idioms',
    imageUrl: '/avatars/puchasy_avatar.webp',
    voiceType: 'energetic_male',
    backgroundColor: '#ff6b35',
    accentColor: '#ffd700',
    traits: ['energetic', 'fun', 'competitive', 'motivating'],
    teachingStyle: 'Gamification with rewards and challenges',
    favoriteTopics: ['Idioms', 'Slang', 'Word games', 'Vocabulary building'],
    catchphrases: [
      'Awesome job! You\'re on fire today!',
      'That\'s what I\'m talking about!',
      'You\'re a vocabulary superstar!',
      'High five! You nailed it!',
      'Keep crushing it, champion!'
    ],
    motivationalQuotes: [
      'Every new word is a new superpower!',
      'Words are your tools - collect them all!',
      'The more words you know, the more worlds you can explore!'
    ]
  },
  {
    id: 4,
    name: 'Ms. Elena Rodriguez',
    description: 'A cultural expert teaching business and formal English with elegance and professionalism.',
    personality: 'professional',
    specialty: 'Business & Cultural English',
    imageUrl: '/avatars/hostess_prize2pride_gold.png',
    voiceType: 'elegant_female',
    backgroundColor: '#4a3728',
    accentColor: '#d4af37',
    traits: ['elegant', 'professional', 'cultured', 'precise'],
    teachingStyle: 'Real-world scenarios with professional standards',
    favoriteTopics: ['Business communication', 'Cultural etiquette', 'Formal writing'],
    catchphrases: [
      'Very professional communication!',
      'That\'s exactly how it should be expressed.',
      'Your business English is impeccable!',
      'Ready for the boardroom!',
      'Elegantly stated!'
    ],
    motivationalQuotes: [
      'Professional communication opens doors to success.',
      'In business, how you say it matters as much as what you say.',
      'Cultural awareness is the key to global communication.'
    ]
  },
  {
    id: 5,
    name: 'Aymena',
    description: 'A warm and patient teacher specializing in beginner levels with a nurturing approach.',
    personality: 'nurturing',
    specialty: 'Beginner English & Foundations',
    imageUrl: '/avatars/aymena_avatar.webp',
    voiceType: 'warm_female',
    backgroundColor: '#e8d5b7',
    accentColor: '#8b4513',
    traits: ['warm', 'patient', 'encouraging', 'gentle'],
    teachingStyle: 'Step-by-step guidance with lots of encouragement',
    favoriteTopics: ['Basic grammar', 'Everyday vocabulary', 'Simple conversations'],
    catchphrases: [
      'You\'re doing wonderfully!',
      'Every step forward is progress.',
      'I believe in you!',
      'That\'s beautiful progress!',
      'You should be so proud of yourself!'
    ],
    motivationalQuotes: [
      'Every journey begins with a single step.',
      'Making mistakes is how we learn and grow.',
      'Your effort today is tomorrow\'s success.'
    ]
  },
  {
    id: 6,
    name: 'Dr. James Wright',
    description: 'An academic writing specialist for advanced learners pursuing higher education.',
    personality: 'intellectual',
    specialty: 'Academic & Advanced Writing',
    imageUrl: '/avatars/dr_james_wright.webp',
    voiceType: 'authoritative_male',
    backgroundColor: '#2c3e50',
    accentColor: '#3498db',
    traits: ['intellectual', 'rigorous', 'supportive', 'knowledgeable'],
    teachingStyle: 'Academic rigor with constructive feedback',
    favoriteTopics: ['Research writing', 'Critical analysis', 'Academic vocabulary'],
    catchphrases: [
      'Scholarly excellence!',
      'Your argumentation is compelling.',
      'That\'s publication-worthy writing!',
      'Excellent critical thinking!',
      'Your academic voice is developing beautifully!'
    ],
    motivationalQuotes: [
      'Academic writing is the art of clear thinking on paper.',
      'Every great scholar started as a curious student.',
      'Rigorous thinking leads to rigorous writing.'
    ]
  },
  {
    id: 7,
    name: 'Luna Star',
    description: 'A fun and creative teacher for young learners with magical, engaging lessons.',
    personality: 'playful',
    specialty: 'Children\'s English',
    imageUrl: '/avatars/luna_star.webp',
    voiceType: 'cheerful_female',
    backgroundColor: '#9b59b6',
    accentColor: '#f1c40f',
    traits: ['fun', 'creative', 'imaginative', 'energetic'],
    teachingStyle: 'Play-based learning with songs and stories',
    favoriteTopics: ['Songs', 'Stories', 'Games', 'Colors and animals'],
    catchphrases: [
      'Super duper awesome!',
      'You\'re a star learner!',
      'Let\'s have fun with English!',
      'Magical work!',
      'You\'re sparkling today!'
    ],
    motivationalQuotes: [
      'Learning is an adventure - let\'s explore together!',
      'Every word you learn is a new friend!',
      'You\'re making magic happen!'
    ]
  },
  {
    id: 8,
    name: 'Mr. Thompson',
    description: 'A test preparation expert for TOEFL, IELTS, and other standardized tests.',
    personality: 'strategic',
    specialty: 'Test Preparation',
    imageUrl: '/avatars/mr_thompson.webp',
    voiceType: 'confident_male',
    backgroundColor: '#34495e',
    accentColor: '#e74c3c',
    traits: ['strategic', 'focused', 'results-oriented', 'analytical'],
    teachingStyle: 'Test strategies with timed practice',
    favoriteTopics: ['Test strategies', 'Time management', 'Score improvement'],
    catchphrases: [
      'Strategic thinking!',
      'That\'s a high-scoring response.',
      'You\'re test-ready!',
      'Perfect timing!',
      'That\'s exactly what examiners want to see!'
    ],
    motivationalQuotes: [
      'Success on tests comes from strategy and practice.',
      'Know the test, beat the test.',
      'Every practice question brings you closer to your goal score.'
    ]
  },
  {
    id: 9,
    name: 'Captain Adventure',
    description: 'An explorer who teaches English through travel and adventure stories.',
    personality: 'adventurous',
    specialty: 'Travel & Conversational English',
    imageUrl: '/avatars/captain_adventure.webp',
    voiceType: 'enthusiastic_male',
    backgroundColor: '#16a085',
    accentColor: '#f39c12',
    traits: ['adventurous', 'storytelling', 'engaging', 'worldly'],
    teachingStyle: 'Story-based learning with real-world scenarios',
    favoriteTopics: ['Travel vocabulary', 'Cultural experiences', 'Survival English'],
    catchphrases: [
      'Adventure awaits!',
      'You\'re ready for the world!',
      'That\'s explorer-level English!',
      'Pack your bags - you\'re fluent enough to travel!',
      'The world is your classroom!'
    ],
    motivationalQuotes: [
      'Every language learned is a new world to explore.',
      'The best way to learn is through adventure.',
      'Your English is your passport to the world.'
    ]
  },
  {
    id: 10,
    name: 'Dr. Tech',
    description: 'A technology expert teaching English for the digital age and tech industry.',
    personality: 'innovative',
    specialty: 'Technology & Digital English',
    imageUrl: '/avatars/dr_tech.webp',
    voiceType: 'modern_male',
    backgroundColor: '#1abc9c',
    accentColor: '#3498db',
    traits: ['innovative', 'modern', 'tech-savvy', 'forward-thinking'],
    teachingStyle: 'Tech-integrated learning with digital tools',
    favoriteTopics: ['Tech vocabulary', 'Digital communication', 'AI and future'],
    catchphrases: [
      'You\'re coding your way to fluency!',
      'That\'s next-level English!',
      'Ready for the tech world!',
      'Your digital English is on point!',
      'Innovation in action!'
    ],
    motivationalQuotes: [
      'Technology and language are the tools of the future.',
      'In the digital age, English is your operating system.',
      'Every tech term mastered is a skill for tomorrow.'
    ]
  }
];

// ============================================================================
// COMPREHENSIVE FEEDBACK MESSAGES
// ============================================================================

const feedbackMessages = {
  correct: {
    A1: [
      { en: 'Great job! You got it right!', ar: 'عمل رائع! لقد أصبت!', fr: 'Bon travail! Tu as réussi!', es: '¡Buen trabajo! ¡Lo lograste!', de: 'Toll gemacht! Du hast es richtig!', zh: '做得好！你答对了！' },
      { en: 'Excellent! Keep going!', ar: 'ممتاز! استمر!', fr: 'Excellent! Continue!', es: '¡Excelente! ¡Sigue así!', de: 'Ausgezeichnet! Weiter so!', zh: '太棒了！继续加油！' },
      { en: 'Perfect! You\'re learning fast!', ar: 'مثالي! أنت تتعلم بسرعة!', fr: 'Parfait! Tu apprends vite!', es: '¡Perfecto! ¡Estás aprendiendo rápido!', de: 'Perfekt! Du lernst schnell!', zh: '完美！你学得很快！' },
      { en: 'Wonderful! That\'s correct!', ar: 'رائع! هذا صحيح!', fr: 'Merveilleux! C\'est correct!', es: '¡Maravilloso! ¡Es correcto!', de: 'Wunderbar! Das ist richtig!', zh: '太好了！答对了！' },
      { en: 'You\'re doing amazing!', ar: 'أنت تقوم بعمل مذهل!', fr: 'Tu fais un travail incroyable!', es: '¡Lo estás haciendo increíble!', de: 'Du machst das großartig!', zh: '你做得太棒了！' }
    ],
    A2: [
      { en: 'Fantastic work! Your English is improving!', ar: 'عمل رائع! لغتك الإنجليزية تتحسن!', fr: 'Travail fantastique! Ton anglais s\'améliore!', es: '¡Trabajo fantástico! ¡Tu inglés está mejorando!', de: 'Fantastische Arbeit! Dein Englisch verbessert sich!', zh: '太棒了！你的英语在进步！' },
      { en: 'You nailed it! Great understanding!', ar: 'لقد أتقنتها! فهم رائع!', fr: 'Tu l\'as réussi! Excellente compréhension!', es: '¡Lo clavaste! ¡Gran comprensión!', de: 'Du hast es geschafft! Tolles Verständnis!', zh: '你做到了！理解得很好！' },
      { en: 'Impressive! You\'re making great progress!', ar: 'مثير للإعجاب! أنت تحرز تقدماً كبيراً!', fr: 'Impressionnant! Tu fais de grands progrès!', es: '¡Impresionante! ¡Estás haciendo un gran progreso!', de: 'Beeindruckend! Du machst große Fortschritte!', zh: '令人印象深刻！你进步很大！' },
      { en: 'Brilliant! That\'s exactly right!', ar: 'رائع! هذا صحيح تماماً!', fr: 'Brillant! C\'est exactement ça!', es: '¡Brillante! ¡Eso es exactamente correcto!', de: 'Brillant! Das ist genau richtig!', zh: '太聪明了！完全正确！' },
      { en: 'Outstanding performance!', ar: 'أداء متميز!', fr: 'Performance exceptionnelle!', es: '¡Rendimiento sobresaliente!', de: 'Hervorragende Leistung!', zh: '表现出色！' }
    ],
    B1: [
      { en: 'Excellent grasp of the concept!', ar: 'فهم ممتاز للمفهوم!', fr: 'Excellente maîtrise du concept!', es: '¡Excelente comprensión del concepto!', de: 'Ausgezeichnetes Verständnis des Konzepts!', zh: '对概念的理解非常好！' },
      { en: 'Your intermediate skills are showing!', ar: 'مهاراتك المتوسطة تظهر!', fr: 'Tes compétences intermédiaires se montrent!', es: '¡Tus habilidades intermedias se notan!', de: 'Deine Mittelstufen-Fähigkeiten zeigen sich!', zh: '你的中级水平展现出来了！' },
      { en: 'Great application of grammar rules!', ar: 'تطبيق رائع لقواعد النحو!', fr: 'Excellente application des règles de grammaire!', es: '¡Gran aplicación de las reglas gramaticales!', de: 'Tolle Anwendung der Grammatikregeln!', zh: '语法规则运用得很好！' },
      { en: 'You\'re thinking like a native speaker!', ar: 'أنت تفكر مثل متحدث أصلي!', fr: 'Tu penses comme un locuteur natif!', es: '¡Estás pensando como un hablante nativo!', de: 'Du denkst wie ein Muttersprachler!', zh: '你的思维方式像母语者了！' },
      { en: 'Sophisticated answer! Well done!', ar: 'إجابة متطورة! أحسنت!', fr: 'Réponse sophistiquée! Bien joué!', es: '¡Respuesta sofisticada! ¡Bien hecho!', de: 'Anspruchsvolle Antwort! Gut gemacht!', zh: '回答很有深度！做得好！' }
    ],
    B2: [
      { en: 'Upper-intermediate excellence!', ar: 'تميز في المستوى فوق المتوسط!', fr: 'Excellence de niveau intermédiaire supérieur!', es: '¡Excelencia de nivel intermedio alto!', de: 'Obere Mittelstufen-Exzellenz!', zh: '中高级水平的优秀表现！' },
      { en: 'Complex structure mastered!', ar: 'تم إتقان البنية المعقدة!', fr: 'Structure complexe maîtrisée!', es: '¡Estructura compleja dominada!', de: 'Komplexe Struktur gemeistert!', zh: '复杂结构掌握得很好！' },
      { en: 'Your nuanced understanding is impressive!', ar: 'فهمك الدقيق مثير للإعجاب!', fr: 'Ta compréhension nuancée est impressionnante!', es: '¡Tu comprensión matizada es impresionante!', de: 'Dein nuanciertes Verständnis ist beeindruckend!', zh: '你细腻的理解令人印象深刻！' },
      { en: 'Ready for advanced challenges!', ar: 'جاهز للتحديات المتقدمة!', fr: 'Prêt pour les défis avancés!', es: '¡Listo para desafíos avanzados!', de: 'Bereit für fortgeschrittene Herausforderungen!', zh: '准备好迎接高级挑战了！' },
      { en: 'Academic-level thinking!', ar: 'تفكير على المستوى الأكاديمي!', fr: 'Réflexion de niveau académique!', es: '¡Pensamiento de nivel académico!', de: 'Akademisches Denkniveau!', zh: '学术级别的思维！' }
    ],
    C1: [
      { en: 'Advanced mastery demonstrated!', ar: 'تم إظهار إتقان متقدم!', fr: 'Maîtrise avancée démontrée!', es: '¡Dominio avanzado demostrado!', de: 'Fortgeschrittene Beherrschung demonstriert!', zh: '展示了高级水平的掌握！' },
      { en: 'Near-native precision!', ar: 'دقة قريبة من المتحدث الأصلي!', fr: 'Précision quasi native!', es: '¡Precisión casi nativa!', de: 'Fast muttersprachliche Präzision!', zh: '接近母语者的精确度！' },
      { en: 'Sophisticated language use!', ar: 'استخدام لغوي متطور!', fr: 'Utilisation sophistiquée de la langue!', es: '¡Uso sofisticado del idioma!', de: 'Anspruchsvoller Sprachgebrauch!', zh: '语言运用很精妙！' },
      { en: 'Your fluency is remarkable!', ar: 'طلاقتك رائعة!', fr: 'Ta fluidité est remarquable!', es: '¡Tu fluidez es notable!', de: 'Deine Sprachgewandtheit ist bemerkenswert!', zh: '你的流利程度令人瞩目！' },
      { en: 'Professional-level English!', ar: 'إنجليزية على المستوى المهني!', fr: 'Anglais de niveau professionnel!', es: '¡Inglés de nivel profesional!', de: 'Englisch auf professionellem Niveau!', zh: '专业级别的英语！' }
    ],
    C2: [
      { en: 'Native-like excellence!', ar: 'تميز مثل المتحدث الأصلي!', fr: 'Excellence de niveau natif!', es: '¡Excelencia de nivel nativo!', de: 'Muttersprachliche Exzellenz!', zh: '母语级别的优秀！' },
      { en: 'Masterful command of English!', ar: 'إتقان بارع للغة الإنجليزية!', fr: 'Maîtrise magistrale de l\'anglais!', es: '¡Dominio magistral del inglés!', de: 'Meisterhafte Beherrschung des Englischen!', zh: '对英语的精湛掌握！' },
      { en: 'Exceptional linguistic awareness!', ar: 'وعي لغوي استثنائي!', fr: 'Conscience linguistique exceptionnelle!', es: '¡Conciencia lingüística excepcional!', de: 'Außergewöhnliches sprachliches Bewusstsein!', zh: '卓越的语言意识！' },
      { en: 'You\'ve achieved true fluency!', ar: 'لقد حققت الطلاقة الحقيقية!', fr: 'Tu as atteint une vraie fluidité!', es: '¡Has logrado una verdadera fluidez!', de: 'Du hast wahre Sprachgewandtheit erreicht!', zh: '你已经达到了真正的流利！' },
      { en: 'Scholarly precision!', ar: 'دقة علمية!', fr: 'Précision académique!', es: '¡Precisión académica!', de: 'Wissenschaftliche Präzision!', zh: '学术级的精确！' }
    ]
  },
  incorrect: {
    A1: [
      { en: 'Not quite, but don\'t give up! Try again.', ar: 'ليس تماماً، لكن لا تستسلم! حاول مرة أخرى.', fr: 'Pas tout à fait, mais n\'abandonne pas! Réessaie.', es: 'No del todo, ¡pero no te rindas! Inténtalo de nuevo.', de: 'Nicht ganz, aber gib nicht auf! Versuch es nochmal.', zh: '不太对，但别放弃！再试一次。' },
      { en: 'Almost there! Let\'s review this together.', ar: 'تقريباً! دعنا نراجع هذا معاً.', fr: 'Presque! Révisons ça ensemble.', es: '¡Casi! Revisemos esto juntos.', de: 'Fast! Lass uns das zusammen durchgehen.', zh: '差一点！让我们一起复习。' },
      { en: 'Good try! The correct answer is different.', ar: 'محاولة جيدة! الإجابة الصحيحة مختلفة.', fr: 'Bon essai! La bonne réponse est différente.', es: '¡Buen intento! La respuesta correcta es diferente.', de: 'Guter Versuch! Die richtige Antwort ist anders.', zh: '不错的尝试！正确答案不同。' },
      { en: 'That\'s not it, but you\'re learning!', ar: 'ليست هذه، لكنك تتعلم!', fr: 'Ce n\'est pas ça, mais tu apprends!', es: '¡Eso no es, pero estás aprendiendo!', de: 'Das ist es nicht, aber du lernst!', zh: '不是这个，但你在学习！' },
      { en: 'Oops! Let me explain the correct answer.', ar: 'عفواً! دعني أشرح الإجابة الصحيحة.', fr: 'Oups! Laisse-moi expliquer la bonne réponse.', es: '¡Ups! Déjame explicar la respuesta correcta.', de: 'Hoppla! Lass mich die richtige Antwort erklären.', zh: '哎呀！让我解释正确答案。' }
    ],
    A2: [
      { en: 'Close! Review the rule and try again.', ar: 'قريب! راجع القاعدة وحاول مرة أخرى.', fr: 'Proche! Révise la règle et réessaie.', es: '¡Cerca! Revisa la regla e inténtalo de nuevo.', de: 'Nah dran! Überprüfe die Regel und versuche es nochmal.', zh: '接近了！复习规则再试一次。' },
      { en: 'Not this time, but you\'re improving!', ar: 'ليس هذه المرة، لكنك تتحسن!', fr: 'Pas cette fois, mais tu t\'améliores!', es: '¡No esta vez, pero estás mejorando!', de: 'Diesmal nicht, aber du verbesserst dich!', zh: '这次不对，但你在进步！' },
      { en: 'Think about the grammar rule here.', ar: 'فكر في قاعدة النحو هنا.', fr: 'Pense à la règle de grammaire ici.', es: 'Piensa en la regla gramatical aquí.', de: 'Denk an die Grammatikregel hier.', zh: '想想这里的语法规则。' },
      { en: 'Let\'s look at this more carefully.', ar: 'دعنا ننظر إلى هذا بعناية أكبر.', fr: 'Regardons cela plus attentivement.', es: 'Miremos esto con más cuidado.', de: 'Lass uns das genauer ansehen.', zh: '让我们更仔细地看看这个。' },
      { en: 'Remember the pattern we learned?', ar: 'هل تتذكر النمط الذي تعلمناه؟', fr: 'Tu te souviens du modèle qu\'on a appris?', es: '¿Recuerdas el patrón que aprendimos?', de: 'Erinnerst du dich an das Muster, das wir gelernt haben?', zh: '还记得我们学过的模式吗？' }
    ],
    B1: [
      { en: 'This is tricky! Let\'s analyze it together.', ar: 'هذا صعب! دعنا نحلله معاً.', fr: 'C\'est délicat! Analysons-le ensemble.', es: '¡Esto es complicado! Analicémoslo juntos.', de: 'Das ist knifflig! Lass es uns zusammen analysieren.', zh: '这个有点难！让我们一起分析。' },
      { en: 'Good thinking, but not quite right.', ar: 'تفكير جيد، لكن ليس صحيحاً تماماً.', fr: 'Bonne réflexion, mais pas tout à fait correct.', es: 'Buen pensamiento, pero no del todo correcto.', de: 'Guter Gedanke, aber nicht ganz richtig.', zh: '想法不错，但不太对。' },
      { en: 'Consider the context more carefully.', ar: 'فكر في السياق بعناية أكبر.', fr: 'Considère le contexte plus attentivement.', es: 'Considera el contexto con más cuidado.', de: 'Betrachte den Kontext sorgfältiger.', zh: '更仔细地考虑一下语境。' },
      { en: 'The structure requires something different.', ar: 'البنية تتطلب شيئاً مختلفاً.', fr: 'La structure nécessite quelque chose de différent.', es: 'La estructura requiere algo diferente.', de: 'Die Struktur erfordert etwas anderes.', zh: '这个结构需要不同的答案。' },
      { en: 'Review the grammar point and try again.', ar: 'راجع النقطة النحوية وحاول مرة أخرى.', fr: 'Révise le point de grammaire et réessaie.', es: 'Revisa el punto gramatical e inténtalo de nuevo.', de: 'Überprüfe den Grammatikpunkt und versuche es nochmal.', zh: '复习语法点再试一次。' }
    ],
    B2: [
      { en: 'This advanced structure is challenging!', ar: 'هذه البنية المتقدمة صعبة!', fr: 'Cette structure avancée est difficile!', es: '¡Esta estructura avanzada es desafiante!', de: 'Diese fortgeschrittene Struktur ist herausfordernd!', zh: '这个高级结构很有挑战性！' },
      { en: 'Think about the subtle differences.', ar: 'فكر في الاختلافات الدقيقة.', fr: 'Pense aux différences subtiles.', es: 'Piensa en las diferencias sutiles.', de: 'Denk an die feinen Unterschiede.', zh: '想想细微的差别。' },
      { en: 'The nuance here is important.', ar: 'الفارق الدقيق هنا مهم.', fr: 'La nuance ici est importante.', es: 'El matiz aquí es importante.', de: 'Die Nuance hier ist wichtig.', zh: '这里的细微差别很重要。' },
      { en: 'Consider the formal register.', ar: 'فكر في السجل الرسمي.', fr: 'Considère le registre formel.', es: 'Considera el registro formal.', de: 'Berücksichtige das formelle Register.', zh: '考虑一下正式语体。' },
      { en: 'This requires deeper analysis.', ar: 'هذا يتطلب تحليلاً أعمق.', fr: 'Cela nécessite une analyse plus approfondie.', es: 'Esto requiere un análisis más profundo.', de: 'Das erfordert eine tiefere Analyse.', zh: '这需要更深入的分析。' }
    ],
    C1: [
      { en: 'Even advanced learners find this tricky!', ar: 'حتى المتعلمين المتقدمين يجدون هذا صعباً!', fr: 'Même les apprenants avancés trouvent cela délicat!', es: '¡Incluso los estudiantes avanzados encuentran esto difícil!', de: 'Selbst fortgeschrittene Lerner finden das knifflig!', zh: '即使是高级学习者也觉得这个很难！' },
      { en: 'The subtlety here is challenging.', ar: 'الدقة هنا صعبة.', fr: 'La subtilité ici est difficile.', es: 'La sutileza aquí es desafiante.', de: 'Die Feinheit hier ist herausfordernd.', zh: '这里的微妙之处很有挑战性。' },
      { en: 'Consider the stylistic implications.', ar: 'فكر في الآثار الأسلوبية.', fr: 'Considère les implications stylistiques.', es: 'Considera las implicaciones estilísticas.', de: 'Berücksichtige die stilistischen Implikationen.', zh: '考虑一下文体含义。' },
      { en: 'This requires native-level intuition.', ar: 'هذا يتطلب حدساً على مستوى المتحدث الأصلي.', fr: 'Cela nécessite une intuition de niveau natif.', es: 'Esto requiere intuición de nivel nativo.', de: 'Das erfordert muttersprachliche Intuition.', zh: '这需要母语级别的语感。' },
      { en: 'The academic register is specific here.', ar: 'السجل الأكاديمي محدد هنا.', fr: 'Le registre académique est spécifique ici.', es: 'El registro académico es específico aquí.', de: 'Das akademische Register ist hier spezifisch.', zh: '这里的学术语体很特殊。' }
    ],
    C2: [
      { en: 'This tests the finest distinctions!', ar: 'هذا يختبر أدق الفروق!', fr: 'Cela teste les distinctions les plus fines!', es: '¡Esto prueba las distinciones más finas!', de: 'Das testet die feinsten Unterscheidungen!', zh: '这考验最细微的区别！' },
      { en: 'Native speakers debate this too!', ar: 'المتحدثون الأصليون يناقشون هذا أيضاً!', fr: 'Les locuteurs natifs débattent aussi de cela!', es: '¡Los hablantes nativos también debaten esto!', de: 'Muttersprachler diskutieren das auch!', zh: '母语者也会讨论这个！' },
      { en: 'The idiomatic usage is very specific.', ar: 'الاستخدام الاصطلاحي محدد جداً.', fr: 'L\'usage idiomatique est très spécifique.', es: 'El uso idiomático es muy específico.', de: 'Der idiomatische Gebrauch ist sehr spezifisch.', zh: '习语用法非常特殊。' },
      { en: 'Consider the cultural connotations.', ar: 'فكر في الدلالات الثقافية.', fr: 'Considère les connotations culturelles.', es: 'Considera las connotaciones culturales.', de: 'Berücksichtige die kulturellen Konnotationen.', zh: '考虑一下文化内涵。' },
      { en: 'This is expert-level English!', ar: 'هذه إنجليزية على مستوى الخبراء!', fr: 'C\'est de l\'anglais de niveau expert!', es: '¡Este es inglés de nivel experto!', de: 'Das ist Englisch auf Expertenniveau!', zh: '这是专家级别的英语！' }
    ]
  }
};

// ============================================================================
// GENERATE OUTPUT
// ============================================================================

const outputDir = path.join(process.cwd(), 'generated-data');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write avatars
fs.writeFileSync(
  path.join(outputDir, 'enhanced-avatars.json'),
  JSON.stringify(avatars, null, 2)
);

// Write feedback messages
fs.writeFileSync(
  path.join(outputDir, 'enhanced-feedback.json'),
  JSON.stringify(feedbackMessages, null, 2)
);

// Generate flat feedback array for database
const flatFeedback = [];
Object.entries(feedbackMessages).forEach(([type, levels]) => {
  Object.entries(levels).forEach(([level, messages]) => {
    messages.forEach((msg, index) => {
      flatFeedback.push({
        feedbackType: type,
        level: level,
        avatarId: (index % avatars.length) + 1,
        messageEnglish: msg.en,
        messageArabic: msg.ar,
        messageFrench: msg.fr,
        messageSpanish: msg.es,
        messageGerman: msg.de,
        messageChinese: msg.zh
      });
    });
  });
});

fs.writeFileSync(
  path.join(outputDir, 'flat-feedback.json'),
  JSON.stringify(flatFeedback, null, 2)
);

console.log('✅ Avatar & Feedback System Generated!');
console.log(`👤 Avatars: ${avatars.length}`);
console.log(`💬 Feedback Types: ${Object.keys(feedbackMessages).length}`);
console.log(`📊 Feedback Levels: ${Object.keys(feedbackMessages.correct).length}`);
console.log(`📝 Total Feedback Messages: ${flatFeedback.length}`);
console.log(`📁 Output files:`);
console.log(`   - ${outputDir}/enhanced-avatars.json`);
console.log(`   - ${outputDir}/enhanced-feedback.json`);
console.log(`   - ${outputDir}/flat-feedback.json`);
