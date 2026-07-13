import { BookOpen, Target, Compass, Cpu, Leaf } from "lucide-react";

export default function About() {
  const pillars = [
    {
      id: "story",
      title: "Our Story",
      description: "Founded in 2018 in a modest performance prototyping workshop, AERO was born from a singular obsession: to create footwear that feels like an natural extension of the human body. We began with custom orthotic rigs for Olympic sprinters and evolved into an elite global brand.",
      icon: BookOpen,
      color: "from-orange-500/10 to-amber-500/5",
      border: "hover:border-brand-orange/40",
      iconColor: "text-brand-orange",
    },
    {
      id: "mission",
      title: "Our Mission",
      description: "To engineer zero-compromise footwear that amplifies athletic human potential. We merge raw mechanics, biomechanics research, and visionary design to build products that empower athletes to run faster, explore further, and live healthier.",
      icon: Target,
      color: "from-cyan-500/10 to-blue-500/5",
      border: "hover:border-cyan-500/40",
      iconColor: "text-cyan-400",
    },
    {
      id: "vision",
      title: "Our Vision",
      description: "To lead the footwear industry into a new frontier of hyper-personalized mechanical design and adaptive materials. We envision a future where your shoes actively adapt to your gait, weight distribution, and surrounding surface in real-time.",
      icon: Compass,
      color: "from-purple-500/10 to-fuchsia-500/5",
      border: "hover:border-purple-500/40",
      iconColor: "text-purple-400",
    },
    {
      id: "innovation",
      title: "Next-Gen Innovation",
      description: "AERO Lab is where science meets design. We conduct rigorous thermal scanning, wind-tunnel drag testing, and high-speed robotic impact fatigue analyses. Our carbon composite shells are layered manually in microscopic precision grids.",
      icon: Cpu,
      color: "from-amber-500/10 to-yellow-500/5",
      border: "hover:border-amber-500/40",
      iconColor: "text-amber-400",
    },
    {
      id: "sustainability",
      title: "Zero-Impact Eco Pledge",
      description: "Performance shouldn't cost the Earth. Over 85% of our latest line uses OceanKnit recycled marine plastic yarns, bio-derived sugarcane foam midsoles, and completely toxin-free vegetable tanning processes. We strive for fully circular zero-carbon loops.",
      icon: Leaf,
      color: "from-green-500/10 to-emerald-500/5",
      border: "hover:border-green-500/40",
      iconColor: "text-green-400",
    }
  ];

  return (
    <section id="about" className="py-28 relative bg-[#090909]">
      {/* Background ambient lighting */}
      <div className="absolute right-0 top-1/3 w-80 h-80 bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left: Editorial Image Block */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-2xs font-mono tracking-widest text-brand-orange uppercase block">
              EST. 2018 / CORE PHILOSOPHY
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase leading-[0.95]">
              CRAFTING THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-500">
                FUTURE OF PACE
              </span>
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              At AERO, we believe the human foot is a mechanical masterpiece. Our task isn't to fix it—it is to liberate it. We combine rigorous kinetic laboratory research with premium artisan materials to produce the world's most responsive footwear.
            </p>

            {/* Premium visual image container */}
            <div className="relative group overflow-hidden rounded-2xl border border-zinc-800 shadow-2xl mt-8">
              <div className="absolute inset-0 bg-brand-orange/20 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop"
                alt="AERO Crafting Lab"
                className="w-full h-80 object-cover transform scale-100 group-hover:scale-105 transition-all duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md border border-white/5 p-4 rounded-xl z-20">
                <span className="text-3xs text-brand-orange font-mono uppercase tracking-widest block">AERO DESIGN HQ</span>
                <span className="text-xs text-white font-bold block mt-0.5">Biomechanical Kinetic Testing Floor</span>
              </div>
            </div>
          </div>

          {/* Right: Bento-style Cards */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {pillars.slice(0, 4).map((p) => {
                const IconComponent = p.icon;
                return (
                  <div
                    key={p.id}
                    className={`glass-panel border-zinc-800/80 p-6 rounded-2xl transition-all duration-300 hover:translate-y-[-4px] border ${p.border} relative group overflow-hidden`}
                  >
                    {/* Corner gradient light */}
                    <div className={`absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br ${p.color} rounded-full blur-xl opacity-80 group-hover:opacity-100 transition-opacity`} />
                    
                    <div className="flex flex-col gap-4 relative z-10">
                      <div className={`w-11 h-11 rounded-xl bg-zinc-900/80 flex items-center justify-center border border-zinc-800 ${p.iconColor}`}>
                        <IconComponent className="w-5.5 h-5.5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white uppercase tracking-tight">
                          {p.title}
                        </h3>
                        <p className="mt-2 text-zinc-400 text-2xs md:text-xs leading-relaxed">
                          {p.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sustainability wide full-width block */}
            {pillars.slice(4).map((p) => {
              const IconComponent = p.icon;
              return (
                <div
                  key={p.id}
                  className={`glass-panel border-zinc-800/80 p-6 rounded-2xl transition-all duration-300 hover:translate-y-[-4px] border ${p.border} relative group overflow-hidden`}
                >
                  <div className={`absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br ${p.color} rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity`} />
                  
                  <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center relative z-10">
                    <div className={`w-12 h-12 rounded-xl bg-zinc-900/80 flex items-center justify-center border border-zinc-800 shrink-0 ${p.iconColor}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white uppercase tracking-tight flex items-center gap-2">
                        {p.title}
                        <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-400 text-[9px] font-mono tracking-wider font-bold">100% RECYCLABLE</span>
                      </h3>
                      <p className="mt-1 text-zinc-400 text-2xs md:text-xs leading-relaxed">
                        {p.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
