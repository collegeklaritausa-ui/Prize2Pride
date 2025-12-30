#!/usr/bin/env node
/**
 * Prize2Pride - AI-Powered Autonomous Content Generator
 * Uses OpenAI API to generate dynamic, contextual learning content
 * 
 * PROTECTION MODE: This script only BUILDS and AUGMENTS - never destroys
 */

import fs from 'fs';
import path from 'path';

// ============================================================================
// AI CONTENT GENERATION TEMPLATES
// ============================================================================

const QUESTION_GENERATION_PROMPTS = {
  A1: `Generate 5 beginner-level (A1 CEFR) American English grammar questions.
Each question should:
- Test basic grammar (pronouns, articles, present simple, basic prepositions)
- Have 4 multiple choice options
- Include a clear explanation
- Be suitable for absolute beginners

Format as JSON array with: questionText, correctAnswer, options (array), explanationEnglish, category, difficulty: "A1"`,

  A2: `Generate 5 elementary-level (A2 CEFR) American English grammar questions.
Each question should:
- Test past simple, comparatives, modal verbs, future tenses
- Have 4 multiple choice options
- Include a clear explanation
- Build on A1 knowledge

Format as JSON array with: questionText, correctAnswer, options (array), explanationEnglish, category, difficulty: "A2"`,

  B1: `Generate 5 intermediate-level (B1 CEFR) American English grammar questions.
Each question should:
- Test present perfect, conditionals, passive voice, reported speech basics
- Have 4 multiple choice options
- Include a detailed explanation
- Challenge intermediate learners

Format as JSON array with: questionText, correctAnswer, options (array), explanationEnglish, category, difficulty: "B1"`,

  B2: `Generate 5 upper-intermediate-level (B2 CEFR) American English grammar questions.
Each question should:
- Test past perfect, third conditional, advanced passive, complex reported speech
- Have 4 multiple choice options
- Include a comprehensive explanation
- Prepare students for advanced study

Format as JSON array with: questionText, correctAnswer, options (array), explanationEnglish, category, difficulty: "B2"`,

  C1: `Generate 5 advanced-level (C1 CEFR) American English grammar questions.
Each question should:
- Test inversion, subjunctive, cleft sentences, advanced conditionals
- Have 4 multiple choice options
- Include an academic-level explanation
- Challenge advanced learners

Format as JSON array with: questionText, correctAnswer, options (array), explanationEnglish, category, difficulty: "C1"`,

  C2: `Generate 5 proficiency-level (C2 CEFR) American English questions.
Each question should:
- Test native-like expressions, subtle grammar distinctions, stylistic choices
- Have 4 multiple choice options
- Include a nuanced explanation
- Test near-native competence

Format as JSON array with: questionText, correctAnswer, options (array), explanationEnglish, category, difficulty: "C2"`
};

const VOCABULARY_GENERATION_PROMPTS = {
  A1: `Generate 10 beginner-level (A1) American English vocabulary words.
Topics: greetings, numbers, colors, family, daily objects
Each word should include: word, definition, example sentence, IPA pronunciation`,

  A2: `Generate 10 elementary-level (A2) American English vocabulary words.
Topics: travel, shopping, food, hobbies, weather
Each word should include: word, definition, example sentence, IPA pronunciation`,

  B1: `Generate 10 intermediate-level (B1) American English vocabulary words.
Topics: education, technology, health, environment, media
Each word should include: word, definition, example sentence, IPA pronunciation`,

  B2: `Generate 10 upper-intermediate-level (B2) American English vocabulary words.
Topics: business, politics, science, arts, social issues
Each word should include: word, definition, example sentence, IPA pronunciation`,

  C1: `Generate 10 advanced-level (C1) American English vocabulary words.
Topics: academic writing, legal terms, medical terminology, finance
Each word should include: word, definition, example sentence, IPA pronunciation`,

  C2: `Generate 10 proficiency-level (C2) American English vocabulary words.
Topics: sophisticated expressions, rare words, literary terms, idiomatic phrases
Each word should include: word, definition, example sentence, IPA pronunciation`
};

