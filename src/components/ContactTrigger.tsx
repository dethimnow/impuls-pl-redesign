"use client";

import { useState } from "react";
import { ContactModal } from "./ContactModal";

type Props = {
  className?: string;
  children: React.ReactNode;
};

export function ContactTrigger({ className, children }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {children}
      </button>
      <ContactModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
