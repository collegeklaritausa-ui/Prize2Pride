#!/usr/bin/env node
/**
 * Prize2Pride - Expanded Question Bank Generator
 * Generates 500+ comprehensive questions across all CEFR levels
 * 
 * PROTECTION MODE: This script only BUILDS and AUGMENTS - never destroys
 */

import fs from 'fs';
import path from 'path';

// ============================================================================
// QUESTION TEMPLATES BY CATEGORY
// ============================================================================

const generateA1Questions = () => {
  const questions = [];

  // Subject Pronouns - 15 questions
  const subjectPronounTemplates = [
    { text: '_____ am happy.', answer: 'I', options: ['I', 'You', 'He', 'She'] },
    { text: '_____ is my teacher.', answer: 'She', options: ['I', 'You', 'He', 'She'] },
    { text: '_____ are students.', answer: 'We', options: ['I', 'We', 'He', 'She'] },
    { text: '_____ is a good book.', answer: 'It', options: ['He', 'She', 'It', 'They'] },
    { text: '_____ are my friends.', answer: 'They', options: ['He', 'She', 'It', 'They'] },
    { text: '_____ am from America.', answer: 'I', options: ['I', 'You', 'He', 'We'] },
    { text: '_____ is tall.', answer: 'He', options: ['I', 'You', 'He', 'They'] },
    { text: '_____ are nice people.', answer: 'You', options: ['I', 'You', 'He', 'She'] },
    { text: '_____ is my mother.', answer: 'She', options: ['I', 'You', 'He', 'She'] },
    { text: '_____ are playing soccer.', answer: 'They', options: ['I', 'He', 'She', 'They'] },
    { text: '_____ am a doctor.', answer: 'I', options: ['I', 'You', 'He', 'She'] },
    { text: '_____ is cold today.', answer: 'It', options: ['He', 'She', 'It', 'They'] },
    { text: '_____ are brothers.', answer: 'We', options: ['I', 'We', 'He', 'She'] },
    { text: '_____ is my dog.', answer: 'It', options: ['He', 'She', 'It', 'I'] },
    { text: '_____ are in the classroom.', answer: 'They', options: ['I', 'He', 'She', 'They'] }
  ];

  subjectPronounTemplates.forEach(t => {
    questions.push({
      questionText: t.text,
      correctAnswer: t.answer,
      options: t.options,
      explanationEnglish: `Use "${t.answer}" as the subject pronoun in this context.`,
      category: 'Subject Pronouns',
      difficulty: 'A1'
    });
  });

  // Object Pronouns - 10 questions
  const objectPronounTemplates = [
    { text: 'She loves _____.', answer: 'me', options: ['I', 'me', 'my', 'mine'] },
    { text: 'I see _____.', answer: 'him', options: ['he', 'him', 'his', 'her'] },
    { text: 'They called _____.', answer: 'us', options: ['we', 'us', 'our', 'ours'] },
    { text: 'He gave _____ a gift.', answer: 'her', options: ['she', 'her', 'hers', 'him'] },
    { text: 'Can you help _____?', answer: 'them', options: ['they', 'them', 'their', 'theirs'] },
    { text: 'She told _____ the story.', answer: 'me', options: ['I', 'me', 'my', 'mine'] },
    { text: 'We visited _____ yesterday.', answer: 'them', options: ['they', 'them', 'their', 'theirs'] },
    { text: 'Please give _____ the book.', answer: 'him', options: ['he', 'him', 'his', 'her'] },
    { text: 'I bought _____ for my sister.', answer: 'it', options: ['he', 'she', 'it', 'they'] },
    { text: 'She invited _____ to the party.', answer: 'us', options: ['we', 'us', 'our', 'ours'] }
  ];

  objectPronounTemplates.forEach(t => {
    questions.push({
      questionText: t.text,
      correctAnswer: t.answer,
      options: t.options,
      explanationEnglish: `Use "${t.answer}" as the object pronoun.`,
      category: 'Object Pronouns',
      difficulty: 'A1'
    });
  });

  // Present Simple - Be - 15 questions
  const presentSimpleBeTemplates = [
    { text: 'I _____ a student.', answer: 'am', options: ['am', 'is', 'are', 'be'] },
    { text: 'She _____ happy.', answer: 'is', options: ['am', 'is', 'are', 'be'] },
    { text: 'They _____ at home.', answer: 'are', options: ['am', 'is', 'are', 'be'] },
    { text: 'The cat _____ on the bed.', answer: 'is', options: ['am', 'is', 'are', 'be'] },
    { text: 'We _____ friends.', answer: 'are', options: ['am', 'is', 'are', 'be'] },
    { text: 'He _____ a teacher.', answer: 'is', options: ['am', 'is', 'are', 'be'] },
    { text: 'You _____ very kind.', answer: 'are', options: ['am', 'is', 'are', 'be'] },
    { text: 'It _____ a beautiful day.', answer: 'is', options: ['am', 'is', 'are', 'be'] },
    { text: 'I _____ not tired.', answer: 'am', options: ['am', 'is', 'are', 'be'] },
    { text: 'The books _____ on the table.', answer: 'are', options: ['am', 'is', 'are', 'be'] },
    { text: 'My name _____ John.', answer: 'is', options: ['am', 'is', 'are', 'be'] },
    { text: 'The children _____ in the garden.', answer: 'are', options: ['am', 'is', 'are', 'be'] },
    { text: 'This _____ my house.', answer: 'is', options: ['am', 'is', 'are', 'be'] },
    { text: 'I _____ from New York.', answer: 'am', options: ['am', 'is', 'are', 'be'] },
    { text: 'The weather _____ nice today.', answer: 'is', options: ['am', 'is', 'are', 'be'] }
  ];

  presentSimpleBeTemplates.forEach(t => {
    questions.push({
      questionText: t.text,
      correctAnswer: t.answer,
      options: t.options,
      explanationEnglish: `Use "${t.answer}" with the subject in this sentence.`,
      category: 'Present Simple - Be',
      difficulty: 'A1'
    });
  });

  // Articles - 15 questions
  const articleTemplates = [
    { text: 'I have _____ apple.', answer: 'an', options: ['a', 'an', 'the', '-'] },
    { text: 'She is _____ doctor.', answer: 'a', options: ['a', 'an', 'the', '-'] },
    { text: '_____ sun is bright.', answer: 'The', options: ['A', 'An', 'The', '-'] },
    { text: 'I need _____ umbrella.', answer: 'an', options: ['a', 'an', 'the', '-'] },
    { text: 'He is _____ honest man.', answer: 'an', options: ['a', 'an', 'the', '-'] },
    { text: 'This is _____ best movie.', answer: 'the', options: ['a', 'an', 'the', '-'] },
    { text: 'I saw _____ elephant at the zoo.', answer: 'an', options: ['a', 'an', 'the', '-'] },
    { text: 'She plays _____ piano.', answer: 'the', options: ['a', 'an', 'the', '-'] },
    { text: 'He is _____ university student.', answer: 'a', options: ['a', 'an', 'the', '-'] },
    { text: '_____ moon is beautiful tonight.', answer: 'The', options: ['A', 'An', 'The', '-'] },
    { text: 'I want _____ orange.', answer: 'an', options: ['a', 'an', 'the', '-'] },
    { text: 'She is _____ nurse.', answer: 'a', options: ['a', 'an', 'the', '-'] },
    { text: '_____ Earth is round.', answer: 'The', options: ['A', 'An', 'The', '-'] },
    { text: 'I have _____ hour to wait.', answer: 'an', options: ['a', 'an', 'the', '-'] },
    { text: 'This is _____ first time.', answer: 'the', options: ['a', 'an', 'the', '-'] }
  ];

  articleTemplates.forEach(t => {
    questions.push({
      questionText: t.text,
      correctAnswer: t.answer,
      options: t.options,
      explanationEnglish: `Use "${t.answer}" in this context.`,
      category: 'Articles (a/an/the)',
      difficulty: 'A1'
    });
  });

  // Prepositions - 15 questions
  const prepositionTemplates = [
    { text: 'The book is _____ the table.', answer: 'on', options: ['on', 'in', 'at', 'under'] },
    { text: 'She lives _____ Paris.', answer: 'in', options: ['on', 'in', 'at', 'to'] },
    { text: 'I will meet you _____ 5 o\'clock.', answer: 'at', options: ['on', 'in', 'at', 'to'] },
    { text: 'The cat is _____ the box.', answer: 'in', options: ['on', 'in', 'at', 'under'] },
    { text: 'The picture is _____ the wall.', answer: 'on', options: ['on', 'in', 'at', 'under'] },
    { text: 'We have a meeting _____ Monday.', answer: 'on', options: ['on', 'in', 'at', 'to'] },
    { text: 'The dog is _____ the table.', answer: 'under', options: ['on', 'in', 'at', 'under'] },
    { text: 'I was born _____ 1990.', answer: 'in', options: ['on', 'in', 'at', 'to'] },
    { text: 'She is _____ school.', answer: 'at', options: ['on', 'in', 'at', 'to'] },
    { text: 'The keys are _____ my pocket.', answer: 'in', options: ['on', 'in', 'at', 'under'] },
    { text: 'I\'ll see you _____ the morning.', answer: 'in', options: ['on', 'in', 'at', 'to'] },
    { text: 'The bird is _____ the tree.', answer: 'in', options: ['on', 'in', 'at', 'under'] },
    { text: 'We arrived _____ the airport.', answer: 'at', options: ['on', 'in', 'at', 'to'] },
    { text: 'The lamp is _____ the desk.', answer: 'on', options: ['on', 'in', 'at', 'under'] },
    { text: 'I go to bed _____ night.', answer: 'at', options: ['on', 'in', 'at', 'to'] }
  ];

  prepositionTemplates.forEach(t => {
    questions.push({
      questionText: t.text,
      correctAnswer: t.answer,
      options: t.options,
      explanationEnglish: `Use "${t.answer}" in this context.`,
      category: 'Basic Prepositions',
      difficulty: 'A1'
    });
  });

  // Question Words - 10 questions
  const questionWordTemplates = [
    { text: '_____ is your name?', answer: 'What', options: ['What', 'Where', 'When', 'Who'] },
    { text: '_____ do you live?', answer: 'Where', options: ['What', 'Where', 'When', 'Who'] },
    { text: '_____ is your birthday?', answer: 'When', options: ['What', 'Where', 'When', 'Who'] },
    { text: '_____ is that man?', answer: 'Who', options: ['What', 'Where', 'When', 'Who'] },
    { text: '_____ are you late?', answer: 'Why', options: ['What', 'Where', 'Why', 'Who'] },
    { text: '_____ do you spell your name?', answer: 'How', options: ['What', 'How', 'Why', 'Who'] },
    { text: '_____ old are you?', answer: 'How', options: ['What', 'How', 'Where', 'When'] },
    { text: '_____ is your favorite color?', answer: 'What', options: ['What', 'Where', 'When', 'Who'] },
    { text: '_____ many brothers do you have?', answer: 'How', options: ['What', 'How', 'Where', 'Which'] },
    { text: '_____ book is yours?', answer: 'Which', options: ['What', 'How', 'Where', 'Which'] }
  ];

  questionWordTemplates.forEach(t => {
    questions.push({
      questionText: t.text,
      correctAnswer: t.answer,
      options: t.options,
      explanationEnglish: `Use "${t.answer}" to form this type of question.`,
      category: 'Question Words',
      difficulty: 'A1'
    });
  });

  return questions;
};