const DIALOGUE_GENERATION_PROMPTS = {
  A1: `Create a simple dialogue (4-6 exchanges) for A1 learners.
Scenario: Meeting someone new at school
Use: basic greetings, introductions, simple questions
Include: speaker labels, natural American English`,

  A2: `Create a dialogue (6-8 exchanges) for A2 learners.
Scenario: Ordering food at a restaurant
Use: polite requests, preferences, past tense
Include: speaker labels, common American expressions`,

  B1: `Create a dialogue (8-10 exchanges) for B1 learners.
Scenario: Job interview
Use: present perfect, conditionals, formal register
Include: speaker labels, professional American English`,

  B2: `Create a dialogue (10-12 exchanges) for B2 learners.
Scenario: Discussing environmental issues
Use: complex sentences, opinions, counter-arguments
Include: speaker labels, academic American English`,

  C1: `Create a dialogue (12-15 exchanges) for C1 learners.
Scenario: Business negotiation
Use: diplomatic language, hedging, advanced structures
Include: speaker labels, sophisticated American English`,

  C2: `Create a dialogue (15+ exchanges) for C2 learners.
Scenario: Academic debate on AI ethics
Use: nuanced arguments, idiomatic expressions, rhetorical devices
Include: speaker labels, native-level American English`
};

// ============================================================================
// TRANSLATION TEMPLATES
// ============================================================================

const TRANSLATION_PROMPT = (text, targetLang) => `
Translate the following English text to ${targetLang}:
"${text}"

Provide only the translation, no explanations.
`;

const SUPPORTED_LANGUAGES = {
  ar: 'Arabic',
  fr: 'French',
  es: 'Spanish',
  de: 'German',
  zh: 'Chinese (Simplified)'
};

// ============================================================================
// SPEECH EVALUATION CRITERIA
// ============================================================================

const SPEECH_EVALUATION_CRITERIA = {
  grammar: {
    A1: ['Subject-verb agreement', 'Basic article usage', 'Simple sentence structure'],
    A2: ['Past tense formation', 'Question formation', 'Basic conjunctions'],
    B1: ['Complex sentences', 'Conditional structures', 'Passive voice'],
    B2: ['Advanced tenses', 'Reported speech', 'Relative clauses'],
    C1: ['Subjunctive mood', 'Inversion', 'Cleft sentences'],
    C2: ['Stylistic variation', 'Subtle distinctions', 'Native-like structures']
  },
  pronunciation: {
    A1: ['Clear vowel sounds', 'Basic consonants', 'Word stress'],
    A2: ['Sentence stress', 'Basic intonation', 'Common sound patterns'],
    B1: ['Connected speech', 'Weak forms', 'Rhythm patterns'],
    B2: ['Advanced intonation', 'Emphasis patterns', 'Natural flow'],
    C1: ['Subtle sound distinctions', 'Regional awareness', 'Prosodic features'],
    C2: ['Native-like rhythm', 'Idiomatic stress', 'Expressive intonation']
  },
  fluency: {
    A1: ['Basic phrases without pauses', 'Simple responses'],
    A2: ['Short sentences smoothly', 'Basic conversation flow'],
    B1: ['Extended speech', 'Appropriate pausing', 'Self-correction'],
    B2: ['Natural pace', 'Minimal hesitation', 'Smooth transitions'],
    C1: ['Effortless expression', 'Spontaneous speech', 'Complex ideas fluently'],
    C2: ['Native-like fluency', 'Nuanced expression', 'Rhetorical skill']
  }
};

// ============================================================================
// AUTONOMOUS AVATAR SCRIPTS
// ============================================================================

