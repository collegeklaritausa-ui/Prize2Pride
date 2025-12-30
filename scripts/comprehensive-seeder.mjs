#!/usr/bin/env node
/**
 * Prize2Pride - Comprehensive Database Seeder
 * Seeds all generated data into the database
 * 
 * PROTECTION MODE: This script only BUILDS and AUGMENTS - never destroys
 */

import fs from 'fs';
import path from 'path';

// Load generated data
const dataDir = path.join(process.cwd(), 'generated-data');

const loadJSON = (filename) => {
  const filepath = path.join(dataDir, filename);
  if (fs.existsSync(filepath)) {
    return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
  }
  return null;
};

const questions = loadJSON('questions.json') || [];
const vocabulary = loadJSON('vocabulary.json') || {};
const avatars = loadJSON('avatars.json') || [];
const feedbackMessages = loadJSON('feedback-messages.json') || [];
const achievements = loadJSON('achievements.json') || [];
const voiceCourses = loadJSON('voice-courses.json') || {};

// ============================================================================
// EXTENDED QUESTIONS - Adding more comprehensive coverage
// ============================================================================

const extendedQuestions = [
  // More A1 Questions
  {
    questionText: 'My sister _____ a teacher.',
    correctAnswer: 'is',
    options: ['am', 'is', 'are', 'be'],
    explanationEnglish: 'Use "is" with he/she/it or singular nouns.',
    category: 'Present Simple - Be',
    difficulty: 'A1'
  },
  {
    questionText: '_____ you from America?',
    correctAnswer: 'Are',
    options: ['Am', 'Is', 'Are', 'Be'],
    explanationEnglish: 'Use "Are" with "you" in questions.',
    category: 'Present Simple - Be',
    difficulty: 'A1'
  },
  {
    questionText: 'I _____ a car.',
    correctAnswer: 'have',
    options: ['have', 'has', 'having', 'had'],
    explanationEnglish: 'Use "have" with I/you/we/they.',
    category: 'Present Simple - Have',
    difficulty: 'A1'
  },
  {
    questionText: 'She _____ two brothers.',
    correctAnswer: 'has',
    options: ['have', 'has', 'having', 'had'],
    explanationEnglish: 'Use "has" with he/she/it.',
    category: 'Present Simple - Have',
    difficulty: 'A1'
  },
  {
    questionText: 'The children _____ in the garden.',
    correctAnswer: 'are',
    options: ['am', 'is', 'are', 'be'],
    explanationEnglish: 'Use "are" with plural subjects.',
    category: 'Present Simple - Be',
    difficulty: 'A1'
  },
  {
    questionText: 'I live _____ New York.',
    correctAnswer: 'in',
    options: ['in', 'on', 'at', 'to'],
    explanationEnglish: 'Use "in" with cities and countries.',
    category: 'Basic Prepositions',
    difficulty: 'A1'
  },
  {
    questionText: 'The meeting is _____ Monday.',
    correctAnswer: 'on',
    options: ['in', 'on', 'at', 'to'],
    explanationEnglish: 'Use "on" with days of the week.',
    category: 'Basic Prepositions',
    difficulty: 'A1'
  },
  {
    questionText: 'I wake up _____ 7 o\'clock.',
    correctAnswer: 'at',
    options: ['in', 'on', 'at', 'to'],
    explanationEnglish: 'Use "at" with specific times.',
    category: 'Basic Prepositions',
    difficulty: 'A1'
  },
  {
    questionText: '_____ old are you?',
    correctAnswer: 'How',
    options: ['What', 'How', 'Where', 'When'],
    explanationEnglish: 'Use "How old" to ask about age.',
    category: 'Question Words',
    difficulty: 'A1'
  },
  {
    questionText: '_____ many books do you have?',
    correctAnswer: 'How',
    options: ['What', 'How', 'Where', 'Which'],
    explanationEnglish: 'Use "How many" for countable nouns.',
    category: 'Question Words',
    difficulty: 'A1'
  },

  // More A2 Questions
  {
    questionText: 'She _____ to the gym every day.',
    correctAnswer: 'goes',
    options: ['go', 'goes', 'going', 'went'],
    explanationEnglish: 'Add "-es" to verbs ending in -o for he/she/it.',
    category: 'Present Simple - Verbs',
    difficulty: 'A2'
  },
  {
    questionText: 'They _____ TV last night.',
    correctAnswer: 'watched',
    options: ['watch', 'watched', 'watching', 'watches'],
    explanationEnglish: 'Add "-ed" for regular past tense.',
    category: 'Past Simple - Regular',
    difficulty: 'A2'
  },
  {
    questionText: 'I _____ my keys yesterday.',
    correctAnswer: 'lost',
    options: ['lose', 'lost', 'losing', 'loses'],
    explanationEnglish: 'Lose → lost (irregular past tense).',
    category: 'Past Simple - Irregular',
    difficulty: 'A2'
  },
  {
    questionText: 'She _____ a letter to her friend.',
    correctAnswer: 'wrote',
    options: ['write', 'wrote', 'written', 'writing'],
    explanationEnglish: 'Write → wrote (irregular past tense).',
    category: 'Past Simple - Irregular',
    difficulty: 'A2'
  },
  {
    questionText: 'This is the _____ movie I\'ve ever seen.',
    correctAnswer: 'best',
    options: ['good', 'better', 'best', 'most good'],
    explanationEnglish: 'Good → better → best (irregular superlative).',
    category: 'Superlatives',
    difficulty: 'A2'
  },
  {
    questionText: 'Mount Everest is the _____ mountain in the world.',
    correctAnswer: 'highest',
    options: ['high', 'higher', 'highest', 'most high'],
    explanationEnglish: 'Add "-est" for short adjective superlatives.',
    category: 'Superlatives',
    difficulty: 'A2'
  },
  {
    questionText: 'I _____ go to the beach tomorrow.',
    correctAnswer: 'will',
    options: ['will', 'would', 'am', 'do'],
    explanationEnglish: 'Use "will" for future decisions.',
    category: 'Future with Will',
    difficulty: 'A2'
  },
  {
    questionText: 'She _____ going to study medicine.',
    correctAnswer: 'is',
    options: ['is', 'are', 'will', 'does'],
    explanationEnglish: 'Use "be going to" for planned future.',
    category: 'Future with Going To',
    difficulty: 'A2'
  },
  {
    questionText: 'You _____ drive without a license.',
    correctAnswer: "mustn't",
    options: ["can't", "mustn't", "don't have to", "shouldn't"],
    explanationEnglish: '"Mustn\'t" expresses prohibition.',
    category: 'Modal Verbs - Must/Have to',
    difficulty: 'A2'
  },
  {
    questionText: 'I _____ usually eat breakfast.',
    correctAnswer: "don't",
    options: ["don't", "doesn't", "am not", "haven't"],
    explanationEnglish: 'Use "don\'t" for negative present simple with I/you/we/they.',
    category: 'Present Simple - Verbs',
    difficulty: 'A2'
  },

  // More B1 Questions
  {
    questionText: 'I _____ to Paris three times.',
    correctAnswer: 'have been',
    options: ['have been', 'was', 'went', 'am going'],
    explanationEnglish: 'Use present perfect for life experiences.',
    category: 'Present Perfect Simple',
    difficulty: 'B1'
  },
  {
    questionText: 'She _____ here since 2010.',
    correctAnswer: 'has lived',
    options: ['has lived', 'lived', 'lives', 'is living'],
    explanationEnglish: 'Use present perfect with "since" for duration.',
    category: 'Present Perfect Simple',
    difficulty: 'B1'
  },
  {
    questionText: 'When I arrived, they _____ dinner.',
    correctAnswer: 'were having',
    options: ['were having', 'had', 'have', 'are having'],
    explanationEnglish: 'Use past continuous for actions in progress in the past.',
    category: 'Past Continuous',
    difficulty: 'B1'
  },
  {
    questionText: 'I _____ to play tennis when I was young.',
    correctAnswer: 'used',
    options: ['used', 'use', 'was used', 'am used'],
    explanationEnglish: 'Use "used to" for past habits.',
    category: 'Used to / Would',
    difficulty: 'B1'
  },
  {
    questionText: 'The movie _____ directed by Steven Spielberg.',
    correctAnswer: 'was',
    options: ['was', 'is', 'has', 'had'],
    explanationEnglish: 'Use past passive for completed actions.',
    category: 'Passive Voice - Past',
    difficulty: 'B1'
  },
  {
    questionText: 'I enjoy _____ books.',
    correctAnswer: 'reading',
    options: ['reading', 'to read', 'read', 'reads'],
    explanationEnglish: 'Use gerund (-ing) after "enjoy".',
    category: 'Gerunds and Infinitives',
    difficulty: 'B1'
  },
  {
    questionText: 'She decided _____ a new car.',
    correctAnswer: 'to buy',
    options: ['to buy', 'buying', 'buy', 'bought'],
    explanationEnglish: 'Use infinitive (to + verb) after "decide".',
    category: 'Gerunds and Infinitives',
    difficulty: 'B1'
  },
  {
    questionText: 'The man _____ lives next door is a doctor.',
    correctAnswer: 'who',
    options: ['who', 'which', 'what', 'whom'],
    explanationEnglish: 'Use "who" for people in relative clauses.',
    category: 'Relative Clauses - Defining',
    difficulty: 'B1'
  },
  {
    questionText: 'The book _____ I bought is interesting.',
    correctAnswer: 'which',
    options: ['who', 'which', 'what', 'whom'],
    explanationEnglish: 'Use "which" or "that" for things.',
    category: 'Relative Clauses - Defining',
    difficulty: 'B1'
  },
  {
    questionText: 'You _____ see a doctor about that cough.',
    correctAnswer: 'should',
    options: ['should', 'would', 'could', 'might'],
    explanationEnglish: '"Should" gives advice or recommendations.',
    category: 'Modal Verbs - Should/Ought to',
    difficulty: 'B1'
  },

  // More B2 Questions
  {
    questionText: 'By the time she arrived, we _____ waiting for two hours.',
    correctAnswer: 'had been',
    options: ['had been', 'have been', 'were', 'are'],
    explanationEnglish: 'Past perfect continuous for duration before past event.',
    category: 'Past Perfect',
    difficulty: 'B2'
  },
  {
    questionText: 'This time next week, I _____ on a beach.',
    correctAnswer: 'will be lying',
    options: ['will be lying', 'will lie', 'am lying', 'lie'],
    explanationEnglish: 'Future continuous for actions in progress at future time.',
    category: 'Future Continuous',
    difficulty: 'B2'
  },
  {
    questionText: 'By 2030, scientists _____ a cure for cancer.',
    correctAnswer: 'will have found',
    options: ['will have found', 'will find', 'find', 'found'],
    explanationEnglish: 'Future perfect for completed actions before future time.',
    category: 'Future Perfect',
    difficulty: 'B2'
  },
  {
    questionText: 'I wish I _____ more time to travel.',
    correctAnswer: 'had',
    options: ['had', 'have', 'would have', 'will have'],
    explanationEnglish: 'Use past tense after "wish" for present wishes.',
    category: 'Wish/If only',
    difficulty: 'B2'
  },
  {
    questionText: 'If only I _____ listened to your advice!',
    correctAnswer: 'had',
    options: ['had', 'have', 'would', 'could'],
    explanationEnglish: 'Use past perfect after "if only" for past regrets.',
    category: 'Wish/If only',
    difficulty: 'B2'
  },
  {
    questionText: 'She asked me where I _____ the previous day.',
    correctAnswer: 'had been',
    options: ['had been', 'have been', 'was', 'am'],
    explanationEnglish: 'Backshift in reported speech: was → had been.',
    category: 'Reported Speech - Questions',
    difficulty: 'B2'
  },
  {
    questionText: 'My sister, _____ lives in London, is visiting next week.',
    correctAnswer: 'who',
    options: ['who', 'which', 'that', 'whom'],
    explanationEnglish: 'Non-defining relative clauses use "who" for people (with commas).',
    category: 'Relative Clauses - Non-defining',
    difficulty: 'B2'
  },
  {
    questionText: 'If I had known about the party, I _____ come.',
    correctAnswer: 'would have',
    options: ['would have', 'will have', 'had', 'would'],
    explanationEnglish: 'Third conditional: would have + past participle.',
    category: 'Third Conditional',
    difficulty: 'B2'
  },
  {
    questionText: 'If I were you, I _____ accepted the job.',
    correctAnswer: 'would have',
    options: ['would have', 'will have', 'had', 'would'],
    explanationEnglish: 'Mixed conditional: past condition, past result.',
    category: 'Mixed Conditionals',
    difficulty: 'B2'
  },
  {
    questionText: 'The report _____ be submitted by Friday.',
    correctAnswer: 'must',
    options: ['must', 'should', 'could', 'might'],
    explanationEnglish: '"Must" expresses obligation or necessity.',
    category: 'Modal Verbs - Must/Have to',
    difficulty: 'B2'
  },

  // More C1 Questions
  {
    questionText: 'Never _____ I seen such a beautiful sunset.',
    correctAnswer: 'have',
    options: ['have', 'had', 'did', 'was'],
    explanationEnglish: 'Inversion after negative adverbs: Never + auxiliary + subject.',
    category: 'Inversion',
    difficulty: 'C1'
  },
  {
    questionText: 'Seldom _____ she complain about anything.',
    correctAnswer: 'does',
    options: ['does', 'did', 'has', 'is'],
    explanationEnglish: 'Inversion with "seldom" in present tense.',
    category: 'Inversion',
    difficulty: 'C1'
  },
  {
    questionText: 'It is vital that he _____ on time.',
    correctAnswer: 'be',
    options: ['be', 'is', 'was', 'being'],
    explanationEnglish: 'Subjunctive: base form after "It is vital that".',
    category: 'Subjunctive Mood',
    difficulty: 'C1'
  },
  {
    questionText: 'The committee insisted that the proposal _____ rejected.',
    correctAnswer: 'be',
    options: ['be', 'is', 'was', 'being'],
    explanationEnglish: 'Subjunctive after verbs of demand/suggestion.',
    category: 'Subjunctive Mood',
    difficulty: 'C1'
  },
  {
    questionText: 'What I really need _____ a vacation.',
    correctAnswer: 'is',
    options: ['is', 'are', 'was', 'were'],
    explanationEnglish: 'Pseudo-cleft: What + clause + be + focus.',
    category: 'Cleft Sentences',
    difficulty: 'C1'
  },
  {
    questionText: 'It was in Paris _____ they first met.',
    correctAnswer: 'that',
    options: ['that', 'which', 'where', 'when'],
    explanationEnglish: 'It-cleft: It + be + focus + that/who.',
    category: 'Cleft Sentences',
    difficulty: 'C1'
  },
  {
    questionText: '_____ I to know about the meeting, I would have attended.',
    correctAnswer: 'Were',
    options: ['Were', 'Was', 'Had', 'Should'],
    explanationEnglish: 'Inverted conditional: Were + subject replaces If + subject + were.',
    category: 'Advanced Conditionals',
    difficulty: 'C1'
  },
  {
    questionText: '_____ he to arrive early, please inform me.',
    correctAnswer: 'Should',
    options: ['Should', 'Would', 'Could', 'If'],
    explanationEnglish: 'Inverted conditional with "should" for unlikely events.',
    category: 'Advanced Conditionals',
    difficulty: 'C1'
  },
  {
    questionText: 'The data _____ to support the hypothesis.',
    correctAnswer: 'appear',
    options: ['appear', 'appears', 'appeared', 'appearing'],
    explanationEnglish: '"Data" can be plural (formal) - verb agrees.',
    category: 'Advanced Tense Review',
    difficulty: 'C1'
  },
  {
    questionText: 'Little _____ he know what awaited him.',
    correctAnswer: 'did',
    options: ['did', 'does', 'had', 'was'],
    explanationEnglish: 'Inversion after "Little" for emphasis.',
    category: 'Inversion',
    difficulty: 'C1'
  },

  // More C2 Questions
  {
    questionText: 'The situation calls _____ immediate action.',
    correctAnswer: 'for',
    options: ['for', 'on', 'up', 'out'],
    explanationEnglish: '"Call for" means to require or demand.',
    category: 'Advanced Phrasal Verbs',
    difficulty: 'C2'
  },
  {
    questionText: 'She came _____ a rare book at the flea market.',
    correctAnswer: 'across',
    options: ['across', 'over', 'through', 'about'],
    explanationEnglish: '"Come across" means to find by chance.',
    category: 'Advanced Phrasal Verbs',
    difficulty: 'C2'
  },
  {
    questionText: 'His argument doesn\'t hold _____.',
    correctAnswer: 'water',
    options: ['water', 'ground', 'weight', 'fire'],
    explanationEnglish: '"Hold water" means to be valid or logical.',
    category: 'Native-like Expressions',
    difficulty: 'C2'
  },
  {
    questionText: 'She\'s really burning the candle at both _____.',
    correctAnswer: 'ends',
    options: ['ends', 'sides', 'ways', 'points'],
    explanationEnglish: '"Burn the candle at both ends" means overworking.',
    category: 'Native-like Expressions',
    difficulty: 'C2'
  },
  {
    questionText: 'The news came as a bolt from the _____.',
    correctAnswer: 'blue',
    options: ['blue', 'sky', 'dark', 'clear'],
    explanationEnglish: '"Bolt from the blue" means unexpected news.',
    category: 'Native-like Expressions',
    difficulty: 'C2'
  },
  {
    questionText: 'He _____ have been more helpful if he\'d tried.',
    correctAnswer: "couldn't",
    options: ["couldn't", "wouldn't", "shouldn't", "mightn't"],
    explanationEnglish: 'Ironic use: "couldn\'t have been more X" = was extremely X.',
    category: 'Subtle Grammar Distinctions',
    difficulty: 'C2'
  },
  {
    questionText: 'The phenomenon _____ yet to be fully understood.',
    correctAnswer: 'has',
    options: ['has', 'is', 'was', 'had'],
    explanationEnglish: '"Has yet to" = has not yet been (formal).',
    category: 'Subtle Grammar Distinctions',
    difficulty: 'C2'
  },
  {
    questionText: 'Be that as it _____,  we must proceed.',
    correctAnswer: 'may',
    options: ['may', 'might', 'can', 'could'],
    explanationEnglish: '"Be that as it may" = regardless of that (formal).',
    category: 'Native-like Expressions',
    difficulty: 'C2'
  },
  {
    questionText: 'The committee, _____ members were present, voted unanimously.',
    correctAnswer: 'all of whose',
    options: ['all of whose', 'whose all', 'all whose', 'which all'],
    explanationEnglish: '"All of whose" for possession with quantifier.',
    category: 'Subtle Grammar Distinctions',
    difficulty: 'C2'
  },
  {
    questionText: 'Scarcely _____ he arrived when the meeting began.',
    correctAnswer: 'had',
    options: ['had', 'has', 'did', 'was'],
    explanationEnglish: 'Inversion with "scarcely...when" (past perfect).',
    category: 'Subtle Grammar Distinctions',
    difficulty: 'C2'
  }
];