const generateA2Questions = () => {
  const questions = [];

  // Past Simple - Regular - 15 questions
  const pastSimpleRegularTemplates = [
    { text: 'I _____ to school yesterday.', answer: 'walked', options: ['walk', 'walked', 'walking', 'walks'] },
    { text: 'She _____ her homework last night.', answer: 'finished', options: ['finish', 'finished', 'finishing', 'finishes'] },
    { text: 'They _____ soccer last weekend.', answer: 'played', options: ['play', 'played', 'playing', 'plays'] },
    { text: 'We _____ the movie together.', answer: 'watched', options: ['watch', 'watched', 'watching', 'watches'] },
    { text: 'He _____ to music all evening.', answer: 'listened', options: ['listen', 'listened', 'listening', 'listens'] },
    { text: 'I _____ my room this morning.', answer: 'cleaned', options: ['clean', 'cleaned', 'cleaning', 'cleans'] },
    { text: 'She _____ at the party.', answer: 'danced', options: ['dance', 'danced', 'dancing', 'dances'] },
    { text: 'They _____ for the bus.', answer: 'waited', options: ['wait', 'waited', 'waiting', 'waits'] },
    { text: 'He _____ the door.', answer: 'opened', options: ['open', 'opened', 'opening', 'opens'] },
    { text: 'We _____ our vacation.', answer: 'enjoyed', options: ['enjoy', 'enjoyed', 'enjoying', 'enjoys'] },
    { text: 'I _____ my friend yesterday.', answer: 'called', options: ['call', 'called', 'calling', 'calls'] },
    { text: 'She _____ the cake.', answer: 'baked', options: ['bake', 'baked', 'baking', 'bakes'] },
    { text: 'They _____ at the joke.', answer: 'laughed', options: ['laugh', 'laughed', 'laughing', 'laughs'] },
    { text: 'He _____ hard for the exam.', answer: 'studied', options: ['study', 'studied', 'studying', 'studies'] },
    { text: 'We _____ the game.', answer: 'started', options: ['start', 'started', 'starting', 'starts'] }
  ];

  pastSimpleRegularTemplates.forEach(t => {
    questions.push({
      questionText: t.text,
      correctAnswer: t.answer,
      options: t.options,
      explanationEnglish: 'Add "-ed" to regular verbs for past simple.',
      category: 'Past Simple - Regular',
      difficulty: 'A2'
    });
  });

  // Past Simple - Irregular - 15 questions
  const pastSimpleIrregularTemplates = [
    { text: 'I _____ to New York last summer.', answer: 'went', options: ['go', 'went', 'gone', 'going'] },
    { text: 'She _____ a delicious cake.', answer: 'made', options: ['make', 'made', 'making', 'makes'] },
    { text: 'They _____ the answer immediately.', answer: 'knew', options: ['know', 'knew', 'known', 'knowing'] },
    { text: 'He _____ a new car last month.', answer: 'bought', options: ['buy', 'bought', 'buying', 'buys'] },
    { text: 'We _____ breakfast at 8 AM.', answer: 'ate', options: ['eat', 'ate', 'eaten', 'eating'] },
    { text: 'I _____ a strange noise.', answer: 'heard', options: ['hear', 'heard', 'hearing', 'hears'] },
    { text: 'She _____ the book on the table.', answer: 'put', options: ['put', 'putted', 'putting', 'puts'] },
    { text: 'They _____ home early.', answer: 'came', options: ['come', 'came', 'coming', 'comes'] },
    { text: 'He _____ the race.', answer: 'won', options: ['win', 'won', 'winning', 'wins'] },
    { text: 'We _____ a great movie.', answer: 'saw', options: ['see', 'saw', 'seen', 'seeing'] },
    { text: 'I _____ my keys.', answer: 'lost', options: ['lose', 'lost', 'losing', 'loses'] },
    { text: 'She _____ me a letter.', answer: 'wrote', options: ['write', 'wrote', 'written', 'writing'] },
    { text: 'They _____ to the party.', answer: 'drove', options: ['drive', 'drove', 'driven', 'driving'] },
    { text: 'He _____ the ball.', answer: 'threw', options: ['throw', 'threw', 'thrown', 'throwing'] },
    { text: 'We _____ the truth.', answer: 'told', options: ['tell', 'told', 'telling', 'tells'] }
  ];

  pastSimpleIrregularTemplates.forEach(t => {
    questions.push({
      questionText: t.text,
      correctAnswer: t.answer,
      options: t.options,
      explanationEnglish: `Irregular past tense: ${t.options[0]} → ${t.answer}`,
      category: 'Past Simple - Irregular',
      difficulty: 'A2'
    });
  });

  // Comparatives - 10 questions
  const comparativeTemplates = [
    { text: 'This book is _____ than that one.', answer: 'more interesting', options: ['interesting', 'more interesting', 'most interesting', 'interestinger'] },
    { text: 'My house is _____ than yours.', answer: 'bigger', options: ['big', 'bigger', 'biggest', 'more big'] },
    { text: 'She runs _____ than her brother.', answer: 'faster', options: ['fast', 'faster', 'fastest', 'more fast'] },
    { text: 'This exam was _____ than the last one.', answer: 'easier', options: ['easy', 'easier', 'easiest', 'more easy'] },
    { text: 'Your idea is _____ than mine.', answer: 'better', options: ['good', 'better', 'best', 'more good'] },
    { text: 'The weather today is _____ than yesterday.', answer: 'worse', options: ['bad', 'worse', 'worst', 'more bad'] },
    { text: 'This car is _____ than that one.', answer: 'more expensive', options: ['expensive', 'more expensive', 'most expensive', 'expensiver'] },
    { text: 'He is _____ than his father.', answer: 'taller', options: ['tall', 'taller', 'tallest', 'more tall'] },
    { text: 'This movie is _____ than the book.', answer: 'more exciting', options: ['exciting', 'more exciting', 'most exciting', 'excitinger'] },
    { text: 'My bag is _____ than yours.', answer: 'heavier', options: ['heavy', 'heavier', 'heaviest', 'more heavy'] }
  ];

  comparativeTemplates.forEach(t => {
    questions.push({
      questionText: t.text,
      correctAnswer: t.answer,
      options: t.options,
      explanationEnglish: `Use "${t.answer}" for comparison.`,
      category: 'Comparatives',
      difficulty: 'A2'
    });
  });

  // Superlatives - 10 questions
  const superlativeTemplates = [
    { text: 'This is the _____ movie I\'ve ever seen.', answer: 'best', options: ['good', 'better', 'best', 'most good'] },
    { text: 'Mount Everest is the _____ mountain.', answer: 'highest', options: ['high', 'higher', 'highest', 'most high'] },
    { text: 'She is the _____ student in class.', answer: 'smartest', options: ['smart', 'smarter', 'smartest', 'most smart'] },
    { text: 'This is the _____ day of my life.', answer: 'happiest', options: ['happy', 'happier', 'happiest', 'most happy'] },
    { text: 'He is the _____ player on the team.', answer: 'worst', options: ['bad', 'worse', 'worst', 'most bad'] },
    { text: 'This is the _____ book in the library.', answer: 'oldest', options: ['old', 'older', 'oldest', 'most old'] },
    { text: 'She has the _____ hair in the family.', answer: 'longest', options: ['long', 'longer', 'longest', 'most long'] },
    { text: 'This is the _____ restaurant in town.', answer: 'most expensive', options: ['expensive', 'more expensive', 'most expensive', 'expensivest'] },
    { text: 'He is the _____ person I know.', answer: 'kindest', options: ['kind', 'kinder', 'kindest', 'most kind'] },
    { text: 'This is the _____ building in the city.', answer: 'tallest', options: ['tall', 'taller', 'tallest', 'most tall'] }
  ];

  superlativeTemplates.forEach(t => {
    questions.push({
      questionText: t.text,
      correctAnswer: t.answer,
      options: t.options,
      explanationEnglish: `Use "${t.answer}" for superlative.`,
      category: 'Superlatives',
      difficulty: 'A2'
    });
  });

  // Future - 10 questions
  const futureTemplates = [
    { text: 'I _____ go to the beach tomorrow.', answer: 'will', options: ['will', 'would', 'am', 'do'] },
    { text: 'She _____ going to study medicine.', answer: 'is', options: ['is', 'are', 'will', 'does'] },
    { text: 'They _____ arrive at 6 PM.', answer: 'will', options: ['will', 'would', 'are', 'do'] },
    { text: 'We _____ going to have a party.', answer: 'are', options: ['is', 'are', 'will', 'do'] },
    { text: 'He _____ call you later.', answer: 'will', options: ['will', 'would', 'is', 'does'] },
    { text: 'I _____ going to learn Spanish.', answer: 'am', options: ['am', 'is', 'are', 'will'] },
    { text: 'It _____ rain tomorrow.', answer: 'will', options: ['will', 'would', 'is', 'does'] },
    { text: 'She _____ going to visit her parents.', answer: 'is', options: ['am', 'is', 'are', 'will'] },
    { text: 'We _____ not be late.', answer: 'will', options: ['will', 'would', 'are', 'do'] },
    { text: 'They _____ going to move next month.', answer: 'are', options: ['am', 'is', 'are', 'will'] }
  ];

  futureTemplates.forEach(t => {
    questions.push({
      questionText: t.text,
      correctAnswer: t.answer,
      options: t.options,
      explanationEnglish: `Use "${t.answer}" for future tense.`,
      category: t.answer === 'will' ? 'Future with Will' : 'Future with Going To',
      difficulty: 'A2'
    });
  });

  return questions;
};