const AVATAR_SCRIPTS = {
  greeting: {
    'Professor Maxwell': [
      "Good day, scholar! Ready to master English grammar today?",
      "Welcome back to our linguistic journey. Let's explore the intricacies of English.",
      "Ah, a dedicated learner! Grammar awaits your attention."
    ],
    'Dr. Sophia Chen': [
      "Hello there! Let's work on making your pronunciation shine!",
      "Welcome! Today we'll focus on sounding like a native speaker.",
      "Great to see you! Ready to perfect those American sounds?"
    ],
    'Coach Mike': [
      "Hey champion! Ready to boost that vocabulary?",
      "What's up! Let's learn some awesome new words today!",
      "Yo! Time to expand your word power!"
    ],
    'Ms. Elena Rodriguez': [
      "Good morning. Shall we refine your professional English?",
      "Welcome. Today's lesson focuses on business communication.",
      "Hello. Let's polish your formal English skills."
    ],
    'Aymena': [
      "Hello, dear learner! I'm so happy you're here!",
      "Welcome! Every step you take brings you closer to fluency.",
      "Hi there! Let's learn together at your own pace."
    ]
  },
  encouragement: {
    'Professor Maxwell': [
      "Excellent grammatical precision! Your understanding is deepening.",
      "Splendid work! You're mastering these structures admirably.",
      "Your analytical skills are impressive. Keep it up!"
    ],
    'Dr. Sophia Chen': [
      "Beautiful pronunciation! I can hear the improvement!",
      "Your accent is becoming more natural every day!",
      "Wonderful clarity! Native speakers would understand you perfectly."
    ],
    'Coach Mike': [
      "Awesome job! You're on fire today!",
      "That's what I'm talking about! Keep crushing it!",
      "You're a vocabulary superstar! High five!"
    ],
    'Ms. Elena Rodriguez': [
      "Very professional. That's exactly how it should be expressed.",
      "Excellent business communication. You're ready for the boardroom.",
      "Impeccable formal English. Well done."
    ],
    'Aymena': [
      "I'm so proud of you! You're doing wonderfully!",
      "Every mistake is a step toward success. Keep going!",
      "You're making beautiful progress. I believe in you!"
    ]
  },
  correction: {
    'Professor Maxwell': [
      "Let me explain the correct grammatical structure here...",
      "An interesting attempt, but let's examine the rule more closely.",
      "This is a common error. The correct form is..."
    ],
    'Dr. Sophia Chen': [
      "Almost perfect! Try emphasizing this syllable...",
      "Good try! Let me show you the correct mouth position.",
      "Listen carefully to the difference..."
    ],
    'Coach Mike': [
      "Oops! Close one! The right word is actually...",
      "Good guess! But here's a better choice...",
      "Almost there! Let me show you the correct answer."
    ],
    'Ms. Elena Rodriguez': [
      "In a professional context, we would say...",
      "That's informal. The business-appropriate version is...",
      "Let me suggest a more formal alternative."
    ],
    'Aymena': [
      "That's okay! Making mistakes is how we learn. The answer is...",
      "Don't worry! Let's look at this together.",
      "You're so close! Here's a hint..."
    ]
  }
};

// ============================================================================
// LESSON PLAN GENERATOR
// ============================================================================

