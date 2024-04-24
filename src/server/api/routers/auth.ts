import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { hash } from "argon2";
import { TRPCError } from "@trpc/server";
import { recaptchaKey } from "~/lib/config/reactpcha";
import { generateTokenExpiredDate } from "~/lib/util/generateTokenExpireDate";

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
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const user = await ctx.prisma.user.create({
          data: {
            name: input.name,
            email: input.email,
            password: await hash(input.password),
          },
        });
        return user;
      } catch (e: unknown) {
        const error = e as PrismaError;
        if (error.code == "P2002")
          throw new Error("email is already registered");
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
        const data = new FormData();
        data.append("secret", recaptchaKey.secretKey);
        data.append("response", input.token);

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
        const myResponse = await response.json();
        console.log(
          "\nResponse data from https://www.google.com/recaptcha/api/siteverify:",
        );
        console.log(myResponse);
        if (myResponse?.success == true) {
          return true;
        } else {
          throw new Error("Captcha validation fail");
        }
      } catch (e: unknown) {
        const error = e as Error;
        throw new Error(error?.message);
      }
    }),
  requestResetPassword: publicProcedure
    .input(
      z.object({
        email: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const reset = await ctx.prisma.resetPassword.create({
          data: {
            email: input.email,
            tokenExpireDate: generateTokenExpiredDate(5),
            isUsed: false,
          },
        });
        return reset;
      } catch (e) {
        throw new Error("Password Reset Fail");
      }
    }),
  resetPassword: publicProcedure
    .input(
      z.object({
        password: z.string(),
        token: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const tokenCheck = await ctx.prisma.resetPassword.findFirst({
          where: {
            token: input.token,
          },
        });
        if (!tokenCheck) {
          throw new Error("Invalid Token");
        }
        else if(tokenCheck.isUsed){
          throw new Error("This link is invalid");
        }
        else {
          const expiredate = tokenCheck?.tokenExpireDate || "";
          const tokenExpiredDate = new Date(expiredate);
          const currentDate = new Date();
          if (tokenExpiredDate < currentDate) {
            throw new Error("Token Expired");
          } else {
            try {
              await ctx.prisma.resetPassword.update({
                where:{
                  token:tokenCheck.token
                },
                data:{
                  
                  isUsed:true,
                }
              })
              const response = await ctx.prisma.user.update({
                where: {
                  email: tokenCheck.email || "",
                },
                data: {
                  password: await hash(input.password),
                },
              });
              return response;
            } catch (e) {}
          }
        }
      } catch (e) {
        const error = e as Error;
        throw new Error(error?.message);
      }
    }),
});
