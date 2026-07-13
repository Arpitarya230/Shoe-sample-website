import { useEffect, useState, useRef } from "react";
import { Users, Globe, SwatchBook, Hourglass } from "lucide-react";

interface StatItem {
  id: string;
  target: number;
  suffix: string;
  label: string;
  desc: string;
  icon: any;
}

export default function Statistics() {
  const stats: StatItem[] = [
    {
      id: "customers",
      target: 100, // 100K
      suffix: "K+",
      label: "Global Active Runners",
      desc: "Athletes pacing with our carbon technology",
      icon: Users,
    },
    {
      id: "countries",
      target: 50,
      suffix: "+",
      label: "Countries Served",
      desc: "Expedited premium logistics worldwide",
      icon: Globe,
    },
    {
      id: "designs",
      target: 250,
      suffix: "+",
      label: "Kinetic Lab Designs",
      desc: "Individually modeled performance prototypes",
      icon: SwatchBook,
    },
    {
      id: "years",
      target: 15,
      suffix: "+",
      label: "Years Lab Heritage",
      desc: "Founded on decades of biomechanical research",
      icon: Hourglass,
    },
  ];

  // Animated counters state
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    customers: 0,
    countries: 0,
    designs: 0,
    years: 0,
  });

  const sectionRef = useRef<HTMLDivElement>(null);
  const animationStartedRef = useRef<boolean>(false);

  useEffect(() => {
    // Helper to run counters
    const startCounters = () => {
      const duration = 2000; // 2 seconds animation
      const steps = 40;
      const intervalMs = duration / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        
        setCounts((prev) => {
          const updated = { ...prev };
          stats.forEach((s) => {
            const increment = s.target / steps;
            const computed = Math.min(s.target, Math.floor(increment * currentStep));
            updated[s.id] = computed;
          });
          return updated;
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          // Set absolute targets to override any roundoffs
          setCounts({
            customers: 100,
            countries: 50,
            designs: 250,
            years: 15,
          });
        }
      }, intervalMs);
    };

    // Trigger counters automatically on mount
    startCounters();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 relative bg-[#090909] border-t border-b border-zinc-900/60 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 lg:divide-x divide-zinc-900">
          {stats.map((s) => {
            const IconComp = s.icon;
            return (
              <div
                key={s.id}
                className="pt-8 sm:pt-0 lg:px-8 text-center sm:text-left flex flex-col sm:flex-row items-center sm:items-start gap-4 group"
              >
                {/* Stat Icon */}
                <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center border border-zinc-800 text-brand-orange group-hover:scale-110 transition-transform duration-300">
                  <IconComp className="w-5.5 h-5.5 stroke-[2]" />
                </div>
                
                <div className="space-y-1">
                  {/* Dynamic Number */}
                  <span className="text-4xl md:text-5xl font-black text-white block tracking-tighter">
                    {counts[s.id]}
                    <span className="text-brand-orange">{s.suffix}</span>
                  </span>
                  
                  {/* Labels */}
                  <span className="text-xs font-bold text-zinc-300 block uppercase tracking-tight">
                    {s.label}
                  </span>
                  <p className="text-3xs text-zinc-500 font-mono">
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
