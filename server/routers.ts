import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  getRandomQuestions,
  getQuestionById,
  recordAnswer,
  getUserProgressStats,
  getLeaderboard,
  getUserAchievements,
  getRandomAvatar,
  getFeedbackMessage,
} from "./quiz";
import { sendVerificationCode, verifyCode } from "./gmail-auth";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
    sendVerificationCode: publicProcedure
      .input(z.object({ email: z.string().email() }))
      .mutation(async ({ input }) => {
        await sendVerificationCode(input.email);
        return { success: true, message: "Code sent to email" };
      }),
    verifyCode: publicProcedure
      .input(z.object({ email: z.string().email(), code: z.string().length(6) }))
      .mutation(async ({ input }) => {
        return await verifyCode(input.email, input.code);
      }),
  }),

  quiz: router({
    getQuestions: publicProcedure
      .input(z.object({ limit: z.number().default(10) }))
      .query(async ({ input }) => {
        return await getRandomQuestions(input.limit);
      }),

    getQuestion: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await getQuestionById(input.id);
      }),

    submitAnswer: protectedProcedure
      .input(
        z.object({
          questionId: z.number(),
          userAnswer: z.string(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        const question = await getQuestionById(input.questionId);
        if (!question) {
          throw new Error("Question not found");
        }

        const isCorrect =
          input.userAnswer.toLowerCase() === question.correctAnswer.toLowerCase();

        await recordAnswer(
          ctx.user.id,
          input.questionId,
          input.userAnswer,
          isCorrect
        );

        const avatar = await getRandomAvatar();
        const feedback = await getFeedbackMessage(
          avatar?.id || 1,
          isCorrect ? "correct" : "incorrect"
        );

        return {
          isCorrect,
          correctAnswer: question.correctAnswer,
          explanation: question.explanationArabic || question.explanationEnglish,
          avatar,
          feedback,
        };
      }),
  }),

  progress: router({
    getStats: protectedProcedure.query(async ({ ctx }) => {
      return await getUserProgressStats(ctx.user.id);
    }),
  }),

  leaderboard: router({
    getTop: publicProcedure
      .input(z.object({ limit: z.number().default(10) }))
      .query(async ({ input }) => {
        return await getLeaderboard(input.limit);
      }),
  }),

  achievements: router({
    getUserAchievements: protectedProcedure.query(async ({ ctx }) => {
      return await getUserAchievements(ctx.user.id);
    }),
  }),
});

export type AppRouter = typeof appRouter;
