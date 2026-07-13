import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

// Types
interface Shoe {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  colorways: string[];
  tech: string[];
  sizes: number[];
  featured: boolean;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  image: string;
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

// Mock Data
const categories = [
  { id: "running", name: "Running", count: 12 },
  { id: "sneakers", name: "Sneakers", count: 18 },
  { id: "sports", name: "Sports", count: 10 },
  { id: "casual", name: "Casual", count: 15 },
  { id: "formal", name: "Formal", count: 6 },
  { id: "hiking", name: "Hiking", count: 8 },
  { id: "limited-edition", name: "Limited Edition", count: 4 }
];

const shoes: Shoe[] = [
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
  },
  {
    id: "aero-stealth-black",
    name: "AERO Stealth Runner",
    category: "Running",
    price: 169.99,
    rating: 4.8,
    reviewsCount: 210,
    image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=600&auto=format&fit=crop",
    description: "All-black performance. Lightweight microfiber construction makes this shoe incredibly swift, backed with our adaptive heel strike absorb pod.",
    colorways: ["#111111", "#1C1C1C"],
    tech: ["Heel Shock Pod", "Adaptive Microfiber Mesh", "Ultra-Light Carbon Frame"],
    sizes: [8, 9, 10, 11],
    featured: false
  },
  {
    id: "aero-monarch-classic",
    name: "AERO Monarch Derby",
    category: "Formal",
    price: 199.99,
    rating: 4.7,
    reviewsCount: 42,
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=600&auto=format&fit=crop",
    description: "The comfort of an athletic sneaker dressed as an exquisite formal shoe. Premium Italian crust calf leather combined with our covert cushion core technology.",
    colorways: ["#4F2615", "#111111"],
    tech: ["Italian Crust Calfskin", "Hidden Sneaker Core Pod", "Anti-Fatigue Footbed"],
    sizes: [8, 9, 10, 11, 12],
    featured: false
  }
];

const testimonials: Testimonial[] = [
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

const contactSubmissions: ContactSubmission[] = [];
const newsletterSubscriptions: { id: string; email: string; timestamp: string }[] = [];

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middlewares
  app.use(express.json());

  // API Endpoints
  app.get("/api/shoes", (req, res) => {
    res.json(shoes);
  });

  app.get("/api/categories", (req, res) => {
    res.json(categories);
  });

  app.get("/api/testimonials", (req, res) => {
    res.json(testimonials);
  });

  app.post("/api/contact", (req, res) => {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !message) {
      res.status(400).json({ error: "Required fields are missing: name, email, and message are required." });
      return;
    }

    const newSubmission: ContactSubmission = {
      id: `submission-${Date.now()}`,
      name,
      email,
      subject: subject || "General Inquiry",
      message,
      timestamp: new Date().toISOString()
    };

    contactSubmissions.push(newSubmission);
    console.log(`[AERO Server] New Contact Form Submitted:`, newSubmission);

    res.status(201).json({ 
      success: true, 
      message: "Thank you for reaching out to AERO. Our premium concierge will contact you within 24 hours.",
      submission: newSubmission
    });
  });

  // Get all contact submissions
  app.get("/api/contacts", (req, res) => {
    res.json(contactSubmissions);
  });

  // Delete a contact submission
  app.delete("/api/contacts/:id", (req, res) => {
    const { id } = req.params;
    const index = contactSubmissions.findIndex((c) => c.id === id);
    if (index > -1) {
      contactSubmissions.splice(index, 1);
      res.json({ success: true, message: "Inquiry deleted successfully." });
    } else {
      res.status(404).json({ error: "Contact submission not found." });
    }
  });

  // Get all newsletter subscribers
  app.get("/api/subscribe", (req, res) => {
    res.json(newsletterSubscriptions);
  });

  // Create a new subscription
  app.post("/api/subscribe", (req, res) => {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ error: "Email is required." });
      return;
    }
    
    const exists = newsletterSubscriptions.some((s) => s.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      res.json({ success: true, message: "Already subscribed!" });
      return;
    }

    const newSub = {
      id: `sub-${Date.now()}`,
      email: email.toLowerCase(),
      timestamp: new Date().toISOString()
    };
    newsletterSubscriptions.push(newSub);
    res.status(201).json({ success: true, message: "Successfully subscribed to AERO Chronicles!", subscription: newSub });
  });

  // Delete a newsletter subscription
  app.delete("/api/subscribe/:id", (req, res) => {
    const { id } = req.params;
    const index = newsletterSubscriptions.findIndex((s) => s.id === id);
    if (index > -1) {
      newsletterSubscriptions.splice(index, 1);
      res.json({ success: true, message: "Subscription deleted successfully." });
    } else {
      res.status(404).json({ error: "Subscription not found." });
    }
  });

  // Add a new shoe listing
  app.post("/api/shoes", (req, res) => {
    const { name, category, price, image, description, colorways, tech, sizes, featured } = req.body;
    if (!name || !category || !price) {
      res.status(400).json({ error: "Name, Category, and Price are required." });
      return;
    }

    const newShoe: Shoe = {
      id: `shoe-${Date.now()}`,
      name,
      category,
      price: Number(price),
      rating: 5.0,
      reviewsCount: 1,
      image: image || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
      description: description || "Handcrafted premium footwear engineered with carbon performance.",
      colorways: colorways && Array.isArray(colorways) ? colorways : ["#FF6B00", "#111111"],
      tech: tech && Array.isArray(tech) ? tech : ["Carbon Fiber Plate"],
      sizes: sizes && Array.isArray(sizes) ? sizes.map(Number) : [8, 9, 10, 11],
      featured: featured === true || featured === "true"
    };

    shoes.push(newShoe);
    res.status(201).json({ success: true, message: "New shoe listing created successfully.", shoe: newShoe });
  });

  // Delete a shoe listing
  app.delete("/api/shoes/:id", (req, res) => {
    const { id } = req.params;
    const index = shoes.findIndex((s) => s.id === id);
    if (index > -1) {
      shoes.splice(index, 1);
      res.json({ success: true, message: "Shoe listing deleted successfully." });
    } else {
      res.status(404).json({ error: "Shoe listing not found." });
    }
  });

  // Vite Integration & SPA fallback
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[AERO Footwear] Full-stack server running on http://localhost:${PORT}`);
  });
}

startServer();
