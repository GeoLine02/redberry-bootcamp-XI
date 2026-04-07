import Image from "next/image";
import ArrowDownIcon from "@/public/ArrowDown.svg";
import ArrowUpIcon from "@/public/ArrowUp.svg";

interface EnrollTypeHeaderProps {
  step: number;
  stepLabel: string;
  isAccessible: boolean;
}

export const EnrollTypeHeader = ({
  isAccessible,
  step,
  stepLabel,
}: EnrollTypeHeaderProps) => {
  return (
    <div className="cursor-pointer flex items-center justify-between">
      <div className="flex items-center gap-2 w-full">
        <div
          className={`${isAccessible ? "border-dark-puple text-dark-puple" : "border-medium-gray text-medium-gray"} border-2 rounded-full w-7 aspect-square font-medium text-center`}
        >
          {step}
        </div>
        <h1
          className={`${isAccessible ? "border-dark-puple text-dark-puple" : "border-medium-gray text-medium-gray"} text-2xl font-semibold`}
        >
          {stepLabel}
        </h1>
      </div>
      {isAccessible ? (
        <Image
          src={ArrowDownIcon}
          alt="arrow down"
          aria-labelledby="dropdown toggler button"
        />
      ) : (
        <Image
          src={ArrowUpIcon}
          alt="arrow up"
          aria-labelledby="dropdown toggler button"
        />
      )}
    </div>
  );
};
