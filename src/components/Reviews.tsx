import { useEffect, useState, useRef } from "react";
import { Star, Quote, ArrowLeft, ArrowRight } from "lucide-react";
import { Testimonial } from "../types";

export default function Reviews() {
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoSlideTimerRef = useRef<any>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/testimonials");
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.warn("Express API testimonials not reachable yet, using static fallback.");
        const fallbackReviews: Testimonial[] = [
          {
            id: "review-1",
            name: "Marcus Sterling",
            role: "Marathon Runner & Coach",
            rating: 5,
            comment: "The AERO Max Carbon is an absolute game changer. I shaved a full two minutes off my half-marathon personal best. The energy return is like nothing I've ever felt before.",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"
          },
          {
            id: "review-2",
            name: "Elena Rostova",
            role: "Fashion Designer & Creative Director",
            rating: 5,
            comment: "Luxury is in the details, and the AERO Luxe Retro nails it. The stitching, the selection of the full-grain leather, and the comfortable instep are perfect for busy showroom days.",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop"
          },
          {
            id: "review-3",
            name: "Dr. Ryan Vance",
            role: "Sports Podiatrist",
            rating: 4.9,
            comment: "I frequently recommend the Kinetic-X to my active patients. The lateral arch support and locked-in TPU heel cup significantly reduce pronation strains during high-impact sports.",
            image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=150&auto=format&fit=crop"
          },
          {
            id: "review-4",
            name: "Takahiro Sato",
            role: "Outdoor Journalist",
            rating: 5,
            comment: "Traversing the rugged paths of Yakushima requires serious traction. The Summit Trail grip kept me completely stable on slippery wet moss and mud. Absolutely waterproof.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
          }
        ];
        setReviews(fallbackReviews);
      }
    };
    fetchReviews();
  }, []);

  // Set up auto sliding timer
  useEffect(() => {
    if (reviews.length === 0 || isPaused) {
      if (autoSlideTimerRef.current) clearInterval(autoSlideTimerRef.current);
      return;
    }

    autoSlideTimerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    }, 4500);

    return () => {
      if (autoSlideTimerRef.current) clearInterval(autoSlideTimerRef.current);
    };
  }, [reviews, isPaused]);

  const handlePrev = () => {
    if (reviews.length === 0) return;
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (reviews.length === 0) return;
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  if (reviews.length === 0) return null;

  return (
    <section
      id="reviews"
      className="py-24 relative overflow-hidden bg-zinc-950 border-t border-b border-zinc-900"
    >
      {/* Background visual graphics */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        
        {/* Section Title */}
        <div className="mb-14">
          <span className="text-2xs font-mono tracking-widest text-brand-orange uppercase block mb-1">
            ATHLETE CHRONICLES
          </span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
            AERO <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-500">Endorsements</span>
          </h2>
        </div>

        {/* Testimonials Slider Area */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative glass-panel rounded-3xl border-zinc-900 p-8 md:p-14 text-center select-none"
        >
          {/* Big floating background quote mark */}
          <div className="absolute top-4 left-6 text-zinc-900/40 pointer-events-none">
            <Quote className="w-20 h-20 rotate-180" />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Rating Stars */}
            <div className="flex text-amber-400 gap-1 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(reviews[activeIndex].rating)
                      ? "fill-amber-400"
                      : "opacity-40"
                  }`}
                />
              ))}
            </div>

            {/* Testimonial Quote Comment */}
            <p className="text-sm md:text-lg text-zinc-200 leading-relaxed font-medium tracking-wide">
              "{reviews[activeIndex].comment}"
            </p>

            {/* Profile Block */}
            <div className="flex items-center gap-4 mt-8">
              <img
                src={reviews[activeIndex].image}
                alt={reviews[activeIndex].name}
                className="w-12 h-12 rounded-full object-cover border border-zinc-800"
                referrerPolicy="no-referrer"
              />
              <div className="text-left">
                <span className="text-xs font-bold text-white block uppercase tracking-wide">
                  {reviews[activeIndex].name}
                </span>
                <span className="text-[10px] font-mono text-zinc-500 block uppercase">
                  {reviews[activeIndex].role}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Controls inside the box */}
          <div className="flex justify-between items-center mt-10 md:mt-6">
            {/* Manual indicators dot list */}
            <div className="flex gap-2">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === idx ? "w-6 bg-brand-orange" : "w-1.5 bg-zinc-800 hover:bg-zinc-700"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Next/Prev Arrow triggers */}
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-all hover:bg-zinc-800 active:scale-95"
                aria-label="Previous Testimonial"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-all hover:bg-zinc-800 active:scale-95"
                aria-label="Next Testimonial"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
