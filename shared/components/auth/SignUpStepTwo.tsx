import Input from "@/ui/Input";
import { SignUpFormValues } from "@/validations/auth.validation";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import EyeIcon from "@/public/Eye.svg";
import Image from "next/image";
import { useState } from "react";
import EyeClosed from "@/public/EyeClosed.svg";

interface SignUpStepTwoProps {
  register: UseFormRegister<SignUpFormValues>;
  errors: FieldErrors<SignUpFormValues>;
}

export default function SignUpStepTwo({
  register,
  errors,
}: SignUpStepTwoProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  return (
    <div>
      <Input
        label="Password"
        {...register("password")}
        type={showPassword ? "text" : "password"}
        Icon={
          <Image
            className="cursor-pointer"
            onClick={handleShowPassword}
            src={showPassword ? EyeClosed : EyeIcon}
            alt="display password"
          />
        }
        placeholder="••••••••"
      />
      {errors.password && (
        <span className="text-red-500 text-sm">{errors.password.message}</span>
      )}
      <Input
        label="Confirm Password"
        {...register("confirmPassword")}
        type={showRepeatPassword ? "text" : "password"}
        onClick={handleShowPassword}
        Icon={
          <Image
            className="cursor-pointer"
            onClick={handleShowRepeatPassword}
            src={showRepeatPassword ? EyeClosed : EyeIcon}
            alt="display password"
          />
        }
        placeholder="••••••••"
      />
      {errors.confirmPassword && (
        <span className="text-red-500 text-sm">
          {errors.confirmPassword.message}
        </span>
      )}
    </div>
  );
}
