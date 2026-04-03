import { WeeklyScheduleType } from "../types";
import { SelectedOptions } from "./EnrollNow";

interface WeeklyScheduleProps {
  schedules: WeeklyScheduleType[];
  handleChooseWeeklySchedule: (scheduleId: number) => void;
  selectedOptions: SelectedOptions;
}

interface ScheduleCardProps {
  schedule: WeeklyScheduleType;
  handleChooseWeeklySchedule: (scheduleId: number) => void;
  selectedOptions: SelectedOptions;
}

const ScheduleCard = ({
  schedule,
  handleChooseWeeklySchedule,
  selectedOptions,
}: ScheduleCardProps) => {
  const isSelected = selectedOptions.scheduleId === schedule.id;

  return (
    <div
      onClick={() => handleChooseWeeklySchedule(schedule.id)}
      className={`${isSelected && "bg-light-purple! text-primary-purple border-primary-purple"} border p-2 bg-white border-border-gray rounded-xl text-center flex items-center justify-center max-w-30.75 h-22.75 cursor-pointer transition-all duration-200 ease-in-out hover:bg-light-purple hover:text-primary-purple hover:border-primary-purple`}
    >
      <h1 className="font-semibold">{schedule.label}</h1>
    </div>
  );
};

export default function WeeklySchedule({
  schedules,
  handleChooseWeeklySchedule,
  selectedOptions,
}: WeeklyScheduleProps) {
  return (
    <div className="flex gap-3 mt-4.5">
      {schedules.map((schedule) => (
        <ScheduleCard
          selectedOptions={selectedOptions}
          handleChooseWeeklySchedule={handleChooseWeeklySchedule}
          key={schedule.id}
          schedule={schedule}
        />
      ))}
    </div>
  );
}
