import { useState, useEffect } from "react";
import { ShoppingBag, Heart, Menu, X, Trash2, ArrowRight } from "lucide-react";
import { CartItem, Shoe } from "../types";

interface NavbarProps {
  cart: CartItem[];
  wishlist: string[];
  shoes: Shoe[];
  onRemoveFromCart: (index: number) => void;
  onRemoveFromWishlist: (id: string) => void;
  onClearCart: () => void;
  onCheckout: () => void;
}

export default function Navbar({
  cart,
  wishlist,
  shoes,
  onRemoveFromCart,
  onRemoveFromWishlist,
  onClearCart,
  onCheckout,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.shoe.price * item.quantity, 0);
  const wishlistShoes = shoes.filter((s) => wishlist.includes(s.id));

  return (
    <header
      id="navbar"
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0c0c0cd0] backdrop-blur-md border-b border-white/5 py-4 shadow-xl"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-lg bg-brand-orange flex items-center justify-center font-black text-white text-lg tracking-tighter group-hover:rotate-12 transition-all duration-300 shadow-lg shadow-brand-orange/20">
            A
          </span>
          <span className="text-xl font-black tracking-widest text-white uppercase font-sans">
            AERO<span className="text-brand-orange">.</span>
          </span>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-zinc-400">
          <a href="#" className="hover:text-brand-orange transition-colors">
            Home
          </a>
          <a href="#about" className="hover:text-brand-orange transition-colors">
            About
          </a>
          <a href="#collections" className="hover:text-brand-orange transition-colors">
            Collections
          </a>
          <a href="#customizer" className="hover:text-brand-orange transition-colors">
            3D Customizer
          </a>
          <a href="#technology" className="hover:text-brand-orange transition-colors">
            Technology
          </a>
          <a href="#portfolio" className="hover:text-brand-orange transition-colors">
            Gallery
          </a>
          <a href="#contact" className="hover:text-brand-orange transition-colors">
            Contact
          </a>
        </nav>

        {/* Action Icons */}
        <div className="flex items-center gap-4 relative">
          {/* Wishlist Button */}
          <button
            onClick={() => {
              setIsWishlistOpen(!isWishlistOpen);
              setIsCartOpen(false);
            }}
            className="relative p-2 rounded-full hover:bg-white/5 text-zinc-300 hover:text-white transition-all duration-200"
            aria-label="Wishlist"
          >
            <Heart className={`w-5.5 h-5.5 ${wishlist.length > 0 ? "fill-brand-orange stroke-brand-orange" : ""}`} />
            {wishlist.length > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-brand-orange text-white text-3xs font-bold rounded-full flex items-center justify-center animate-pulse">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={() => {
              setIsCartOpen(!isCartOpen);
              setIsWishlistOpen(false);
            }}
            className="relative p-2 rounded-full hover:bg-white/5 text-zinc-300 hover:text-white transition-all duration-200"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className={`w-5.5 h-5.5 ${cart.length > 0 ? "text-brand-orange" : ""}`} />
            {totalCartItems > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-brand-orange text-white text-3xs font-bold rounded-full flex items-center justify-center">
                {totalCartItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-white/5 text-zinc-300 hover:text-white transition-all duration-200"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
          </button>

          {/* ---- Shopping Cart Drawer / Dropdown ---- */}
          {isCartOpen && (
            <div className="absolute right-0 top-14 w-80 md:w-96 glass-panel rounded-2xl border-zinc-800 shadow-2xl p-6 z-50 text-white flex flex-col max-h-[500px] overflow-y-auto animate-fade-in">
              <div className="flex justify-between items-center border-b border-zinc-800 pb-3 mb-4">
                <h3 className="text-sm font-mono uppercase tracking-wider font-bold">Shopping Cart ({totalCartItems})</h3>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-zinc-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-8 text-zinc-500 text-xs font-mono">
                  <ShoppingBag className="w-8 h-8 mx-auto mb-3 opacity-30 text-zinc-400" />
                  Your bag is empty
                </div>
              ) : (
                <div className="space-y-4 flex-grow overflow-y-auto pr-1">
                  {cart.map((item, idx) => (
                    <div key={`${item.shoe.id}-${idx}`} className="flex gap-3 border-b border-zinc-900 pb-3">
                      <img
                        src={item.shoe.image}
                        alt={item.shoe.name}
                        className="w-16 h-16 object-cover rounded-lg bg-zinc-900 border border-zinc-800"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-grow min-w-0">
                        <h4 className="text-xs font-bold truncate">{item.shoe.name}</h4>
                        <p className="text-3xs text-zinc-500 font-mono mt-0.5">
                          SIZE: {item.selectedSize} | COLO:{" "}
                          <span
                            className="inline-block w-2 h-2 rounded-full align-middle ml-1"
                            style={{ backgroundColor: item.selectedColorway }}
                          />
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-2xs font-mono font-bold text-brand-orange">
                            {item.quantity} × ${item.shoe.price.toFixed(2)}
                          </span>
                          <button
                            onClick={() => onRemoveFromCart(idx)}
                            className="p-1 rounded text-zinc-500 hover:text-red-400 hover:bg-zinc-900 transition-all"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Pricing Summary */}
                  <div className="pt-2">
                    <div className="flex justify-between text-xs font-mono mb-2">
                      <span className="text-zinc-400">Subtotal:</span>
                      <span className="font-bold">${cartSubtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs font-mono mb-4 text-green-400">
                      <span>Shipping:</span>
                      <span>FREE Premium Express</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={onClearCart}
                        className="flex-1 py-2.5 rounded-xl border border-zinc-800 hover:border-red-500/30 hover:bg-red-500/5 text-zinc-400 hover:text-red-400 text-2xs font-mono uppercase tracking-wider transition-all duration-200"
                      >
                        Clear Bag
                      </button>
                      <button
                        onClick={() => {
                          onCheckout();
                          setIsCartOpen(false);
                        }}
                        className="flex-1 py-2.5 rounded-xl bg-brand-orange hover:bg-white text-white hover:text-brand-black text-2xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-300"
                      >
                        Checkout <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ---- Wishlist Dropdown ---- */}
          {isWishlistOpen && (
            <div className="absolute right-0 top-14 w-80 md:w-96 glass-panel rounded-2xl border-zinc-800 shadow-2xl p-6 z-50 text-white flex flex-col max-h-[500px] overflow-y-auto animate-fade-in">
              <div className="flex justify-between items-center border-b border-zinc-800 pb-3 mb-4">
                <h3 className="text-sm font-mono uppercase tracking-wider font-bold">Wishlist ({wishlist.length})</h3>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="text-zinc-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {wishlist.length === 0 ? (
                <div className="text-center py-8 text-zinc-500 text-xs font-mono">
                  <Heart className="w-8 h-8 mx-auto mb-3 opacity-30 text-zinc-400" />
                  Your wishlist is empty
                </div>
              ) : (
                <div className="space-y-4">
                  {wishlistShoes.map((shoe) => (
                    <div key={shoe.id} className="flex gap-3 items-center border-b border-zinc-900 pb-3">
                      <img
                        src={shoe.image}
                        alt={shoe.name}
                        className="w-12 h-12 object-cover rounded-lg bg-zinc-900 border border-zinc-800"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-grow min-w-0">
                        <h4 className="text-xs font-bold truncate">{shoe.name}</h4>
                        <span className="text-2xs font-mono text-brand-orange">${shoe.price.toFixed(2)}</span>
                      </div>
                      <button
                        onClick={() => onRemoveFromWishlist(shoe.id)}
                        className="p-1 rounded text-zinc-500 hover:text-red-400 hover:bg-zinc-900 transition-all"
                        title="Remove from Wishlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ---- Mobile Menu Overlay ---- */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[65px] bg-brand-black/98 z-30 md:hidden flex flex-col justify-start p-8 space-y-6 border-t border-white/5 animate-fade-in">
          <nav className="flex flex-col space-y-6 text-sm font-mono uppercase tracking-widest text-zinc-400">
            <a
              href="#"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-white transition-colors"
            >
              Home
            </a>
            <a
              href="#about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-white transition-colors"
            >
              About
            </a>
            <a
              href="#collections"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-white transition-colors"
            >
              Collections
            </a>
            <a
              href="#customizer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-white transition-colors"
            >
              3D Customizer
            </a>
            <a
              href="#technology"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-white transition-colors"
            >
              Technology
            </a>
            <a
              href="#portfolio"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-white transition-colors"
            >
              Gallery
            </a>
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-white transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
