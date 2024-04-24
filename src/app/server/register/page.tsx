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
import {
  hasPasswordCriteria,
  testPasswordStrength,
} from "~/lib/util/testPasswordStrength";
import PasswordStrengthBar from "~/app/_components/passwordStrengthBar";
import { useToast } from "~/components/ui/use-toast";
import { Toaster } from "~/components/ui/toaster";
import { ValidateEmail } from "~/lib/util/validateEmail";

type RegisterProps = {
  name: string;
  email:string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [isHuman, setIsHuman] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [captchaToken, setCaptchaToke] = useState<string | null>(null);
  const recaptchaRef = React.createRef();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterProps>();
  const captcha = api.auth.validateRecaptcha.useMutation({
    onSuccess: () => {
      setIsHuman(true);
      setCaptchaToke(null);
    },
    onError: () => {
      setIsHuman(false);
      setCaptchaToke(null);
    },
  });
  const registerEndpoint = api.auth.register.useMutation({
    onError: (error) => {
      toast({
        description: error?.message,
      });
    },
    onSuccess: () => {
      setDialogOpen(true);
    },
  });
  const onCaptchaChange = (value: any) => {
    setCaptchaToke(value);
    captcha.mutate({
      token: value,
    });
  };

  const testPassStrength = (e: any) => {
    e.preventDefault();
    const currentScore = testPasswordStrength(e.target.value);
    console.log(currentScore);
    setScore(currentScore);
  };

  const onSubmit = handleSubmit(async (credentials) => {
    try {
      if (credentials?.password !== credentials.confirmPassword) {
        throw new Error("Confirm password doesn't match");
      }
      if (!isHuman) {
        throw new Error("Verify you are human");
      }
      if(!ValidateEmail(credentials.email)){
        throw new Error("Invalid Email");
      }
      if (!hasPasswordCriteria(credentials.password)) {
        throw new Error(
          "Your password should have below characteristic \n -minimum of 8 characters\n -at least one lower-case,\n -at least one upper-case,\n -at least one number\n -at least one special character",
        );
      }
      registerEndpoint?.mutate({
        name: credentials?.name,
        email:credentials.email,
        password: credentials.password,
      });
    } catch (e) {
      const error = e as Error;
      toast({
        variant: "destructive",
        description: error.message,
      });
    }
    //TODO: implement registration here
  });

  return (
    <div className="mt-20 flex w-full flex-col items-center justify-center gap-y-2 px-[10px] sm:px-0">
      <Toaster className="font-bold" />
      <Dialog open={dialogOpen}>
        <DialogTrigger></DialogTrigger>
        <DialogContent className="flex h-[300px]  w-full flex-col items-center justify-center  rounded-[5px] p-[10px] sm:w-[500px] sm:p-0">
          <div className="flex w-full flex-row items-center justify-center gap-x-3 text-3xl font-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              fill="#000000"
              version="1.1"
              id="Capa_1"
              width="70px"
              height="70px"
              viewBox="0 0 98.25 98.25"
              color="white"
              className="rounded-full bg-green-400 stroke-white p-2"
            >
              <g>
                <g className="stroke-white">
                  <path d="M49.125,0C22.037,0,0,22.038,0,49.125S22.037,98.25,49.125,98.25S98.25,76.212,98.25,49.125S76.213,0,49.125,0z     M49.125,88.25C27.551,88.25,10,70.699,10,49.125S27.551,10,49.125,10S88.25,27.551,88.25,49.125S70.699,88.25,49.125,88.25z" />
                  <path d="M77.296,33.027L71.02,26.75c-0.442-0.442-1.227-0.442-1.668,0L39.67,56.432L28.898,45.661    c-0.441-0.442-1.225-0.442-1.668,0l-6.276,6.276c-0.222,0.222-0.346,0.521-0.346,0.834c0,0.313,0.124,0.613,0.346,0.834    l17.882,17.881c0.23,0.229,0.531,0.346,0.834,0.346c0.301,0,0.604-0.115,0.834-0.346l36.792-36.792    c0.222-0.221,0.347-0.521,0.347-0.834S77.518,33.248,77.296,33.027z" />
                </g>
              </g>
            </svg>
            <span>Registration Compelete</span>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-y-[10px] pt-[20px] px-[20px] sm:px-0">
            <Link href={"/server/login"}
            className="flex w-full items-center justify-center"
            >
              <button className=" bg-black text-white sm:w-[300px] py-3 rounded-[5px] w-full">
                Login Now
              </button>
            </Link>
            <button
              className=" bg-black text-white sm:w-[300px] py-3 rounded-[5px]  w-full"
              onClick={() => {
                setDialogOpen(false);
              }}
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>
      <Card className="w-full shadow-lg sm:w-[350px]">
        <CardHeader className="flex w-full items-center">
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent className="px-7 pb-9 pt-7">
          <form onSubmit={onSubmit}>
            <div className="grid w-full items-center gap-y-2">
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
                <span>Email</span>
                <Input
                  label="email"
                  {...register("email", { required: "email required" })}
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
                  onChange={testPassStrength}
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
                Register
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
