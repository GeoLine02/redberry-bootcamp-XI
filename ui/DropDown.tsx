"use client";

import { useState, useRef, useEffect, useContext, createContext } from "react";
import clsx from "clsx";
import Image from "next/image";
import ArrowDown from "@/public/ArrowDown.svg";

// ─── Context ────────────────────────────────────────────────────────────────

interface DropDownContextValue {
  open: boolean;
  toggle: () => void;
  close: () => void;
}

const DropDownContext = createContext<DropDownContextValue | null>(null);

function useDropDown() {
  const ctx = useContext(DropDownContext);
  if (!ctx)
    throw new Error(
      "DropDown compound components must be used inside <DropDown>",
    );
  return ctx;
}

// ─── Root ────────────────────────────────────────────────────────────────────

interface DropDownProps {
  children: React.ReactNode;
  className?: string;
}

function DropDown({ children, className }: DropDownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggle = () => setOpen((prev) => !prev);
  const close = () => setOpen(false);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        close();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <DropDownContext.Provider value={{ open, toggle, close }}>
      <div ref={containerRef} className={clsx("relative w-full", className)}>
        {children}
      </div>
    </DropDownContext.Provider>
  );
}

// ─── Trigger ─────────────────────────────────────────────────────────────────

interface TriggerProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

function Trigger({ children, className, disabled }: TriggerProps) {
  const { open, toggle } = useDropDown();

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={toggle}
      className={clsx(
        "w-full border-2 border-border-gray rounded-lg px-4 py-4 text-left bg-light-gray flex justify-between items-center mt-0.5 cursor-pointer",
        className,
      )}
    >
      <span>{children}</span>
      <span
        className={clsx(
          "transition-transform duration-200",
          open && "rotate-180",
        )}
      >
        <Image src={ArrowDown} alt="" />
      </span>
    </button>
  );
}

// ─── Menu ─────────────────────────────────────────────────────────────────────

interface MenuProps {
  children: React.ReactNode;
  className?: string;
}

function Menu({ children, className }: MenuProps) {
  const { open } = useDropDown();

  if (!open) return null;

  return (
    <ul
      className={clsx(
        "absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto",
        className,
      )}
    >
      {children}
    </ul>
  );
}

// ─── Item ─────────────────────────────────────────────────────────────────────

interface ItemProps {
  children: React.ReactNode;
  onSelect?: () => void;
  className?: string;
}

function Item({ children, onSelect, className }: ItemProps) {
  const { close } = useDropDown();

  const handleClick = () => {
    onSelect?.();
    close();
  };

  return (
    <li
      onClick={handleClick}
      className={clsx(
        "px-4 py-2 cursor-pointer hover:text-primary-purple hover:bg-light-purple",
        className,
      )}
    >
      {children}
    </li>
  );
}

// ─── Attach sub-components ───────────────────────────────────────────────────

DropDown.Trigger = Trigger;
DropDown.Menu = Menu;
DropDown.Item = Item;

export default DropDown;
