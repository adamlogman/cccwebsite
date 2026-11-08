import phone1 from "@/assets/p-phone1.jpg";
import phone2 from "@/assets/p-phone2.jpg";
import phone3 from "@/assets/p-phone3.jpg";
import laptop1 from "@/assets/p-laptop1.jpg";
import laptop2 from "@/assets/p-laptop2.jpg";
import desktop from "@/assets/p-desktop.jpg";
import headphones from "@/assets/p-headphones.jpg";
import watch from "@/assets/p-watch.jpg";
import earbuds from "@/assets/p-earbuds.jpg";
import jacket from "@/assets/p-jacket.jpg";
import tee from "@/assets/p-tee.jpg";
import dress from "@/assets/p-dress.jpg";
import sneakers from "@/assets/p-sneakers.jpg";
import boots from "@/assets/p-boots.jpg";
import backpack from "@/assets/p-backpack.jpg";
import lamp from "@/assets/p-lamp.jpg";
import coffee from "@/assets/p-coffee.jpg";
import throwImg from "@/assets/p-throw.jpg";

export type CategoryId = "phones" | "computers" | "electronics" | "fashion" | "shoes" | "home";

export const categories: { id: CategoryId; name: string; blurb: string; image: string }[] = [
  { id: "phones", name: "Mobile Phones", blurb: "Flagships to everyday value", image: phone1 },
  { id: "computers", name: "Laptops & Computers", blurb: "Work, create and play", image: laptop1 },
  { id: "electronics", name: "Electronics & Accessories", blurb: "Audio, wearables and more", image: headphones },
  { id: "fashion", name: "Clothing & Fashion", blurb: "Wardrobe essentials", image: jacket },
  { id: "shoes", name: "Shoes & Accessories", blurb: "Step out in style", image: sneakers },
  { id: "home", name: "Home & Lifestyle", blurb: "Make your space yours", image: lamp },
];

export type Review = { author: string; rating: number; date: string; text: string };

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: CategoryId;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  image: string;
  description: string;
  specs: Record<string, string>;
  tags: ("featured" | "bestseller" | "deal")[];
  reviews: Review[];
};

const r = (author: string, rating: number, date: string, text: string): Review => ({ author, rating, date, text });

