import { Button } from "@/ui/Button";
import Image from "next/image";
import Link from "next/link";
import StarIcon from "@/public/Star.svg";
import { CategoryType, Instructor } from "../types";

interface CourseCardProps {
  id: number;
  lecturer: Instructor;
  rating: number;
  imageSrc: string;
  title: string;
  weeks: number;
  price: number;
  category: CategoryType;
}

export default function CourseCard({
  id,
  imageSrc,
  lecturer,
  price,
  rating,
  title,
  category,
  weeks,
}: CourseCardProps) {
  return (
    <div className="bg-white rounded-xl p-5 max-w-126.5 flex flex-col gap-4 cursor-pointer border border-white hover:border-primary-purple hover:shadow-2xl transition-all duration-500">
      <Image
        width={333}
        height={181}
        className="w-auto object-fit max-h-45.25 h-full rounded-[10px]"
        src={imageSrc}
        alt={title}
      />
      <div className="flex justify-between items-center">
        <p className="text-medium-gray font-medium">
          lecturer <span className="text-dark-gray">{lecturer.name}</span> |{" "}
          {weeks} Weeks
        </p>
        <div className="flex items-center">
          <Image src={StarIcon} alt="Star" />
          <span>{rating}</span>
        </div>
      </div>
      <div className="space-y-2 flex-1">
        <h1 className="text-2xl font-semibold line-clamp-2 max-w-full">
          {title}
        </h1>
        {/* TOOD: category */}
        <p className="font-medium py-2 px-3 bg-ligh-gray text-dark-gray w-fit rounded-[10px]">
          {category.name}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <span className="text-medium-gray font-medium text-xs">
            Starting from{" "}
          </span>
          <h2 className="text-[24px] font-semibold leading-none">${price}</h2>
        </div>
        <Link href={`/browse/${id}`}>
          <Button size={"md"} variant={"primary"}>
            Details
          </Button>
        </Link>
      </div>
    </div>
  );
}
