import Image from "next/image";
import { CourseCategoryType } from "../types";
import StarIcon from "@/public/Star.svg";

interface CourseStatsProps {
  title: string;
  durationWeeks: number;
  rating: string;
  category: CourseCategoryType;
  description: string;
  image: string;
  lecturerImage: string;
  lecturerName: string;
}

export default function CourseStats({
  category,
  description,
  durationWeeks,
  rating,
  title,
  image,
  lecturerImage,
  lecturerName,
}: CourseStatsProps) {
  return (
    <div className="max-w-225.75 space-y-2">
      <h1 className="text-[40px] font-semibold">{title}</h1>
      <Image
        className="w-full max-w-225.75 max-h-118.5 object-cover rounded-[10px]"
        width={903}
        height={474}
        src={image}
        alt={title}
      />
      <section className="flex justify-between">
        <div className="flex items-center gap-3 font-medium text-dark-gray">
          <div>
            <span>{durationWeeks} Weeks</span>
          </div>
          <div>
            <span>{durationWeeks * 24} Hours</span>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center">
            <Image src={StarIcon} alt="Star" />
            <span>{rating}</span>
          </div>
          <div className="rounded-md bg-white px-3 py-1.75 font-medium">
            <span>{category.name}</span>
          </div>
        </div>
      </section>
      <section className="flex gap-3 rounded-lg bg-white py-2 px-3 w-fit">
        <Image
          className="rounded-md max-w-7.5 object-fit"
          width={30}
          height={30}
          src={lecturerImage}
          alt={lecturerName + "photo"}
        />
        <span className="text-dark-gray font-medium">{lecturerName}</span>
      </section>
      <section>
        <h2 className="text-2xl font-semibold text-medium-gray">
          Course Descritions
        </h2>
        <p className="max-w-225.75">{description}</p>
      </section>
    </div>
  );
}