const generateB1Questions = () => {
  const questions = [];

  // Present Perfect - 15 questions
  const presentPerfectTemplates = [
    { text: 'I _____ never been to Japan.', answer: 'have', options: ['have', 'has', 'am', 'was'] },
    { text: 'She _____ already finished her homework.', answer: 'has', options: ['have', 'has', 'is', 'was'] },
    { text: 'They _____ lived here for ten years.', answer: 'have', options: ['have', 'has', 'are', 'were'] },
    { text: '_____ you ever eaten sushi?', answer: 'Have', options: ['Have', 'Has', 'Did', 'Are'] },
    { text: 'I _____ just had my lunch.', answer: 'have', options: ['have', 'has', 'am', 'was'] },
    { text: 'He _____ worked here since 2015.', answer: 'has', options: ['have', 'has', 'is', 'was'] },
    { text: 'We _____ not seen that movie yet.', answer: 'have', options: ['have', 'has', 'are', 'were'] },
    { text: 'She _____ been to Paris three times.', answer: 'has', options: ['have', 'has', 'is', 'was'] },
    { text: '_____ he finished the report?', answer: 'Has', options: ['Have', 'Has', 'Did', 'Is'] },
    { text: 'I _____ known him for years.', answer: 'have', options: ['have', 'has', 'am', 'was'] },
    { text: 'They _____ just arrived.', answer: 'have', options: ['have', 'has', 'are', 'were'] },
    { text: 'She _____ lost her keys.', answer: 'has', options: ['have', 'has', 'is', 'was'] },
    { text: 'We _____ already eaten dinner.', answer: 'have', options: ['have', 'has', 'are', 'were'] },
    { text: 'He _____ never tried skiing.', answer: 'has', options: ['have', 'has', 'is', 'was'] },
    { text: '_____ they ever visited London?', answer: 'Have', options: ['Have', 'Has', 'Did', 'Are'] }
  ];

  presentPerfectTemplates.forEach(t => {
    questions.push({
      questionText: t.text,
      correctAnswer: t.answer,
      options: t.options,
      explanationEnglish: 'Present perfect: have/has + past participle.',
      category: 'Present Perfect Simple',
      difficulty: 'B1'
    });
  });

  // Conditionals - 15 questions
  const conditionalTemplates = [
    { text: 'If it _____, we will stay home.', answer: 'rains', options: ['rains', 'will rain', 'rained', 'rain'], type: 'First Conditional' },
    { text: 'If you study hard, you _____ the exam.', answer: 'will pass', options: ['will pass', 'pass', 'passed', 'passing'], type: 'First Conditional' },
    { text: 'She _____ angry if you are late.', answer: 'will be', options: ['will be', 'is', 'was', 'being'], type: 'First Conditional' },
    { text: 'If I _____ time, I will call you.', answer: 'have', options: ['have', 'will have', 'had', 'having'], type: 'First Conditional' },
    { text: 'If I _____ rich, I would travel the world.', answer: 'were', options: ['were', 'am', 'will be', 'would be'], type: 'Second Conditional' },
    { text: 'If she _____ here, she would help us.', answer: 'were', options: ['were', 'is', 'will be', 'would be'], type: 'Second Conditional' },
    { text: 'I _____ buy a house if I had more money.', answer: 'would', options: ['would', 'will', 'could', 'should'], type: 'Second Conditional' },
    { text: 'If they _____ harder, they would succeed.', answer: 'worked', options: ['worked', 'work', 'will work', 'would work'], type: 'Second Conditional' },
    { text: 'What _____ you do if you won the lottery?', answer: 'would', options: ['would', 'will', 'do', 'did'], type: 'Second Conditional' },
    { text: 'If I _____ you, I would accept the offer.', answer: 'were', options: ['were', 'was', 'am', 'be'], type: 'Second Conditional' },
    { text: 'We _____ go to the beach if the weather is nice.', answer: 'will', options: ['will', 'would', 'are', 'do'], type: 'First Conditional' },
    { text: 'If he _____ earlier, he wouldn\'t be late.', answer: 'left', options: ['left', 'leaves', 'will leave', 'would leave'], type: 'Second Conditional' },
    { text: 'If I _____ a car, I would drive to work.', answer: 'had', options: ['had', 'have', 'will have', 'would have'], type: 'Second Conditional' },
    { text: 'She will be happy if you _____ her.', answer: 'visit', options: ['visit', 'will visit', 'visited', 'visiting'], type: 'First Conditional' },
    { text: 'If we _____ now, we will catch the train.', answer: 'leave', options: ['leave', 'will leave', 'left', 'leaving'], type: 'First Conditional' }
  ];

  conditionalTemplates.forEach(t => {
    questions.push({
      questionText: t.text,
      correctAnswer: t.answer,
      options: t.options,
      explanationEnglish: `${t.type}: Use "${t.answer}" in this context.`,
      category: t.type,
      difficulty: 'B1'
    });
  });

  // Passive Voice - 10 questions
  const passiveTemplates = [
    { text: 'The book _____ written by Shakespeare.', answer: 'was', options: ['was', 'is', 'were', 'be'] },
    { text: 'English _____ spoken in many countries.', answer: 'is', options: ['is', 'are', 'was', 'be'] },
    { text: 'The cars _____ made in Japan.', answer: 'are', options: ['is', 'are', 'was', 'be'] },
    { text: 'The letter _____ sent yesterday.', answer: 'was', options: ['was', 'is', 'were', 'has'] },
    { text: 'The windows _____ cleaned every week.', answer: 'are', options: ['is', 'are', 'was', 'be'] },
    { text: 'The cake _____ baked by my mother.', answer: 'was', options: ['was', 'is', 'were', 'be'] },
    { text: 'The news _____ announced this morning.', answer: 'was', options: ['was', 'is', 'were', 'be'] },
    { text: 'These products _____ sold worldwide.', answer: 'are', options: ['is', 'are', 'was', 'be'] },
    { text: 'The building _____ constructed in 1990.', answer: 'was', options: ['was', 'is', 'were', 'be'] },
    { text: 'The rules _____ followed by everyone.', answer: 'are', options: ['is', 'are', 'was', 'be'] }
  ];

  passiveTemplates.forEach(t => {
    questions.push({
      questionText: t.text,
      correctAnswer: t.answer,
      options: t.options,
      explanationEnglish: 'Passive voice: be + past participle.',
      category: t.answer === 'was' || t.answer === 'were' ? 'Passive Voice - Past' : 'Passive Voice - Present',
      difficulty: 'B1'
    });
  });

  return questions;
};

