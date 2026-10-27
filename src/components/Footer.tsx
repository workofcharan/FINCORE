"use client";

import React from "react";
import FincoreFooter from "@/components/fincore-footer";
import { LegalDocType } from "@/components/LegalModal";

interface FooterProps {
  onOpenLegal?: (type: LegalDocType) => void;
  onOpenConsultation?: () => void;
}

export default function Footer({ onOpenLegal, onOpenConsultation }: FooterProps = {}) {
  return (
    <FincoreFooter
      onOpenLegal={onOpenLegal}
      onOpenConsultation={onOpenConsultation}
    />
  );
}
