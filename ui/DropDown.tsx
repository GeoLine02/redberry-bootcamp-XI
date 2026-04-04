"use client";

import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import Image from "next/image";
import ArrowDown from "@/public/ArrowDown.svg";

export interface DropdownOption<T = string> {
  label: string;
  value: T;
}

interface DropDownProps<T = string> {
  options: DropdownOption<T>[];
  value?: T;
  placeholder?: string;
  onChange?: (value: T) => void;
  className?: string;
  disabled?: boolean;
  label?: string;
}

export default function DropDown<T>({
  options,
  value,
  placeholder = "Select option",
  onChange,
  className,
  disabled,
  label,
}: DropDownProps<T>) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value);

  // close when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: DropdownOption<T>) => {
    onChange?.(option.value);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className={clsx("relative w-full", className)}>
      {/* Trigger */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        className="w-full border-2 border-border-gray rounded-lg px-4 py-4 text-left bg-light-gray flex justify-between items-center mt-0.5"
      >
        <span>
          {selectedOption?.label || (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </span>

        <span
          className={clsx(
            "transition-transform duration-200",
            open && "rotate-180",
          )}
        >
          <Image src={ArrowDown} alt="" />
        </span>
      </button>

      {/* Menu */}
      {open && (
        <ul className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <li
              key={String(option.value)}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
