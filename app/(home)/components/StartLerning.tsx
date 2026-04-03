import { CourseType } from "@/shared/types";
import FeaturedCoruseList from "./FeaturedCoruseList";

interface StartLearningProps {
  courses: CourseType[];
}

export default function StartLerning({ courses }: StartLearningProps) {
  return (
    <section>
      <h1 className="text-customBlack font-semibold text-[40px]">
        Start Learning Today
      </h1>
      <p className="text-medium-gray text-[18px] mt-1.5">
        Choose from our most popular courses and begin your journey
      </p>
      <FeaturedCoruseList courses={courses} />
    </section>
  );
}
