import Input from "@/ui/Input";
import Upload from "@/ui/Upload";
import { SignUpFormValues } from "@/validations/auth.validation";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";

interface SignUpStepThreeProps {
  register: UseFormRegister<SignUpFormValues>;
  errors: FieldErrors<SignUpFormValues>;
  setValue: UseFormSetValue<SignUpFormValues>;
}
export default function SignUpStepThree({
  register,
  errors,
  setValue,
}: SignUpStepThreeProps) {
  return (
    <div className="space-y-6">
      <Input
        label="Username"
        {...register("username")}
        type="text"
        placeholder="Username"
      />
      {errors.username && (
        <span className="text-red-500 text-sm">{errors.username.message}</span>
      )}

      <div>
        <label htmlFor="image">Upload Avatar</label>
        <Upload
          registration={register("image")}
          onChange={(file) => setValue("image", file)} // <-- update form value
          error={errors.image?.message}
        />
      </div>
    </div>
  );
}
