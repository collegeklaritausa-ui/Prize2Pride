import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, unique } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Questions table - stores all A1 grammar questions
 */
export const questions = mysqlTable("questions", {
  id: int("id").autoincrement().primaryKey(),
  questionText: text("questionText").notNull(),
  questionArabic: text("questionArabic"),
  questionFrench: text("questionFrench"),
  questionSpanish: text("questionSpanish"),
  questionGerman: text("questionGerman"),
  questionChinese: text("questionChinese"),
  correctAnswer: varchar("correctAnswer", { length: 100 }).notNull(),
  options: text("options").notNull(), // JSON array of options
  category: varchar("category", { length: 100 }).notNull(),
  difficulty: varchar("difficulty", { length: 50 }).default("A1").notNull(),
  explanationEnglish: text("explanationEnglish"),
  explanationArabic: text("explanationArabic"),
  explanationFrench: text("explanationFrench"),
  explanationSpanish: text("explanationSpanish"),
  explanationGerman: text("explanationGerman"),
  explanationChinese: text("explanationChinese"),
  audioText: text("audioText"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Question = typeof questions.$inferSelect;
export type InsertQuestion = typeof questions.$inferInsert;

/**
 * Avatars table - stores avatar definitions
 */
export const avatars = mysqlTable("avatars", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  description: text("description"),
  imageUrl: text("imageUrl").notNull(),
  personality: varchar("personality", { length: 50 }).notNull(), // encouraging, playful, wise, etc.
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Avatar = typeof avatars.$inferSelect;
export type InsertAvatar = typeof avatars.$inferInsert;

/**
 * Feedback messages table - stores avatar feedback for correct/incorrect answers
 */
export const feedbackMessages = mysqlTable("feedbackMessages", {
  id: int("id").autoincrement().primaryKey(),
  avatarId: int("avatarId").notNull(),
  messageEnglish: text("messageEnglish").notNull(),
  messageArabic: text("messageArabic"),
  messageFrench: text("messageFrench"),
  messageSpanish: text("messageSpanish"),
  messageGerman: text("messageGerman"),
  messageChinese: text("messageChinese"),
  feedbackType: mysqlEnum("feedbackType", ["correct", "incorrect"]).notNull(),
  audioUrl: text("audioUrl"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type FeedbackMessage = typeof feedbackMessages.$inferSelect;
export type InsertFeedbackMessage = typeof feedbackMessages.$inferInsert;

/**
 * User progress table - tracks individual question attempts
 */
export const userProgress = mysqlTable("userProgress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  questionId: int("questionId").notNull(),
  userAnswer: varchar("userAnswer", { length: 100 }).notNull(),
  isCorrect: boolean("isCorrect").notNull(),
  attemptedAt: timestamp("attemptedAt").defaultNow().notNull(),
});

export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = typeof userProgress.$inferInsert;

/**
 * User stats table - aggregated statistics per user
 */
export const userStats = mysqlTable("userStats", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  totalQuestions: int("totalQuestions").default(0).notNull(),
  correctAnswers: int("correctAnswers").default(0).notNull(),
  totalScore: int("totalScore").default(0).notNull(),
  currentStreak: int("currentStreak").default(0).notNull(),
  bestStreak: int("bestStreak").default(0).notNull(),
  level: int("level").default(1).notNull(),
  experiencePoints: int("experiencePoints").default(0).notNull(),
  lastPlayedAt: timestamp("lastPlayedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserStats = typeof userStats.$inferSelect;
export type InsertUserStats = typeof userStats.$inferInsert;

/**
 * Achievements table - defines available achievements
 */
export const achievements = mysqlTable("achievements", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  description: text("description").notNull(),
  icon: varchar("icon", { length: 50 }).notNull(),
  requirement: int("requirement").notNull(),
  category: mysqlEnum("category", ["score", "streak", "completion", "special"]).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Achievement = typeof achievements.$inferSelect;
export type InsertAchievement = typeof achievements.$inferInsert;

/**
 * User achievements table - tracks which achievements users have earned
 */
export const userAchievements = mysqlTable("userAchievements", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  achievementId: int("achievementId").notNull(),
  earnedAt: timestamp("earnedAt").defaultNow().notNull(),
}, (table) => ({
  uniqueUserAchievement: unique().on(table.userId, table.achievementId),
}));

export type UserAchievement = typeof userAchievements.$inferSelect;
export type InsertUserAchievement = typeof userAchievements.$inferInsert;