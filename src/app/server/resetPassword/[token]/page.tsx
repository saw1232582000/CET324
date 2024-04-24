"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "~/app/_components/input";
import PasswordStrengthBar from "~/app/_components/passwordStrengthBar";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Toaster } from "~/components/ui/toaster";
import { useToast } from "~/components/ui/use-toast";
import {
  hasPasswordCriteria,
  testPasswordStrength,
} from "~/lib/util/testPasswordStrength";
import { api } from "~/trpc/react";

type PasswordResetType = {
  password: string;
  confirmPassword: string;
};

const ResetPassword = ({ params }: { params: { token: string } }) => {
  const [score, setScore] = useState<number>(0);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PasswordResetType>();

  const testPassStrength = (e: any) => {
    e.preventDefault();
    const currentScore = testPasswordStrength(e.target.value);
    console.log(currentScore);
    setScore(currentScore);
  };

  const passwordReset = api.auth.resetPassword.useMutation({
    onSuccess(data, variables, context) {
      toast({
        description: "Your Password has been updated successfully",
      });
    },
    onError(error, variables, context) {
      toast({
        variant: "destructive",
        description: error.message,
      });
    },
  });

  const onSubmit = handleSubmit(async (credentials) => {
    try {
      if (credentials?.password !== credentials.confirmPassword) {
        throw new Error("Confirm password doesn't match");
      }
      console.log(hasPasswordCriteria(credentials.password))
      if (!hasPasswordCriteria(credentials.password)) {
        throw new Error(
          "Your password should have below characteristic \n -minimum of 8 characters\n -at least one lower-case,\n -at least one upper-case,\n -at least one number\n -at least one special character",
        );
      }
      passwordReset.mutate({
        password:credentials.password,
        token:params.token
      })
    } catch (e) {
      const error = e as Error;
      toast({
        variant: "destructive",
        description: error.message,
      });
    }
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
                <span>Password</span>
                <Input
                  label="password"
                  {...register("password", { required: "username required" })}
                  errors={errors}
                  onChange={testPassStrength}
                  type="password"
                  required
                />
              </div>
              {score > 0 && (
                <div className="mb-2 flex w-full">
                  <PasswordStrengthBar score={score} />
                </div>
              )}
              <div className="flex flex-col space-y-1.5">
                <span>Confirm Password</span>
                <Input
                  label="confirm password"
                  {...register("confirmPassword", {
                    required: "password required",
                  })}
                  type="password"
                  errors={errors}
                  required
                />
              </div>
              <button
                className="mt-[10px] w-full rounded bg-[#050708] py-2 text-white hover:bg-[#050708]/90"
                type="submit"
              >
                Reset
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

export default ResetPassword;
