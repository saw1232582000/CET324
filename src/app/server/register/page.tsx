"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import Input from "~/app/_components/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "~/components/ui/dialog";
import { api } from "~/trpc/react";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { recaptchaKey } from "~/lib/config/reactpcha";

type RegisterProps = {
  name: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [isHuman,setIsHuman]=useState<boolean>(false)
  const [captchaToken,setCaptchaToke]=useState<string |  null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterProps>();
  const captcha=api.auth.validateRecaptcha.useMutation({
    onSuccess:()=>{
      setIsHuman(true)
      setCaptchaToke(null)
      
    },
    onError:()=>{
      setIsHuman(false)
      setCaptchaToke(null)
    }
  })
  const registerEndpoint = api.auth.register.useMutation({
    onError: (error) => {
      alert(error?.message);
    },
    onSuccess: () => {
      alert("Registration Success");
    },
  });
  const onCaptchaChange=(value:any)=>{
    setCaptchaToke(value)
    captcha.mutate({
      token:value
    })
  }

  const onSubmit = handleSubmit(async (credentials) => {
    try {
      if (credentials?.password !== credentials.confirmPassword) {
        throw new Error("Confirm password doesn't match");
      }
      if(!isHuman){
        throw new Error("Verify you are human")
      }
      registerEndpoint?.mutate({
        name: credentials?.name,
        password: credentials.password,
      });
    } catch (e) {
      const error = e as Error;
      alert(error.message);
    }
    //TODO: implement registration here
  });

  return (
    <div className="mt-20 flex w-full items-center flex-col justify-center px-[10px] sm:px-0 gap-y-2">
      <Dialog open={dialogOpen}>
        <DialogTrigger></DialogTrigger>
        <DialogContent className="flex h-[400px] w-full flex-col items-center rounded-none p-0 sm:w-[1000px] sm:rounded-none">
          <button
            className="w-[100px] bg-black text-white"
            onClick={() => {
              setDialogOpen(false);
            }}
          >
            Close
          </button>
        </DialogContent>
      </Dialog>
      <Card className="w-full shadow-lg sm:w-[350px]">
        <CardHeader className="flex w-full items-center">
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent className="px-7 pb-9 pt-7">
          <form onSubmit={onSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <span>Username</span>
                <Input
                  label="username"
                  {...register("name", { required: "username required" })}
                  errors={errors}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <span>Password</span>
                <Input
                  label="password"
                  {...register("password", { required: "password required" })}
                  type="password"
                  errors={errors}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <span>Confirm Password</span>
                <Input
                  label="password"
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
                Sign In
              </button>
            </div>
          </form>
          <div className="mt-[10px] flex w-full items-center justify-center text-center">
            <span>
              Already Have an account?{" "}
              <Link href={"/server/login"} className="text-blue-400 underline">
                Sign In
              </Link>
            </span>
          </div>
        </CardContent>
      </Card>
      <ReCAPTCHA sitekey={recaptchaKey.siteKey} onChange={onCaptchaChange} />
    </div>
  );
};

export default Register;
