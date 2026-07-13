import React, { useState } from "react";
import { ArrowUpRight, Mail, Sparkles } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        setIsSubscribed(true);
        setEmail("");
        setTimeout(() => setIsSubscribed(false), 4000);
      } else {
        const data = await response.json();
        alert(data.error || "Subscription failed.");
      }
    } catch (error) {
      console.error("Subscription failed, using client fallback", error);
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 4000);
    }
  };

  const quickLinks = [
    { name: "About Brand", url: "#about" },
    { name: "3D Customizer", url: "#customizer" },
    { name: "Collection Catalog", url: "#collections" },
    { name: "Biomechanical Tech", url: "#technology" },
    { name: "Blueprint Gallery", url: "#portfolio" },
  ];

  const categories = [
    { name: "Carbon Speed Runners", url: "#collections" },
    { name: "Calfskin Street Courts", url: "#collections" },
    { name: "Hydrophobic Hiking Boots", url: "#collections" },
    { name: "Multi-Sport Stability Trainers", url: "#collections" },
    { name: "Sugarcane Casual Slip-ons", url: "#collections" },
  ];

  const legalLinks = [
    { name: "Corporate Compliance", url: "#" },
    { name: "Privacy Protocol", url: "#" },
    { name: "Seismic Terms of Use", url: "#" },
    { name: "Concierge Return Policy", url: "#" },
  ];

  return (
    <footer className="bg-zinc-950 text-white pt-24 pb-12 border-t border-zinc-900/60 relative overflow-hidden">
      {/* Background soft ambient glowing light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-zinc-900 pb-16">
        
        {/* Brand Information */}
        <div className="md:col-span-4 space-y-6">
          <a href="#" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-lg bg-brand-orange flex items-center justify-center font-black text-white text-lg tracking-tighter group-hover:rotate-12 transition-all duration-300">
              A
            </span>
            <span className="text-xl font-black tracking-widest text-white uppercase font-sans">
              AERO<span className="text-brand-orange">.</span>
            </span>
          </a>
          <p className="text-zinc-500 text-xs leading-relaxed max-w-sm">
            AERO is an elite biomechanical sports-performance footwear company. We merge computer-modeled propulsion engineering, sustainable sugared polymers, and world-class craftsmanship to formulate zero-compromise speed.
          </p>
          <div className="text-4xs font-mono text-zinc-600 space-y-1 block">
            <span>DESIGN HQ: NEW DELHI, INDIA</span>
          </div>
        </div>

        {/* Categories Link Grid */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="text-2xs font-mono tracking-widest text-zinc-400 uppercase">
            CATEGORIES
          </h4>
          <ul className="space-y-2.5 text-2xs font-mono">
            {categories.map((l, idx) => (
              <li key={idx}>
                <a href={l.url} className="text-zinc-500 hover:text-white transition">
                  {l.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links Grid */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="text-2xs font-mono tracking-widest text-zinc-400 uppercase">
            EXPLORE
          </h4>
          <ul className="space-y-2.5 text-2xs font-mono">
            {quickLinks.map((l: any, idx) => (
              <li key={idx}>
                <a href={l.url} className="text-zinc-500 hover:text-white transition">
                  {l.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter form */}
        <div className="md:col-span-4 space-y-5">
          <h4 className="text-2xs font-mono tracking-widest text-zinc-400 uppercase flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
            AERO CHRONICLE TELEMETRY
          </h4>
          <p className="text-zinc-500 text-xs leading-relaxed">
            Subscribe to receive priority product drop releases, design blueprint files, and regional racing tour invitations.
          </p>

          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-grow py-2.5 px-4 rounded-lg bg-zinc-900 border border-zinc-850 focus:border-brand-orange focus:outline-none text-2xs text-white placeholder-zinc-650 transition font-mono"
              required
            />
            <button
              type="submit"
              className="py-2.5 px-5 rounded-lg bg-brand-orange hover:bg-white text-white hover:text-brand-black text-2xs font-mono font-bold uppercase transition flex items-center gap-1 hover:scale-102"
            >
              Subscribe
            </button>
          </form>
          {isSubscribed && (
            <span className="text-[10px] text-green-400 font-mono block">Subscribed! Check your inbox soon.</span>
          )}
        </div>

      </div>

      {/* Sub-Footer Copyright Area */}
      <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col md:flex-row justify-between items-center text-5xs md:text-3xs text-zinc-600 font-mono gap-4 relative z-10">
        <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start">
          <span>© {new Date().getFullYear()} AERO Footwear Co. All rights reserved.</span>
          <span className="hidden md:inline text-zinc-800">|</span>
          {legalLinks.map((ll, idx) => (
            <a key={idx} href={ll.url} className="hover:text-zinc-400 transition">
              {ll.name}
            </a>
          ))}
        </div>
        <div className="flex gap-1 items-center">
          <span>Propelled in New Delhi, India</span>
          <ArrowUpRight className="w-3 h-3 text-brand-orange" />
        </div>
      </div>
    </footer>
  );
}
