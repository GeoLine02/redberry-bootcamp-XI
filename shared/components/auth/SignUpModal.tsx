"use client";

import Image from "next/image";
import { useState } from "react";
import { useModal } from "@/provider/ModalProvider";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/ui/Button";

import X from "@/public/X.svg";
import StepBackIcon from "@/public/StepBack.svg";

import SignUpStepOne from "./SignUpStepOne";
import SignUpStepTwo from "./SignUpStepTwo";
import SignUpStepThree from "./SignUpStepThree";

import { SignUpFormValues, signUpSchema } from "@/validations/auth.validation";
import SignInModal from "./SignInModal";
import { signUp } from "@/shared/services/auth";
import { useUser } from "@/provider/UserProvider";

export default function SignUpModal() {
  const { openModal, closeModal } = useModal();
  const [currentStep, setCurrentStep] = useState(1);
  const { setUser } = useUser();

  const {
    register,
    handleSubmit,
    trigger,
    setError,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      image: null,
    },
  });

  /* ---------- steps ---------- */

  const nextStep = async () => {
    const stepFields: Record<number, (keyof SignUpFormValues)[]> = {
      1: ["email"],
      2: ["password", "confirmPassword"],
      3: ["username", "image"],
    };

    const valid = await trigger(stepFields[currentStep]);
    if (!valid) return;

    if (currentStep === 3) {
      handleSubmit(onSubmit)();
      return;
    }

    setCurrentStep((s) => s + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  /* ---------- submit ---------- */

  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
    try {
      const formData = new FormData();

      formData.append("email", data.email);
      formData.append("username", data.username);
      formData.append("password", data.password);
      formData.append("password_confirmation", data.confirmPassword);
      formData.append("avatar", data.image as File);

      const res = await signUp(formData);

      setUser(res.data.user);
      localStorage.setItem("accessToken", res.data.token);

      closeModal();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const firstMessage = Object.values(error.errors).flat()[0] as string;
      setError("root", { type: "server", message: firstMessage });
    }
  };

  return (
    /* ===== CENTER WRAPPER ===== */
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      {/* ===== MODAL CARD ===== */}
      <div className="w-full max-w-115 relative bg-white rounded-xl shadow-xl pointer-events-auto">
        {/* Step Back */}
        {currentStep > 1 && (
          <div
            className="absolute cursor-pointer top-5 left-3.75"
            onClick={prevStep}
          >
            <Image src={StepBackIcon} alt="Step Back" />
          </div>
        )}

        {/* Close */}
        <div
          className="absolute cursor-pointer top-5 right-3.75"
          onClick={closeModal}
        >
          <Image src={X} alt="Close" />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full p-12.5"
        >
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-[36px] font-semibold">Create Account</h1>
            <p className="text-medium-gray font-medium">
              Join and start your learning journey
            </p>
          </div>

          {/* Steps */}
          {currentStep === 1 && (
            <SignUpStepOne register={register} errors={errors} />
          )}

          {currentStep === 2 && (
            <SignUpStepTwo register={register} errors={errors} />
          )}

          {currentStep === 3 && (
            <SignUpStepThree
              register={register}
              errors={errors}
              setValue={setValue}
            />
          )}

          {/* Server Error */}
          {errors.root?.message && (
            <p className="text-red-500 text-sm">{errors.root.message}</p>
          )}

          {/* Next Button */}
          <Button
            variant="primary"
            type="button"
            className="w-full mt-2"
            disabled={isSubmitting}
            onClick={nextStep}
          >
            {currentStep === 3 ? "Sign Up" : "Next"}
          </Button>

          {/* Divider */}
          <div className="flex items-center justify-center gap-2 px-4 w-full text-medium-gray">
            <div className="border-t h-px w-full border-border-gray" />
            <span>or</span>
            <div className="border-t h-px w-full border-border-gray" />
          </div>

          {/* Switch modal */}
          <p className="text-medium-gray text-center">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => openModal(<SignInModal />)}
              className="text-black font-medium underline"
            >
              Log In
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
