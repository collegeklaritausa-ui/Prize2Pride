/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║           SPEECH ANALYSIS UTILITIES - Prize2Pride Platform               ║
 * ║                                                                           ║
 * ║  Advanced analysis tools for American English speech evaluation          ║
 * ║  Grammar, vocabulary, pronunciation, and fluency assessment              ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

// ============ TYPES ============

export interface SpeechAnalysisResult {
  grammar: GrammarAnalysis;
  vocabulary: VocabularyAnalysis;
  pronunciation: PronunciationAnalysis;
  fluency: FluencyAnalysis;
  overallScore: number;
  feedback: string;
  suggestions: string[];
}

export interface GrammarAnalysis {
  score: number;
  errors: GrammarError[];
  correctStructures: string[];
  feedback: string;
}

export interface GrammarError {
  type: string;
  original: string;
  correction: string;
  rule: string;
  explanation: string;
  severity: 'minor' | 'moderate' | 'major';
}

export interface VocabularyAnalysis {
  score: number;
  level: string;
  uniqueWords: number;
  advancedWords: string[];
  suggestions: string[];
  feedback: string;
}

export interface PronunciationAnalysis {
  score: number;
  clarity: number;
  accent: string;
  issues: PronunciationIssue[];
  feedback: string;
}

export interface PronunciationIssue {
  word: string;
  expected: string;
  heard: string;
  tip: string;
}

export interface FluencyAnalysis {
  score: number;
  wordsPerMinute: number;
  pauseCount: number;
  fillerWords: string[];
  feedback: string;
}

// ============ GRAMMAR RULES DATABASE ============

