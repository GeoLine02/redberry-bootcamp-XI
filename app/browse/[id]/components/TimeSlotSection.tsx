import { TimeSlotType } from "../types";
import { SelectedOptions } from "./EnrollNow";

interface TimeSlotSectionProps {
  timeSlots: TimeSlotType[];
  handleChooseTimeSlot: (timeSlotId: number) => void;
  selectedOptions: SelectedOptions;
}

interface TimeSLotCardProps {
  timeSlot: TimeSlotType;
  handleChooseTimeSlot: (timeSlotId: number) => void;
  selectedOptions: SelectedOptions;
}

const TimeSLotCard = ({
  timeSlot,
  handleChooseTimeSlot,
  selectedOptions,
}: TimeSLotCardProps) => {
  const isSelected = selectedOptions.timeSlotId === timeSlot.id;

  return (
    <div
      onClick={() => handleChooseTimeSlot(timeSlot.id)}
      className={`${isSelected && "bg-light-purple! border-primary-purple text-primary-purple!"} w-full max-w-43.25 py-3.75 border  p-2 text-center cursor-pointer bg-white border-border-gray rounded-xl transition-all duration-300 hover:bg-light-purple hover:text-primary-purple hover:border-primary-purple`}
    >
      <h1
        className={`${isSelected && "text-primary-purple!"} font-semibold text-dark-gray`}
      >
        {timeSlot.label}
      </h1>
    </div>
  );
};

function TimeSlotSection({
  timeSlots,
  handleChooseTimeSlot,
  selectedOptions,
}: TimeSlotSectionProps) {
  return (
    <div className="flex gap-3 mt-4.5">
      {timeSlots.map((timeSlot) => (
        <TimeSLotCard
          selectedOptions={selectedOptions}
          handleChooseTimeSlot={handleChooseTimeSlot}
          key={timeSlot.id}
          timeSlot={timeSlot}
        />
      ))}
    </div>
  );
}

export default TimeSlotSection;
