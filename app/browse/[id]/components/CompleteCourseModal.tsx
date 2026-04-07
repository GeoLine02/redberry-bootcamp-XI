"use client";

import Image from "next/image";
import CongratulationsIcon from "@/public/Congratulations.svg";
import { Button } from "@/ui/Button";
import { useModal } from "@/provider/ModalProvider";
import RateCourse from "./RateCourse";

interface CompleteCourseModalProps {
  courseTitle: string;
  handleRateCourse: (rating: number) => Promise<void>;
  rating: number;
  isCourseRated: boolean;
}

export default function CompleteCourseModal({
  courseTitle,
  handleRateCourse,
  rating,
  isCourseRated,
}: CompleteCourseModalProps) {
  const { closeModal } = useModal();

  return (
    <div className="fixed inset-0 flex items-center z-50 justify-center">
      <div className="flex flex-col items-center gap-4 bg-white max-w-119 p-15 rounded-xl">
        <Image src={CongratulationsIcon} alt="congrats icon" />

        <h1 className="text-4xl font-semibold text-dark-gray">
          Congratulations!
        </h1>
        <p className="text-xl font-medium text-center text-dark-gray">
          You&apos;ve completed “{courseTitle}” Course!
        </p>

        <h2 className="text-primary-purple">Rate your experience</h2>

        {isCourseRated ? (
          <h2>You&apos;ve already rated this course</h2>
        ) : (
          <RateCourse handleRateCourse={handleRateCourse} rating={rating} />
        )}

        <Button onClick={closeModal} variant={"primary"} className="w-full">
          Done
        </Button>
      </div>
    </div>
  );
}
