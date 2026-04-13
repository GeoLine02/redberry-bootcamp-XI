import Link from "next/link";
import ArrowOutlined from "@/public/ArrowOutLined.svg";
import Image from "next/image";
import { getWeeklySchedules } from "./services";
import { getCourseDetails } from "../services/index.server";
import CourseDetailsClient from "./components/CourseDetailsClient";
interface CourseDetailsProps {
  params: Promise<{
    id: number;
  }>;
}

export default async function CourseDetails({ params }: CourseDetailsProps) {
  const resolvedParams = await params;
  const courseDetails = await getCourseDetails(Number(resolvedParams.id));
  const weeklySchedules = await getWeeklySchedules(Number(resolvedParams.id));
  return (
    <div>
      <span className="flex items-center gap-1 font-medium text-[18px] mt-16 mb-8">
        <Link href={"/"}>Home</Link>
        <Image src={ArrowOutlined} alt="arrow" />
        <Link href={"/browse"}>Browse</Link>
        <Image src={ArrowOutlined} alt="arrow" />
        <Link href={`/browse/}`} className="text-primary-purple">
          {courseDetails.data.category.name}
        </Link>
      </span>
      <CourseDetailsClient
        basePrice={courseDetails.data.basePrice}
        category={courseDetails.data.category}
        courseId={courseDetails.data.id}
        description={courseDetails.data.description}
        durationWeeks={courseDetails.data.durationWeeks}
        enrollment={courseDetails.data.enrollment}
        image={courseDetails.data.image}
        isCourseRatedData={courseDetails.data.isRated}
        lecturerImage={courseDetails.data.instructor.avatar}
        lecturerName={courseDetails.data.instructor.name}
        title={courseDetails.data.title}
        reviews={courseDetails.data.reviews}
        weeklySchedules={weeklySchedules.data}
        courseDetails={courseDetails.data}
      />
    </div>
  );
}
