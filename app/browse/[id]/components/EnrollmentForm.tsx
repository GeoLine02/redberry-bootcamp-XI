"use client";

import { Dispatch, SetStateAction } from "react";
import { EnrollTypeHeader } from "./EnrollTypeHeader";
import SesstionTypeSection from "./SesstionTypeSection";
import TimeSlotSection from "./TimeSlotSection";
import TotalPriceSection from "./TotalPriceSection";
import WeeklySchedule from "./WeeklySchedule";
import { enrollOnCourse } from "../services";
import { CourseEnrollmentDetailsType, WeeklyScheduleType } from "../types";
import SignInModal from "@/shared/components/auth/SignInModal";
import IncompleteAccountModal from "./IncompleteAccountModal";
import { useModal } from "@/provider/ModalProvider";
import { useUser } from "@/provider/UserProvider";
import useEnrollmentForm from "../hooks/useEnrollmentForm";
import EnrollmentConfilctModal from "./EnrollmentConfilctModal";

interface EnrollmentFormProps {
  courseId: number;
  setEnrolledCourse: Dispatch<
    SetStateAction<CourseEnrollmentDetailsType | null>
  >;
  basePrice: number;
  weeklySchedules: WeeklyScheduleType[];
}

export default function EnrollmentForm({
  courseId,
  setEnrolledCourse,
  basePrice,
  weeklySchedules,
}: EnrollmentFormProps) {
  const { openModal } = useModal();
  const { user } = useUser();

  const {
    collapsedSection,
    sessions,
    timeSlots,
    selectedOptions,
    priceModifier,
    totalPrice,
    handleChooseWeeklySchedule,
    handleChooseTimeSlot,
    handleChooseSessionType,
    resetForm,
  } = useEnrollmentForm(courseId, basePrice);

  const handleEnroll = async () => {
    try {
      if (!user) {
        openModal(<SignInModal />);
        return;
      }

      if (!user.profileComplete) {
        openModal(<IncompleteAccountModal />);
        return;
      }

      const res = await enrollOnCourse(courseId, selectedOptions, false);
      setEnrolledCourse(res.data);
      resetForm();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.response);

      if (error?.response.data.message === "Schedule conflict detected") {
        openModal(
          <EnrollmentConfilctModal
            selectedOptions={selectedOptions}
            enrollOnCourse={enrollOnCourse}
            conflicts={error.response.data.conflicts}
            courseId={courseId}
            setEnrolledCourse={setEnrolledCourse}
          />,
        );
      }
    }
  };

  return (
    <section className="space-y-7.75">
      <section>
        <EnrollTypeHeader
          isAccessible={
            collapsedSection === "weeklySchedules" ||
            collapsedSection === "timeSlots" ||
            collapsedSection === "sessionType" ||
            collapsedSection === "payment"
          }
          step={1}
          stepLabel="Select Weekly Schedule"
        />
        <WeeklySchedule
          handleChooseWeeklySchedule={handleChooseWeeklySchedule}
          weeklySchedules={weeklySchedules}
          selectedOptions={selectedOptions}
        />
      </section>

      <section>
        <EnrollTypeHeader
          isAccessible={
            collapsedSection === "timeSlots" ||
            collapsedSection === "sessionType"
          }
          step={2}
          stepLabel="Time Slot"
        />
        <TimeSlotSection
          handleChooseTimeSlot={handleChooseTimeSlot}
          timeSlots={timeSlots}
          selectedOptions={selectedOptions}
        />
      </section>

      <section>
        <EnrollTypeHeader
          isAccessible={
            collapsedSection === "sessionType" || collapsedSection === "payment"
          }
          step={3}
          stepLabel="Session Type"
        />
        <SesstionTypeSection
          sessions={sessions}
          handleChooseSessionType={handleChooseSessionType}
          selectedOptions={selectedOptions}
        />
      </section>

      <section className="space-y-6">
        <TotalPriceSection
          sessionPrice={priceModifier}
          basePrice={basePrice}
          totalPrice={totalPrice}
          isLastStep={collapsedSection !== "payment"}
          handleEnroll={handleEnroll}
        />
      </section>
    </section>
  );
}
