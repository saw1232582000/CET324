"use client";

import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import Input from "~/app/_components/input";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Toaster } from "~/components/ui/toaster";
import { useToast } from "~/components/ui/use-toast";
import { sendMail } from "~/lib/email/email.js/send-mail";
import { api } from "~/trpc/react";

type ForgotPasswordApplyType = {
  email: string;
};
const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordApplyType>();

  const { toast } = useToast();

  const requestPasswordResetLink = api.auth.requestResetPassword.useMutation({
    async onSuccess(data, variables, context) {
      await sendMail(data.email, data.token);
      toast({
        description: "Your reset link has been sent to your mail.",
      });
    },
  });

  const onSubmit = handleSubmit(async (credentials) => {
    requestPasswordResetLink.mutate({
      email: credentials.email,
    });
  });
  return (
    <div className="mt-20 flex w-full items-center justify-center">
      <Toaster className="font-bold" />
      <Card className="w-full shadow-lg sm:w-[350px]">
        <CardHeader className="flex w-full items-center">
          <CardTitle>Reset Password</CardTitle>
        </CardHeader>
        <CardContent className="flex w-full flex-col items-center px-7 pb-9 pt-7">
          <form onSubmit={onSubmit} className="flex w-full flex-col">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <span>Email</span>
                <Input
                  label="email"
                  {...register("email", { required: "username required" })}
                  errors={errors}
                  type="email"
                  required
                />
              </div>

              <button
                className="mt-[10px] w-full rounded bg-[#050708] py-2 text-white hover:bg-[#050708]/90"
                type="submit"
              >
                {requestPasswordResetLink.isLoading ? (
                  <>
                    <div
                      role="status"
                      className="flex w-full items-center justify-center"
                    >
                      <svg
                        aria-hidden="true"
                        className="mr-2 h-6 w-6 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      
                    </div>
                  </>
                ) : (
                  <>Apply</>
                )}
              </button>
            </div>
          </form>
          <div className="mt-[10px] flex w-full flex-col items-center justify-center text-center">
            <span>
              <Link href={"/server/login"} className="text-blue-400 underline">
                Back
              </Link>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
