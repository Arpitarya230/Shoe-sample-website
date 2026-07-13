import { useEffect, useState } from "react";
import { ArrowUpRight, Award, Play } from "lucide-react";

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized coordinates (-0.5 to 0.5)
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20">
      {/* Background Lighting Gradients */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full bg-brand-orange/15 blur-[120px] transition-transform duration-300 pointer-events-none"
        style={{
          transform: `translate(${mousePos.x * -40}px, ${mousePos.y * -40}px) translate(-10%, -10%)`,
          top: "20%",
          left: "20%",
        }}
      />
      <div
        className="absolute w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[150px] transition-transform duration-300 pointer-events-none"
        style={{
          transform: `translate(${mousePos.x * 50}px, ${mousePos.y * 50}px) translate(20%, 20%)`,
          bottom: "10%",
          right: "15%",
        }}
      />

      {/* Decorative Grid and Circles */}
      <div className="absolute inset-0 bg-[radial-gradient(#1c1c1c_1px,transparent_1px)] [background-size:32px_32px] opacity-25 pointer-events-none" />

      {/* Abstract rotating ring */}
      <div
        className="absolute w-[450px] h-[450px] rounded-full border border-white/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-300"
        style={{
          transform: `translate(calc(-50% + ${mousePos.x * -20}px), calc(-50% + ${mousePos.y * -20}px)) rotate(${mousePos.x * 15}deg)`,
        }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-brand-orange animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full py-12">
        {/* Left Text Column */}
        <div className="lg:col-span-6 space-y-8 text-left">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/25 text-brand-orange text-xs font-mono font-medium tracking-wide">
            <Award className="w-3.5 h-3.5" />
            WORLD CLASS PERFORMANCE
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] text-white uppercase">
              DEFY YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-amber-500 to-red-500">
                LIMITS
              </span>
            </h1>
            <p className="max-w-md text-zinc-400 text-sm md:text-base leading-relaxed">
              Experience the future of propulsion. Engineered with carbon fibre cores, nitrogen-infused midsoles, and reactive multi-surface outsoles. Crafted for elites, worn by pioneers.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 items-center">
            <a
              href="#collections"
              className="px-8 py-4 rounded-xl bg-brand-orange hover:bg-white text-white hover:text-brand-black font-semibold text-sm tracking-wider uppercase flex items-center gap-2 transition-all duration-300 shadow-lg shadow-brand-orange/20 hover:shadow-white/5 hover:translate-y-[-2px] active:translate-y-[1px]"
            >
              Shop Collection
              <ArrowUpRight className="w-4.5 h-4.5 stroke-[2.5]" />
            </a>
            <a
              href="#customizer"
              className="px-8 py-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-white font-semibold text-sm tracking-wider uppercase flex items-center gap-2.5 transition-all duration-300 hover:translate-y-[-2px]"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-orange"></span>
              </span>
              3D Customizer
            </a>
          </div>

          {/* Quick specs banner */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-zinc-900 max-w-md">
            <div>
              <span className="text-xl md:text-2xl font-black text-white block">180g</span>
              <span className="text-3xs font-mono tracking-widest uppercase text-zinc-500">Ultra Featherlight</span>
            </div>
            <div>
              <span className="text-xl md:text-2xl font-black text-white block">98%</span>
              <span className="text-3xs font-mono tracking-widest uppercase text-zinc-500">Energy Return</span>
            </div>
            <div>
              <span className="text-xl md:text-2xl font-black text-white block">4mm</span>
              <span className="text-3xs font-mono tracking-widest uppercase text-zinc-500">Precision Drop</span>
            </div>
          </div>
        </div>

        {/* Right Floating Visual Column */}
        <div className="lg:col-span-6 flex justify-center items-center relative h-[350px] md:h-[500px]">
          {/* Subtle spinning technical ring background */}
          <div className="absolute w-[300px] md:w-[480px] h-[300px] md:h-[480px] rounded-full border border-dashed border-zinc-800 animate-slow-spin opacity-40" />

          {/* Parallax Container for main Product Image */}
          <div
            className="relative transition-transform duration-500 ease-out"
            style={{
              transform: `translate(${mousePos.x * 40}px, ${mousePos.y * 40}px) rotate(${mousePos.x * 8}deg)`,
            }}
          >
            {/* Glow backing the shoe */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-orange/30 rounded-full blur-[80px]" />

            {/* Main floating high-res shoe image */}
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop"
              alt="AERO Signature Orange Racing Shoe"
              className="w-[280px] md:w-[440px] drop-shadow-[0_20px_50px_rgba(255,107,0,0.4)] relative z-10 animate-float"
              referrerPolicy="no-referrer"
            />

            {/* Holographic floating overlays */}
            <div
              className="absolute top-4 right-1/4 bg-zinc-950/85 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-xl text-left z-20 shadow-xl pointer-events-none animate-float-delayed"
              style={{ animationDelay: "1.5s" }}
            >
              <span className="text-3xs text-brand-orange font-mono block tracking-widest">NITROGEN MIDSOLE</span>
              <span className="text-xs font-bold text-white uppercase">Cloud-Foam V4</span>
            </div>

            <div
              className="absolute bottom-12 -left-4 bg-zinc-950/85 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-xl text-left z-20 shadow-xl pointer-events-none animate-float"
              style={{ animationDelay: "3s" }}
            >
              <span className="text-3xs text-brand-orange font-mono block tracking-widest">PROPULSION CORE</span>
              <span className="text-xs font-bold text-white uppercase">Carbon Plate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600 hover:text-white transition-colors duration-200">
        <span className="text-4xs font-mono tracking-widest uppercase">Scroll Explore</span>
        <div className="w-5 h-9 rounded-full border-2 border-zinc-800/80 flex justify-center p-1">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-bounce" />
        </div>
      </div>
    </section>
  );
}
