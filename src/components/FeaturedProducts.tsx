import { useState, useEffect } from "react";
import { Star, Heart, ShoppingBag, Eye, X, Check, ArrowRight } from "lucide-react";
import { Shoe, CartItem } from "../types";

interface FeaturedProductsProps {
  cart: CartItem[];
  wishlist: string[];
  onAddToCart: (item: CartItem) => void;
  onAddToWishlist: (id: string) => void;
  onRemoveFromWishlist: (id: string) => void;
}

export default function FeaturedProducts({
  cart,
  wishlist,
  onAddToCart,
  onAddToWishlist,
  onRemoveFromWishlist,
}: FeaturedProductsProps) {
  const [shoes, setShoes] = useState<Shoe[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string; count: number }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [quickViewShoe, setQuickViewShoe] = useState<Shoe | null>(null);
  
  // Quickview modal configuration states
  const [selectedSize, setSelectedSize] = useState<number>(10);
  const [selectedColorway, setSelectedColorway] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [isAddedToast, setIsAddedToast] = useState(false);

  // Fetch from our Express.js Backend API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const resShoes = await fetch("/api/shoes");
        const shoesData = await resShoes.json();
        setShoes(shoesData);

        const resCats = await fetch("/api/categories");
        const catsData = await resCats.json();
        setCategories(catsData);
      } catch (err) {
        console.warn("Backend API not reachable yet. Falling back to local hydration.", err);
        // Fallback static array matching server.ts precisely for resilience
        const fallbackShoes: Shoe[] = [
          {
            id: "aero-max-run",
            name: "AERO Max Carbon",
            category: "Running",
            price: 189.99,
            rating: 4.9,
            reviewsCount: 142,
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
            description: "Engineered for record-breaking speed. Featuring a full-length carbon fiber plate and our patented cloud-foam midsole for ultra-responsive cushioning and high energy return.",
            colorways: ["#FF6B00", "#111111", "#EAEAEA"],
            tech: ["Carbon Fiber Plate", "Cloud-Foam Midsole", "AeroKnit Upper"],
            sizes: [7, 8, 9, 10, 11, 12],
            featured: true
          },
          {
            id: "aero-retro-court",
            name: "AERO Luxe Retro",
            category: "Sneakers",
            price: 139.99,
            rating: 4.8,
            reviewsCount: 96,
            image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop",
            description: "Classic styling meets premium comfort. Crafted with gold-rated full-grain calfskin leather, minimal branding, and a durable ortholite insole for everyday understated luxury.",
            colorways: ["#FFFFFF", "#111111", "#A3A3A3"],
            tech: ["Full-Grain Leather", "Ortholite® Hybrid™ Insole", "VulcRubber Outsole"],
            sizes: [8, 9, 10, 11, 12],
            featured: true
          },
          {
            id: "aero-kinetic-sport",
            name: "AERO Kinetic-X",
            category: "Sports",
            price: 159.99,
            rating: 4.7,
            reviewsCount: 115,
            image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=600&auto=format&fit=crop",
            description: "The ultimate multi-sport training shoe. A rigid TPU heel counter paired with dynamic horizontal stabilizers offers unprecedented support during lateral explosive movements.",
            colorways: ["#111111", "#FF6B00", "#FFFFFF"],
            tech: ["Heel Stability TPU Lock", "Omni-Grip Outsole", "Dual-Density Midsole"],
            sizes: [7, 8, 9, 10, 11, 12],
            featured: true
          },
          {
            id: "aero-trail-summit",
            name: "AERO Summit Trail",
            category: "Hiking",
            price: 179.99,
            rating: 4.9,
            reviewsCount: 88,
            image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=600&auto=format&fit=crop",
            description: "Conquer any terrain under any conditions. Outfitted with a completely waterproof bio-membrane upper and deep-lugged Vibram outsole for unshakable traction.",
            colorways: ["#3F4C38", "#111111", "#B27C3F"],
            tech: ["AeroShield™ Waterproofing", "Vibram® Megagrip Sole", "Ballistic Nylon Shield"],
            sizes: [8, 9, 10, 11, 12],
            featured: true
          },
          {
            id: "aero-nova-neon",
            name: "AERO Nova 'Limited Edition'",
            category: "Limited Edition",
            price: 249.99,
            rating: 5.0,
            reviewsCount: 54,
            image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop",
            description: "Exclusive collectible design. Features thermo-reactive color-shifting overlays, a transparent air cushion pod, and reflective laser-cut detailing. Packaged in a special presentation case.",
            colorways: ["#D946EF", "#06B6D4", "#111111"],
            tech: ["Thermo-Reactive Shell", "Transparent Air-Pod", "Laser-Cut Reflectives"],
            sizes: [9, 10, 11, 12],
            featured: true
          },
          {
            id: "aero-urban-glide",
            name: "AERO Urban Glide",
            category: "Casual",
            price: 119.99,
            rating: 4.6,
            reviewsCount: 184,
            image: "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=600&auto=format&fit=crop",
            description: "Slip-on freedom with a locked-in fit. Seamless sock construction in an ultra-breathable mesh designed for warm days and effortless street walks.",
            colorways: ["#111111", "#FFFFFF", "#737373"],
            tech: ["Sock-Like Slip Entry", "Super-Flex Midsole", "Recycled PET Yarn Knit"],
            sizes: [7, 8, 9, 10, 11, 12],
            featured: false
          }
        ];
        setShoes(fallbackShoes);
        setCategories([
          { id: "running", name: "Running", count: 2 },
          { id: "sneakers", name: "Sneakers", count: 1 },
          { id: "sports", name: "Sports", count: 1 },
          { id: "casual", name: "Casual", count: 1 },
          { id: "hiking", name: "Hiking", count: 1 },
          { id: "limited-edition", name: "Limited Edition", count: 1 }
        ]);
      }
    };
    loadProducts();
  }, []);

  const handleOpenQuickView = (shoe: Shoe) => {
    setQuickViewShoe(shoe);
    setSelectedSize(shoe.sizes[0] || 10);
    setSelectedColorway(shoe.colorways[0] || "#FF6B00");
    setQuantity(1);
    setIsAddedToast(false);
  };

  const handleAddToCartFromModal = () => {
    if (!quickViewShoe) return;
    const item: CartItem = {
      shoe: quickViewShoe,
      selectedSize,
      selectedColorway,
      quantity,
    };
    onAddToCart(item);
    setIsAddedToast(true);
    setTimeout(() => {
      setIsAddedToast(false);
      setQuickViewShoe(null); // Close modal
    }, 1500);
  };

  const handleQuickAdd = (shoe: Shoe) => {
    const item: CartItem = {
      shoe,
      selectedSize: shoe.sizes[Math.floor(shoe.sizes.length / 2)] || 10,
      selectedColorway: shoe.colorways[0] || "#FF6B00",
      quantity: 1,
    };
    onAddToCart(item);
    // Simple custom trigger for immediate user visual feedback
    alert(`Success: 1x ${shoe.name} added to your bag.`);
  };

  const handleWishlistToggle = (id: string) => {
    if (wishlist.includes(id)) {
      onRemoveFromWishlist(id);
    } else {
      onAddToWishlist(id);
    }
  };

  const filteredShoes = selectedCategory === "all"
    ? shoes
    : shoes.filter(s => s.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section id="collections" className="py-24 relative bg-black">
      {/* Background soft blur lights */}
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-2xs font-mono tracking-widest text-brand-orange uppercase block mb-1">
              PRO-GRADE ARCHITECTURE
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-amber-500">AERO Collection</span>
            </h2>
          </div>
          
          {/* Categories Tab Selector */}
          <div className="flex flex-wrap gap-2 border-b border-zinc-900 pb-1 font-mono text-2xs md:text-xs">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                selectedCategory === "all"
                  ? "bg-brand-orange text-white border-brand-orange"
                  : "bg-zinc-900/40 text-zinc-400 border-zinc-800/80 hover:text-white"
              }`}
            >
              All Designs
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg border transition-all duration-300 uppercase ${
                  selectedCategory.toLowerCase() === cat.id.toLowerCase()
                    ? "bg-brand-orange text-white border-brand-orange"
                    : "bg-zinc-900/40 text-zinc-400 border-zinc-800/80 hover:text-white"
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredShoes.map((shoe) => {
            const isWishlisted = wishlist.includes(shoe.id);
            return (
              <div
                key={shoe.id}
                className="group relative flex flex-col justify-between rounded-2xl glass-panel border border-zinc-900 hover:border-brand-orange/30 p-5 transition-all duration-500 hover:shadow-2xl hover:shadow-brand-orange/5"
              >
                {/* Wishlist Button */}
                <button
                  onClick={() => handleWishlistToggle(shoe.id)}
                  className={`absolute top-5 right-5 z-20 p-2 rounded-full border shadow-md backdrop-blur-md transition-all duration-300 ${
                    isWishlisted
                      ? "bg-brand-orange/20 border-brand-orange/50 text-brand-orange"
                      : "bg-black/50 border-white/5 text-zinc-400 hover:text-white"
                  }`}
                  title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? "fill-brand-orange" : ""}`} />
                </button>

                {/* Product Category Badge */}
                <span className="absolute top-5 left-5 z-20 px-2.5 py-1 rounded bg-black/60 border border-white/5 text-[9px] font-mono tracking-widest uppercase text-brand-orange">
                  {shoe.category}
                </span>

                {/* Card Visual Wrapper */}
                <div className="relative aspect-square w-full rounded-xl bg-zinc-900/60 overflow-hidden flex items-center justify-center p-6 border border-zinc-900 mb-5">
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/0 to-brand-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Subtle pulsing glow backing the image */}
                  <div className="absolute w-36 h-36 bg-brand-orange/10 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Product Image with smooth hover scaling and slight rotation */}
                  <img
                    src={shoe.image}
                    alt={shoe.name}
                    className="w-full object-contain transform scale-100 group-hover:scale-108 group-hover:rotate-[-4deg] transition-all duration-500 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] group-hover:drop-shadow-[0_15px_25px_rgba(255,107,0,0.25)]"
                    referrerPolicy="no-referrer"
                  />

                  {/* Card Tool Overlay (Quick View & Quick Add) */}
                  <div className="absolute inset-x-4 bottom-4 flex gap-2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-25">
                    <button
                      onClick={() => handleOpenQuickView(shoe)}
                      className="flex-1 py-2.5 rounded-lg bg-zinc-950/90 hover:bg-white text-white hover:text-black font-mono font-bold text-3xs uppercase tracking-wider border border-white/5 flex items-center justify-center gap-1.5 shadow-xl transition-all duration-300"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Quick View
                    </button>
                    <button
                      onClick={() => handleQuickAdd(shoe)}
                      className="p-2.5 rounded-lg bg-brand-orange hover:bg-white text-white hover:text-brand-black shadow-xl transition-all duration-300"
                      title="Add to Bag"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Info block */}
                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-brand-orange transition-colors">
                        {shoe.name}
                      </h3>
                      {/* Star Rating */}
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <div className="flex text-amber-400">
                          <Star className="w-3 h-3 fill-amber-400" />
                        </div>
                        <span className="text-3xs font-bold text-white font-mono">{shoe.rating}</span>
                        <span className="text-4xs text-zinc-500 font-mono">({shoe.reviewsCount} reviews)</span>
                      </div>
                    </div>
                    <span className="text-sm font-mono font-black text-brand-orange">
                      ${shoe.price.toFixed(2)}
                    </span>
                  </div>

                  <p className="text-4xs text-zinc-400 leading-relaxed line-clamp-2 pt-1 border-t border-zinc-900">
                    {shoe.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ---- Quick View Modal ---- */}
        {quickViewShoe && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="relative w-full max-w-4xl rounded-2xl glass-panel border-zinc-800 p-6 md:p-8 flex flex-col md:grid md:grid-cols-12 gap-8 text-white max-h-[90vh] overflow-y-auto animate-zoom-in">
              {/* Close Button */}
              <button
                onClick={() => setQuickViewShoe(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition"
              >
                <X className="w-4.5 h-4.5" />
              </button>

              {/* Left Column: Big Product View */}
              <div className="md:col-span-6 flex flex-col items-center justify-center bg-zinc-900/50 rounded-xl p-6 border border-zinc-900 relative">
                <span className="absolute top-4 left-4 px-2.5 py-1 rounded bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-3xs font-mono font-bold uppercase">
                  {quickViewShoe.category}
                </span>

                {/* Pulsing light behind shoe */}
                <div className="absolute w-44 h-44 bg-brand-orange/10 rounded-full blur-[50px]" />
                
                <img
                  src={quickViewShoe.image}
                  alt={quickViewShoe.name}
                  className="w-full max-h-[280px] object-contain drop-shadow-[0_15px_30px_rgba(255,107,0,0.35)] relative z-10"
                  referrerPolicy="no-referrer"
                />

                {/* Specifications Pills */}
                <div className="flex flex-wrap gap-2 justify-center mt-6 z-10">
                  {quickViewShoe.tech.map((t, i) => (
                    <span key={i} className="px-2 py-1 rounded bg-black/50 border border-white/5 text-[9px] font-mono text-zinc-400 uppercase">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Custom Configuration */}
              <div className="md:col-span-6 flex flex-col justify-between">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">
                      {quickViewShoe.name}
                    </h3>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-lg font-mono font-black text-brand-orange">
                        ${quickViewShoe.price.toFixed(2)}
                      </span>
                      <div className="h-4 w-[1px] bg-zinc-800" />
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold font-mono text-white">{quickViewShoe.rating}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-2xs text-zinc-400 leading-relaxed">
                    {quickViewShoe.description}
                  </p>

                  {/* Size Config */}
                  <div>
                    <h4 className="text-2xs font-mono text-zinc-400 uppercase tracking-widest mb-2.5">
                      1. SELECT MEN'S SIZE (US):
                    </h4>
                    <div className="grid grid-cols-6 gap-2">
                      {quickViewShoe.sizes.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          className={`py-2 rounded-lg text-xs font-mono border transition-all ${
                            selectedSize === sz
                              ? "bg-brand-orange border-brand-orange text-white font-bold"
                              : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white"
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Colorway Config */}
                  <div>
                    <h4 className="text-2xs font-mono text-zinc-400 uppercase tracking-widest mb-2.5">
                      2. SELECT COLORWAY:
                    </h4>
                    <div className="flex gap-2">
                      {quickViewShoe.colorways.map((col) => (
                        <button
                          key={col}
                          onClick={() => setSelectedColorway(col)}
                          className={`w-8 h-8 rounded-full border transition-all relative flex items-center justify-center ${
                            selectedColorway === col
                              ? "border-brand-orange scale-110 shadow-lg shadow-brand-orange/20"
                              : "border-zinc-800 hover:scale-105"
                          }`}
                          style={{ backgroundColor: col }}
                          title={col}
                        >
                          {selectedColorway === col && (
                            <Check className={`w-4 h-4 ${col === "#FFFFFF" || col === "#EAEAEA" ? "text-black" : "text-white"}`} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity Config */}
                  <div>
                    <h4 className="text-2xs font-mono text-zinc-400 uppercase tracking-widest mb-2.5">
                      3. QUANTITY:
                    </h4>
                    <div className="flex items-center gap-3 w-32 bg-zinc-900 border border-zinc-800 rounded-lg p-1">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-8 h-8 rounded bg-zinc-800 hover:bg-zinc-700 font-bold transition flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="flex-grow text-center text-xs font-mono font-bold">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-8 h-8 rounded bg-zinc-800 hover:bg-zinc-700 font-bold transition flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Call-to-action */}
                <div className="mt-8 pt-6 border-t border-zinc-900">
                  {isAddedToast ? (
                    <div className="py-3.5 rounded-xl bg-green-500/10 border border-green-500/20 text-center text-green-400 text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2">
                      <Check className="w-4 h-4 animate-bounce" /> Added to Bag Successfully!
                    </div>
                  ) : (
                    <button
                      onClick={handleAddToCartFromModal}
                      className="w-full py-4 rounded-xl bg-brand-orange hover:bg-white text-white hover:text-brand-black font-semibold text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-brand-orange/15"
                    >
                      Add To Bag • ${(quickViewShoe.price * quantity).toFixed(2)}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
