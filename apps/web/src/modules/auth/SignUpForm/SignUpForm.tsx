import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SignUpInput, signUpSchema } from "./schemas/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api/api";
import { AxiosError } from "axios";
import { ErrorResponse, SuccessResponse } from "@/lib/types/apiResponse";
import cookie from "js-cookie";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import Link from "next/link";

export const SignUpForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: SignUpInput) => {
      const response = await api.signUp(data);
      return response.data;
    },
    onError: (response: AxiosError<ErrorResponse>) => {
      setError(response.response?.data.error_message || null);
    },
    onSuccess: (response: SuccessResponse<{ accessToken: string }>) => {
      cookie.set("accessToken", response.data.accessToken);
      router.push("/");
    },
  });

  const onSubmit = handleSubmit((data: SignUpInput) => {
    mutation.mutate(data);
  });

  return (
    <form
      onSubmit={!mutation.isPending ? onSubmit : () => {}}
      className="flex flex-col gap-3 max-w-96 w-full bg-slate-900 p-5 rounded-2xl"
    >
      <h1 className="text-center text-white text-lg">Sign Up</h1>
      <div className="text-red-400">{error}</div>
      <Input
        {...register("email")}
        disabled={mutation.isPending}
        required
        placeholder="Enter email"
      />
      <Input {...register("password")} required placeholder="Enter password" />
      <Input {...register("name")} required placeholder="Enter your name" />
      <Button
        type="submit"
        className="bg-amber-200 cursor-pointer hover:bg-amber-100 transition-colors text-black text-base"
      >
        {mutation.isPending || mutation.isSuccess ? "Loading..." : "Sign In"}
      </Button>
      <div className="text-white">
        Already have an account?{" "}
        <Link className="text-slate-400" href={"/sign-in"}>
          Sign In
        </Link>
      </div>
    </form>
  );
};
