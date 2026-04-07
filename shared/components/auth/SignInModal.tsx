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
  const { setUser } = useUser();

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

  /* ---------- submit ---------- */
  const onSubmit = async (data: SignInFormValues) => {
    try {
      const res = await signIn(data);
      setUser(res.data.user);
      closeModal();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      setError("root", { message: err.message });
    }
  };

  const handleDisplayPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    /* ===== CENTERING WRAPPER ===== */
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      {/* ===== MODAL CARD ===== */}
      <div className="w-full max-w-115 relative bg-white rounded-xl shadow-xl pointer-events-auto">
        {/* Close Button */}
        <div
          className="absolute cursor-pointer top-5 right-4"
          onClick={closeModal}
        >
          <Image src={X} alt="Close modal" />
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full p-12.5"
        >
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-[36px] font-semibold">Welcome Back</h1>
            <p className="text-medium-gray font-medium">
              Log in to continue your learning
            </p>
          </div>

          {/* Email */}
          <Input
            label="Email"
            {...register("email")}
            type="email"
            placeholder="you@example.com"
          />

          {/* Password */}
          <Input
            label="Password"
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            Icon={
              <Image
                className="cursor-pointer"
                onClick={handleDisplayPassword}
                src={showPassword ? EyeClosed : EyeIcon}
                alt="toggle password visibility"
              />
            }
          />

          {/* Error */}
          {errors.root && (
            <span className="text-red-500 text-sm font-medium">
              {errors.root.message}
            </span>
          )}

          {/* Submit */}
          <Button
            variant="primary"
            type="submit"
            className="w-full mt-2"
            disabled={isSubmitting}
          >
            Log In
          </Button>

          {/* Divider */}
          <div className="flex items-center justify-center gap-2 px-4 w-full text-medium-gray">
            <div className="border-t h-px w-full border-border-gray" />
            <span>or</span>
            <div className="border-t h-px w-full border-border-gray" />
          </div>

          {/* Switch to Sign Up */}
          <p className="text-medium-gray text-center">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() => openModal(<SignUpModal />)}
              className="text-black font-medium underline"
            >
              Sign up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