const generateLessonPlan = (level, topic) => {
  const plans = {
    A1: {
      duration: '30 minutes',
      structure: [
        { phase: 'Warm-up', duration: '5 min', activity: 'Review previous vocabulary' },
        { phase: 'Presentation', duration: '10 min', activity: 'Introduce new grammar/vocabulary' },
        { phase: 'Practice', duration: '10 min', activity: 'Guided exercises with feedback' },
        { phase: 'Production', duration: '5 min', activity: 'Simple speaking task' }
      ],
      materials: ['Flashcards', 'Audio clips', 'Simple worksheets'],
      objectives: ['Recognize new vocabulary', 'Use basic structures', 'Respond to simple questions']
    },
    A2: {
      duration: '45 minutes',
      structure: [
        { phase: 'Warm-up', duration: '5 min', activity: 'Quick review game' },
        { phase: 'Presentation', duration: '15 min', activity: 'Context-based introduction' },
        { phase: 'Practice', duration: '15 min', activity: 'Pair work exercises' },
        { phase: 'Production', duration: '10 min', activity: 'Role-play activity' }
      ],
      materials: ['Dialogue scripts', 'Picture prompts', 'Gap-fill exercises'],
      objectives: ['Use past tense correctly', 'Make comparisons', 'Handle everyday situations']
    },
    B1: {
      duration: '60 minutes',
      structure: [
        { phase: 'Lead-in', duration: '10 min', activity: 'Discussion and brainstorming' },
        { phase: 'Presentation', duration: '15 min', activity: 'Discovery-based learning' },
        { phase: 'Practice', duration: '20 min', activity: 'Communicative activities' },
        { phase: 'Production', duration: '15 min', activity: 'Extended speaking/writing task' }
      ],
      materials: ['Authentic texts', 'Audio/video clips', 'Discussion cards'],
      objectives: ['Express opinions', 'Use conditionals', 'Handle unexpected situations']
    },
    B2: {
      duration: '75 minutes',
      structure: [
        { phase: 'Engagement', duration: '10 min', activity: 'Thought-provoking question' },
        { phase: 'Study', duration: '20 min', activity: 'Analysis of complex structures' },
        { phase: 'Activation', duration: '30 min', activity: 'Debate or presentation' },
        { phase: 'Feedback', duration: '15 min', activity: 'Peer and teacher feedback' }
      ],
      materials: ['News articles', 'Academic texts', 'Presentation tools'],
      objectives: ['Argue a position', 'Use advanced grammar', 'Produce extended discourse']
    },
    C1: {
      duration: '90 minutes',
      structure: [
        { phase: 'Critical thinking', duration: '15 min', activity: 'Analysis of complex issue' },
        { phase: 'Language focus', duration: '20 min', activity: 'Nuanced language exploration' },
        { phase: 'Application', duration: '40 min', activity: 'Academic/professional task' },
        { phase: 'Reflection', duration: '15 min', activity: 'Self-assessment and goal setting' }
      ],
      materials: ['Research papers', 'Professional documents', 'Case studies'],
      objectives: ['Produce academic writing', 'Handle complex negotiations', 'Analyze subtle meanings']
    },
    C2: {
      duration: '120 minutes',
      structure: [
        { phase: 'Immersion', duration: '20 min', activity: 'Native-level content engagement' },
        { phase: 'Analysis', duration: '30 min', activity: 'Stylistic and cultural analysis' },
        { phase: 'Creation', duration: '50 min', activity: 'Original content production' },
        { phase: 'Critique', duration: '20 min', activity: 'Peer review and refinement' }
      ],
      materials: ['Literary texts', 'Specialized documents', 'Multimedia resources'],
      objectives: ['Achieve native-like expression', 'Master stylistic variation', 'Handle any communicative situation']
    }
  };

  return plans[level] || plans.B1;
};

// ============================================================================
// EXPORT GENERATED CONTENT
// ============================================================================

const aiGeneratedContent = {
  questionPrompts: QUESTION_GENERATION_PROMPTS,
  vocabularyPrompts: VOCABULARY_GENERATION_PROMPTS,
  dialoguePrompts: DIALOGUE_GENERATION_PROMPTS,
  translationPrompt: TRANSLATION_PROMPT,
  supportedLanguages: SUPPORTED_LANGUAGES,
  speechEvaluationCriteria: SPEECH_EVALUATION_CRITERIA,
  avatarScripts: AVATAR_SCRIPTS,
  generateLessonPlan,
  generatedAt: new Date().toISOString(),
  version: '2.0.0'
};

// Write to file
const outputDir = path.join(process.cwd(), 'generated-data');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(
  path.join(outputDir, 'ai-content-templates.json'),
  JSON.stringify(aiGeneratedContent, null, 2)
);

// Generate lesson plans for all levels
const lessonPlans = {};
Object.keys(QUESTION_GENERATION_PROMPTS).forEach(level => {
  lessonPlans[level] = generateLessonPlan(level, 'General');
});

fs.writeFileSync(
  path.join(outputDir, 'lesson-plans.json'),
  JSON.stringify(lessonPlans, null, 2)
);

console.log('✅ AI Content Generator Templates Created!');
console.log(`📁 Output: ${outputDir}/ai-content-templates.json`);
console.log(`📁 Output: ${outputDir}/lesson-plans.json`);
console.log(`🤖 Ready for OpenAI API integration`);

export { 
  QUESTION_GENERATION_PROMPTS, 
  VOCABULARY_GENERATION_PROMPTS,
  DIALOGUE_GENERATION_PROMPTS,
  AVATAR_SCRIPTS,
  SPEECH_EVALUATION_CRITERIA,
  generateLessonPlan
};
