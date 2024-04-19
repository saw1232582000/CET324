"use client";

import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import Input from "~/app/_components/input";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingIcon from "~/app/_components/icon/loading-icon";
import Link from "next/link";

type SignInType = {
  name: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInType>();

  const onSubmit = handleSubmit(async (credentials) => {
    toast("Pleas wait...", {
      duration: Infinity,
      position: "top-center",

      // Styling
      style: {},
      className: "",

      // Custom Icon
      //icon: "👏",
      icon: <LoadingIcon />,

      // Change colors of success/error/loading icon
      iconTheme: {
        primary: "#000",
        secondary: "#fff",
      },

      // Aria
      ariaProps: {
        role: "status",
        "aria-live": "polite",
      },
    });
    const res = await signIn("credentials", {
      name: credentials.name,
      password: credentials.password,
      //callbackUrl:'/app/wallet',
      redirect: false,
    });
    console.log(res);
    if (res?.status === 401) {
      //alert("invalid credentials");
      toast.remove();
      toast.error("Invalid Credentials");
    } else {
      toast.remove();
      router.push("/dashboard");
    }
  });

  return (
    <div className="mt-20 flex w-full items-center justify-center">
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 1000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
      <Card className="w-full shadow-lg sm:w-[350px]">
        <CardHeader className="flex w-full items-center">
          <CardTitle>Sign In</CardTitle>
        </CardHeader>
        <CardContent className="px-7 pb-9 pt-7 flex w-full flex-col items-center">
          <form onSubmit={onSubmit} className="flex w-full flex-col">
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
              <button
                className="w-full rounded bg-[#050708] py-2 text-white hover:bg-[#050708]/90 mt-[10px]"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
          <div className="flex w-full items-center text-center justify-center mt-[10px]">
            <span>
              Don't have an account?{" "}
              <Link
                href={"/server/register"}
                className="text-blue-400 underline"
              >
                Sign Up
              </Link>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
