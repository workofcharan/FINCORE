"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Lock,
} from "lucide-react";
import { allServices } from "@/data/servicesData";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export default function ConsultationModal({
  isOpen,
  onClose,
  preselectedService,
}: ConsultationModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceRequired, setServiceRequired] = useState(
    preselectedService || "Tax Filing"
  );
  const [description, setDescription] = useState("");
  const [consentGiven, setConsentGiven] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successData, setSuccessData] = useState<{
    referenceId: string;
    message: string;
  } | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  // Update preselected service when prop changes
  useEffect(() => {
    if (preselectedService) {
      setServiceRequired(preselectedService);
    }
  }, [preselectedService]);

  // Handle ESC key and bulletproof scroll locking (freeze background)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const scrollY = window.scrollY;
    document.documentElement.classList.add("modal-open");
    document.body.classList.add("modal-open");
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.documentElement.classList.remove("modal-open");
      document.body.classList.remove("modal-open");
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setServerError(null);

    // Client-side validations
    const newErrors: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = "Please enter your full name (minimum 2 characters).";
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phone = "Please enter a valid 10-digit phone number.";
    }
    if (!serviceRequired) {
      newErrors.serviceRequired = "Please select a service required.";
    }
    if (!description.trim() || description.trim().length < 10) {
      newErrors.description =
        "Please provide at least 10 characters describing your requirement.";
    }
    if (!consentGiven) {
      newErrors.consentGiven =
        "You must consent to being contacted regarding this consultation request.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientType: "business",
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          serviceRequired,
          description: description.trim(),
          preferredContact: "phone",
          consentGiven,
          honeypot,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setServerError(
            data.message || "Failed to submit request. Please try again."
          );
        }
      } else {
        setSuccessData({
          referenceId: data.referenceId,
          message: data.message,
        });
        // Clear form
        setFullName("");
        setEmail("");
        setPhone("");
        setDescription("");
        setConsentGiven(false);
      }
    } catch {
      setServerError(
        "Network connection error. Please try again or reach out directly."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSuccessData(null);
    setServerError(null);
    setErrors({});
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#080B12]/80 backdrop-blur-md animate-fade-in overscroll-none select-none"
      onClick={onClose}
      onWheel={(e) => {
        if (e.target === e.currentTarget) {
          e.preventDefault();
        }
      }}
      onTouchMove={(e) => {
        if (e.target === e.currentTarget) {
          e.preventDefault();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="consultation-modal-title"
    >
      <div
        className="bg-white rounded-2xl max-w-xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-blue-100 overflow-hidden animate-modal-pop relative overscroll-contain select-text"
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Loading freeze overlay while requesting */}
        {isLoading && (
          <div className="absolute inset-0 z-40 bg-white/85 backdrop-blur-xs flex flex-col items-center justify-center gap-3 p-6 text-center animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-[#163E8C] shadow-sm">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-[#080B12]">
                Validating &amp; Transmitting Request
              </h4>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                Please wait while our compliance desk securely processes your consultation details...
              </p>
            </div>
          </div>
        )}

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#0B2458] to-[#163E8C] text-white p-6 relative">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-5 right-5 p-2 rounded-lg bg-white/15 hover:bg-white/30 active:scale-95 text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer z-50 pointer-events-auto"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-1 pr-14 sm:pr-16">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-200">
              FINCORE Consultation Desk
            </span>
            <h2 id="consultation-modal-title" className="text-xl sm:text-2xl font-bold text-white">
              Request a Consultation
            </h2>
            <p className="text-xs text-blue-100/90 leading-relaxed font-normal">
              Share your financial, registration, or licensing requirements. Our advisory desk will get in touch.
            </p>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto">
          {successData ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-[#080B12]">
                  Consultation Request Received
                </h3>
                <div className="inline-block px-3 py-1.5 rounded-md bg-blue-50 border border-blue-200 text-xs font-mono font-bold text-[#163E8C]">
                  Reference ID: {successData.referenceId}
                </div>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  {successData.message}
                </p>
              </div>

              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Submit Another Request
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 rounded-lg bg-[#163E8C] text-white text-xs font-semibold hover:bg-[#0B2458] transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {serverError && (
                <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                  <span className="leading-snug">{serverError}</span>
                </div>
              )}

              {/* Honeypot for spam protection */}
              <input
                type="text"
                name="fin_hp"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              {/* Full Name */}
              <div className="space-y-1">
                <label
                  htmlFor="modal-full-name"
                  className="block text-xs font-bold text-slate-800"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="modal-full-name"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-[#163E8C] transition-colors ${
                    errors.fullName ? "border-red-400 bg-red-50/20" : "border-slate-300 bg-white"
                  }`}
                />
                {errors.fullName && (
                  <p className="text-[11px] text-red-600">{errors.fullName}</p>
                )}
              </div>

              {/* Two Column: Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label
                    htmlFor="modal-email"
                    className="block text-xs font-bold text-slate-800"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="modal-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-[#163E8C] transition-colors ${
                      errors.email ? "border-red-400 bg-red-50/20" : "border-slate-300 bg-white"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-red-600">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="modal-phone"
                    className="block text-xs font-bold text-slate-800"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="modal-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-[#163E8C] transition-colors ${
                      errors.phone ? "border-red-400 bg-red-50/20" : "border-slate-300 bg-white"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-red-600">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Service Required (Dropdown of 15 services) */}
              <div className="space-y-1">
                <label
                  htmlFor="modal-service"
                  className="block text-xs font-bold text-slate-800"
                >
                  Service Required <span className="text-red-500">*</span>
                </label>
                <select
                  id="modal-service"
                  value={serviceRequired}
                  onChange={(e) => setServiceRequired(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-[#163E8C]"
                >
                  <optgroup label="Taxation & Financial Compliance">
                    <option value="Tax Filing">Tax Filing</option>
                    <option value="GST Registration and Filing">GST Registration and Filing</option>
                    <option value="Provident Fund (PF)">Provident Fund (PF)</option>
                    <option value="ESI (Employee State Insurance)">ESI (Employee State Insurance)</option>
                    <option value="TDS (Tax Deducted at Source)">TDS (Tax Deducted at Source)</option>
                    <option value="TCS (Tax Collected at Source)">TCS (Tax Collected at Source)</option>
                    <option value="Professional Tax (PT)">Professional Tax (PT)</option>
                    <option value="Accounting and Bookkeeping">Accounting and Bookkeeping</option>
                  </optgroup>
                  <optgroup label="Business Registration">
                    <option value="Company Incorporation">Company Incorporation</option>
                    <option value="Partnership Firm Registration">Partnership Firm Registration</option>
                    <option value="Business Registration">Business Registration</option>
                  </optgroup>
                  <optgroup label="Licenses & Regulatory Compliance">
                    <option value="Trade License">Trade License</option>
                    <option value="Labour License and Compliance">Labour License and Compliance</option>
                    <option value="Food License (FSSAI)">Food License (FSSAI)</option>
                    <option value="Other Business Licenses">Other Business Licenses</option>
                  </optgroup>
                </select>
              </div>

              {/* Brief Description */}
              <div className="space-y-1">
                <label
                  htmlFor="modal-description"
                  className="block text-xs font-bold text-slate-800"
                >
                  Brief Description of Requirement <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="modal-description"
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide brief details about your business activity, registration stage, or filing requirement..."
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-[#163E8C] transition-colors resize-none ${
                    errors.description ? "border-red-400 bg-red-50/20" : "border-slate-300 bg-white"
                  }`}
                />
                {errors.description && (
                  <p className="text-[11px] text-red-600">{errors.description}</p>
                )}
              </div>

              {/* Consent Checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={consentGiven}
                    onChange={(e) => setConsentGiven(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-[#163E8C] focus:ring-[#163E8C] mt-0.5"
                  />
                  <span className="text-xs text-slate-600 leading-snug">
                    I consent to FINCORE Consultancy Services handling this information to contact me regarding my consultation inquiry.
                  </span>
                </label>
                {errors.consentGiven && (
                  <p className="text-[11px] text-red-600 mt-1 pl-6">
                    {errors.consentGiven}
                  </p>
                )}
              </div>

              {/* Privacy and Security Microcopy */}
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-500 flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>
                  Your information is handled strictly for advisory communication. We never store banking credentials or passwords.
                </span>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-hover-shine w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#163E8C] hover:bg-[#0B2458] text-white text-xs font-semibold shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#163E8C]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Validating &amp; Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Request</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
