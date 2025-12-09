CREATE TABLE `achievements` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text NOT NULL,
	`icon` varchar(50) NOT NULL,
	`requirement` int NOT NULL,
	`category` enum('score','streak','completion','special') NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `achievements_id` PRIMARY KEY(`id`),
	CONSTRAINT `achievements_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `avatars` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	`imageUrl` text NOT NULL,
	`personality` varchar(50) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `avatars_id` PRIMARY KEY(`id`),
	CONSTRAINT `avatars_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `feedbackMessages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`avatarId` int NOT NULL,
	`messageEnglish` text NOT NULL,
	`messageArabic` text,
	`messageFrench` text,
	`messageSpanish` text,
	`messageGerman` text,
	`messageChinese` text,
	`feedbackType` enum('correct','incorrect') NOT NULL,
	`audioUrl` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `feedbackMessages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `questions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`questionText` text NOT NULL,
	`questionArabic` text,
	`questionFrench` text,
	`questionSpanish` text,
	`questionGerman` text,
	`questionChinese` text,
	`correctAnswer` varchar(100) NOT NULL,
	`options` text NOT NULL,
	`category` varchar(100) NOT NULL,
	`difficulty` varchar(50) NOT NULL DEFAULT 'A1',
	`explanationEnglish` text,
	`explanationArabic` text,
	`explanationFrench` text,
	`explanationSpanish` text,
	`explanationGerman` text,
	`explanationChinese` text,
	`audioText` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `questions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userAchievements` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`achievementId` int NOT NULL,
	`earnedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `userAchievements_id` PRIMARY KEY(`id`),
	CONSTRAINT `userAchievements_userId_achievementId_unique` UNIQUE(`userId`,`achievementId`)
);
--> statement-breakpoint
CREATE TABLE `userProgress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`questionId` int NOT NULL,
	`userAnswer` varchar(100) NOT NULL,
	`isCorrect` boolean NOT NULL,
	`attemptedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `userProgress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `userStats` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`totalQuestions` int NOT NULL DEFAULT 0,
	`correctAnswers` int NOT NULL DEFAULT 0,
	`totalScore` int NOT NULL DEFAULT 0,
	`currentStreak` int NOT NULL DEFAULT 0,
	`bestStreak` int NOT NULL DEFAULT 0,
	`level` int NOT NULL DEFAULT 1,
	`experiencePoints` int NOT NULL DEFAULT 0,
	`lastPlayedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `userStats_id` PRIMARY KEY(`id`),
	CONSTRAINT `userStats_userId_unique` UNIQUE(`userId`)
);
