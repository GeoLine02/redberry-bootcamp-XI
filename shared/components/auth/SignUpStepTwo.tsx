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

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Input
        label="Password"
        {...register("password")}
        type="password"
        Icon={
          <Image
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
        type="password"
        onClick={handleShowPassword}
        Icon={
          <Image
            src={showPassword ? EyeClosed : EyeIcon}
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
