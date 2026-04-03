import Input from "@/ui/Input";
import { SignUpFormValues } from "@/validations/auth.validation";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface SignUpStepOneProps {
  register: UseFormRegister<SignUpFormValues>;
  errors: FieldErrors<SignUpFormValues>;
}

export default function SignUpStepOne({
  errors,
  register,
}: SignUpStepOneProps) {
  return (
    <div>
      <Input
        label="Email"
        {...register("email")}
        type="email"
        placeholder="you@example.com"
      />
      {errors.email && (
        <span className="text-red-500 text-sm">
          {typeof errors.email.message === "string" ? errors.email.message : ""}
        </span>
      )}
    </div>
  );
}
