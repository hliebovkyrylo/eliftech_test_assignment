import { Button } from "@/components/button";
import { Input } from "@/components/input";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { SignInInput, signInSchema } from "./schemas/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api/api";
import { AxiosError } from "axios";
import { ErrorResponse, SuccessResponse } from "@/lib/types/apiResponse";
import { useState } from "react";
import cookie from "js-cookie";

export const SignInForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: SignInInput) => {
      const response = await api.signIn(data);
      return response.data;
    },
    onError: (response: AxiosError<ErrorResponse>) => {
      setError(response.response?.data.error_message || null);
    },
    onSuccess: (response: SuccessResponse<{ access_token: string }>) => {
      cookie.set("accessToken", response.data.access_token);
      router.push("/");
    },
  });

  const onSubmit = handleSubmit((data: SignInInput) => {
    mutation.mutate(data);
  });

  return (
    <form
      onSubmit={!mutation.isPending ? onSubmit : () => {}}
      className="flex flex-col gap-3 max-w-96 w-full bg-slate-900 p-5 rounded-2xl"
    >
      <h1 className="text-center text-white text-lg">Sign In</h1>
      <div className="text-red-400">{error}</div>
      <Input
        {...register("email")}
        disabled={mutation.isPending}
        required
        placeholder="Enter email"
      />
      <Input {...register("password")} required placeholder="Enter password" />
      <Button
        type="submit"
        className="bg-amber-200 cursor-pointer hover:bg-amber-100 transition-colors text-black text-base"
      >
        {mutation.isPending || mutation.isSuccess ? "Loading..." : "Sign In"}
      </Button>
      <div className="text-white">
        Don&apos;t have an account?{" "}
        <Link className="text-slate-400" href={"/sign-up"}>
          Sign Up
        </Link>
      </div>
    </form>
  );
};
