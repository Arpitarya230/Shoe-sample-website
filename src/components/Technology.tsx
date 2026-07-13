import { useState } from "react";
import { Wind, Layers, ShieldAlert, Waves, Droplet, CheckCircle } from "lucide-react";

export default function Technology() {
  const [activeTech, setActiveTech] = useState<number | null>(null);

  const technologies = [
    {
      id: "air-cushion",
      title: "Active-Air Cushion Pods",
      sub: "Micro-Chamber Impact Absorption",
      description: "Our signature heel pods contain pressurized nitrogen gas sealed in high-tensile thermo-polyurethane shells. It compresses dynamically during heel-strike and springs back instantly to mitigate knee joint shock by up to 34%.",
      icon: Wind,
      statName: "Impact Protection",
      statValue: "96%",
      iconColor: "text-cyan-400 border-cyan-500/20 bg-cyan-500/5",
      glowColor: "group-hover:bg-cyan-500/10",
      accent: "#06B6D4",
    },
    {
      id: "foam-midsole",
      title: "Sugarcane Bio-Foam Midsole",
      sub: "Elastic Sugar-Chain Cushioning Core",
      description: "Infused with molecular sugarcane polymers, our lightweight midsole provides a plush ride without sacrificing lateral stability. Designed with open-cell structures that resist long-term compression fatigue.",
      icon: Layers,
      statName: "Elastic Cushioning",
      statValue: "92%",
      iconColor: "text-amber-400 border-amber-500/20 bg-amber-500/5",
      glowColor: "group-hover:bg-amber-500/10",
      accent: "#F59E0B",
    },
    {
      id: "carbon-plate",
      title: "Tri-Weave Carbon Propulsion Plate",
      sub: "Anatomical Snap-Back Energy Plate",
      description: "A full-length, hyper-stiff carbon composite sheet sitting inside the midsole. It behaves as a dynamic lever: flexing slightly as your weight transitions forward, then snapping back forcefully to propel you into your next stride.",
      icon: ShieldAlert,
      statName: "Energy Return Rate",
      statValue: "98%",
      iconColor: "text-brand-orange border-brand-orange/20 bg-brand-orange/5",
      glowColor: "group-hover:bg-brand-orange/10",
      accent: "#FF6B00",
    },
    {
      id: "mesh-upper",
      title: "AeroKnit Breathable Mesh",
      sub: "Zonal Tension Thermally-Woven Knit",
      description: "Engineered from single-filament marine polymer yarns. We vary the stitch density dynamically across different zones of the foot: loose and highly porous near the toes for cooling, dense and rigid near the midfoot for optimal lockdown.",
      icon: Waves,
      statName: "Breathability Rating",
      statValue: "95%",
      iconColor: "text-indigo-400 border-indigo-500/20 bg-indigo-500/5",
      glowColor: "group-hover:bg-indigo-500/10",
      accent: "#6366F1",
    },
    {
      id: "waterproof",
      title: "AeroShield Hydrophobic Membrane",
      sub: "Micro-Porous Vapor Barrier Protection",
      description: "A dual-layer nanotech lining applied directly to the inner mesh. Its pores are 20,000 times smaller than a water droplet (blocking rain completely), yet 700 times larger than water vapor molecules (allowing sweat to evaporate freely).",
      icon: Droplet,
      statName: "Water Repellency",
      statValue: "100%",
      iconColor: "text-green-400 border-green-500/20 bg-green-500/5",
      glowColor: "group-hover:bg-green-500/10",
      accent: "#10B981",
    },
  ];

  return (
    <section id="technology" className="py-24 relative overflow-hidden bg-zinc-950">
      {/* Background neon lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-2xs font-mono tracking-widest text-brand-orange uppercase block mb-2">
            BIOMECHANICAL ENGINEERING
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
            Propulsion <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-500">Technology</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-sm md:text-base">
            Every millimeter of an AERO shoe is backed by rigorous scientific research. Explore the five architectural layers that drive our elite performance standard.
          </p>
        </div>

        {/* Technology Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-stretch">
          {technologies.map((t, idx) => {
            const IconComp = t.icon;
            const isHovered = activeTech === idx;
            return (
              <div
                key={t.id}
                onMouseEnter={() => setActiveTech(idx)}
                onMouseLeave={() => setActiveTech(null)}
                className="group flex flex-col justify-between rounded-2xl glass-panel border-zinc-900 hover:border-zinc-800 p-6 transition-all duration-300 hover:scale-[1.01] relative overflow-hidden"
              >
                {/* Glow lights */}
                <div className={`absolute -top-12 -right-12 w-24 h-24 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 ${t.glowColor}`} />

                <div>
                  {/* Top Icon Block */}
                  <div className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-6 transition-colors duration-300 ${t.iconColor}`}>
                    <IconComp className="w-5 h-5 stroke-[2]" />
                  </div>

                  {/* Text Details */}
                  <span className="text-4xs font-mono tracking-widest uppercase block mb-1" style={{ color: t.accent }}>
                    {t.sub}
                  </span>
                  <h3 className="text-base font-black text-white uppercase tracking-tight mb-3">
                    {t.title}
                  </h3>
                  <p className="text-3xs text-zinc-400 leading-relaxed">
                    {t.description}
                  </p>
                </div>

                {/* Stat progress bar footer */}
                <div className="mt-8 pt-5 border-t border-zinc-900/80">
                  <div className="flex justify-between items-center text-3xs font-mono mb-2.5">
                    <span className="text-zinc-500">{t.statName}:</span>
                    <span className="font-bold text-white" style={{ color: t.accent }}>{t.statValue}</span>
                  </div>
                  {/* Background progress track */}
                  <div className="w-full h-[3px] bg-zinc-900 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: isHovered ? t.statValue : "12%",
                        backgroundColor: t.accent,
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-1.5 mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <CheckCircle className="w-3 h-3 text-green-400" />
                    <span className="text-4xs text-zinc-500 font-mono">LAB CERTIFIED</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
