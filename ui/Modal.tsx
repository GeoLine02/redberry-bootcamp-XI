"use client";

import {
  ReactNode,
  useEffect,
  useState,
  isValidElement,
  cloneElement,
} from "react";
import { createPortal } from "react-dom";

interface Props {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ open, onClose, children }: Props) {
  // keep mounted during exit animation
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (open) setVisible(true);
  }, [open]);

  const handleTransitionEnd = () => {
    if (!open) setVisible(false);
  };

  // lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!visible) return null;

  // inject open prop automatically
  const contentWithState = isValidElement(children)
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cloneElement(children as any, { open })
    : children;

  return createPortal(
    <div className="fixed inset-0 z-50" onTransitionEnd={handleTransitionEnd}>
      {/* backdrop */}
      <div
        onClick={onClose}
        className={`
          absolute inset-0 bg-black/50
          transition-opacity duration-300
          ${open ? "opacity-100" : "opacity-0"}
        `}
      />

      {contentWithState}
    </div>,
    document.body,
  );
}
