"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { SignInSchema } from "@/form-schemas/SignInSchema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useLogInMutation } from "@/store/api/authApi";
import { useAppDispatch } from "@/store";
import { loginSuccess } from "@/store/slice/authSlice";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

interface JwtPayload {
  exp: number; // Expiration time as a UNIX timestamp
}

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [logIn, { data, error, isLoading, isSuccess }] = useLogInMutation();
  const dispatch = useAppDispatch();

  const onSubmit = async (values: z.infer<typeof SignInSchema>) => {
    try {
      const result = await logIn(values).unwrap();
      dispatch(loginSuccess({ ...result }));

      toast.success("Log in successful!");
      router.push("/");
    } catch (err) {
      console.error("Log in failed:", err);
    }
  };
  return (
    <div
      className={cn("grid grid-cols-2 gap-6 h-screen", className)}
      {...props}
    >
      {/* Left column with background image and logo */}
      <div className="relative w-full h-full">
        <Image
          src="/landscape-placeholder.svg"
          alt="Background Thumbnail"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute top-4 left-4">
          <Link
            href="/"
            className="font-black text-[20px] text-primary hover:underline"
          >
            Engiunity
          </Link>
        </div>
      </div>

      {/* Right column with signup form */}
      <div className="mx-6 flex  flex-col justify-center">
        <CardHeader>
          <CardTitle className="text-2xl">Đăng nhập</CardTitle>
          <CardDescription>
            Nhập những thông tin cá nhân bên dưới để đăng nhập.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <FormField
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} type="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mật khẩu</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} type="password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Đăng nhập
                </Button>
                <Button variant="outline" className="w-full">
                  Đăng nhập với Google
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Chưa có tài khoản?{" "}
                <Link
                  href="/sign-up"
                  className="font-bold  underline underline-offset-4"
                >
                  Đăng ký
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </div>
    </div>
  );
}
