import React, { useState } from "react";
import { Eye, X, ZoomIn, ArrowLeft, ArrowRight, Image } from "lucide-react";

interface GalleryItem {
  id: string;
  category: "design" | "testing" | "performance" | "craft";
  title: string;
  desc: string;
  image: string;
  aspect: string; // Tailwind grid span values for dynamic bento rhythm
}

export default function Portfolio() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: "gal-1",
      category: "design",
      title: "Anatomical Sketching",
      desc: "Plotting structural stress thresholds on custom orthotic plates.",
      image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=600&auto=format&fit=crop",
      aspect: "md:col-span-8 h-[250px] md:h-[350px]",
    },
    {
      id: "gal-2",
      category: "performance",
      title: "Pacing At Dawn",
      desc: "Thermal-imaging pace analyses on concrete street sectors.",
      image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=600&auto=format&fit=crop",
      aspect: "md:col-span-4 h-[250px] md:h-[350px]",
    },
    {
      id: "gal-3",
      category: "testing",
      title: "Vapor Membrane Rig",
      desc: "Water pressure testing inside artificial climate simulators.",
      image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=600&auto=format&fit=crop",
      aspect: "md:col-span-4 h-[250px] md:h-[350px]",
    },
    {
      id: "gal-4",
      category: "craft",
      title: "Carbon Weave Loom",
      desc: "Piping elastic composite sheets into custom curing molds.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop",
      aspect: "md:col-span-4 h-[250px] md:h-[350px]",
    },
    {
      id: "gal-5",
      category: "craft",
      title: "Robotic Friction Forge",
      desc: "Testing adhesive wear-resistance across 500,000 steps.",
      image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=600&auto=format&fit=crop",
      aspect: "md:col-span-4 h-[250px] md:h-[350px]",
    },
    {
      id: "gal-6",
      category: "performance",
      title: "Elite Starting Blocks",
      desc: "Analyzing forward force vectoring for sprinter starts.",
      image: "https://images.unsplash.com/photo-1486218119243-13883505764c?q=80&w=600&auto=format&fit=crop",
      aspect: "md:col-span-12 h-[300px] md:h-[450px]",
    },
  ];

  const filteredItems = selectedFilter === "all"
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedFilter);

  const handlePrevLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === 0 ? filteredItems.length - 1 : lightboxIndex - 1);
  };

  const handleNextLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === filteredItems.length - 1 ? 0 : lightboxIndex + 1);
  };

  return (
    <section id="portfolio" className="py-24 relative bg-black">
      {/* Background radial highlight */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-zinc-900 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-3xs font-mono mb-2">
              <Image className="w-3 h-3" />
              AERO MEDIA ARCHIVE
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-500">Blueprint Gallery</span>
            </h2>
          </div>

          {/* Filtering tabs */}
          <div className="flex flex-wrap gap-2 border-b border-zinc-900 pb-1 font-mono text-2xs md:text-xs">
            {["all", "design", "testing", "performance", "craft"].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-lg border transition-all duration-300 uppercase ${
                  selectedFilter === filter
                    ? "bg-brand-orange text-white border-brand-orange"
                    : "bg-zinc-900/40 text-zinc-400 border-zinc-800/80 hover:text-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className={`group rounded-2xl overflow-hidden border border-zinc-900 bg-zinc-950 hover:border-brand-orange/40 cursor-pointer relative shadow-xl transition-all duration-500 ${item.aspect}`}
            >
              {/* Image with hover zoom */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transform scale-100 group-hover:scale-104 transition-transform duration-700 ease-out brightness-90 group-hover:brightness-100"
                referrerPolicy="no-referrer"
              />

              {/* Black Gradient overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Centered Zoom Icon Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="p-4 rounded-full bg-brand-orange text-white shadow-lg shadow-brand-orange/20 scale-75 group-hover:scale-100 transition-transform duration-500">
                  <ZoomIn className="w-5.5 h-5.5 stroke-[2.5]" />
                </div>
              </div>

              {/* Text Block */}
              <div className="absolute bottom-6 left-6 right-6 text-left z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-[9px] font-mono tracking-widest text-brand-orange uppercase block mb-1">
                  {item.category}
                </span>
                <h3 className="text-base font-black text-white uppercase tracking-tight">
                  {item.title}
                </h3>
                <p className="text-3xs text-zinc-400 leading-relaxed mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ---- Lightbox Modal Overlay ---- */}
        {lightboxIndex !== null && (
          <div
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fade-in"
          >
            {/* Close trigger */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition z-50"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left navigation arrow */}
            <button
              onClick={handlePrevLightbox}
              className="absolute left-6 p-3 rounded-full bg-zinc-900/60 border border-white/5 text-zinc-400 hover:text-white transition z-50 hover:bg-brand-orange/20 active:scale-95"
              aria-label="Previous Image"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Main content viewport */}
            <div
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
              className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center"
            >
              <img
                src={filteredItems[lightboxIndex].image}
                alt={filteredItems[lightboxIndex].title}
                className="max-h-[70vh] object-contain rounded-xl border border-zinc-900 shadow-2xl"
                referrerPolicy="no-referrer"
              />

              {/* Lightbox Caption block */}
              <div className="mt-5 text-center max-w-xl text-white">
                <span className="text-2xs font-mono uppercase tracking-widest text-brand-orange">
                  {filteredItems[lightboxIndex].category}
                </span>
                <h3 className="text-lg md:text-xl font-black uppercase tracking-tight mt-1">
                  {filteredItems[lightboxIndex].title}
                </h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  {filteredItems[lightboxIndex].desc}
                </p>
              </div>
            </div>

            {/* Right navigation arrow */}
            <button
              onClick={handleNextLightbox}
              className="absolute right-6 p-3 rounded-full bg-zinc-900/60 border border-white/5 text-zinc-400 hover:text-white transition z-50 hover:bg-brand-orange/20 active:scale-95"
              aria-label="Next Image"
            >
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
