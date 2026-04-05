"use client";

import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import Input from "@/ui/Input";
import X from "@/public/X.svg";
import { useModal } from "@/provider/ModalProvider";
import { Button } from "@/ui/Button";
import Upload from "@/ui/Uplaod";
import { useUser } from "@/provider/UserProvider";
import { useEffect } from "react";
import DropDown from "@/ui/DropDown";
import { updateProfile } from "../services";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProfileFormValues,
  profileSchema,
} from "@/validations/profile.validation";

export default function ProfileModal() {
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
  });
  console.log(errors);
  const { closeModal } = useModal();
  const { user, setUser } = useUser();
  console.log("userrrr", user);
  useEffect(() => {
    if (user) {
      reset({
        age: user?.age,
        avatar: user?.avatar,
        email: user?.email,
        fullName: user?.fullName,
        phone: user?.mobileNumber,
      });
    }
  }, [reset, user]);

  const ageOptions = Array.from({ length: 99 }, (_, i) => ({
    label: String(i + 1),
    value: i + 1,
  }));

  const handleUpdateProfile = async (data: ProfileFormValues) => {
    try {
      const formData = new FormData();

      formData.append("full_name", data.fullName);
      formData.append("mobile_number", data.phone.toString());
      formData.append("age", data.age.toString());
      if (data.avatar instanceof File) {
        formData.append("avatar", data.avatar);
      }
      const accessToken = localStorage.getItem("accessToken");
      const res = await updateProfile(formData, accessToken as string);
      setUser((prev) =>
        prev
          ? {
              ...prev,
              username: res.data.username,
              avatar: res.data.avatar,
              profileComplete: res.data.profileComplete,
            }
          : prev,
      );
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-105 bg-white rounded-xl p-8 relative">
      {/* Close Button */}
      <Image
        onClick={closeModal}
        className="absolute top-5 right-4 cursor-pointer"
        src={X}
        alt="close button"
      />

      {/* Header */}
      <h1 className="text-3xl font-semibold text-center mb-6">Profile</h1>

      {/* User Info */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <Image
            src={user?.avatar || "./avatar-placeholder.png"}
            alt="avatar"
            width={56}
            height={56}
            className="rounded-full object-cover"
          />

          {/* online dot */}
          <span
            className={`${user?.profileComplete ? "bg-success" : "bg-warning-color"} absolute bottom-0 right-0 w-5 h-5  border-2 border-white rounded-full`}
          />
        </div>

        <div>
          <p className="font-semibold text-lg">{user?.username}</p>
          <p
            className={`${user?.profileComplete ? "text-success" : "text-warning-color"} text-sm `}
          >
            {user?.profileComplete
              ? "Profile is Complete"
              : "Profile is Incomplete"}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(handleUpdateProfile)} className="space-y-4">
        {/* Full Name */}
        <div>
          <Input
            label="Full Name"
            placeholder="Username"
            {...register("fullName")}
          />
          {errors.fullName && (
            <span className="text-xs text-red-500">
              {errors.fullName.message}
            </span>
          )}
        </div>

        {/* Email */}
        <div>
          <Input
            label="Email"
            placeholder="Email@gmail.com"
            {...register("email")}
            className="bg-gray-100 cursor-not-allowed"
            readOnly
          />
          {errors.email && (
            <span className="text-xs text-red-500">{errors.email.message}</span>
          )}
        </div>

        {/* Phone + Age */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Input
              label="Mobile Number"
              placeholder="+995 599209820"
              {...register("phone")}
            />
            {errors.phone && (
              <span className="text-xs text-red-500">
                {errors.phone.message}
              </span>
            )}
          </div>

          <Controller
            control={control}
            name="age"
            render={({ field }) => {
              return (
                <div>
                  <label htmlFor="Age" className="block mb-1 font-medium">
                    Age
                  </label>

                  {/* Controlled DropDown */}
                  <DropDown>
                    <DropDown.Trigger className="w-full border rounded px-3 py-2 text-left">
                      {field.value ? field.value : "Select age"}
                    </DropDown.Trigger>

                    <DropDown.Menu className="mt-1 border rounded bg-white shadow-lg max-h-60 overflow-auto">
                      {ageOptions.map((option) => (
                        <DropDown.Item
                          onSelect={() => field.onChange(option.value)}
                          key={option.value}
                          className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                        >
                          {option.label}
                        </DropDown.Item>
                      ))}
                    </DropDown.Menu>
                  </DropDown>

                  {errors.age && (
                    <span className="text-red-500 text-xs">
                      {errors.age.message}
                    </span>
                  )}
                </div>
              );
            }}
          />
        </div>

        <div>
          <label htmlFor="image">Uplaod Avatar</label>
          <Upload />
        </div>

        {/* Submit Button */}
        <Button
          disabled={isSubmitting}
          variant={"primary"}
          size={"sm"}
          type="submit"
        >
          Update Profile
        </Button>
      </form>
    </div>
  );
}
