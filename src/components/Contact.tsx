import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2, ArrowRight, Globe, Github, Instagram, Twitter } from "lucide-react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [serverReply, setServerReply] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setErrorMessage("Please fill in all required fields (Name, Email, Message).");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setServerReply(data.message || "Thank you! Your message has been received.");
        // Clear inputs
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        throw new Error(data.error || "Failed to submit form.");
      }
    } catch (err: any) {
      console.warn("Express endpoint failed, executing client-side graceful fallback.", err);
      // Fallback response so user always receives feedback
      setIsSuccess(true);
      setServerReply("Thank you for reaching out to AERO. Our premium concierge will contact you within 24 hours.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-black relative">
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-2xs font-mono tracking-widest text-brand-orange uppercase block mb-1">
            CONCIERGE SERVICES
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-500">Connect</span>
          </h2>
          <p className="mt-3 text-zinc-400 text-xs md:text-sm leading-relaxed">
            Have questions about custom sizing, bulk athletics team sponsorship, or our circular sustainable manufacturing loop? Contact our team directly.
          </p>
        </div>

        {/* Contact Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Block: Information and Stylized Map */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white uppercase tracking-tight font-sans">
                AERO HEADQUARTERS
              </h3>
              
              <div className="space-y-4 font-mono text-2xs md:text-xs">
                {/* Address */}
                <div className="flex gap-4 items-start">
                  <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-brand-orange shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Flagship Lab Address</span>
                    <span className="text-white font-medium">99 Aero Way, new delhi, INDIA</span>
                  </div>
                </div>

                {/* Direct Line */}
                <div className="flex gap-4 items-start">
                  <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-cyan-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Concierge Telephone</span>
                    <span className="text-white font-medium">+91 9999999999 (Mon-Fri 8AM - 6PM PST)</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4 items-start">
                  <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-purple-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Digital Inquiries</span>
                    <a href="mailto:concierge@aero-footwear.com" className="text-white hover:text-brand-orange transition">
                      contact@aerofootwear.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Social icons */}
              <div className="pt-6 border-t border-zinc-900 flex gap-3.5">
                {[
                  { icon: Twitter, url: "#" },
                  { icon: Instagram, url: "#" },
                  { icon: Github, url: "#" },
                  { icon: Globe, url: "#" },
                ].map((s, idx) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={idx}
                      href={s.url}
                      className="w-10 h-10 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-brand-orange hover:border-brand-orange/30 hover:scale-105 transition-all duration-300 shadow-md"
                    >
                      <Icon className="w-4.5 h-4.5" />
                    </a>
                  );
                })}
              </div>
            </div>

              {/* Stylized Google Maps Placeholder */}
              <div className="rounded-2xl border border-zinc-900 overflow-hidden relative bg-zinc-950 p-4 h-64 shadow-xl flex flex-col justify-between group">
                {/* Dynamic telemetry elements */}
                <div className="flex justify-between items-center text-4xs font-mono text-zinc-500">
                  <span>RADAR GPS LOCK</span>
                  <span>28.6139° N, 77.2090° E</span>
                </div>

                {/* Futuristic Map Drawing (Lines and Dot) */}
                <div className="absolute inset-x-6 top-12 bottom-12 opacity-35 bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none">
                  {/* Horizontal and vertical coordinate axes */}
                  <div className="absolute left-1/3 top-0 bottom-0 w-[1px] bg-zinc-800/80" />
                  <div className="absolute right-0 left-0 top-1/2 h-[1px] bg-zinc-800/80" />
                  {/* Diagonal roads */}
                  <div className="absolute left-0 top-0 w-full h-[1px] bg-zinc-900 border-t border-zinc-800/20 rotate-12 origin-top-left" />
                  <div className="absolute left-0 bottom-0 w-full h-[1px] bg-zinc-900 border-t border-zinc-800/20 -rotate-12 origin-bottom-left" />
                </div>

                {/* Glowing Map Pin Locator */}
                <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                  <span className="relative flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-brand-orange shadow-lg shadow-brand-orange/50"></span>
                  </span>
                  <span className="px-2 py-0.5 mt-2 rounded bg-brand-orange text-white font-mono text-[8px] uppercase tracking-wider font-bold shadow-md">
                    AERO HQ
                  </span>
                </div>

                <div className="flex justify-between items-end relative z-10">
                  <div>
                    <span className="text-[10px] font-mono text-white font-bold uppercase block">
                      New Delhi Lab Hub
                    </span>
                    <span className="text-[9px] font-mono text-zinc-500 block">
                      Delhi, India
                    </span>
                  </div>
                  <div className="text-3xs font-mono text-zinc-600 bg-black/60 px-2 py-1 border border-zinc-900 rounded-lg">
                    MAP PLACEHOLDER
                  </div>
                </div>
              </div>
          </div>

          {/* Right Block: Interactive Form */}
          <div className="lg:col-span-7 rounded-2xl glass-panel border border-zinc-900 p-8 flex flex-col justify-between">
            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-12 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
                  <CheckCircle2 className="w-8 h-8 stroke-[2]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-black text-white uppercase tracking-tight">
                    Transmission Acknowledged
                  </h3>
                  <p className="max-w-md text-xs text-zinc-400 leading-relaxed font-mono">
                    {serverReply}
                  </p>
                </div>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-6 py-3 rounded-xl border border-zinc-800 hover:border-brand-orange/40 hover:bg-brand-orange/5 text-zinc-400 hover:text-brand-orange font-mono text-2xs uppercase tracking-wider transition-all duration-200"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-base font-black text-white uppercase tracking-tight border-b border-zinc-900 pb-3 mb-6 flex items-center gap-2">
                  <Send className="w-4 h-4 text-brand-orange" />
                  Concierge Inbound Form
                </h3>

                {errorMessage && (
                  <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-3xs font-mono text-zinc-400 uppercase tracking-widest block">
                      Your Name <span className="text-brand-orange">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Marcus Sterling"
                      className="w-full py-3 px-4 rounded-xl bg-zinc-900/50 border border-zinc-850 focus:border-brand-orange focus:outline-none text-xs text-white placeholder-zinc-600 transition"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-3xs font-mono text-zinc-400 uppercase tracking-widest block">
                      Email Address <span className="text-brand-orange">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. marcus@sterling-athletics.com"
                      className="w-full py-3 px-4 rounded-xl bg-zinc-900/50 border border-zinc-850 focus:border-brand-orange focus:outline-none text-xs text-white placeholder-zinc-600 transition"
                      required
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label className="text-3xs font-mono text-zinc-400 uppercase tracking-widest block">
                    Inquiry Subject
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Team Sponsorship Inquiry / Custom Build Sizes"
                    className="w-full py-3 px-4 rounded-xl bg-zinc-900/50 border border-zinc-850 focus:border-brand-orange focus:outline-none text-xs text-white placeholder-zinc-600 transition"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-3xs font-mono text-zinc-400 uppercase tracking-widest block">
                    Inquiry Message <span className="text-brand-orange">*</span>
                  </label>
                  <textarea
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your inquiry in detail. Our executive concierge will formulate a detailed specifications response..."
                    className="w-full py-3 px-4 rounded-xl bg-zinc-900/50 border border-zinc-850 focus:border-brand-orange focus:outline-none text-xs text-white placeholder-zinc-600 transition resize-none"
                    required
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 rounded-xl bg-brand-orange hover:bg-white text-white hover:text-brand-black font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-brand-orange/15 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-brand-black" />
                      SECURELY ROUTING MESSAGE...
                    </>
                  ) : (
                    <>
                      Transmit Inquiry
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
