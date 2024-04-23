import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { hash } from "argon2";

import { TRPCError } from "@trpc/server";
import { recaptchaKey } from "~/lib/config/reactpcha";

export interface PrismaError extends Error {
  code: string;
  meta?: {
    target?: string[];
  };
}

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        /*User Data*/
        name: z.string(),
        email:z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const user = await ctx.prisma.user.create({
          data: {
            name: input.name,
            email:input.email,
            password: await hash(input.password),
          },
        });
        return user;
      } catch (e: unknown) {
        const error = e as PrismaError;
        if (error.code == "P2002") throw new Error("email is already registered");
      }
    }),
  validateRecaptcha: publicProcedure
    .input(
      z.object({
        token: z.any(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const data=new FormData()
        data.append("secret",recaptchaKey.secretKey)
        data.append("response",input.token)
               
        const response = await fetch(
          "https://www.google.com/recaptcha/api/siteverify",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              // "Content-Type": "application/json",
            },
            body: `secret=${recaptchaKey.secretKey}&response=${input.token}`,
          },
        );
        const myResponse=await response.json()
        console.log("\nResponse data from https://www.google.com/recaptcha/api/siteverify:");
        console.log(myResponse);
        if(myResponse?.success == true){
          return true
        }
        else{
          throw new Error("Captcha validation fail")
        }
      } catch (e:unknown) {
        const error=e as Error
        throw new Error(error?.message)
      }
    }),
});