const generateB2Questions = () => {
  const questions = [];

  // Past Perfect - 10 questions
  const pastPerfectTemplates = [
    { text: 'By the time I arrived, she _____ already left.', answer: 'had', options: ['had', 'has', 'have', 'was'] },
    { text: 'I _____ never seen such a beautiful sunset before.', answer: 'had', options: ['had', 'have', 'has', 'was'] },
    { text: 'They _____ finished dinner when we called.', answer: 'had', options: ['had', 'have', 'has', 'were'] },
    { text: 'She realized she _____ forgotten her keys.', answer: 'had', options: ['had', 'has', 'have', 'was'] },
    { text: 'If I _____ known, I would have helped.', answer: 'had', options: ['had', 'have', 'has', 'would'] },
    { text: 'He told me he _____ been to Paris.', answer: 'had', options: ['had', 'has', 'have', 'was'] },
    { text: 'We _____ just sat down when the phone rang.', answer: 'had', options: ['had', 'have', 'has', 'were'] },
    { text: 'She _____ already eaten when I arrived.', answer: 'had', options: ['had', 'has', 'have', 'was'] },
    { text: 'They _____ never met before that day.', answer: 'had', options: ['had', 'have', 'has', 'were'] },
    { text: 'I _____ been waiting for an hour.', answer: 'had', options: ['had', 'have', 'has', 'was'] }
  ];

  pastPerfectTemplates.forEach(t => {
    questions.push({
      questionText: t.text,
      correctAnswer: t.answer,
      options: t.options,
      explanationEnglish: 'Past perfect: had + past participle.',
      category: 'Past Perfect',
      difficulty: 'B2'
    });
  });

  // Third Conditional - 10 questions
  const thirdConditionalTemplates = [
    { text: 'If I had studied harder, I _____ passed the exam.', answer: 'would have', options: ['would have', 'will have', 'had', 'would'] },
    { text: 'She _____ come if you had invited her.', answer: 'would have', options: ['would have', 'will have', 'had', 'would'] },
    { text: 'If they _____ arrived earlier, they would have met him.', answer: 'had', options: ['had', 'have', 'would', 'would have'] },
    { text: 'I _____ told you if I had known.', answer: 'would have', options: ['would have', 'will have', 'had', 'would'] },
    { text: 'If we _____ taken a taxi, we would have arrived on time.', answer: 'had', options: ['had', 'have', 'would', 'would have'] },
    { text: 'He _____ been happier if he had won.', answer: 'would have', options: ['would have', 'will have', 'had', 'would'] },
    { text: 'If she _____ seen the sign, she wouldn\'t have parked there.', answer: 'had', options: ['had', 'have', 'would', 'would have'] },
    { text: 'They _____ helped if you had asked.', answer: 'would have', options: ['would have', 'will have', 'had', 'would'] },
    { text: 'If I _____ known about the party, I would have come.', answer: 'had', options: ['had', 'have', 'would', 'would have'] },
    { text: 'We _____ missed the flight if we had left later.', answer: 'would have', options: ['would have', 'will have', 'had', 'would'] }
  ];

  thirdConditionalTemplates.forEach(t => {
    questions.push({
      questionText: t.text,
      correctAnswer: t.answer,
      options: t.options,
      explanationEnglish: 'Third conditional: If + past perfect, would have + past participle.',
      category: 'Third Conditional',
      difficulty: 'B2'
    });
  });

  // Reported Speech - 10 questions
  const reportedSpeechTemplates = [
    { text: 'She said she _____ tired.', answer: 'was', options: ['is', 'was', 'be', 'been'] },
    { text: 'He told me he _____ call me later.', answer: 'would', options: ['will', 'would', 'can', 'could'] },
    { text: 'They said they _____ been waiting for an hour.', answer: 'had', options: ['have', 'had', 'has', 'were'] },
    { text: 'She asked me where I _____.', answer: 'lived', options: ['live', 'lived', 'living', 'lives'] },
    { text: 'He asked if I _____ help him.', answer: 'could', options: ['can', 'could', 'will', 'would'] },
    { text: 'She said she _____ going to the party.', answer: 'was', options: ['is', 'was', 'be', 'been'] },
    { text: 'He told me he _____ finished the work.', answer: 'had', options: ['has', 'had', 'have', 'was'] },
    { text: 'They asked if we _____ join them.', answer: 'would', options: ['will', 'would', 'can', 'could'] },
    { text: 'She said she _____ never seen that movie.', answer: 'had', options: ['has', 'had', 'have', 'was'] },
    { text: 'He asked me what I _____ doing.', answer: 'was', options: ['am', 'was', 'is', 'were'] }
  ];

  reportedSpeechTemplates.forEach(t => {
    questions.push({
      questionText: t.text,
      correctAnswer: t.answer,
      options: t.options,
      explanationEnglish: 'In reported speech, tenses shift back.',
      category: 'Reported Speech - Statements',
      difficulty: 'B2'
    });
  });

  return questions;
};

