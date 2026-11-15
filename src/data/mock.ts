export const LOCATIONS = ["Chandigarh", "Mohali", "Zirakpur"];

export const CATEGORIES = [
  "Deals", "Nearby Stores", "Utensils", "Kitchen", "Home", "Fashion", "Footwear", "Appliances"
];

export const STORES = [
  {
    id: "s1",
    name: "Sharma Kitchen",
    rating: 4.6,
    reviews: 120,
    distance: "1.2 km",
    isOpen: true,
    address: "Sector 22, Chandigarh",
    image: "/hero.jpg"
  },
  {
    id: "s2",
    name: "Modern Utensils",
    rating: 4.4,
    reviews: 98,
    distance: "2.1 km",
    isOpen: true,
    address: "Phase 3B2, Mohali",
    image: "/store2.jpg"
  },
  {
    id: "s3",
    name: "Home & More",
    rating: 4.6,
    reviews: 132,
    distance: "2.8 km",
    isOpen: true,
    address: "VIP Road, Zirakpur",
    image: "/store3.jpg"
  }
];

export const DEALS = [
  {
    id: "d1",
    title: "Premium Steel Cookware Set",
    storeId: "s1",
    storeName: "Sharma Kitchen",
    originalPrice: 2199,
    offerPrice: 1499,
    discount: "32%",
    rating: 4.6,
    distance: "1.4 km",
    validity: "Valid till Sunday",
    image: "/cookware.jpg"
  },
  {
    id: "d2",
    title: "Non-Stick Fry Pan 24cm",
    storeId: "s2",
    storeName: "Modern Utensils",
    originalPrice: 899,
    offerPrice: 599,
    discount: "33%",
    rating: 4.5,
    distance: "2.1 km",
    validity: "Valid till Tomorrow",
    image: "/fry_pan.jpg"
  },
  {
    id: "d3",
    title: "Copper Water Bottle 1L",
    storeId: "s3",
    storeName: "Home & More",
    originalPrice: 999,
    offerPrice: 699,
    discount: "30%",
    rating: 4.8,
    distance: "2.8 km",
    validity: "Valid till Friday",
    image: "/copper_bottle.jpg"
  }
];

export const PRODUCTS = [
  {
    id: "p1",
    name: "Premium Stainless Steel Cookware Set",
    category: "Cookware",
    price: 1299,
    mrp: 1799,
    discount: "28%",
    rating: 4.7,
    reviews: 126,
    delivery: "Free Delivery",
    image: "/cookware.jpg",
    description: "High-quality stainless steel cookware set suitable for all stovetops including induction."
  },
  {
    id: "p2",
    name: "Elegant Ceramic Dinner Set (16 Pieces)",
    category: "Dinner Sets",
    price: 2499,
    mrp: 3999,
    discount: "38%",
    rating: 4.5,
    reviews: 84,
    delivery: "Free Delivery",
    image: "/dinner_set.jpg",
    description: "Beautifully crafted ceramic dinner set perfect for special occasions or daily use."
  },
  {
    id: "p3",
    name: "Heavy Duty Pressure Cooker 5L",
    category: "Pressure Cookers",
    price: 1899,
    mrp: 2500,
    discount: "24%",
    rating: 4.8,
    reviews: 215,
    delivery: "Free Delivery",
    image: "/pressure_cooker.jpg",
    description: "Durable aluminum pressure cooker that cooks food quickly and evenly."
  },
  {
    id: "p4",
    name: "Silicone Kitchen Tools Set (6 Pieces)",
    category: "Kitchen Tools",
    price: 599,
    mrp: 999,
    discount: "40%",
    rating: 4.6,
    reviews: 320,
    delivery: "₹40 Delivery",
    image: "/silicone_tools.jpg",
    description: "Heat-resistant silicone kitchen utensils that won't scratch your non-stick pans."
  }
];
