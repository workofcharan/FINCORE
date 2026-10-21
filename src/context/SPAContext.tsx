"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import ConsultationModal from "@/components/ConsultationModal";
import LegalModal, { LegalDocType } from "@/components/LegalModal";

interface SPAContextType {
  openConsultation: (serviceName?: string) => void;
  closeConsultation: () => void;
  openLegal: (type: LegalDocType) => void;
  closeLegal: () => void;
}

const SPAContext = createContext<SPAContextType | undefined>(undefined);

export function SPAProvider({ children }: { children: ReactNode }) {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("Tax Filing");
  const [legalModalType, setLegalModalType] = useState<LegalDocType>(null);

  const openConsultation = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    setIsConsultationOpen(true);
  };

  const closeConsultation = () => {
    setIsConsultationOpen(false);
  };

  const openLegal = (type: LegalDocType) => {
    setLegalModalType(type);
  };

  const closeLegal = () => {
    setLegalModalType(null);
  };

  return (
    <SPAContext.Provider
      value={{
        openConsultation,
        closeConsultation,
        openLegal,
        closeLegal,
      }}
    >
      {children}

      {/* Global Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={closeConsultation}
        preselectedService={selectedService}
      />

      {/* Global Legal Modal (Privacy, Terms, Disclaimer) */}
      <LegalModal
        type={legalModalType}
        onClose={closeLegal}
      />
    </SPAContext.Provider>
  );
}

export function useSPA() {
  const context = useContext(SPAContext);
  if (!context) {
    throw new Error("useSPA must be used within an SPAProvider");
  }
  return context;
}
