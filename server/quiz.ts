import { eq, and, desc, sql } from "drizzle-orm";
import { getDb } from "./db";
import {
  questions,
  userProgress,
  userStats,
  achievements,
  userAchievements,
  avatars,
  feedbackMessages,
} from "../drizzle/schema";

/**
 * Get random questions for quiz
 */
export async function getRandomQuestions(limit: number = 10) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db
    .select()
    .from(questions)
    .orderBy(sql`RAND()`)
    .limit(limit);

  return result.map((q) => ({
    id: q.id,
    questionText: q.questionText,
    questionArabic: q.questionArabic,
    questionFrench: q.questionFrench,
    questionSpanish: q.questionSpanish,
    questionGerman: q.questionGerman,
    questionChinese: q.questionChinese,
    correctAnswer: q.correctAnswer,
    options: JSON.parse(q.options || "[]"),
    category: q.category,
    difficulty: q.difficulty,
    explanationEnglish: q.explanationEnglish,
    explanationArabic: q.explanationArabic,
    explanationFrench: q.explanationFrench,
    explanationSpanish: q.explanationSpanish,
    explanationGerman: q.explanationGerman,
    explanationChinese: q.explanationChinese,
  }));
}

/**
 * Get a specific question by ID
 */
export async function getQuestionById(questionId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db
    .select()
    .from(questions)
    .where(eq(questions.id, questionId))
    .limit(1);

  if (result.length === 0) return null;

  const q = result[0];
  return {
    id: q.id,
    questionText: q.questionText,
    questionArabic: q.questionArabic,
    questionFrench: q.questionFrench,
    questionSpanish: q.questionSpanish,
    questionGerman: q.questionGerman,
    questionChinese: q.questionChinese,
    correctAnswer: q.correctAnswer,
    options: JSON.parse(q.options || "[]"),
    category: q.category,
    difficulty: q.difficulty,
    explanationEnglish: q.explanationEnglish,
    explanationArabic: q.explanationArabic,
    explanationFrench: q.explanationFrench,
    explanationSpanish: q.explanationSpanish,
    explanationGerman: q.explanationGerman,
    explanationChinese: q.explanationChinese,
  };
}

/**
 * Record user answer and update stats
 */
export async function recordAnswer(
  userId: number,
  questionId: number,
  userAnswer: string,
  isCorrect: boolean
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Record the progress
  await db.insert(userProgress).values({
    userId,
    questionId,
    userAnswer,
    isCorrect,
  });

  // Update user stats
  const stats = await db
    .select()
    .from(userStats)
    .where(eq(userStats.userId, userId))
    .limit(1);

  if (stats.length === 0) {
    // Create new stats record
    await db.insert(userStats).values({
      userId,
      totalQuestions: 1,
      correctAnswers: isCorrect ? 1 : 0,
      totalScore: isCorrect ? 10 : 0,
      currentStreak: isCorrect ? 1 : 0,
      bestStreak: isCorrect ? 1 : 0,
      level: 1,
      experiencePoints: isCorrect ? 10 : 0,
      lastPlayedAt: new Date(),
    });
  } else {
    const stat = stats[0];
    const newCorrect = stat.correctAnswers + (isCorrect ? 1 : 0);
    const newTotal = stat.totalQuestions + 1;
    const newScore = stat.totalScore + (isCorrect ? 10 : 0);
    const newStreak = isCorrect ? stat.currentStreak + 1 : 0;
    const newBestStreak = Math.max(stat.bestStreak, newStreak);
    const newXP = stat.experiencePoints + (isCorrect ? 10 : 5);
    const newLevel = Math.floor(newXP / 100) + 1;

    await db
      .update(userStats)
      .set({
        totalQuestions: newTotal,
        correctAnswers: newCorrect,
        totalScore: newScore,
        currentStreak: newStreak,
        bestStreak: newBestStreak,
        level: newLevel,
        experiencePoints: newXP,
        lastPlayedAt: new Date(),
      })
      .where(eq(userStats.userId, userId));

    // Check for achievements
    await checkAndAwardAchievements(userId, newCorrect, newBestStreak, newTotal);
  }
}

/**
 * Get user progress statistics
 */
