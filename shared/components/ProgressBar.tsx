import React from "react";

export default function ProgressBar({ percentage }: { percentage: number }) {
  return (
    <div className="space-y-3 w-full">
      <p className="text-sm text-dark-gray font-medium">
        {percentage}% completed
      </p>
      <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary-purple transition-all rounded-r-full duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
