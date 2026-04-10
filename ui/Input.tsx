"use client";

import { forwardRef, InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  Icon?: React.ReactNode;
  prefix?: React.ReactNode; // 👈 add this
  iconAlt?: string;
  value?: string;
  label?: string;
  onChangeValue?: (value: string) => void;
};
// Forward ref to support React Hook Form
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ Icon, value, prefix, onChangeValue, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (onChangeValue) onChangeValue(newValue);

      props.onChange?.(e);
    };

    return (
      <div className="space-y-1 w-full">
        {props.label && (
          <label
            className="inline-block text-dark-gray font-medium"
            htmlFor={props.id}
          >
            {props.label}
          </label>
        )}
        <div className="border-2 border-border-gray bg-light-gray w-full flex items-center gap-2 px-3.25 py-4 rounded-lg">
          {prefix && (
            <span className="text-gray-500 whitespace-nowrap">{prefix}</span>
          )}

          <input
            {...props}
            ref={ref}
            value={value}
            onChange={handleChange}
            className="flex-1 outline-none"
          />

          {Icon}
        </div>
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
