import Image from "next/image";
import StarIcon from "@/public/Star.svg";
import { Button } from "@/ui/Button";

interface CourseCardProps {
  lecturer: string;
  rating: string;
  imageSrc: string;
  title: string;
  description: string;
  price: string;
}

export default function CourseCard({
  lecturer,
  rating,
  imageSrc,
  title,
  description,
  price,
}: CourseCardProps) {
  return (
    <div className="bg-white rounded-xl p-5 space-y-4 max-w-126.5">
      <Image
        width={466}
        height={262}
        className="w-full object-cover max-h-65.5 rounded-[10px]"
        src={imageSrc}
        alt={title}
      />
      <div className="flex justify-between items-center space-y-4">
        <div className="flex gap-0.5 font-medium">
          <span className="text-medium-gray">lecturer</span>
          <span className="text-dark-gray">{lecturer}</span>
        </div>
        <div className="flex items-center">
          <Image src={StarIcon} alt="Star" />
          <span>{rating}</span>
        </div>
      </div>
      <h1 className="text-2xl font-semibold line-clamp-2 max-w-full">
        {title}
      </h1>
      <p className="text-dark-gray font-medium">{description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-medium-gray">Starting from </span>
          <h2 className="text-[32px] font-semibold">${price}</h2>
        </div>
        <Button variant={"primary"}>Details</Button>
      </div>
    </div>
  );
}
