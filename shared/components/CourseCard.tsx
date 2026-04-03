import Image from "next/image";
import StarIcon from "@/public/Star.svg";
import { Button } from "@/ui/Button";
import Link from "next/link";

interface CourseCardProps {
  id: number;
  lecturer: string;
  rating: string;
  imageSrc: string;
  title: string;
  description: string;
  price: string;
}

export default function CourseCard({
  id,
  lecturer,
  rating,
  imageSrc,
  title,
  description,
  price,
}: CourseCardProps) {
  return (
    <div className="bg-white rounded-xl p-5 max-w-126.5 flex flex-col gap-4">
      <Image
        width={466}
        height={262}
        className="w-full object-cover max-h-65.5 rounded-[10px]"
        src={imageSrc}
        alt={title}
      />
      <div className="flex justify-between items-center">
        <p className="text-medium-gray">
          lecturer <span className="text-dark-gray">{lecturer}</span>
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
        <p className="text-dark-gray font-medium">{description}</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-medium-gray">Starting from </span>
          <h2 className="text-[32px] font-semibold">${price}</h2>
        </div>
        <Link href={`/browse/${id}`}>
          <Button variant={"primary"}>Details</Button>
        </Link>
      </div>
    </div>
  );
}
