"use client";

import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { LoginSchema } from "@/schema/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import GoogleIcon from "../ui/google";
import { toast } from "sonner";
import { login } from "@/actions/login";
import useUserStore from "@/lib/store";

const LoginForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isContainValues, setIsContainValues] = useState(false);
  const { triggerRefresh } = useUserStore();

  const path = usePathname();
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const watchedValues = form.watch();

  //  To update the LOG-IN button and Login-By-Google-Button
  useEffect(() => {
    if (watchedValues.email?.length > 1 || watchedValues.password?.length > 1) {
      setIsContainValues(true);
    } else {
      setIsContainValues(false);
    }
  }, [watchedValues.email, watchedValues.password]);

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setLoading(true);

    try {
      const result = await login(data);

      if (result?.success) {
        toast("User Logged In Successfully");
        triggerRefresh();
        router.push("/");
      } else {
        toast.error(result?.error || "Login failed");
      }
    } catch (err: any) {
      toast.error(err?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex flex-col gap-10 relative w-2/3 h-screen items-center justify-center">
        {/* Login / Register Heading  */}
        <div className="flex gap-2 items-end mb-6 md:mb-10">
          <Link
            href="/login"
            className={` ${
              path === "/login"
                ? "font-semibold text-3xl"
                : "text-accent-foreground/90 font-medium "
            }`}
          >
            Log In
          </Link>
          /
          <Link
            href="/register"
            className={` ${
              path === "/register"
                ? "font-semibold"
                : "text-accent-foreground/90 font-medium "
            }`}
          >
            Register
          </Link>
        </div>

        <Form {...form}>
          <form className="flex flex-col md:flex-row justify-center items-center gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col relative">
                  <FormControl>
                    <input
                      {...field}
                      placeholder="Enter Your Email"
                      type="email"
                      className="
                    flex h-11 w-full min-w-64 border border-muted-foreground/70 rounded-3xl bg-transparent px-6 py-1 transition-colors file:border-0 file:bg-transparent
                    file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus:ring-1 focus:ring-primary focus:border-none"
                    />
                  </FormControl>
                  <FormMessage className="absolute -bottom-6 left-5" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex flex-col relative">
                  <FormControl>
                    <input
                      {...field}
                      placeholder="Enter Password"
                      type={isPasswordVisible ? "text" : "password"}
                      className="
                    flex h-11 w-full min-w-64    border border-muted-foreground/70 rounded-3xl bg-transparent px-6 py-1 transition-colors file:border-0 file:bg-transparent
                    file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus:ring-1 focus:ring-primary focus:border-none"
                    />
                  </FormControl>
                  <FormMessage className="absolute -bottom-6 left-5" />
                </FormItem>
              )}
            />
          </form>

          {/* Button - submit form  */}
          <div className="flex flex-col w-full gap-5 justify-center items-center -mt-4 md:mt-0">
            {isContainValues ? (
              <button
                onClick={form.handleSubmit(onSubmit)}
                className=" 
                flex items-center justify-center gap-1.5 py-2 h-11 px-6
                text-secondary bg-primary
                rounded-3xl w-full min-w-60 max-w-64 md:max-w-[536px] text-center font-semibold
                shadow-[-5px_-5px_10px_rgba(255,_255,_255,_0.8),_5px_5px_10px_rgba(0,_0,_0,_0.25)]
                hover:bg-primary/90
                transition-all
                duration-300
            "
              >
                {loading ? (
                  <Loader2 className="animate-spin w-6 h-6" />
                ) : (
                  <span>Log In</span>
                )}
              </button>
            ) : (
              <button
                className="
              flex justify-center items-center gap-2 h-11 w-full min-w-60 max-w-64 md:max-w-[536px] border border-muted-foreground/70 rounded-3xl hover:bg-accent-foreground/5
              bg-transparent px-6 py-1 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground 
              focus-visible:outline-none focus:ring-1 focus:ring-primary focus:border-none"
              >
                <GoogleIcon />
                <div>Continue with Google</div>
              </button>
            )}
          </div>
        </Form>
      </div>

      <div className="hidden lg:flex w-1/3">
        <img
          src="/login.svg"
          alt="login-img"
          className="w-60 lg:w-[350px] xl:w-[500px] h-60 lg:h-[350px] xl:h-[500px] "
        />
      </div>
    </div>
  );
};

export default LoginForm;