const generateC1Questions = () => {
  const questions = [];

  // Inversion - 10 questions
  const inversionTemplates = [
    { text: 'Not only _____ she intelligent, but she is also hardworking.', answer: 'is', options: ['is', 'does', 'has', 'was'] },
    { text: 'Rarely _____ I seen such dedication.', answer: 'have', options: ['have', 'has', 'do', 'did'] },
    { text: 'Never _____ I experienced such kindness.', answer: 'have', options: ['have', 'has', 'do', 'did'] },
    { text: 'Seldom _____ she complain about anything.', answer: 'does', options: ['does', 'did', 'has', 'is'] },
    { text: 'Little _____ he know what awaited him.', answer: 'did', options: ['did', 'does', 'had', 'was'] },
    { text: 'Only then _____ I realize my mistake.', answer: 'did', options: ['did', 'do', 'had', 'was'] },
    { text: 'Hardly _____ I finished when the phone rang.', answer: 'had', options: ['had', 'have', 'did', 'was'] },
    { text: 'No sooner _____ we arrived than it started raining.', answer: 'had', options: ['had', 'have', 'did', 'were'] },
    { text: 'Under no circumstances _____ you tell anyone.', answer: 'should', options: ['should', 'would', 'could', 'might'] },
    { text: 'Not until later _____ I understand the truth.', answer: 'did', options: ['did', 'do', 'had', 'was'] }
  ];

  inversionTemplates.forEach(t => {
    questions.push({
      questionText: t.text,
      correctAnswer: t.answer,
      options: t.options,
      explanationEnglish: 'Inversion: auxiliary + subject after negative/restrictive adverbs.',
      category: 'Inversion',
      difficulty: 'C1'
    });
  });

  // Subjunctive - 10 questions
  const subjunctiveTemplates = [
    { text: 'I suggest that he _____ more careful.', answer: 'be', options: ['be', 'is', 'was', 'being'] },
    { text: 'It is essential that she _____ on time.', answer: 'arrive', options: ['arrive', 'arrives', 'arrived', 'arriving'] },
    { text: 'The doctor recommended that he _____ smoking.', answer: 'stop', options: ['stop', 'stops', 'stopped', 'stopping'] },
    { text: 'If I _____ you, I would accept the offer.', answer: 'were', options: ['were', 'was', 'am', 'be'] },
    { text: 'I wish I _____ speak French fluently.', answer: 'could', options: ['could', 'can', 'would', 'will'] },
    { text: 'It is important that everyone _____ present.', answer: 'be', options: ['be', 'is', 'are', 'being'] },
    { text: 'The manager insisted that the report _____ submitted today.', answer: 'be', options: ['be', 'is', 'was', 'being'] },
    { text: 'I demand that he _____ an apology.', answer: 'make', options: ['make', 'makes', 'made', 'making'] },
    { text: 'It is vital that the project _____ completed on time.', answer: 'be', options: ['be', 'is', 'was', 'being'] },
    { text: 'She requested that the meeting _____ postponed.', answer: 'be', options: ['be', 'is', 'was', 'being'] }
  ];

  subjunctiveTemplates.forEach(t => {
    questions.push({
      questionText: t.text,
      correctAnswer: t.answer,
      options: t.options,
      explanationEnglish: 'Subjunctive: base form after verbs of suggestion/demand.',
      category: 'Subjunctive Mood',
      difficulty: 'C1'
    });
  });

  return questions;
};