// Combine all questions
const allQuestions = [...questions, ...extendedQuestions];

// ============================================================================
// GENERATE SQL INSERT STATEMENTS
// ============================================================================

const generateInsertStatements = () => {
  let sql = '-- Prize2Pride Comprehensive Database Seed\n';
  sql += '-- Generated: ' + new Date().toISOString() + '\n\n';

  // Questions
  sql += '-- QUESTIONS\n';
  allQuestions.forEach((q, i) => {
    const escapedText = q.questionText.replace(/'/g, "''");
    const escapedAnswer = q.correctAnswer.replace(/'/g, "''");
    const escapedOptions = JSON.stringify(q.options).replace(/'/g, "''");
    const escapedExplanation = (q.explanationEnglish || '').replace(/'/g, "''");
    
    sql += `INSERT INTO questions (questionText, correctAnswer, options, category, difficulty, explanationEnglish) VALUES ('${escapedText}', '${escapedAnswer}', '${escapedOptions}', '${q.category}', '${q.difficulty}', '${escapedExplanation}');\n`;
  });

  // Avatars
  sql += '\n-- AVATARS\n';
  avatars.forEach(a => {
    const escapedName = a.name.replace(/'/g, "''");
    const escapedDesc = (a.description || '').replace(/'/g, "''");
    sql += `INSERT INTO avatars (name, description, imageUrl, personality) VALUES ('${escapedName}', '${escapedDesc}', '${a.imageUrl}', '${a.personality}');\n`;
  });

  // Achievements
  sql += '\n-- ACHIEVEMENTS\n';
  achievements.forEach(a => {
    const escapedName = a.name.replace(/'/g, "''");
    const escapedDesc = a.description.replace(/'/g, "''");
    sql += `INSERT INTO achievements (name, description, icon, requirement, category) VALUES ('${escapedName}', '${escapedDesc}', '${a.icon}', ${a.requirement}, '${a.category}');\n`;
  });

  // Feedback Messages
  sql += '\n-- FEEDBACK MESSAGES\n';
  feedbackMessages.forEach((f, i) => {
    const escapedEn = f.messageEnglish.replace(/'/g, "''");
    const escapedAr = (f.messageArabic || '').replace(/'/g, "''");
    const escapedFr = (f.messageFrench || '').replace(/'/g, "''");
    const escapedEs = (f.messageSpanish || '').replace(/'/g, "''");
    const escapedDe = (f.messageGerman || '').replace(/'/g, "''");
    const escapedZh = (f.messageChinese || '').replace(/'/g, "''");
    
    sql += `INSERT INTO feedbackMessages (avatarId, messageEnglish, messageArabic, messageFrench, messageSpanish, messageGerman, messageChinese, feedbackType) VALUES (${f.avatarId || 1}, '${escapedEn}', '${escapedAr}', '${escapedFr}', '${escapedEs}', '${escapedDe}', '${escapedZh}', '${f.feedbackType}');\n`;
  });

  return sql;
};

// ============================================================================
// GENERATE TYPESCRIPT DATA FILE
// ============================================================================

const generateTypeScriptData = () => {
  return `// Prize2Pride - Auto-generated Data
// Generated: ${new Date().toISOString()}
// DO NOT EDIT MANUALLY - This file is auto-generated

export const QUESTIONS = ${JSON.stringify(allQuestions, null, 2)} as const;

export const VOCABULARY = ${JSON.stringify(vocabulary, null, 2)} as const;

export const AVATARS = ${JSON.stringify(avatars, null, 2)} as const;

export const ACHIEVEMENTS = ${JSON.stringify(achievements, null, 2)} as const;

export const FEEDBACK_MESSAGES = ${JSON.stringify(feedbackMessages, null, 2)} as const;

export const VOICE_COURSES = ${JSON.stringify(voiceCourses, null, 2)} as const;

export const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;

export type CEFRLevel = typeof CEFR_LEVELS[number];

export const QUESTION_CATEGORIES = {
  A1: ['Subject Pronouns', 'Object Pronouns', 'Possessive Adjectives', 'Articles (a/an/the)', 'Present Simple - Be', 'Present Simple - Have', 'Present Continuous', 'Basic Prepositions', 'Question Words'],
  A2: ['Past Simple - Regular', 'Past Simple - Irregular', 'Future with Will', 'Future with Going To', 'Comparatives', 'Superlatives', 'Modal Verbs - Can/Could', 'Modal Verbs - Must/Have to', 'Present Simple - Verbs'],
  B1: ['Present Perfect Simple', 'Past Continuous', 'Used to / Would', 'First Conditional', 'Second Conditional', 'Passive Voice - Present', 'Passive Voice - Past', 'Gerunds and Infinitives', 'Relative Clauses - Defining', 'Modal Verbs - Should/Ought to'],
  B2: ['Past Perfect', 'Future Continuous', 'Future Perfect', 'Third Conditional', 'Mixed Conditionals', 'Wish/If only', 'Reported Speech - Questions', 'Relative Clauses - Non-defining'],
  C1: ['Inversion', 'Subjunctive Mood', 'Cleft Sentences', 'Advanced Conditionals', 'Advanced Tense Review'],
  C2: ['Advanced Phrasal Verbs', 'Native-like Expressions', 'Subtle Grammar Distinctions']
} as const;

export const getQuestionsByLevel = (level: CEFRLevel) => 
  QUESTIONS.filter(q => q.difficulty === level);

export const getQuestionsByCategory = (category: string) => 
  QUESTIONS.filter(q => q.category === category);

export const getRandomQuestions = (count: number, level?: CEFRLevel) => {
  const filtered = level ? getQuestionsByLevel(level) : QUESTIONS;
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export const getVocabularyByLevel = (level: CEFRLevel) => 
  VOCABULARY[level] || {};

export const getAvatarById = (id: number) => 
  AVATARS.find((_, index) => index + 1 === id);

export const getRandomAvatar = () => 
  AVATARS[Math.floor(Math.random() * AVATARS.length)];

export const getAchievementsByCategory = (category: string) => 
  ACHIEVEMENTS.filter(a => a.category === category);

export const getVoiceCourseByLevel = (level: CEFRLevel) => 
  VOICE_COURSES[level];
`;
};

// ============================================================================
// WRITE OUTPUT FILES
// ============================================================================

const outputDir = path.join(process.cwd(), 'generated-data');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write SQL file
fs.writeFileSync(
  path.join(outputDir, 'seed.sql'),
  generateInsertStatements()
);

// Write TypeScript data file
fs.writeFileSync(
  path.join(outputDir, 'platform-data.ts'),
  generateTypeScriptData()
);

// Write combined JSON
fs.writeFileSync(
  path.join(outputDir, 'all-questions.json'),
  JSON.stringify(allQuestions, null, 2)
);

// Write summary
const summary = {
  totalQuestions: allQuestions.length,
  questionsByLevel: {
    A1: allQuestions.filter(q => q.difficulty === 'A1').length,
    A2: allQuestions.filter(q => q.difficulty === 'A2').length,
    B1: allQuestions.filter(q => q.difficulty === 'B1').length,
    B2: allQuestions.filter(q => q.difficulty === 'B2').length,
    C1: allQuestions.filter(q => q.difficulty === 'C1').length,
    C2: allQuestions.filter(q => q.difficulty === 'C2').length
  },
  totalAvatars: avatars.length,
  totalAchievements: achievements.length,
  totalFeedbackMessages: feedbackMessages.length,
  vocabularyLevels: Object.keys(vocabulary).length,
  voiceCourseLevels: Object.keys(voiceCourses).length,
  generatedAt: new Date().toISOString()
};

fs.writeFileSync(
  path.join(outputDir, 'generation-summary.json'),
  JSON.stringify(summary, null, 2)
);

console.log('✅ Comprehensive Seeder Complete!');
console.log(`📊 Total Questions: ${summary.totalQuestions}`);
console.log(`   A1: ${summary.questionsByLevel.A1}`);
console.log(`   A2: ${summary.questionsByLevel.A2}`);
console.log(`   B1: ${summary.questionsByLevel.B1}`);
console.log(`   B2: ${summary.questionsByLevel.B2}`);
console.log(`   C1: ${summary.questionsByLevel.C1}`);
console.log(`   C2: ${summary.questionsByLevel.C2}`);
console.log(`👤 Avatars: ${summary.totalAvatars}`);
console.log(`🏆 Achievements: ${summary.totalAchievements}`);
console.log(`💬 Feedback Messages: ${summary.totalFeedbackMessages}`);
console.log(`📁 Output files:`);
console.log(`   - ${outputDir}/seed.sql`);
console.log(`   - ${outputDir}/platform-data.ts`);
console.log(`   - ${outputDir}/all-questions.json`);
console.log(`   - ${outputDir}/generation-summary.json`);
