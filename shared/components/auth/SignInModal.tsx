"use client";

import { useModal } from "@/provider/ModalProvider";
import Input from "@/ui/Input";
import { Button } from "@/ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import EyeIcon from "@/public/Eye.svg";
import { SignInFormValues, signInSchema } from "@/validations/auth.validation";
import Image from "next/image";
import X from "@/public/X.svg";
import SignUpModal from "./SignUpModal";
import { useState } from "react";
import EyeClosed from "@/public/EyeClosed.svg";
import { signIn } from "@/shared/services/auth";
import { useUser } from "@/provider/UserProvider";

export default function SignInModal() {
  const { openModal, closeModal } = useModal();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { setUser } = useUser();
  const onSubmit = async (data: SignInFormValues) => {
    try {
      console.log("Logging in with", data);
      // TODO: call API

      const res = await signIn(data);
      setUser(res.data.user);
      localStorage.setItem("accessToken", res.data.token);
      closeModal();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err.response?.data.message);
      setError("root", {
        message: err.response?.data.message || "An error occurred",
      });
      // optionally handle login errors
    }
  };

  const handleDisplayPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full max-w-115 relative z-50 bg-white rounded-xl">
      <div
        className=" absolute cursor-pointer top-5 right-3.75"
        onClick={closeModal}
      >
        <Image
          src={X}
          alt="Close"
          aria-labelledby="sign in modal close button"
        />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full p-12.5"
      >
        <div className="text-center mb-6">
          <h1 className="text-[36px] font-semibold">Welcome Back</h1>
          <p className="text-medium-gray font-medium">
            Log in to continue your learning
          </p>
        </div>
        <div>
          <Input
            label="Email"
            {...register("email")}
            type="email"
            placeholder="you@example.com"
          />
        </div>

        <Input
          label="Password"
          {...register("password")}
          type={showPassword ? "text" : "password"}
          Icon={
            <Image
              className="cursor-pointer"
              onClick={handleDisplayPassword}
              src={showPassword ? EyeClosed : EyeIcon}
              alt="display password"
            />
          }
          placeholder="••••••••"
        />

        {errors.root && (
          <span className="text-red-500 text-sm font-medium">
            {errors.root.message}
          </span>
        )}

        <Button
          variant="primary"
          type="submit"
          className="w-full mt-2"
          disabled={isSubmitting}
        >
          Log In
        </Button>
        <div className="flex items-center justify-center gap-2 px-4 w-full text-medium-gray">
          <div className="border-t h-px w-full border-border-gray" />
          <span>or</span>
          <div className="border-t h-px w-full border-border-gray" />
        </div>

        <p className="text-medium-gray text-center">
          Don&apos;t have an account?{" "}
          <button
            onClick={() => openModal(<SignUpModal />)}
            className="text-black font-medium underline"
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
}
