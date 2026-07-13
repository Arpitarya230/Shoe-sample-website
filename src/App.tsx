import { useState, useEffect } from "react";
import ScrollProgressBar from "./components/ScrollProgressBar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import FeaturedProducts from "./components/FeaturedProducts";
import ThreeDShowcase from "./components/ThreeDShowcase";
import Technology from "./components/Technology";
import WhyChooseUs from "./components/WhyChooseUs";
import Statistics from "./components/Statistics";
import Portfolio from "./components/Portfolio";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import AdminDashboard from "./components/AdminDashboard";
import { Shoe, CartItem } from "./types";

export default function App() {
  const [shoes, setShoes] = useState<Shoe[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isAdminRoute, setIsAdminRoute] = useState(false);

  useEffect(() => {
    const handleLocationChange = () => {
      const isPathAdmin = window.location.pathname.endsWith("/admin") || window.location.pathname.endsWith("/admin/");
      const isHashAdmin = window.location.hash === "#/admin" || window.location.hash === "#admin";
      const isQueryAdmin = new URLSearchParams(window.location.search).has("admin");
      
      setIsAdminRoute(isPathAdmin || isHashAdmin || isQueryAdmin);
    };

    handleLocationChange();

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
    };
  }, []);

  // Fetch product list on mount to synchronize cart and wishlist capabilities
  useEffect(() => {
    const loadShoes = async () => {
      try {
        const res = await fetch("/api/shoes");
        const data = await res.json();
        setShoes(data);
      } catch (err) {
        console.warn("Express API unreachable. Setting client static fallback for absolute stability.");
        // Fallback matching mock database in server.ts exactly
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
      }
    };
    loadShoes();
  }, []);

  // State manipulation handlers
  const handleAddToCart = (newItem: CartItem) => {
    setCart((prev) => {
      // Deduplicate additions of identical styles/sizes
      const existingIdx = prev.findIndex(
        (item) =>
          item.shoe.id === newItem.shoe.id &&
          item.selectedSize === newItem.selectedSize &&
          item.selectedColorway === newItem.selectedColorway
      );

      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += newItem.quantity;
        return copy;
      }
      return [...prev, newItem];
    });
  };

  const handleRemoveFromCart = (idx: number) => {
    setCart((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleAddToWishlist = (id: string) => {
    setWishlist((prev) => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
  };

  const handleRemoveFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((item) => item !== id));
  };

  const handleCheckout = () => {
    const totalAmount = cart.reduce((total, item) => total + item.shoe.price * item.quantity, 0);
    alert(
      `🔒 AERO SECURE CHECKOUT\n\nConnecting to our secure payment gateway to process $${totalAmount.toFixed(
        2
      )}...\n\nTransaction successful! Your handcrafted premium package order is verified. We sent receipt details to your email.`
    );
    setCart([]); // Clear cart after successful checkout
  };

  if (isAdminRoute) {
    return (
      <AdminDashboard
        onClose={() => {
          // Clear query param
          const searchParams = new URLSearchParams(window.location.search);
          searchParams.delete("admin");
          const searchStr = searchParams.toString();
          const searchSuffix = searchStr ? `?${searchStr}` : "";

          // Clear hash
          if (window.location.hash === "#/admin" || window.location.hash === "#admin") {
            window.location.hash = "";
          }

          // Go back relative path
          const basePath = window.location.pathname.replace(/\/admin\/?$/, "") || "/";
          
          window.history.pushState({}, "", basePath + searchSuffix + (window.location.hash ? window.location.hash : ""));
          window.dispatchEvent(new Event("popstate"));
        }}
        shoes={shoes}
        setShoes={setShoes}
      />
    );
  }

  return (
    <div className="min-h-screen text-white bg-black font-sans relative">
      
      {/* 1. Interactive Progress Bar */}
      <ScrollProgressBar />

      {/* 2. Global Navigation */}
      <Navbar
        cart={cart}
        wishlist={wishlist}
        shoes={shoes}
        onRemoveFromCart={handleRemoveFromCart}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onClearCart={handleClearCart}
        onCheckout={handleCheckout}
      />

      {/* 3. Hero Intro Section */}
      <Hero />

      {/* 4. About Core Brand Block */}
      <About />

      {/* 5. Core 3D Customizable Shoe Experience */}
      <ThreeDShowcase />

      {/* 6. Featured Products E-commerce catalog */}
      <FeaturedProducts
        cart={cart}
        wishlist={wishlist}
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
      />

      {/* 7. Deep-Dive Biomechanical Technology Grid */}
      <Technology />

      {/* 8. Values & Core Advantage Pillars */}
      <WhyChooseUs />

      {/* 9. Self-Counting Statistics Block */}
      <Statistics />

      {/* 10. Behind-the-Scenes Photo Gallery */}
      <Portfolio />

      {/* 11. Customer Endorsements Testimonials */}
      <Reviews />

      {/* 12. Concierge Inquiry Desk */}
      <Contact />

      {/* 13. Dynamic Brand Footer */}
      <Footer />

      {/* 14. Smooth Snap Back-to-Top Button */}
      <BackToTop />

    </div>
  );
}
