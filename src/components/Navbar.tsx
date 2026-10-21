"use client";

import React from "react";
import ShadcnNavbar from "./ShadcnNavbar";

interface NavbarProps {
  onOpenConsultation?: () => void;
}

export default function Navbar({ onOpenConsultation }: NavbarProps) {
  return <ShadcnNavbar onOpenConsultation={onOpenConsultation} />;
}
