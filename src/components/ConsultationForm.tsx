"use client";

import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Shield,
  Loader2,
  Lock,
  Sparkles,
} from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { useInView } from "@/hooks/useInView";

interface ConsultationFormProps {
  initialService?: string;
}

export default function ConsultationForm({
  initialService = "Tax Filing",
}: ConsultationFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceRequired, setServiceRequired] = useState(initialService);

  React.useEffect(() => {
    if (initialService) {
      // If the passed string matches a category, map to primary service or keep if direct match
      if (initialService.includes("Taxation")) {
        setServiceRequired("Tax Filing");
      } else if (initialService.includes("Licenses")) {
        setServiceRequired("Trade License");
      } else if (initialService === "Business Registration") {
        setServiceRequired("Business Registration");
      } else {
        setServiceRequired(initialService);
      }
    }
  }, [initialService]);

  const [description, setDescription] = useState("");
  const [consentGiven, setConsentGiven] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submissionSuccess, setSubmissionSuccess] = useState<null | {
    referenceId: string;
    message: string;
  }>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setServerError(null);

    // Client-side validations
    const localErrors: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      localErrors.fullName = "Please enter your full name (minimum 2 characters).";
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      localErrors.email = "Please provide a valid email address.";
    }
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      localErrors.phone = "Please enter a valid 10-digit phone number.";
    }
    if (!serviceRequired) {
      localErrors.serviceRequired = "Please select the service you require.";
    }
    if (!description.trim() || description.trim().length < 10) {
      localErrors.description =
        "Please provide at least 10 characters describing your requirement.";
    }
    if (!consentGiven) {
      localErrors.consentGiven =
        "Please provide consent so our advisory team may contact you regarding your inquiry.";
    }

    if (Object.keys(localErrors).length > 0) {
      setErrors(localErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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

      const result = await response.json();

      if (!response.ok || !result.success) {
        if (result.errors) {
          setErrors(result.errors);
        } else {
          setServerError(
            result.message || "Failed to submit consultation. Please try again."
          );
        }
      } else {
        setSubmissionSuccess({
          referenceId: result.referenceId,
          message: result.message,
        });
        // Reset form inputs
        setFullName("");
        setEmail("");
        setPhone("");
        setDescription("");
        setConsentGiven(false);
      }
    } catch {
      setServerError(
        "A network communication error occurred. Please check your connection or contact us directly."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const { ref, isInView } = useInView({ threshold: 0.08 });

  const handleReset = () => {
    setSubmissionSuccess(null);
    setServerError(null);
    setErrors({});
  };

  return (
    <section ref={ref} id="contact" className="py-20 lg:py-28 bg-white relative scroll-mt-20 overflow-hidden">
      <div id="consultation" className="absolute -top-24 left-0" />

      {/* Decorative ambient background glows */}
      <div className="absolute top-1/3 -left-28 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none animate-subtle-pulse" />
      <div className="absolute bottom-10 -right-28 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none animate-subtle-float" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 relative z-10">
        {/* Section Header (Centered across top of the section) */}
        <div
          className={`text-center max-w-3xl mx-auto space-y-4 transition-all duration-700 ${
            isInView ? "animate-section-reveal" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF1FF] text-[#163E8C] text-xs font-bold uppercase tracking-wider border border-blue-200/60 shadow-xs">
            <Shield className="w-3.5 h-3.5 text-[#163E8C]" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#080B12] font-heading">
            Contact &amp; Consultation Desk
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Connect with our compliance team for clear documentation checklists,
            statutory roadmap clarification, and tailored fee estimates for
            your individual or business situation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Consultation Details */}
          <div
            className={`lg:col-span-5 space-y-6 transition-all duration-700 delay-150 ${
              isInView ? "animate-card-reveal" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Contact Placeholders Card */}
            <div className="bg-[#F5F7FA] rounded-2xl p-6 sm:p-7 border border-slate-200/80 space-y-5 shadow-2xs hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Office Communications
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  [Placeholders]
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5 p-2 rounded-xl hover:bg-white transition-all duration-200 group">
                  <div className="w-9 h-9 rounded-lg bg-white text-[#163E8C] border border-slate-200 flex items-center justify-center shrink-0 shadow-xs group-hover:bg-[#163E8C] group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#080B12] block group-hover:text-[#163E8C] transition-colors">
                      Phone Assistance
                    </span>
                    <span className="text-xs text-slate-600 block">
                      {siteConfig.phone.display || "+91 [Official Phone Placeholder]"}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      (Configurable phone number)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-2 rounded-xl hover:bg-white transition-all duration-200 group">
                  <div className="w-9 h-9 rounded-lg bg-white text-[#163E8C] border border-slate-200 flex items-center justify-center shrink-0 shadow-xs group-hover:bg-[#163E8C] group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#080B12] block group-hover:text-[#163E8C] transition-colors">
                      Email Communication
                    </span>
                    <a
                      href={`mailto:${siteConfig.email.display}`}
                      className="text-xs text-[#163E8C] hover:underline"
                    >
                      {siteConfig.email.display}
                    </a>
                    <span className="text-[10px] text-slate-400 block">
                      (General enquiry mailbox)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-2 rounded-xl hover:bg-white transition-all duration-200 group">
                  <div className="w-9 h-9 rounded-lg bg-white text-[#163E8C] border border-slate-200 flex items-center justify-center shrink-0 shadow-xs group-hover:bg-[#163E8C] group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#080B12] block group-hover:text-[#163E8C] transition-colors">
                      Office Address
                    </span>
                    <p className="text-xs text-slate-600 leading-snug">
                      {siteConfig.address.street}, {siteConfig.address.city},{" "}
                      {siteConfig.address.state}, India
                    </p>
                    <span className="text-[10px] text-slate-400">
                      [Placeholder: Official address update pending]
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-2 rounded-xl hover:bg-white transition-all duration-200 group">
                  <div className="w-9 h-9 rounded-lg bg-white text-[#163E8C] border border-slate-200 flex items-center justify-center shrink-0 shadow-xs group-hover:bg-[#163E8C] group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#080B12] block group-hover:text-[#163E8C] transition-colors">
                      Business Hours
                    </span>
                    <p className="text-xs text-slate-600">
                      {siteConfig.businessHours.weekdays}
                    </p>
                    <p className="text-xs text-slate-500">
                      {siteConfig.businessHours.saturday}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy Safeguard Badge */}
            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/80 text-xs text-slate-700 flex items-start gap-3">
              <Lock className="w-4 h-4 text-[#163E8C] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Data Protection:</strong> Information shared via this consultation desk is used exclusively to evaluate your compliance needs. We never store bank passwords or tax portal credentials on public forms.
              </p>
            </div>
          </div>

          {/* Right Column: Form Itself */}
          <div
            className={`lg:col-span-7 transition-all duration-700 delay-300 ${
              isInView ? "animate-card-reveal" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-white rounded-2xl p-7 sm:p-10 border border-slate-200 shadow-xl relative overflow-hidden">
              {/* Loading freeze overlay while requesting */}
              {isLoading && (
                <div className="absolute inset-0 z-30 bg-white/85 backdrop-blur-xs flex flex-col items-center justify-center gap-3 p-6 text-center animate-fade-in">
                  <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-[#163E8C] shadow-sm">
                    <Loader2 className="w-6 h-6 animate-spin" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-[#080B12]">
                      Transmitting Consultation Request
                    </h4>
                    <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                      Please hold on while we securely transmit your details to our compliance desk...
                    </p>
                  </div>
                </div>
              )}
              {submissionSuccess ? (
                <div className="py-8 text-center space-y-5 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-[#080B12]">
                      Consultation Request Received
                    </h3>
                    <div className="inline-block px-3.5 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-xs font-mono font-bold text-[#163E8C]">
                      Reference ID: {submissionSuccess.referenceId}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                      {submissionSuccess.message}
                    </p>
                  </div>

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="btn-hover-shine px-6 py-2.5 rounded-lg bg-[#163E8C] hover:bg-[#0B2458] text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
                    >
                      Submit Another Requirement
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="text-lg font-bold text-[#080B12]">
                      Submit Consultation Request
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      All fields marked with an asterisk (<span className="text-red-500">*</span>) are required.
                    </p>
                  </div>

                  {serverError && (
                    <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                      <span className="leading-snug">{serverError}</span>
                    </div>
                  )}

                  {/* Honeypot Anti-spam */}
                  <input
                    type="text"
                    name="contact_honeypot"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />

                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-full-name"
                      className="block text-xs font-bold text-slate-800"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-full-name"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      className={`w-full px-4 py-2.5 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-[#163E8C] transition-colors ${
                        errors.fullName ? "border-red-400 bg-red-50/20" : "border-slate-300 bg-white"
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-red-600">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Email & Phone Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-bold text-slate-800"
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
                        className={`w-full px-4 py-2.5 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-[#163E8C] transition-colors ${
                          errors.email ? "border-red-400 bg-red-50/20" : "border-slate-300 bg-white"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-red-600">{errors.email}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-phone"
                        className="block text-xs font-bold text-slate-800"
                      >
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className={`w-full px-4 py-2.5 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-[#163E8C] transition-colors ${
                          errors.phone ? "border-red-400 bg-red-50/20" : "border-slate-300 bg-white"
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-[11px] text-red-600">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Service Required Dropdown (All 15 Services) */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-service"
                      className="block text-xs font-bold text-slate-800"
                    >
                      Service Required <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="contact-service"
                      value={serviceRequired}
                      onChange={(e) => setServiceRequired(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-[#163E8C]"
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
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-description"
                      className="block text-xs font-bold text-slate-800"
                    >
                      Brief Description of Requirement <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="contact-description"
                      required
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Outline your requirement: entity type, operational sector, current registration status, or statutory deadlines..."
                      className={`w-full px-4 py-2.5 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-[#163E8C] transition-colors resize-none ${
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
                        I consent to FINCORE Consultancy Services handling this submitted information to respond to my consultation request.
                      </span>
                    </label>
                    {errors.consentGiven && (
                      <p className="text-[11px] text-red-600 mt-1 pl-6">
                        {errors.consentGiven}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn-hover-shine w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#163E8C] hover:bg-[#0B2458] text-white text-xs sm:text-sm font-semibold shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#163E8C]"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Processing Request...</span>
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
      </div>
    </section>
  );
}
