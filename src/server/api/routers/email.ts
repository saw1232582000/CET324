
import { createTRPCRouter, publicProcedure } from "../trpc";

export const mailRouter = createTRPCRouter({
  sendTestMail: publicProcedure.mutation(async ({ ctx }) => {
    try {
      //todo:send mail
    } catch (e: unknown) {
      return null;
    }
  }),
});