export const AMERICAN_ENGLISH_GRAMMAR_RULES = {
  // Subject-Verb Agreement
  subjectVerbAgreement: {
    patterns: [
      { regex: /\b(he|she|it)\s+(have)\b/gi, correction: 'has', rule: 'Third person singular uses "has"' },
      { regex: /\b(he|she|it)\s+(do)\b/gi, correction: 'does', rule: 'Third person singular uses "does"' },
      { regex: /\b(he|she|it)\s+(go)\b/gi, correction: 'goes', rule: 'Third person singular uses "goes"' },
      { regex: /\b(I|you|we|they)\s+(has)\b/gi, correction: 'have', rule: 'Plural subjects use "have"' },
      { regex: /\b(I|you|we|they)\s+(does)\b/gi, correction: 'do', rule: 'Plural subjects use "do"' },
    ],
    explanation: 'Subject-verb agreement ensures the verb matches the subject in number.'
  },

  // Article Usage
  articleUsage: {
    patterns: [
      { regex: /\ba\s+([aeiou])/gi, correction: 'an $1', rule: 'Use "an" before vowel sounds' },
      { regex: /\ban\s+([^aeiou\s])/gi, correction: 'a $1', rule: 'Use "a" before consonant sounds' },
    ],
    explanation: 'Articles "a" and "an" depend on the sound that follows.'
  },

  // Tense Consistency
  tenseConsistency: {
    patterns: [
      { regex: /\byesterday\s+\w+\s+(is|are|am)\b/gi, correction: 'was/were', rule: 'Use past tense with "yesterday"' },
      { regex: /\btomorrow\s+\w+\s+(was|were)\b/gi, correction: 'will be', rule: 'Use future tense with "tomorrow"' },
    ],
    explanation: 'Maintain consistent verb tenses within a sentence or paragraph.'
  },

  // Double Negatives
  doubleNegatives: {
    patterns: [
      { regex: /\b(don't|doesn't|didn't|won't|can't)\s+\w+\s+(no|nothing|nobody|never)\b/gi, correction: 'any/anything/anybody/ever', rule: 'Avoid double negatives in standard American English' },
    ],
    explanation: 'Standard American English uses single negatives.'
  },

  // Pronoun Case
  pronounCase: {
    patterns: [
      { regex: /\bme\s+and\s+(\w+)\s+(is|are|was|were|will|can|should)\b/gi, correction: '$1 and I', rule: 'Use "I" as subject, "me" as object' },
      { regex: /\bbetween\s+you\s+and\s+I\b/gi, correction: 'between you and me', rule: '"Me" is correct after prepositions' },
    ],
    explanation: 'Use subject pronouns (I, he, she) as subjects and object pronouns (me, him, her) as objects.'
  },

  // Comparative/Superlative
  comparatives: {
    patterns: [
      { regex: /\bmore\s+(better|worse|bigger|smaller)\b/gi, correction: '$1', rule: 'Don\'t use "more" with comparative adjectives' },
      { regex: /\bmost\s+(best|worst|biggest|smallest)\b/gi, correction: '$1', rule: 'Don\'t use "most" with superlative adjectives' },
    ],
    explanation: 'Comparative and superlative forms don\'t need "more" or "most".'
  }
};

// ============ VOCABULARY LEVELS ============

export const VOCABULARY_BY_LEVEL = {
  A1: {
    words: ['hello', 'goodbye', 'please', 'thank', 'yes', 'no', 'good', 'bad', 'big', 'small', 'happy', 'sad', 'eat', 'drink', 'sleep', 'work', 'play', 'go', 'come', 'see'],
    description: 'Basic everyday words'
  },
  A2: {
    words: ['because', 'however', 'although', 'actually', 'probably', 'usually', 'sometimes', 'always', 'never', 'already', 'still', 'yet', 'enough', 'too', 'quite', 'rather', 'almost', 'nearly', 'hardly', 'barely'],
    description: 'Common connectors and adverbs'
  },
  B1: {
    words: ['nevertheless', 'furthermore', 'consequently', 'subsequently', 'essentially', 'particularly', 'significantly', 'approximately', 'considerably', 'relatively', 'apparently', 'obviously', 'certainly', 'definitely', 'presumably', 'supposedly', 'allegedly', 'reportedly', 'seemingly', 'arguably'],
    description: 'Intermediate academic vocabulary'
  },
  B2: {
    words: ['notwithstanding', 'henceforth', 'whereby', 'thereof', 'heretofore', 'aforementioned', 'unprecedented', 'comprehensive', 'substantial', 'fundamental', 'preliminary', 'subsequent', 'concurrent', 'inherent', 'prevalent', 'pertinent', 'conducive', 'detrimental', 'beneficial', 'pivotal'],
    description: 'Upper-intermediate formal vocabulary'
  },
  C1: {
    words: ['juxtaposition', 'paradigm', 'quintessential', 'ubiquitous', 'ephemeral', 'pragmatic', 'meticulous', 'eloquent', 'profound', 'nuanced', 'ambiguous', 'paradoxical', 'hypothetical', 'empirical', 'theoretical', 'conceptual', 'analytical', 'systematic', 'comprehensive', 'multifaceted'],
    description: 'Advanced academic and professional vocabulary'
  },
  C2: {
    words: ['sesquipedalian', 'perspicacious', 'pulchritudinous', 'defenestration', 'obfuscate', 'ameliorate', 'exacerbate', 'pontificate', 'prevaricate', 'procrastinate', 'circumlocution', 'tergiversation', 'verisimilitude', 'serendipity', 'sycophant', 'magnanimous', 'pusillanimous', 'supercilious', 'obsequious', 'perfunctory'],
    description: 'Mastery-level sophisticated vocabulary'
  }
};

// ============ AMERICAN ENGLISH IDIOMS ============

export const AMERICAN_IDIOMS = [
  { idiom: 'break the ice', meaning: 'to initiate conversation in a social setting', example: 'He told a joke to break the ice.' },
  { idiom: 'hit the ground running', meaning: 'to start something with energy and enthusiasm', example: 'She hit the ground running on her first day.' },
  { idiom: 'think outside the box', meaning: 'to think creatively', example: 'We need to think outside the box to solve this.' },
  { idiom: 'beat around the bush', meaning: 'to avoid the main topic', example: 'Stop beating around the bush and tell me.' },
  { idiom: 'bite the bullet', meaning: 'to face a difficult situation bravely', example: 'I had to bite the bullet and apologize.' },
  { idiom: 'cost an arm and a leg', meaning: 'to be very expensive', example: 'That car cost an arm and a leg.' },
  { idiom: 'get the ball rolling', meaning: 'to start something', example: 'Let\'s get the ball rolling on this project.' },
  { idiom: 'piece of cake', meaning: 'something very easy', example: 'The test was a piece of cake.' },
  { idiom: 'under the weather', meaning: 'feeling sick', example: 'I\'m feeling a bit under the weather today.' },
  { idiom: 'on the same page', meaning: 'in agreement', example: 'Let\'s make sure we\'re on the same page.' }
];

// ============ ANALYSIS FUNCTIONS ============

/**
 * Analyze grammar in the given text
 */
export function analyzeGrammar(text: string): GrammarAnalysis {
  const errors: GrammarError[] = [];
  const correctStructures: string[] = [];
  let correctedText = text;

  // Check each grammar rule
  Object.entries(AMERICAN_ENGLISH_GRAMMAR_RULES).forEach(([ruleType, ruleData]) => {
    ruleData.patterns.forEach(pattern => {
      const matches = text.match(pattern.regex);
      if (matches) {
        matches.forEach(match => {
          errors.push({
            type: ruleType,
            original: match,
            correction: match.replace(pattern.regex, pattern.correction),
            rule: pattern.rule,
            explanation: ruleData.explanation,
            severity: determineSeverity(ruleType)
          });
        });
      }
    });
  });

  // Identify correct structures
  if (text.match(/\b(he|she|it)\s+(has|does|goes|makes)\b/gi)) {
    correctStructures.push('Correct subject-verb agreement with third person singular');
  }
  if (text.match(/\ban\s+[aeiou]/gi)) {
    correctStructures.push('Correct article usage before vowel sounds');
  }
  if (text.match(/\ba\s+[^aeiou\s]/gi)) {
    correctStructures.push('Correct article usage before consonant sounds');
  }

  const score = Math.max(0, 100 - (errors.length * 12));
  
  return {
    score,
    errors,
    correctStructures,
    feedback: generateGrammarFeedback(score, errors)
  };
}

/**
 * Analyze vocabulary usage
 */
export function analyzeVocabulary(text: string): VocabularyAnalysis {
  const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 2);
  const uniqueWords = Array.from(new Set(words));
  const advancedWords: string[] = [];
  let highestLevel = 'A1';

  // Check vocabulary level
  Object.entries(VOCABULARY_BY_LEVEL).forEach(([level, data]) => {
    const found = uniqueWords.filter(w => data.words.includes(w.replace(/[^a-z]/g, '')));
    if (found.length > 0) {
      advancedWords.push(...found);
      highestLevel = level;
    }
  });

  // Calculate score based on vocabulary diversity and level
  const diversityScore = Math.min(100, (uniqueWords.length / words.length) * 150);
  const levelBonus = { A1: 0, A2: 10, B1: 20, B2: 30, C1: 40, C2: 50 }[highestLevel] || 0;
  const score = Math.min(100, diversityScore + levelBonus);

  return {
    score,
    level: highestLevel,
    uniqueWords: uniqueWords.length,
    advancedWords,
    suggestions: generateVocabularySuggestions(highestLevel),
    feedback: generateVocabularyFeedback(score, highestLevel, advancedWords)
  };
}

/**
 * Analyze pronunciation (simulated based on text patterns)
 */
export function analyzePronunciation(text: string, confidence: number = 0.8): PronunciationAnalysis {
  const issues: PronunciationIssue[] = [];
  
  // Common pronunciation challenges for non-native speakers
  const challengingWords = [
    { word: 'comfortable', tip: 'Pronounced KUMF-ter-bul, not com-FOR-ta-ble' },
    { word: 'wednesday', tip: 'Pronounced WENZ-day, the "d" is silent' },
    { word: 'february', tip: 'Pronounced FEB-roo-air-ee' },
    { word: 'often', tip: 'The "t" can be silent: OFF-en or OFF-ten' },
    { word: 'clothes', tip: 'Pronounced like "close" (KLOHZ)' }
  ];

  const lowerText = text.toLowerCase();
  challengingWords.forEach(({ word, tip }) => {
    if (lowerText.includes(word)) {
      issues.push({
        word,
        expected: word,
        heard: word,
        tip
      });
    }
  });

  const clarityScore = confidence * 100;
  const score = Math.round(clarityScore - (issues.length * 5));

  return {
    score: Math.max(50, score),
    clarity: clarityScore,
    accent: 'American English target',
    issues,
    feedback: generatePronunciationFeedback(score, issues)
  };
}

/**
 * Analyze fluency based on speech patterns
 */
export function analyzeFluency(
  text: string, 
  durationSeconds: number,
  pauseCount: number = 0
): FluencyAnalysis {
  const words = text.split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;
  const wordsPerMinute = durationSeconds > 0 ? Math.round((wordCount / durationSeconds) * 60) : 0;

  // Detect filler words
  const fillerPatterns = ['um', 'uh', 'like', 'you know', 'basically', 'actually', 'literally', 'so', 'well'];
  const fillerWords = fillerPatterns.filter(filler => 
    text.toLowerCase().includes(filler)
  );

  // Calculate fluency score
  const idealWPM = 130; // Average conversational speed
  const wpmDiff = Math.abs(wordsPerMinute - idealWPM);
  const wpmScore = Math.max(0, 100 - wpmDiff);
  const fillerPenalty = fillerWords.length * 5;
  const pausePenalty = pauseCount * 3;
  
  const score = Math.max(0, Math.min(100, wpmScore - fillerPenalty - pausePenalty));

  return {
    score,
    wordsPerMinute,
    pauseCount,
    fillerWords,
    feedback: generateFluencyFeedback(score, wordsPerMinute, fillerWords)
  };
}

/**
 * Perform complete speech analysis
 */
export function performCompleteSpeechAnalysis(
  text: string,
  durationSeconds: number,
  confidence: number = 0.8
): SpeechAnalysisResult {
  const grammar = analyzeGrammar(text);
  const vocabulary = analyzeVocabulary(text);
  const pronunciation = analyzePronunciation(text, confidence);
  const fluency = analyzeFluency(text, durationSeconds);

  const overallScore = Math.round(
    (grammar.score * 0.30) +
    (vocabulary.score * 0.25) +
    (pronunciation.score * 0.25) +
    (fluency.score * 0.20)
  );

  return {
    grammar,
    vocabulary,
    pronunciation,
    fluency,
    overallScore,
    feedback: generateOverallFeedback(overallScore),
    suggestions: generateOverallSuggestions(grammar, vocabulary, pronunciation, fluency)
  };
}

// ============ HELPER FUNCTIONS ============

function determineSeverity(ruleType: string): 'minor' | 'moderate' | 'major' {
  const majorRules = ['subjectVerbAgreement', 'tenseConsistency'];
  const moderateRules = ['doubleNegatives', 'pronounCase'];
  
  if (majorRules.includes(ruleType)) return 'major';
  if (moderateRules.includes(ruleType)) return 'moderate';
  return 'minor';
}

function generateGrammarFeedback(score: number, errors: GrammarError[]): string {
  if (score >= 90) return 'Excellent grammar! Your sentence structures demonstrate strong command of American English.';
  if (score >= 75) return 'Good grammar with minor areas for improvement. Keep practicing!';
  if (score >= 60) return 'Your grammar shows solid foundations. Focus on the identified errors to improve.';
  return 'Grammar needs attention. Review the basic rules and practice regularly.';
}

function generateVocabularyFeedback(score: number, level: string, advancedWords: string[]): string {
  if (score >= 80) return `Impressive vocabulary at ${level} level! You used ${advancedWords.length} advanced words.`;
  if (score >= 60) return `Good vocabulary range at ${level} level. Try incorporating more diverse words.`;
  return 'Expand your vocabulary by learning new words daily and using them in context.';
}

function generatePronunciationFeedback(score: number, issues: PronunciationIssue[]): string {
  if (score >= 85) return 'Clear pronunciation with good American English patterns.';
  if (score >= 70) return 'Good pronunciation overall. Pay attention to the highlighted words.';
  return 'Focus on pronunciation practice, especially for challenging American English sounds.';
}

function generateFluencyFeedback(score: number, wpm: number, fillers: string[]): string {
  let feedback = `Speaking rate: ${wpm} words per minute. `;
  if (wpm < 100) feedback += 'Try speaking a bit faster for natural conversation. ';
  else if (wpm > 160) feedback += 'Slow down slightly for better clarity. ';
  else feedback += 'Good conversational pace! ';
  
  if (fillers.length > 0) {
    feedback += `Reduce filler words like "${fillers.join(', ')}" for more polished speech.`;
  }
  return feedback;
}

function generateOverallFeedback(score: number): string {
  if (score >= 90) return 'Outstanding! Your American English skills are excellent.';
  if (score >= 80) return 'Great job! You demonstrate strong English proficiency.';
  if (score >= 70) return 'Good progress! Continue practicing to reach the next level.';
  if (score >= 60) return 'Solid foundation! Focus on the suggested areas for improvement.';
  return 'Keep practicing! Regular practice will help you improve significantly.';
}

function generateVocabularySuggestions(level: string): string[] {
  const suggestions: Record<string, string[]> = {
    A1: ['Learn 5 new words daily', 'Use flashcards for memorization', 'Practice with simple sentences'],
    A2: ['Read short articles in English', 'Watch English videos with subtitles', 'Keep a vocabulary journal'],
    B1: ['Read news articles regularly', 'Learn academic vocabulary', 'Practice using connectors'],
    B2: ['Read professional publications', 'Learn formal expressions', 'Study business vocabulary'],
    C1: ['Read academic papers', 'Learn discipline-specific terms', 'Practice nuanced expressions'],
    C2: ['Explore literary vocabulary', 'Study etymology', 'Master idiomatic expressions']
  };
  return suggestions[level] || suggestions.A1;
}

function generateOverallSuggestions(
  grammar: GrammarAnalysis,
  vocabulary: VocabularyAnalysis,
  pronunciation: PronunciationAnalysis,
  fluency: FluencyAnalysis
): string[] {
  const suggestions: string[] = [];
  
  if (grammar.score < 80) {
    suggestions.push('Review grammar rules, especially ' + (grammar.errors[0]?.type || 'basic structures'));
  }
  if (vocabulary.score < 80) {
    suggestions.push(`Expand vocabulary to reach ${vocabulary.level === 'C2' ? 'mastery' : 'the next'} level`);
  }
  if (pronunciation.score < 80) {
    suggestions.push('Practice pronunciation with native speaker recordings');
  }
  if (fluency.score < 80) {
    suggestions.push('Practice speaking regularly to improve fluency');
  }
  
  return suggestions;
}

export default {
  analyzeGrammar,
  analyzeVocabulary,
  analyzePronunciation,
  analyzeFluency,
  performCompleteSpeechAnalysis,
  AMERICAN_ENGLISH_GRAMMAR_RULES,
  VOCABULARY_BY_LEVEL,
  AMERICAN_IDIOMS
};
