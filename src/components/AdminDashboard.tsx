import React, { useState, useEffect } from "react";
import { 
  Plus, Trash2, Filter, Search, Lock, Unlock, ArrowLeft, Mail, 
  Layers, Settings, CheckCircle2, AlertTriangle, TrendingUp, Users, 
  Check, Eye, EyeOff, Sparkles, Inbox, RefreshCw, Star, Info
} from "lucide-react";
import { Shoe, ContactSubmission, NewsletterSubscription } from "../types";

interface AdminDashboardProps {
  onClose: () => void;
  shoes: Shoe[];
  setShoes: React.Dispatch<React.SetStateAction<Shoe[]>>;
}

export default function AdminDashboard({ onClose, shoes, setShoes }: AdminDashboardProps) {
  // Authentication State
  const [passcode, setPasscode] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [showPasscode, setShowPasscode] = useState(false);

  // Active Tab State
  const [activeTab, setActiveTab] = useState<"listings" | "contacts" | "newsletter">("listings");

  // Entities Data State
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [subscriptions, setSubscriptions] = useState<NewsletterSubscription[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState({ text: "", type: "success" });

  // Filter States
  const [listingsSearch, setListingsSearch] = useState("");
  const [listingsCategory, setListingsCategory] = useState("all");
  const [listingsSort, setListingsSort] = useState("default");

  const [contactsSearch, setContactsSearch] = useState("");
  const [contactsFilterSubject, setContactsFilterSubject] = useState("all");

  const [newsletterSearch, setNewsletterSearch] = useState("");

  // Shoe Form State
  const [isAddingShoe, setIsAddingShoe] = useState(false);
  const [newShoeForm, setNewShoeForm] = useState({
    name: "",
    category: "Running",
    price: "",
    image: "",
    description: "",
    colorwaysInput: "#FF6B00, #111111",
    techInput: "Carbon Propulsion Plate, Cloud-Foam Midsole",
    sizesInput: "8, 9, 10, 11, 12",
    featured: false
  });

  // Check login on load
  useEffect(() => {
    const isLogged = localStorage.getItem("aero_admin_logged") === "true";
    if (isLogged) {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch Admin Entities
  const fetchAdminData = async () => {
    setIsLoading(true);
    try {
      // Fetch Contacts
      const contactsRes = await fetch("/api/contacts");
      if (contactsRes.ok) {
        const contactsData = await contactsRes.json();
        setContacts(contactsData);
      }

      // Fetch Subscriptions
      const subsRes = await fetch("/api/subscribe");
      if (subsRes.ok) {
        const subsData = await subsRes.json();
        setSubscriptions(subsData);
      }

      // Refresh Shoes catalog
      const shoesRes = await fetch("/api/shoes");
      if (shoesRes.ok) {
        const shoesData = await shoesRes.json();
        setShoes(shoesData);
      }
    } catch (err) {
      console.error("Error fetching admin data", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAdminData();
    }
  }, [isAuthenticated]);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "admin" || passcode === "admin123" || passcode === "aero2026") {
      setIsAuthenticated(true);
      setAuthError("");
      localStorage.setItem("aero_admin_logged", "true");
      triggerNotification("Security Clearance Accepted. Welcome back.", "success");
    } else {
      setAuthError("Access Denied: Invalid Command Code passcode.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("aero_admin_logged");
  };

  // Toast notifier
  const triggerNotification = (text: string, type: string = "success") => {
    setActionMessage({ text, type });
    setTimeout(() => {
      setActionMessage({ text: "", type: "success" });
    }, 4500);
  };

  // ----- SHOE ACTIONS -----
  const handleAddShoe = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, category, price, image, description, colorwaysInput, techInput, sizesInput, featured } = newShoeForm;

    if (!name || !category || !price) {
      triggerNotification("Please fill in the required fields (Name, Category, Price)", "error");
      return;
    }

    // Parse array variables
    const colorways = colorwaysInput.split(",").map(c => c.trim()).filter(Boolean);
    const tech = techInput.split(",").map(t => t.trim()).filter(Boolean);
    const sizes = sizesInput.split(",").map(s => Number(s.trim())).filter(s => !isNaN(s));

    try {
      const res = await fetch("/api/shoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          category,
          price: Number(price),
          image: image || undefined,
          description,
          colorways,
          tech,
          sizes,
          featured
        })
      });

      if (res.ok) {
        const data = await res.json();
        // Update client catalog state
        setShoes(prev => [...prev, data.shoe]);
        triggerNotification(`Product "${name}" successfully registered into active catalog!`, "success");
        setIsAddingShoe(false);
        // Reset Form
        setNewShoeForm({
          name: "",
          category: "Running",
          price: "",
          image: "",
          description: "",
          colorwaysInput: "#FF6B00, #111111",
          techInput: "Carbon Propulsion Plate, Cloud-Foam Midsole",
          sizesInput: "8, 9, 10, 11, 12",
          featured: false
        });
      } else {
        const errData = await res.json();
        triggerNotification(errData.error || "Failed to save listing", "error");
      }
    } catch (err) {
      triggerNotification("Error creating shoe. Fallback local addition executed.", "success");
      // Fallback update on local
      const fallbackShoe: Shoe = {
        id: `shoe-${Date.now()}`,
        name,
        category,
        price: Number(price),
        rating: 5.0,
        reviewsCount: 1,
        image: image || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
        description: description || "Handcrafted premium footwear.",
        colorways: colorways.length ? colorways : ["#FF6B00", "#111111"],
        tech: tech.length ? tech : ["Carbon Plate"],
        sizes: sizes.length ? sizes : [8, 9, 10, 11, 12],
        featured
      };
      setShoes(prev => [...prev, fallbackShoe]);
      setIsAddingShoe(false);
    }
  };

  const handleDeleteShoe = async (id: string, name: string) => {
    if (!confirm(`Are you absolutely sure you want to delete "${name}" listing?`)) return;

    try {
      const res = await fetch(`/api/shoes/${id}`, { method: "DELETE" });
      if (res.ok) {
        setShoes(prev => prev.filter(s => s.id !== id));
        triggerNotification(`Shoe listing "${name}" successfully deleted from active catalog.`, "success");
      } else {
        triggerNotification("Could not delete shoe listing from server.", "error");
      }
    } catch (err) {
      // Local fallback
      setShoes(prev => prev.filter(s => s.id !== id));
      triggerNotification(`[Local Fallback] Deleted "${name}" listing.`, "success");
    }
  };


  // ----- CONTACT ACTIONS -----
  const handleDeleteContact = async (id: string) => {
    if (!confirm("Are you sure you want to delete this customer inquiry?")) return;

    try {
      const res = await fetch(`/api/contacts/${id}`, { method: "DELETE" });
      if (res.ok) {
        setContacts(prev => prev.filter(c => c.id !== id));
        triggerNotification("Customer inquiry successfully deleted.", "success");
      } else {
        triggerNotification("Failed to delete from database.", "error");
      }
    } catch (err) {
      setContacts(prev => prev.filter(c => c.id !== id));
      triggerNotification("Deleted inquiry locally.", "success");
    }
  };


  // ----- NEWSLETTER ACTIONS -----
  const handleDeleteSubscription = async (id: string, email: string) => {
    if (!confirm(`Remove "${email}" from mailing database list?`)) return;

    try {
      const res = await fetch(`/api/subscribe/${id}`, { method: "DELETE" });
      if (res.ok) {
        setSubscriptions(prev => prev.filter(s => s.id !== id));
        triggerNotification(`Successfully removed subscriber email "${email}" from mailing database.`, "success");
      } else {
        triggerNotification("Failed to delete email subscription.", "error");
      }
    } catch (err) {
      setSubscriptions(prev => prev.filter(s => s.id !== id));
      triggerNotification("Removed subscriber locally.", "success");
    }
  };


  // ----- FILTERING CALCULATIONS -----
  const filteredShoes = shoes.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(listingsSearch.toLowerCase()) || 
                          s.category.toLowerCase().includes(listingsSearch.toLowerCase()) ||
                          s.tech.some(t => t.toLowerCase().includes(listingsSearch.toLowerCase()));
    
    const matchesCategory = listingsCategory === "all" || s.category.toLowerCase() === listingsCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (listingsSort === "price-asc") return a.price - b.price;
    if (listingsSort === "price-desc") return b.price - a.price;
    if (listingsSort === "name") return a.name.localeCompare(b.name);
    return 0; // Default
  });

  const filteredContacts = contacts.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(contactsSearch.toLowerCase()) || 
                          c.email.toLowerCase().includes(contactsSearch.toLowerCase()) || 
                          c.message.toLowerCase().includes(contactsSearch.toLowerCase());
    
    const matchesSubject = contactsFilterSubject === "all" || 
                           (contactsFilterSubject === "general" && c.subject.toLowerCase().includes("general")) ||
                           (contactsFilterSubject === "partnership" && (c.subject.toLowerCase().includes("sponsor") || c.subject.toLowerCase().includes("team") || c.subject.toLowerCase().includes("partner")));
    
    return matchesSearch && matchesSubject;
  });

  const filteredSubscriptions = subscriptions.filter(s => {
    return s.email.toLowerCase().includes(newsletterSearch.toLowerCase());
  });

  // Calculate stats values
  const totalListingsCount = shoes.length;
  const totalInquiriesCount = contacts.length;
  const totalSubscribersCount = subscriptions.length;
  const averagePrice = shoes.reduce((sum, s) => sum + s.price, 0) / (shoes.length || 1);

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-y-auto text-white flex flex-col font-sans">
      
      {/* Top Telemetry Header */}
      <div className="bg-[#050505] border-b border-zinc-900 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-brand-orange flex items-center justify-center font-black text-white text-base">
            A
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-white block">
              AERO SYSTEM PORTAL
            </span>
            <span className="text-[9px] font-mono text-brand-orange tracking-wider uppercase block">
              ● HOST COMPLIANCE: PORT_3000 // CORE_ACTIVE
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-2xs">
          {isAuthenticated && (
            <button
              onClick={fetchAdminData}
              disabled={isLoading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-950 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
              RELOAD DATA
            </button>
          )}

          <button
            onClick={onClose}
            className="flex items-center gap-1 px-4 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-brand-orange/40 text-white transition-all font-semibold uppercase tracking-wider text-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Exit Command Portal
          </button>
        </div>
      </div>

      {/* Action Notification Banner */}
      {actionMessage.text && (
        <div className={`py-3 px-6 text-center text-xs font-mono border-b flex items-center justify-center gap-2 transition-all ${
          actionMessage.type === "success" 
            ? "bg-green-500/10 text-green-400 border-green-500/20" 
            : "bg-red-500/10 text-red-400 border-red-500/20"
        }`}>
          {actionMessage.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
          <span>{actionMessage.text}</span>
        </div>
      )}

      {/* 1. AUTHENTICATION GATEWAY PANEL */}
      {!isAuthenticated ? (
        <div className="flex-grow flex items-center justify-center px-6 py-24 relative bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.03)_0%,transparent_70%)]">
          <div className="max-w-md w-full glass-panel border border-zinc-900 p-8 rounded-3xl text-center space-y-6 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 text-brand-orange flex items-center justify-center mx-auto shadow-xl">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-black uppercase tracking-tight">Admin Authentication Required</h2>
              <p className="text-3xs font-mono text-zinc-500 uppercase">
                System Command authorization is required to access listing controls & customer transmissions databases.
              </p>
            </div>

            {authError && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-3xs font-mono text-left flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2 text-left relative">
                <label className="text-4xs font-mono uppercase tracking-widest text-zinc-400 block">
                  SYSTEM CLEARANCE PASSCODE
                </label>
                <div className="relative">
                  <input
                    type={showPasscode ? "text" : "password"}
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter Passcode (e.g. admin)"
                    className="w-full py-3 px-4 rounded-xl bg-zinc-900/50 border border-zinc-850 focus:border-brand-orange focus:outline-none text-xs text-white placeholder-zinc-700 font-mono transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasscode(!showPasscode)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition"
                  >
                    {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <div className="mt-2.5 flex items-center gap-1 text-[10px] text-zinc-500 font-mono">
                  <Info className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                  <span>Clearance code is: <strong className="text-zinc-300">admin</strong></span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-brand-orange hover:bg-white text-white hover:text-black font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-brand-orange/15"
              >
                Authenticate Clearance
                <Unlock className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* 2. AUTHENTICATED COMMAND CENTER CONTROL VIEW */
        <div className="flex-grow max-w-7xl w-full mx-auto px-6 py-10 space-y-8">
          
          {/* Welcome User Profile Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-900 pb-6">
            <div>
              <span className="text-3xs font-mono tracking-widest text-brand-orange uppercase block mb-1">
                SYSTEM ADMINISTRATOR ACCESS // ACTIVE
              </span>
              <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white flex items-center gap-2.5">
                Executive Control Deck
                <span className="px-2.5 py-0.5 rounded bg-green-500/10 border border-green-500/20 text-green-400 font-mono text-[9px] uppercase tracking-wider block font-bold">
                  SECURE MODE
                </span>
              </h1>
            </div>

            <button
              onClick={handleLogout}
              className="px-3.5 py-1.5 rounded-lg border border-red-500/15 hover:border-red-500 text-red-400 hover:text-white bg-red-500/5 text-2xs font-mono uppercase tracking-wider transition-all"
            >
              Terminate Session (Logout)
            </button>
          </div>

          {/* KPI Analytics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* listings Count */}
            <div className="p-5 rounded-2xl glass-panel border border-zinc-900 bg-zinc-950/60 relative group hover:border-zinc-800 transition-all">
              <div className="absolute top-5 right-5 text-zinc-800 group-hover:text-brand-orange transition-colors">
                <Layers className="w-6 h-6" />
              </div>
              <span className="text-4xs font-mono text-zinc-500 uppercase tracking-widest block mb-1">Active Catalog Listings</span>
              <span className="text-3xl font-black text-white block tracking-tight">{totalListingsCount}</span>
              <div className="mt-3 flex items-center gap-1 text-[10px] text-zinc-500 font-mono">
                <TrendingUp className="w-3.5 h-3.5 text-brand-orange" />
                <span>Propulsion catalog status stable</span>
              </div>
            </div>

            {/* Inquiries Count */}
            <div className="p-5 rounded-2xl glass-panel border border-zinc-900 bg-zinc-950/60 relative group hover:border-zinc-800 transition-all">
              <div className="absolute top-5 right-5 text-zinc-800 group-hover:text-cyan-400 transition-colors">
                <Inbox className="w-6 h-6" />
              </div>
              <span className="text-4xs font-mono text-zinc-500 uppercase tracking-widest block mb-1">Concierge Inquiries</span>
              <span className="text-3xl font-black text-white block tracking-tight">{totalInquiriesCount}</span>
              <div className="mt-3 flex items-center gap-1 text-[10px] text-zinc-500 font-mono">
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                <span>Unread pipeline transmission</span>
              </div>
            </div>

            {/* Subscribers Count */}
            <div className="p-5 rounded-2xl glass-panel border border-zinc-900 bg-zinc-950/60 relative group hover:border-zinc-800 transition-all">
              <div className="absolute top-5 right-5 text-zinc-800 group-hover:text-purple-400 transition-colors">
                <Mail className="w-6 h-6" />
              </div>
              <span className="text-4xs font-mono text-zinc-500 uppercase tracking-widest block mb-1">Mailing Telemetry</span>
              <span className="text-3xl font-black text-white block tracking-tight">{totalSubscribersCount}</span>
              <div className="mt-3 flex items-center gap-1 text-[10px] text-zinc-500 font-mono">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>AERO Chronicle newsletter active</span>
              </div>
            </div>

            {/* Inventory Average Value */}
            <div className="p-5 rounded-2xl glass-panel border border-zinc-900 bg-zinc-950/60 relative group hover:border-zinc-800 transition-all">
              <div className="absolute top-5 right-5 text-zinc-800 group-hover:text-amber-500 transition-colors">
                <Star className="w-6 h-6" />
              </div>
              <span className="text-4xs font-mono text-zinc-500 uppercase tracking-widest block mb-1">Average Footwear Price</span>
              <span className="text-3xl font-black text-white block tracking-tight">${averagePrice.toFixed(2)}</span>
              <div className="mt-3 flex items-center gap-1 text-[10px] text-zinc-500 font-mono">
                <Check className="w-3.5 h-3.5 text-green-400" />
                <span>Zero compromise luxurious tier</span>
              </div>
            </div>
          </div>

          {/* MAIN ADMINISTRATIVE CONTROLS GRID VIEW */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Command Tab Controls */}
            <div className="lg:col-span-3 space-y-4">
              <div className="rounded-2xl border border-zinc-900 bg-[#090909] p-4 space-y-1 shadow-lg">
                <span className="text-4xs font-mono uppercase tracking-widest text-zinc-500 block px-3 mb-2">
                  DATABASE SECTORS
                </span>

                {[
                  { id: "listings", label: "📁 Shoe Listings", count: totalListingsCount },
                  { id: "contacts", label: "✉️ Form Inquiries", count: totalInquiriesCount },
                  { id: "newsletter", label: "🔔 Newsletter subs", count: totalSubscribersCount },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full px-3 py-3 rounded-xl text-left flex justify-between items-center text-xs font-mono uppercase transition-all duration-200 ${
                      activeTab === tab.id
                        ? "bg-brand-orange text-white font-bold"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className={`text-4xs font-bold px-2 py-0.5 rounded-full ${
                      activeTab === tab.id ? "bg-white text-brand-orange" : "bg-zinc-900 text-zinc-400 border border-zinc-800"
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Quick instructions panel */}
              <div className="rounded-2xl border border-zinc-900 bg-zinc-950 p-5 space-y-3 font-mono text-4xs leading-relaxed text-zinc-500">
                <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider block">
                  CLEARANCE AUDIT MEMO
                </span>
                <p>
                  1. Changes made to listing products are propagated to the public catalog database in real-time.
                </p>
                <p>
                  2. Delete commands are absolute and permanent. Deleted inquiries or subscribers cannot be retrieved.
                </p>
                <p>
                  3. Premium express server operates under secure local sandbox specifications.
                </p>
              </div>
            </div>

            {/* Right Column: Tab View Workspace panel */}
            <div className="lg:col-span-9 space-y-6">
              
              {/* TAB 1: SHOE LISTINGS CONTROL WORKSPACE */}
              {activeTab === "listings" && (
                <div className="space-y-6">
                  
                  {/* Subheader and Controls Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900 pb-5">
                    <div>
                      <h2 className="text-lg font-black uppercase tracking-tight text-white">Shoe Catalog database</h2>
                      <p className="text-3xs font-mono text-zinc-500 uppercase">
                        Add, delete, search, and manage active products on the public catalog.
                      </p>
                    </div>

                    <button
                      onClick={() => setIsAddingShoe(!isAddingShoe)}
                      className="px-4 py-2.5 rounded-xl bg-brand-orange hover:bg-white text-white hover:text-black text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all self-start sm:self-center"
                    >
                      <Plus className="w-4 h-4" />
                      {isAddingShoe ? "Close Form" : "Add New Footwear"}
                    </button>
                  </div>

                  {/* FORM TO ADD A NEW SHOE LISTING */}
                  {isAddingShoe && (
                    <form onSubmit={handleAddShoe} className="p-6 rounded-2xl border border-zinc-800 bg-[#070707] space-y-5 animate-fade-in shadow-2xl relative">
                      <h3 className="text-sm font-black uppercase text-brand-orange tracking-tight border-b border-zinc-900 pb-2">
                        Add New Footwear Listing Form
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Name */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">Shoe Model Name *</label>
                          <input
                            type="text"
                            value={newShoeForm.name}
                            onChange={(e) => setNewShoeForm({ ...newShoeForm, name: e.target.value })}
                            placeholder="e.g. AERO Nimbus Air"
                            className="w-full py-2.5 px-3.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-brand-orange focus:outline-none text-xs text-white"
                            required
                          />
                        </div>

                        {/* Price */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">Price (USD) *</label>
                          <input
                            type="number"
                            step="0.01"
                            value={newShoeForm.price}
                            onChange={(e) => setNewShoeForm({ ...newShoeForm, price: e.target.value })}
                            placeholder="e.g. 199.99"
                            className="w-full py-2.5 px-3.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-brand-orange focus:outline-none text-xs text-white"
                            required
                          />
                        </div>

                        {/* Category */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">Category *</label>
                          <select
                            value={newShoeForm.category}
                            onChange={(e) => setNewShoeForm({ ...newShoeForm, category: e.target.value })}
                            className="w-full py-2.5 px-3.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-brand-orange focus:outline-none text-xs text-white font-mono"
                          >
                            <option value="Running">Running</option>
                            <option value="Sneakers">Sneakers</option>
                            <option value="Sports">Sports</option>
                            <option value="Hiking">Hiking</option>
                            <option value="Casual">Casual</option>
                            <option value="Formal">Formal</option>
                            <option value="Limited Edition">Limited Edition</option>
                          </select>
                        </div>

                        {/* Image URL */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">Image Asset URL (Unsplash/Static)</label>
                          <input
                            type="text"
                            value={newShoeForm.image}
                            onChange={(e) => setNewShoeForm({ ...newShoeForm, image: e.target.value })}
                            placeholder="Leave empty for generic Unsplash default"
                            className="w-full py-2.5 px-3.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-brand-orange focus:outline-none text-xs text-white font-mono"
                          />
                        </div>
                      </div>

                      {/* Description */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">Description / Narrative Spec</label>
                        <textarea
                          rows={3}
                          value={newShoeForm.description}
                          onChange={(e) => setNewShoeForm({ ...newShoeForm, description: e.target.value })}
                          placeholder="Narrate structural composites, design motifs, custom mesh configurations..."
                          className="w-full py-2.5 px-3.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-brand-orange focus:outline-none text-xs text-white resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {/* Hex colorways comma-delimited */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">Hex Colors (Comma separated)</label>
                          <input
                            type="text"
                            value={newShoeForm.colorwaysInput}
                            onChange={(e) => setNewShoeForm({ ...newShoeForm, colorwaysInput: e.target.value })}
                            placeholder="e.g. #FF6B00, #111111, #FFFFFF"
                            className="w-full py-2.5 px-3.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-brand-orange focus:outline-none text-xs text-white font-mono"
                          />
                        </div>

                        {/* Technical features comma-delimited */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">Tech specs (Comma separated)</label>
                          <input
                            type="text"
                            value={newShoeForm.techInput}
                            onChange={(e) => setNewShoeForm({ ...newShoeForm, techInput: e.target.value })}
                            placeholder="e.g. Vapor Knit Upper, Carbon Plate"
                            className="w-full py-2.5 px-3.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-brand-orange focus:outline-none text-xs text-white font-mono"
                          />
                        </div>

                        {/* Sizes comma-delimited */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">Sizes US (Comma separated)</label>
                          <input
                            type="text"
                            value={newShoeForm.sizesInput}
                            onChange={(e) => setNewShoeForm({ ...newShoeForm, sizesInput: e.target.value })}
                            placeholder="e.g. 7, 8, 9, 10, 11, 12"
                            className="w-full py-2.5 px-3.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-brand-orange focus:outline-none text-xs text-white font-mono"
                          />
                        </div>
                      </div>

                      {/* Featured checkbox toggle */}
                      <div className="flex items-center gap-2.5 pt-2">
                        <input
                          type="checkbox"
                          id="featured-checkbox"
                          checked={newShoeForm.featured}
                          onChange={(e) => setNewShoeForm({ ...newShoeForm, featured: e.target.checked })}
                          className="w-4 h-4 rounded text-brand-orange bg-zinc-900 border-zinc-800 focus:ring-brand-orange"
                        />
                        <label htmlFor="featured-checkbox" className="text-xs text-zinc-300 font-mono select-none">
                          Mark as Featured Item (displays primary highlight badges)
                        </label>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 justify-end pt-3 border-t border-zinc-900">
                        <button
                          type="button"
                          onClick={() => setIsAddingShoe(false)}
                          className="px-4 py-2 rounded-xl border border-zinc-800 hover:bg-zinc-900 text-zinc-400 hover:text-white text-xs font-semibold"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2 rounded-xl bg-brand-orange hover:bg-white text-white hover:text-black text-xs font-bold uppercase tracking-wider transition-all"
                        >
                          Save New Product
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Listings Filters Dashboard */}
                  <div className="flex flex-col md:flex-row gap-4 p-4 rounded-2xl bg-zinc-950 border border-zinc-900">
                    {/* Search */}
                    <div className="flex-grow relative">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                      <input
                        type="text"
                        value={listingsSearch}
                        onChange={(e) => setListingsSearch(e.target.value)}
                        placeholder="Search shoes by name, category, or features..."
                        className="w-full py-2.5 pl-10 pr-4 rounded-xl bg-zinc-900 border border-zinc-850 focus:border-zinc-700 focus:outline-none text-xs text-white"
                      />
                    </div>

                    {/* Category Filter */}
                    <div className="w-full md:w-48 font-mono">
                      <select
                        value={listingsCategory}
                        onChange={(e) => setListingsCategory(e.target.value)}
                        className="w-full py-2.5 px-3 rounded-xl bg-zinc-900 border border-zinc-850 focus:border-zinc-700 focus:outline-none text-xs text-white"
                      >
                        <option value="all">All Categories</option>
                        <option value="running">Running</option>
                        <option value="sneakers">Sneakers</option>
                        <option value="sports">Sports</option>
                        <option value="hiking">Hiking</option>
                        <option value="casual">Casual</option>
                        <option value="formal">Formal</option>
                        <option value="limited edition">Limited Edition</option>
                      </select>
                    </div>

                    {/* Sort Filter */}
                    <div className="w-full md:w-48 font-mono">
                      <select
                        value={listingsSort}
                        onChange={(e) => setListingsSort(e.target.value)}
                        className="w-full py-2.5 px-3 rounded-xl bg-zinc-900 border border-zinc-850 focus:border-zinc-700 focus:outline-none text-xs text-white"
                      >
                        <option value="default">Default Sort</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="name">Alphabetical</option>
                      </select>
                    </div>
                  </div>

                  {/* Shoe Grid Active Results */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredShoes.map((shoe) => (
                      <div
                        key={shoe.id}
                        className="p-5 rounded-2xl bg-zinc-950/40 border border-zinc-900/80 flex gap-4 hover:border-zinc-800 transition relative group"
                      >
                        {/* Delete absolute button */}
                        <button
                          onClick={() => handleDeleteShoe(shoe.id, shoe.name)}
                          className="absolute top-4 right-4 p-2 rounded-lg bg-zinc-900 hover:bg-red-500/10 border border-zinc-850 hover:border-red-500/30 text-zinc-500 hover:text-red-400 transition"
                          title="Delete Listing"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <img
                          src={shoe.image}
                          alt={shoe.name}
                          className="w-24 h-24 object-cover rounded-xl bg-zinc-900 border border-zinc-850 shrink-0"
                          referrerPolicy="no-referrer"
                        />

                        <div className="flex-grow min-w-0 flex flex-col justify-between pr-8">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-4xs font-mono font-bold bg-zinc-900 border border-zinc-800 px-2 py-0.5 text-zinc-400 rounded-md uppercase tracking-wider">
                                {shoe.category}
                              </span>
                              {shoe.featured && (
                                <span className="text-[8px] font-mono font-black bg-brand-orange/10 border border-brand-orange/20 px-1.5 py-0.5 text-brand-orange rounded uppercase tracking-widest">
                                  FEATURED
                                </span>
                              )}
                            </div>
                            <h3 className="text-sm font-black text-white uppercase truncate">{shoe.name}</h3>
                            <p className="text-3xs text-zinc-500 line-clamp-1">{shoe.description}</p>
                          </div>

                          <div className="flex justify-between items-center pt-2">
                            <span className="text-xs font-mono font-bold text-brand-orange">
                              ${shoe.price.toFixed(2)}
                            </span>
                            <span className="text-[10px] text-zinc-600 font-mono">
                              Sizes: {shoe.sizes.join(", ")}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}

                    {filteredShoes.length === 0 && (
                      <div className="col-span-2 text-center py-16 rounded-2xl border border-dashed border-zinc-900 text-zinc-600 text-xs font-mono">
                        <Layers className="w-10 h-10 mx-auto mb-3 opacity-35" />
                        No active shoe listings match search filters.
                      </div>
                    )}
                  </div>

                </div>
              )}

              {/* TAB 2: CONTACT SUBMISSIONS WORKSPACE */}
              {activeTab === "contacts" && (
                <div className="space-y-6">
                  
                  {/* Title Header */}
                  <div className="border-b border-zinc-900 pb-5">
                    <h2 className="text-lg font-black uppercase tracking-tight text-white">Concierge Customer Inquiries</h2>
                    <p className="text-3xs font-mono text-zinc-500 uppercase">
                      Monitor, analyze, filter, and purge incoming messages sent from the Contact Us page.
                    </p>
                  </div>

                  {/* Filters bar */}
                  <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-zinc-950 border border-zinc-900">
                    <div className="flex-grow relative">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                      <input
                        type="text"
                        value={contactsSearch}
                        onChange={(e) => setContactsSearch(e.target.value)}
                        placeholder="Filter by name, email address, or message keywords..."
                        className="w-full py-2.5 pl-10 pr-4 rounded-xl bg-zinc-900 border border-zinc-850 focus:border-zinc-700 focus:outline-none text-xs text-white"
                      />
                    </div>

                    <div className="w-full sm:w-48 font-mono">
                      <select
                        value={contactsFilterSubject}
                        onChange={(e) => setContactsFilterSubject(e.target.value)}
                        className="w-full py-2.5 px-3 rounded-xl bg-zinc-900 border border-zinc-850 focus:border-zinc-700 focus:outline-none text-xs text-white"
                      >
                        <option value="all">All Subjects</option>
                        <option value="general">General Inquiries</option>
                        <option value="partnership">Sponsorship / Team</option>
                      </select>
                    </div>
                  </div>

                  {/* list grid */}
                  <div className="space-y-4">
                    {filteredContacts.map((c) => (
                      <div
                        key={c.id}
                        className="p-5 rounded-2xl bg-zinc-950/40 border border-zinc-900/80 hover:border-zinc-800 transition flex flex-col sm:flex-row justify-between items-start gap-4 relative"
                      >
                        <div className="space-y-3 flex-grow min-w-0 pr-8">
                          {/* Subject Header */}
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="text-4xs font-mono font-bold bg-brand-orange/15 border border-brand-orange/20 text-brand-orange px-2 py-0.5 rounded uppercase tracking-wider">
                              {c.subject}
                            </span>
                            <span className="text-4xs font-mono text-zinc-500">
                              {new Date(c.timestamp).toLocaleString("en-US", {
                                dateStyle: "short",
                                timeStyle: "short"
                              })}
                            </span>
                          </div>

                          {/* Message detail */}
                          <p className="text-xs text-zinc-200 leading-relaxed bg-[#050505] p-3.5 rounded-xl border border-zinc-900/80 font-serif italic text-left">
                            "{c.message}"
                          </p>

                          {/* Customer coordinates */}
                          <div className="flex gap-4 items-center text-4xs font-mono text-zinc-500">
                            <div>
                              <span className="text-zinc-600 block uppercase">CUSTOMER NAME</span>
                              <strong className="text-zinc-300 uppercase">{c.name}</strong>
                            </div>
                            <div className="h-6 w-[1px] bg-zinc-900" />
                            <div>
                              <span className="text-zinc-600 block uppercase">EMAIL ADDRESS</span>
                              <a href={`mailto:${c.email}`} className="text-brand-orange hover:underline">
                                {c.email}
                              </a>
                            </div>
                          </div>
                        </div>

                        {/* Delete trigger */}
                        <button
                          onClick={() => handleDeleteContact(c.id)}
                          className="sm:self-center p-2 rounded-lg bg-zinc-900 hover:bg-red-500/10 border border-zinc-850 hover:border-red-500/30 text-zinc-500 hover:text-red-400 transition"
                          title="Purge Submission"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                      </div>
                    ))}

                    {filteredContacts.length === 0 && (
                      <div className="text-center py-20 rounded-2xl border border-dashed border-zinc-900 text-zinc-600 text-xs font-mono">
                        <Inbox className="w-10 h-10 mx-auto mb-3 opacity-35" />
                        No customer contact submissions registered.
                      </div>
                    )}
                  </div>

                </div>
              )}

              {/* TAB 3: NEWSLETTER SUBSCRIPTIONS WORKSPACE */}
              {activeTab === "newsletter" && (
                <div className="space-y-6">
                  
                  {/* Header title */}
                  <div className="border-b border-zinc-900 pb-5">
                    <h2 className="text-lg font-black uppercase tracking-tight text-white">Mailing database & subscriptions</h2>
                    <p className="text-3xs font-mono text-zinc-500 uppercase">
                      Inspect and delete active subscriber addresses listening to AERO Chronicles telemetry.
                    </p>
                  </div>

                  {/* Filters bar */}
                  <div className="flex gap-4 p-4 rounded-2xl bg-zinc-950 border border-zinc-900">
                    <div className="flex-grow relative">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                      <input
                        type="text"
                        value={newsletterSearch}
                        onChange={(e) => setNewsletterSearch(e.target.value)}
                        placeholder="Search active email subscribers..."
                        className="w-full py-2.5 pl-10 pr-4 rounded-xl bg-zinc-900 border border-zinc-850 focus:border-zinc-700 focus:outline-none text-xs text-white"
                      />
                    </div>
                  </div>

                  {/* table representation */}
                  <div className="rounded-2xl border border-zinc-900 overflow-hidden bg-zinc-950/20 shadow-lg">
                    <div className="grid grid-cols-12 bg-zinc-950 p-4 border-b border-zinc-900 text-3xs font-mono uppercase tracking-widest text-zinc-500 font-bold">
                      <div className="col-span-6">SUBSCRIBER EMAIL</div>
                      <div className="col-span-4">DATE SUBSCRIBED</div>
                      <div className="col-span-2 text-right">CONTROLS</div>
                    </div>

                    <div className="divide-y divide-zinc-900">
                      {filteredSubscriptions.map((s) => (
                        <div
                          key={s.id}
                          className="grid grid-cols-12 p-4 items-center hover:bg-zinc-900/30 transition text-xs font-mono"
                        >
                          <div className="col-span-6 text-white truncate pr-4 font-semibold">{s.email}</div>
                          <div className="col-span-4 text-zinc-500 text-3xs">
                            {new Date(s.timestamp).toLocaleString("en-US", {
                              dateStyle: "medium"
                            })}
                          </div>
                          <div className="col-span-2 text-right">
                            <button
                              onClick={() => handleDeleteSubscription(s.id, s.email)}
                              className="p-1.5 rounded-lg bg-zinc-900 hover:bg-red-500/10 border border-zinc-850 hover:border-red-500/30 text-zinc-500 hover:text-red-450 transition"
                              title="Delete subscription"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}

                      {filteredSubscriptions.length === 0 && (
                        <div className="text-center py-20 text-zinc-600 text-xs font-mono">
                          <Mail className="w-10 h-10 mx-auto mb-3 opacity-35" />
                          No subscriber email coordinates found.
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              )}

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
