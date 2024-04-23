'use client'

import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import Input from "~/app/_components/input";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

type PasswordResetType = {
  password: string;
  confirmPassword: string;
};

const ResetPassword = ({ params }: { params: { token: string } }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PasswordResetType>();

  const onSubmit = handleSubmit(async (credentials) => {});
  return (
    <div className="mt-20 flex w-full items-center justify-center">
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
                  type="password"
                  required
                />
              </div>
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
              <Link
                href={"/server/login"}
                className="text-blue-400 underline"
              >
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
