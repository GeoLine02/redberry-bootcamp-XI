import Image from "next/image";
import { SessionType } from "../types";
import ComputerIcon from "@/public/ComputerIcon.svg";
import { SelectedOptions } from "./EnrollNow";
import WarrningIcon from "@/public/Warning.svg";

interface SessionTypeSectionProps {
  sessions: SessionType[];
  handleChooseSessionType: (sessionTypeId: number) => void;
  selectedOptions: SelectedOptions;
}

interface SessionTypeCardProps {
  session: SessionType;
  handleChooseSessionType: (sessionTypeId: number) => void;
  selectedOptions: SelectedOptions;
}

const SesstionTypeCard = ({
  session,
  handleChooseSessionType,
  selectedOptions,
}: SessionTypeCardProps) => {
  const seats =
    session.availableSeats === 0
      ? "Fully Booked"
      : session.availableSeats < 5
        ? `Only ${session.availableSeats} Are Remaining`
        : `${session.availableSeats} Seats Available`;

  const isSelected = selectedOptions.sessionTypeId === session.id;

  return (
    <div className="w-full max-w-43.25  flex flex-col gap-2 items-center">
      <button
        disabled={session.availableSeats === 0}
        onClick={() => handleChooseSessionType(session.id)}
        className={`${isSelected && "bg-light-purple! text-primary-purple border-primary-purple"} w-full py-3.75 border text-center cursor-pointer bg-white border-border-gray rounded-xl transition-all duration-300 hover:bg-light-purple hover:text-primary-purple hover:border-primary-purple flex flex-col items-center justify-center`}
      >
        <Image src={ComputerIcon} alt="computer icon" />
        <h1 className="font-semibold">{session.name}</h1>
        <span>{session.location}</span>
        <h2 className="text-primary-purple font-medium">
          {session.priceModifier}
        </h2>
      </button>
      <div className="flex gap-2 items-center">
        {session.availableSeats < 5 && (
          <Image src={WarrningIcon} alt="warning sign" />
        )}
        <h2
          className={`${session.availableSeats < 5 ? "text-warning-color font-medium" : "text-dark-gray"} text-xs font-medium`}
        >
          {seats}
        </h2>
      </div>
    </div>
  );
};

export default function SesstionTypeSection({
  sessions,
  handleChooseSessionType,
  selectedOptions,
}: SessionTypeSectionProps) {
  return (
    <div className="flex gap-3 mt-4.5">
      {sessions.map((session) => (
        <SesstionTypeCard
          selectedOptions={selectedOptions}
          handleChooseSessionType={handleChooseSessionType}
          key={session.id}
          session={session}
        />
      ))}
    </div>
  );
}
