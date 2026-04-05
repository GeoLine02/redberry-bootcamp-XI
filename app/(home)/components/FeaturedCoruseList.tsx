import CorrseFeatureCard from "@/shared/components/CourseFeatureCard";
import { CourseType } from "@/shared/types";

interface FeaturedCoruseListProps {
  courses: CourseType[];
}

export default function FeaturedCoruseList({
  courses,
}: FeaturedCoruseListProps) {
  return (
    <div className="grid grid-cols-3 mt-8">
      {courses.map((course) => (
        <CorrseFeatureCard
          id={course.id}
          description={course.description}
          imageSrc={course.image}
          lecturer={course.instructor.name}
          price={course.basePrice}
          rating={course.avgRating}
          title={course.title}
          key={course.id}
        />
      ))}
    </div>
  );
}
