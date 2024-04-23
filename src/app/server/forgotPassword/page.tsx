'use client'

import Link from 'next/link';
import React from 'react'
import { useForm } from 'react-hook-form';
import Input from '~/app/_components/input';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { sendMail } from '~/lib/email/email.js/send-mail';



type ForgotPasswordApplyType = {
    email: string;
    
  };
const ForgotPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm<ForgotPasswordApplyType>();
    
      const onSubmit = handleSubmit(async (credentials) => {
        await sendMail(credentials.email)
      });
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
              Apply
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
  )
}

export default ForgotPassword

