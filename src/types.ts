export interface Shoe {
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

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  image: string;
}

export interface CartItem {
  shoe: Shoe;
  selectedSize: number;
  selectedColorway: string;
  quantity: number;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export interface NewsletterSubscription {
  id: string;
  email: string;
  timestamp: string;
}