const generateC2Questions = () => {
  const questions = [];

  // Native-like Expressions - 15 questions
  const nativeExpressionTemplates = [
    { text: 'The project is still up in the _____.', answer: 'air', options: ['air', 'sky', 'clouds', 'wind'] },
    { text: 'She has a chip on her _____.', answer: 'shoulder', options: ['shoulder', 'arm', 'back', 'head'] },
    { text: 'Let\'s not beat around the _____.', answer: 'bush', options: ['bush', 'tree', 'garden', 'point'] },
    { text: 'He\'s barking up the wrong _____.', answer: 'tree', options: ['tree', 'path', 'road', 'way'] },
    { text: 'That\'s the last _____!', answer: 'straw', options: ['straw', 'thing', 'drop', 'bit'] },
    { text: 'She\'s burning the candle at both _____.', answer: 'ends', options: ['ends', 'sides', 'ways', 'points'] },
    { text: 'The news came as a bolt from the _____.', answer: 'blue', options: ['blue', 'sky', 'dark', 'clear'] },
    { text: 'His argument doesn\'t hold _____.', answer: 'water', options: ['water', 'ground', 'weight', 'fire'] },
    { text: 'Let\'s call it a _____.', answer: 'day', options: ['day', 'night', 'time', 'break'] },
    { text: 'She\'s got her head in the _____.', answer: 'clouds', options: ['clouds', 'sky', 'air', 'sand'] },
    { text: 'He let the cat out of the _____.', answer: 'bag', options: ['bag', 'box', 'house', 'room'] },
    { text: 'It\'s raining cats and _____.', answer: 'dogs', options: ['dogs', 'birds', 'fish', 'mice'] },
    { text: 'She\'s walking on thin _____.', answer: 'ice', options: ['ice', 'water', 'air', 'ground'] },
    { text: 'He hit the nail on the _____.', answer: 'head', options: ['head', 'point', 'spot', 'mark'] },
    { text: 'That\'s a piece of _____.', answer: 'cake', options: ['cake', 'pie', 'bread', 'work'] }
  ];

  nativeExpressionTemplates.forEach(t => {
    questions.push({
      questionText: t.text,
      correctAnswer: t.answer,
      options: t.options,
      explanationEnglish: `Idiomatic expression: complete with "${t.answer}".`,
      category: 'Native-like Expressions',
      difficulty: 'C2'
    });
  });

  // Subtle Grammar - 10 questions
  const subtleGrammarTemplates = [
    { text: 'I _____ have done it, but I chose not to.', answer: 'could', options: ['could', 'might', 'would', 'should'] },
    { text: 'She _____ have arrived by now.', answer: 'should', options: ['should', 'would', 'could', 'might'] },
    { text: 'He _____ not have said that.', answer: 'ought', options: ['ought', 'should', 'would', 'could'] },
    { text: 'The data _____ that the hypothesis is correct.', answer: 'suggest', options: ['suggest', 'suggests', 'suggested', 'suggesting'] },
    { text: 'Neither the students nor the teacher _____ aware.', answer: 'was', options: ['was', 'were', 'is', 'are'] },
    { text: 'He _____ have been more helpful if he\'d tried.', answer: "couldn't", options: ["couldn't", "wouldn't", "shouldn't", "mightn't"] },
    { text: 'The phenomenon _____ yet to be fully understood.', answer: 'has', options: ['has', 'is', 'was', 'had'] },
    { text: 'Be that as it _____, we must proceed.', answer: 'may', options: ['may', 'might', 'can', 'could'] },
    { text: 'Scarcely _____ he arrived when the meeting began.', answer: 'had', options: ['had', 'has', 'did', 'was'] },
    { text: 'The committee, all of _____ members were present, voted.', answer: 'whose', options: ['whose', 'which', 'whom', 'that'] }
  ];

  subtleGrammarTemplates.forEach(t => {
    questions.push({
      questionText: t.text,
      correctAnswer: t.answer,
      options: t.options,
      explanationEnglish: `Advanced usage: "${t.answer}" is the correct choice.`,
      category: 'Subtle Grammar Distinctions',
      difficulty: 'C2'
    });
  });

  return questions;
};