export async function getUserProgressStats(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const stats = await db
    .select()
    .from(userStats)
    .where(eq(userStats.userId, userId))
    .limit(1);

  if (stats.length === 0) {
    return {
      totalQuestions: 0,
      correctAnswers: 0,
      totalScore: 0,
      currentStreak: 0,
      bestStreak: 0,
      level: 1,
      experiencePoints: 0,
      accuracyRate: 0,
      lastPlayedAt: null,
    };
  }

  const stat = stats[0];
  const accuracyRate =
    stat.totalQuestions > 0
      ? Math.round((stat.correctAnswers / stat.totalQuestions) * 100)
      : 0;

  return {
    totalQuestions: stat.totalQuestions,
    correctAnswers: stat.correctAnswers,
    totalScore: stat.totalScore,
    currentStreak: stat.currentStreak,
    bestStreak: stat.bestStreak,
    level: stat.level,
    experiencePoints: stat.experiencePoints,
    accuracyRate,
    lastPlayedAt: stat.lastPlayedAt,
  };
}

/**
 * Get leaderboard (top players)
 */
export async function getLeaderboard(limit: number = 10) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const results = await db
    .select({
      userId: userStats.userId,
      totalScore: userStats.totalScore,
      correctAnswers: userStats.correctAnswers,
      totalQuestions: userStats.totalQuestions,
      currentStreak: userStats.currentStreak,
      bestStreak: userStats.bestStreak,
      level: userStats.level,
    })
    .from(userStats)
    .orderBy(desc(userStats.totalScore))
    .limit(limit);

  return results.map((r) => ({
    userId: r.userId,
    totalScore: r.totalScore,
    correctAnswers: r.correctAnswers,
    totalQuestions: r.totalQuestions,
    accuracyRate:
      r.totalQuestions > 0
        ? Math.round((r.correctAnswers / r.totalQuestions) * 100)
        : 0,
    currentStreak: r.currentStreak,
    bestStreak: r.bestStreak,
    level: r.level,
  }));
}

/**
 * Get user achievements
 */
export async function getUserAchievements(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const userAchievementsList = await db
    .select({
      id: achievements.id,
      name: achievements.name,
      description: achievements.description,
      icon: achievements.icon,
      requirement: achievements.requirement,
      category: achievements.category,
      earnedAt: userAchievements.earnedAt,
    })
    .from(userAchievements)
    .innerJoin(
      achievements,
      eq(userAchievements.achievementId, achievements.id)
    )
    .where(eq(userAchievements.userId, userId));

  return userAchievementsList;
}

/**
 * Check and award achievements
 */
export async function checkAndAwardAchievements(
  userId: number,
  correctAnswers: number,
  bestStreak: number,
  totalQuestions: number
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const allAchievements = await db.select().from(achievements);

  for (const achievement of allAchievements) {
    let shouldAward = false;

    if (achievement.category === "score" && correctAnswers >= achievement.requirement) {
      shouldAward = true;
    } else if (achievement.category === "streak" && bestStreak >= achievement.requirement) {
      shouldAward = true;
    } else if (achievement.category === "completion" && totalQuestions >= achievement.requirement) {
      shouldAward = true;
    }

    if (shouldAward) {
      // Check if user already has this achievement
      const existing = await db
        .select()
        .from(userAchievements)
        .where(
          and(
            eq(userAchievements.userId, userId),
            eq(userAchievements.achievementId, achievement.id)
          )
        )
        .limit(1);

      if (existing.length === 0) {
        await db.insert(userAchievements).values({
          userId,
          achievementId: achievement.id,
        });
      }
    }
  }
}

/**
 * Get random avatar
 */
export async function getRandomAvatar() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db
    .select()
    .from(avatars)
    .orderBy(sql`RAND()`)
    .limit(1);

  if (result.length === 0) return null;

  const avatar = result[0];
  return {
    id: avatar.id,
    name: avatar.name,
    description: avatar.description,
    imageUrl: avatar.imageUrl,
    personality: avatar.personality,
  };
}

/**
 * Get feedback message for avatar
 */
export async function getFeedbackMessage(
  avatarId: number,
  feedbackType: "correct" | "incorrect"
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db
    .select()
    .from(feedbackMessages)
    .where(
      and(
        eq(feedbackMessages.avatarId, avatarId),
        eq(feedbackMessages.feedbackType, feedbackType)
      )
    )
    .orderBy(sql`RAND()`)
    .limit(1);

  if (result.length === 0) return null;

  const msg = result[0];
  return {
    id: msg.id,
    messageEnglish: msg.messageEnglish,
    messageArabic: msg.messageArabic,
    messageFrench: msg.messageFrench,
    messageSpanish: msg.messageSpanish,
    messageGerman: msg.messageGerman,
    messageChinese: msg.messageChinese,
    feedbackType: msg.feedbackType,
  };
}
