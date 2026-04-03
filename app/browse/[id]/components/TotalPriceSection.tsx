import { Button } from "@/ui/Button";

interface TotalPriceSectionProps {
  totalPrice: number;
  basePrice: number;
  sessionPrice: number;
  isLastStep: boolean;
  handleEnroll: () => Promise<void>;
}
export default function TotalPriceSection({
  totalPrice,
  basePrice,
  sessionPrice,
  isLastStep,
  handleEnroll,
}: TotalPriceSectionProps) {
  return (
    <div className="bg-white rounded-xl p-10">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-medium-gray text-xl font-semibold">Total Price</h1>
        <h1 className="text-[32px] font-semibold">{totalPrice}</h1>
      </div>
      <div className="mt-8 space-y-2">
        <div className="flex w-full items-center justify-between font-medium">
          <h2 className="text-medium-gray">Base price</h2>
          <h2>+${basePrice}</h2>
        </div>
        <div className="flex w-full items-center justify-between font-medium">
          <h2 className="text-medium-gray">Session Type</h2>
          <h2>+${sessionPrice}</h2>
        </div>
      </div>
      <Button
        onClick={handleEnroll}
        className="w-full mt-8"
        disabled={isLastStep}
        variant={"primary"}
      >
        Enroll Now
      </Button>
    </div>
  );
}