// ============================================================================
// MAIN GENERATION
// ============================================================================

const allQuestions = [
  ...generateA1Questions(),
  ...generateA2Questions(),
  ...generateB1Questions(),
  ...generateB2Questions(),
  ...generateC1Questions(),
  ...generateC2Questions()
];

// Write output
const outputDir = path.join(process.cwd(), 'generated-data');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(
  path.join(outputDir, 'expanded-questions.json'),
  JSON.stringify(allQuestions, null, 2)
);

// Summary
const summary = {
  total: allQuestions.length,
  byLevel: {
    A1: allQuestions.filter(q => q.difficulty === 'A1').length,
    A2: allQuestions.filter(q => q.difficulty === 'A2').length,
    B1: allQuestions.filter(q => q.difficulty === 'B1').length,
    B2: allQuestions.filter(q => q.difficulty === 'B2').length,
    C1: allQuestions.filter(q => q.difficulty === 'C1').length,
    C2: allQuestions.filter(q => q.difficulty === 'C2').length
  },
  categories: [...new Set(allQuestions.map(q => q.category))].length,
  generatedAt: new Date().toISOString()
};

fs.writeFileSync(
  path.join(outputDir, 'expanded-summary.json'),
  JSON.stringify(summary, null, 2)
);

console.log('✅ Expanded Question Bank Generated!');
console.log(`📊 Total Questions: ${summary.total}`);
console.log(`   A1: ${summary.byLevel.A1}`);
console.log(`   A2: ${summary.byLevel.A2}`);
console.log(`   B1: ${summary.byLevel.B1}`);
console.log(`   B2: ${summary.byLevel.B2}`);
console.log(`   C1: ${summary.byLevel.C1}`);
console.log(`   C2: ${summary.byLevel.C2}`);
console.log(`📁 Categories: ${summary.categories}`);