export const products: Product[] = [
  {
    id: "aero-15-pro", name: "Aero 15 Pro 256GB", brand: "Nexa", category: "phones",
    price: 1099, oldPrice: 1199, rating: 4.8, reviewCount: 1284, stock: 24, image: phone1,
    description: "A titanium-framed flagship with a 6.3\" ProMotion display, triple 48MP camera system and all-day battery life.",
    specs: { Display: "6.3\" OLED, 120Hz", Storage: "256GB", Camera: "48MP + 12MP + 12MP", Battery: "Up to 26 hours", Colour: "Titanium Blue" },
    tags: ["featured", "bestseller"],
    reviews: [r("Amina K.", 5, "Oct 2026", "The camera is unreal, especially at night."), r("David M.", 5, "Sep 2026", "Fast delivery and the phone feels premium.")],
  },
  {
    id: "fold-x", name: "Fold X Foldable 512GB", brand: "Orion", category: "phones",
    price: 1749, oldPrice: 1999, rating: 4.6, reviewCount: 412, stock: 6, image: phone2,
    description: "Unfold a 7.6\" canvas for multitasking, then fold it back into your pocket. Durable hinge rated for 400k folds.",
    specs: { Display: "7.6\" inner / 6.2\" cover", Storage: "512GB", RAM: "12GB", Camera: "50MP triple", Colour: "Midnight Black" },
    tags: ["featured", "deal"],
    reviews: [r("Joseph N.", 5, "Oct 2026", "Productivity beast. Love the big screen."), r("Grace U.", 4, "Aug 2026", "A bit heavy but worth it.")],
  },
  {
    id: "lumi-a5", name: "Lumi A5 128GB", brand: "Lumi", category: "phones",
    price: 279, oldPrice: 329, rating: 4.4, reviewCount: 2310, stock: 58, image: phone3,
    description: "Everyday smartphone with a vivid 6.6\" display, 50MP camera and a 5000mAh battery that keeps up with you.",
    specs: { Display: "6.6\" LCD, 90Hz", Storage: "128GB", Camera: "50MP triple", Battery: "5000mAh", Colour: "Mint" },
    tags: ["bestseller", "deal"],
    reviews: [r("Eric T.", 4, "Oct 2026", "Great value for money."), r("Sandra B.", 5, "Jul 2026", "Battery lasts two days for me.")],
  },
  {
    id: "slate-14", name: "Slate 14 Ultrabook", brand: "Nexa", category: "computers",
    price: 1299, rating: 4.7, reviewCount: 846, stock: 15, image: laptop1,
    description: "Just 1.2kg with a 14\" 2.8K display and 18-hour battery. Built for students and professionals on the move.",
    specs: { Processor: "Octa-core M3", RAM: "16GB", Storage: "512GB SSD", Display: "14\" 2.8K", Weight: "1.2kg" },
    tags: ["featured", "bestseller"],
    reviews: [r("Patrick H.", 5, "Sep 2026", "Perfect for university, super light."), r("Lina O.", 5, "Aug 2026", "Gorgeous screen.")],
  },
  {
    id: "raptor-g16", name: "Raptor G16 Gaming Laptop", brand: "Vortex", category: "computers",
    price: 1899, oldPrice: 2199, rating: 4.6, reviewCount: 529, stock: 4, image: laptop2,
    description: "RTX-class graphics, a 240Hz QHD panel and per-key RGB lighting. Cooling that keeps frames high.",
    specs: { Processor: "Core i9 14th Gen", GPU: "RTX 4070 8GB", RAM: "32GB", Storage: "1TB SSD", Display: "16\" QHD 240Hz" },
    tags: ["deal"],
    reviews: [r("Kevin R.", 5, "Oct 2026", "Runs everything at max."), r("Ivan P.", 4, "Sep 2026", "Fans can get loud under load.")],
  },
  {
    id: "studio-24", name: "Studio 24 All-in-One", brand: "Nexa", category: "computers",
    price: 1449, rating: 4.5, reviewCount: 211, stock: 0, image: desktop,
    description: "A 24\" 4.5K all-in-one desktop with wireless keyboard and mouse. Clean desk, brilliant display.",
    specs: { Processor: "Octa-core M3", RAM: "16GB", Storage: "1TB SSD", Display: "24\" 4.5K", Includes: "Keyboard & mouse" },
    tags: ["featured"],
    reviews: [r("Claire D.", 5, "Jun 2026", "Beautiful in my home office.")],
  },
  {
    id: "halo-anc", name: "Halo ANC Headphones", brand: "Sonique", category: "electronics",
    price: 249, oldPrice: 349, rating: 4.8, reviewCount: 3120, stock: 40, image: headphones,
    description: "Industry-leading active noise cancelling, plush memory-foam cushions and 40 hours of playback.",
    specs: { Battery: "40 hours", Connectivity: "Bluetooth 5.3", "Noise cancelling": "Adaptive ANC", Weight: "250g", Colour: "Sand" },
    tags: ["featured", "bestseller", "deal"],
    reviews: [r("Olivia S.", 5, "Oct 2026", "Silence on the bus. Amazing."), r("Ben A.", 5, "Sep 2026", "Super comfortable for hours.")],
  },
  {
    id: "pulse-watch-5", name: "Pulse Watch Series 5", brand: "Nexa", category: "electronics",
    price: 399, rating: 4.7, reviewCount: 1755, stock: 31, image: watch,
    description: "Track workouts, sleep and heart health. Always-on display and water resistance to 50m.",
    specs: { Display: "Always-on OLED", "Water resistance": "50m", Battery: "18 hours", Sensors: "ECG, SpO2, HR", Band: "Sport, black" },
    tags: ["bestseller"],
    reviews: [r("Mariam L.", 5, "Oct 2026", "Keeps me moving every day.")],
  },
  {
    id: "airbeat-pro", name: "AirBeat Pro Earbuds", brand: "Sonique", category: "electronics",
    price: 179, oldPrice: 229, rating: 4.5, reviewCount: 2648, stock: 72, image: earbuds,
    description: "True wireless earbuds with spatial audio, transparency mode and a wireless charging case.",
    specs: { Battery: "6h + 24h case", Charging: "USB-C & wireless", "Water resistance": "IPX4", Connectivity: "Bluetooth 5.3" },
    tags: ["deal"],
    reviews: [r("Chris W.", 4, "Aug 2026", "Great sound, snug fit.")],
  },
  {
    id: "indigo-denim-jacket", name: "Indigo Denim Jacket", brand: "Atelier North", category: "fashion",
    price: 89, oldPrice: 119, rating: 4.6, reviewCount: 488, stock: 22, image: jacket,
    description: "A timeless trucker jacket cut from heavyweight organic denim that softens beautifully over time.",
    specs: { Material: "100% organic cotton", Fit: "Regular", Care: "Machine wash cold", Sizes: "XS – XXL" },
    tags: ["featured", "deal"],
    reviews: [r("Noah G.", 5, "Sep 2026", "Fits perfectly, great quality.")],
  },
  {
    id: "essentials-set", name: "Essentials Tee & Chino Set", brand: "Atelier North", category: "fashion",
    price: 69, rating: 4.4, reviewCount: 302, stock: 45, image: tee,
    description: "A premium heavyweight cotton tee paired with classic stretch chinos. The everyday uniform, sorted.",
    specs: { Material: "Cotton / elastane", Fit: "Classic", Includes: "1 tee, 1 chino", Sizes: "S – XXL" },
    tags: ["bestseller"],
    reviews: [r("Samuel E.", 4, "Jul 2026", "Simple and comfortable.")],
  },
  {
    id: "bloom-midi-dress", name: "Bloom Floral Midi Dress", brand: "Maison Rue", category: "fashion",
    price: 74, oldPrice: 95, rating: 4.7, reviewCount: 611, stock: 12, image: dress,
    description: "A breezy wrap-style midi dress in a soft floral print with a tie waist and tiered hem.",
    specs: { Material: "Viscose", Fit: "Wrap, adjustable", Length: "Midi", Sizes: "XS – XL" },
    tags: ["featured"],
    reviews: [r("Diane F.", 5, "Aug 2026", "So many compliments!")],
  },
  {
    id: "stride-runner", name: "Stride Runner 3", brand: "Velocity", category: "shoes",
    price: 129, oldPrice: 149, rating: 4.7, reviewCount: 1932, stock: 50, image: sneakers,
    description: "Responsive foam and a breathable engineered mesh upper for daily training and race day.",
    specs: { Upper: "Engineered mesh", Drop: "8mm", Weight: "245g", Use: "Road running" },
    tags: ["featured", "bestseller", "deal"],
    reviews: [r("Alice J.", 5, "Oct 2026", "Lightest shoes I've owned.")],
  },
  {
    id: "chelsea-leather-boot", name: "Heritage Chelsea Boots", brand: "Bramwell", category: "shoes",
    price: 189, rating: 4.8, reviewCount: 407, stock: 9, image: boots,
    description: "Hand-finished full-grain leather Chelsea boots with a Goodyear-welted sole built to be resoled.",
    specs: { Material: "Full-grain leather", Sole: "Goodyear welt", Lining: "Leather", Sizes: "EU 39 – 46" },
    tags: ["bestseller"],
    reviews: [r("Thomas Y.", 5, "Sep 2026", "Beautiful craftsmanship.")],
  },
  {
    id: "voyager-backpack", name: "Voyager Leather Backpack", brand: "Bramwell", category: "shoes",
    price: 149, oldPrice: 179, rating: 4.5, reviewCount: 265, stock: 18, image: backpack,
    description: "Vegetable-tanned leather backpack with a padded 14\" laptop sleeve and solid brass hardware.",
    specs: { Material: "Veg-tan leather", Capacity: "18L", "Laptop sleeve": "Up to 14\"", Hardware: "Brass" },
    tags: ["deal"],
    reviews: [r("Ruth K.", 4, "Jul 2026", "Fits my laptop and books.")],
  },
  {
    id: "ceramic-lamp", name: "Aurelia Ceramic Table Lamp", brand: "Casa Lune", category: "home",
    price: 119, rating: 4.6, reviewCount: 184, stock: 14, image: lamp,
    description: "A crackle-glaze ceramic base with a natural linen shade and brushed brass details.",
    specs: { Height: "62cm", Material: "Ceramic, linen, brass", Bulb: "E27, not included", Cable: "1.8m" },
    tags: ["featured"],
    reviews: [r("Helen P.", 5, "Aug 2026", "Warm, cosy light.")],
  },
  {
    id: "barista-one", name: "Barista One Espresso Machine", brand: "Crema", category: "home",
    price: 549, oldPrice: 649, rating: 4.7, reviewCount: 958, stock: 7, image: coffee,
    description: "Built-in conical burr grinder, 15-bar pump and steam wand for café-quality drinks at home.",
    specs: { Pressure: "15 bar", Grinder: "Conical burr", "Water tank": "2L", Material: "Stainless steel" },
    tags: ["bestseller", "deal"],
    reviews: [r("Marc V.", 5, "Oct 2026", "Best morning upgrade ever.")],
  },
  {
    id: "chunky-throw-set", name: "Chunky Knit Throw & Cushions", brand: "Casa Lune", category: "home",
    price: 79, rating: 4.5, reviewCount: 233, stock: 26, image: throwImg,
    description: "A hand-knitted throw with two textured cushions in warm neutral tones.",
    specs: { Throw: "130 × 170cm", Cushions: "45 × 45cm, 30 × 50cm", Material: "Cotton blend", Care: "Hand wash" },
    tags: [],
    reviews: [r("Nadia Z.", 4, "Sep 2026", "Very soft and stylish.")],
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const categoryName = (id: CategoryId) => categories.find((c) => c.id === id)?.name ?? id;
export const discountPercent = (p: Product) =>
  p.oldPrice ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100) : 0;
export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

export type SortKey = "featured" | "price-asc" | "price-desc" | "rating" | "discount";

export function filterProducts(
  list: Product[],
  opts: { q?: string | undefined; category?: CategoryId | "all" | undefined; min?: number | undefined; max?: number | undefined; sort?: SortKey | undefined; inStock?: boolean | undefined },
) {
  const q = opts.q?.trim().toLowerCase();
  let out = list.filter((p) => {
    if (opts.category && opts.category !== "all" && p.category !== opts.category) return false;
    if (opts.min != null && p.price < opts.min) return false;
    if (opts.max != null && p.price > opts.max) return false;
    if (opts.inStock && p.stock <= 0) return false;
    if (q && !`${p.name} ${p.brand} ${categoryName(p.category)}`.toLowerCase().includes(q)) return false;
    return true;
  });
  switch (opts.sort) {
    case "price-asc": out = [...out].sort((a, b) => a.price - b.price); break;
    case "price-desc": out = [...out].sort((a, b) => b.price - a.price); break;
    case "rating": out = [...out].sort((a, b) => b.rating - a.rating); break;
    case "discount": out = [...out].sort((a, b) => discountPercent(b) - discountPercent(a)); break;
  }
  return out;
}
