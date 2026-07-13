import { Award, Truck, ShieldCheck, Heart, Leaf, Lightbulb } from "lucide-react";

export default function WhyChooseUs() {
  const values = [
    {
      title: "Gold-Rated Premium Materials",
      description: "We source gold-certified calfskins, long-staple marine knits, and hand-layered aerospace carbon fiber sheets to construct footwear that is soft, breathable, and exceptionally durable.",
      icon: Award,
      color: "text-brand-orange border-brand-orange/20 bg-brand-orange/5",
    },
    {
      title: "Free Premium Express Shipping",
      description: "Every order is packaged inside a heavy-board presentation box and shipped with VIP signature priority tracking. Arrives at your doorstep in 2-4 business days worldwide.",
      icon: Truck,
      color: "text-cyan-400 border-cyan-500/20 bg-cyan-500/5",
    },
    {
      title: "Unmatched 2-Year Full Warranty",
      description: "Our craftsmanship standards are peerless. If your carbon plate, bonding seams, or lacing structure fails within 24 months, we will issue a replacement pair, no questions asked.",
      icon: ShieldCheck,
      color: "text-green-400 border-green-500/20 bg-green-500/5",
    },
    {
      title: "Orthopedic Anatomical Comfort",
      description: "Our hybrid ortholite foam insoles and deep heel cups are designed by physical therapists to correct underpronation and distribute kinetic pressures uniformly across your stride.",
      icon: Heart,
      color: "text-rose-400 border-rose-500/20 bg-rose-500/5",
    },
    {
      title: "Circular Eco-Friendly Promise",
      description: "We are committed to the planet. We utilize carbon-neutral solar-powered stitching mills, non-toxic bio-adhesives, and biodegradable packaging templates to target zero landfill waste.",
      icon: Leaf,
      color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
    },
    {
      title: "Vanguard Scientific Innovation",
      description: "AERO doesn't follow footwear fashion trends—we define sports performance. Our technical labs produce 3D-molded carbon lattices and sugar-derived responsive midsole cores.",
      icon: Lightbulb,
      color: "text-amber-400 border-amber-500/20 bg-amber-500/5",
    },
  ];

  return (
    <section className="py-24 relative bg-black">
      {/* Background ambient light */}
      <div className="absolute bottom-12 left-12 w-80 h-80 bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="max-w-xl">
            <span className="text-2xs font-mono tracking-widest text-brand-orange uppercase block mb-1">
              THE AERO ADVANTAGE
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
              Why Stand With <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-500">AERO</span>
            </h2>
          </div>
          <p className="max-w-xs text-zinc-400 text-xs font-mono">
            *Redefining premium performance with circular standards, concierge support, and mechanical innovations.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((v, i) => {
            const IconComponent = v.icon;
            return (
              <div
                key={i}
                className="group p-6 rounded-2xl glass-panel border border-zinc-900 hover:border-zinc-800 transition-all duration-300 hover:translate-y-[-4px]"
              >
                <div className="flex flex-col gap-5">
                  {/* Circular icon container */}
                  <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-transform duration-500 group-hover:rotate-[12deg] ${v.color}`}>
                    <IconComponent className="w-5.5 h-5.5" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-white uppercase tracking-tight group-hover:text-brand-orange transition-colors">
                      {v.title}
                    </h3>
                    <p className="text-2xs text-zinc-400 leading-relaxed">
                      {v.description}
                    </p>
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
