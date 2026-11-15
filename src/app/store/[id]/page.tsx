"use client";

import Image from "next/image";
import Link from "next/link";
import { STORES_DATA, Store, Product } from "@/data/stores";
import { 
  MapPin, Star, Phone, Clock, ArrowLeft, Search, Tag, 
  Flame, Sparkles, Grid, X, Check, Copy, Navigation as NavIcon, 
  Share2, ShieldCheck, Heart 
} from "lucide-react";
import { use, useState, useMemo } from "react";

export default function StoreDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const store: Store = STORES_DATA.find((s) => s.id === resolvedParams.id) || STORES_DATA[0];

  // State
  const [activeTab, setActiveTab] = useState<"all" | "deals" | "new">("all");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedVoucherProduct, setSelectedVoucherProduct] = useState<Product | null>(null);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const dealsCount = useMemo(() => store.products.filter(p => p.hasOffer).length, [store]);
  const newCount = useMemo(() => store.products.filter(p => p.isNewArrival).length, [store]);

  const filteredProducts = useMemo(() => {
    return store.products.filter(p => {
      if (activeTab === "deals" && !p.hasOffer) return false;
      if (activeTab === "new" && !p.isNewArrival) return false;
      if (activeCategory !== "All" && p.category !== activeCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [store, activeTab, activeCategory, searchQuery]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCopyCode = (code: string | null | undefined, pct: number = 5) => {
    if (!code) return;
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(code);
    }
    setCopiedCode(true);
    showToast(`Coupon code "${code}" copied! Give it to the shop owner at checkout for your extra ${pct}% off.`);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
    showToast("Updated your saved list!");
  };

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.name + ' ' + store.address)}`;

  return (
    <div className="pb-16 bg-[#FAF6F0] min-h-screen text-gray-900 font-sans">
      
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-3 animate-fade-in text-sm font-semibold max-w-md">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Breadcrumb Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-2 flex items-center justify-between gap-4">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 bg-white border border-[#E5DEC9] text-gray-700 hover:text-black hover:bg-gray-50 px-4 py-2 rounded-full text-sm font-bold shadow-sm transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Stores
        </Link>
        <div className="text-xs sm:text-sm text-gray-500 flex items-center gap-2 truncate">
          <Link href="/" className="hover:text-orange-600">Home</Link>
          <span>/</span>
          <span className="font-bold text-gray-900 truncate">{store.name}</span>
        </div>
      </div>

      {/* Store Header Showcase Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-4">
        <div className="bg-white rounded-3xl border border-[#EFE8DC] overflow-hidden shadow-sm">
          {/* Cover Banner */}
          <div className="relative h-60 sm:h-72 w-full bg-gray-800">
            <Image 
              src={store.coverImage} 
              alt={store.name} 
              fill 
              sizes="100vw"
              priority
              className="object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            
            <div className="absolute top-4 right-4 sm:right-6 flex gap-2">
              <span className="bg-emerald-600/90 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow">
                <ShieldCheck className="w-4 h-4" /> Verified Store
              </span>
              <span className="bg-orange-600/90 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow">
                <Tag className="w-4 h-4" /> Extra 2-5% OFF Vouchers
              </span>
            </div>
          </div>

          {/* Store Info Content */}
          <div className="px-6 sm:px-10 pb-8 pt-0 -mt-14 relative flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white p-1 border-4 border-white shadow-xl overflow-hidden shrink-0 relative">
              <Image 
                src={store.avatarImage} 
                alt={store.name} 
                fill 
                sizes="112px"
                className="object-cover rounded-xl" 
              />
            </div>

            <div className="flex-1 pt-2 sm:pt-4">
              <span className="inline-block bg-orange-50 text-orange-600 text-xs font-extrabold uppercase tracking-wide px-3 py-1 rounded-full mb-2">
                {store.category}
              </span>
              
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
                {store.name}
              </h1>
              
              <p className="text-sm sm:text-base text-gray-600 font-medium mt-1 mb-4">
                {store.tagline}
              </p>

              {/* Quick Meta Pills */}
              <div className="flex flex-wrap gap-2.5 mb-4 text-xs sm:text-sm">
                <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  {store.rating} ({store.reviewCount} Reviews)
                </span>
                <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full font-semibold">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  {store.distance} from you
                </span>
                <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full font-semibold">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  {store.openingHours}
                </span>
                <a 
                  href={`tel:${store.phone}`} 
                  className="inline-flex items-center gap-1.5 bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 px-3 py-1 rounded-full font-semibold transition"
                >
                  <Phone className="w-4 h-4 text-orange-600" />
                  {store.phone}
                </a>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed max-w-3xl mb-6">
                {store.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <a 
                  href={mapsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-bold px-5 py-2.5 rounded-full text-sm shadow-md transition transform hover:-translate-y-0.5"
                >
                  <NavIcon className="w-4 h-4" /> Get Store Directions
                </a>
                <a 
                  href={`tel:${store.phone}`} 
                  className="inline-flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-bold px-4 py-2.5 rounded-full text-sm transition"
                >
                  <Phone className="w-4 h-4" /> Call Store
                </a>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    showToast("Store link copied!");
                  }} 
                  className="inline-flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-bold px-4 py-2.5 rounded-full text-sm transition"
                >
                  <Share2 className="w-4 h-4" /> Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Store Navigation & Product Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        <div className="bg-white rounded-3xl border border-[#EFE8DC] p-5 sm:p-6 shadow-sm mb-6 flex flex-col gap-5">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Filter Tabs */}
            <div className="inline-flex bg-[#F4EFE6] p-1.5 rounded-full gap-1 self-start sm:self-auto">
              <button 
                onClick={() => setActiveTab("all")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition ${activeTab === 'all' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <Grid className="w-3.5 h-3.5" /> All Products
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${activeTab === 'all' ? 'bg-orange-50 text-orange-600' : 'bg-gray-200 text-gray-600'}`}>
                  {store.products.length}
                </span>
              </button>

              <button 
                onClick={() => setActiveTab("deals")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition ${activeTab === 'deals' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <Flame className="w-3.5 h-3.5 text-orange-600" /> Best Deals
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${activeTab === 'deals' ? 'bg-orange-50 text-orange-600' : 'bg-gray-200 text-gray-600'}`}>
                  {dealsCount}
                </span>
              </button>

              <button 
                onClick={() => setActiveTab("new")}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition ${activeTab === 'new' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> New Arrivals
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${activeTab === 'new' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-200 text-gray-600'}`}>
                  {newCount}
                </span>
              </button>
            </div>

            {/* In-Store Product Search */}
            <div className="relative w-full md:w-80">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search in ${store.name}...`}
                className="w-full bg-[#F4EFE6] border border-[#E5DEC9] rounded-full py-2.5 pl-10 pr-10 text-sm focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Dynamic Store Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {store.categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-bold px-4 py-2 rounded-full whitespace-nowrap transition border ${
                  activeCategory === cat 
                    ? "bg-gray-900 border-gray-900 text-white shadow-sm" 
                    : "bg-white border-[#E5DEC9] text-gray-700 hover:border-orange-500 hover:text-orange-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Section Headline */}
        <div className="flex items-center justify-between mb-6 px-1">
          <h2 className="text-lg sm:text-xl font-extrabold text-gray-900">
            Showing <span className="text-orange-600">{filteredProducts.length}</span> products in {store.name}
          </h2>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl border-2 border-dashed border-[#E5DEC9] p-12 text-center max-w-lg mx-auto">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">No products found</h3>
            <p className="text-sm text-gray-500 mb-4">Try clearing your search query or selecting a different category.</p>
            <button 
              onClick={() => { setActiveTab("all"); setActiveCategory("All"); setSearchQuery(""); }}
              className="bg-gray-900 text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-gray-800 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlist.includes(product.id);
              const extraPct = product.extraDiscountPercent || 5;

              return (
                <div 
                  key={product.id} 
                  className="bg-white rounded-2xl border border-[#EFE8DC] overflow-hidden flex flex-col hover:shadow-xl hover:-translate-y-1 transition duration-200"
                >
                  {/* Product Visual */}
                  <div className="relative h-52 w-full bg-[#F4EFE6] overflow-hidden group">
                    <Image 
                      src={product.image} 
                      alt={product.name} 
                      fill 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition duration-300"
                    />
                    
                    <span className="absolute top-3 left-3 bg-gradient-to-r from-pink-600 to-orange-500 text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                      Extra {extraPct}% OFF Voucher
                    </span>

                    <button 
                      onClick={() => toggleWishlist(product.id)}
                      className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur transition shadow-sm ${
                        isWishlisted ? "bg-white text-pink-600" : "bg-white/80 text-gray-500 hover:bg-white hover:text-pink-600"
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-pink-600' : ''}`} />
                    </button>
                  </div>

                  {/* Product Body */}
                  <div className="p-5 flex-1 flex flex-col">
                    <span className="text-[11px] font-extrabold text-orange-600 uppercase tracking-wider mb-1">
                      {product.category}
                    </span>
                    
                    <h3 className="font-bold text-gray-900 text-base leading-snug line-clamp-2 mb-1.5" title={product.name}>
                      {product.name}
                    </h3>
                    
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-3">
                      {product.description}
                    </p>

                    {/* Extra off chip */}
                    <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-bold px-2.5 py-1 rounded-full mb-3 self-start">
                      <Sparkles className="w-3 h-3 text-orange-600" />
                      <span>Extra <strong>{extraPct}% OFF on MRP</strong> with Voucher</span>
                    </div>

                    <div className="mt-auto pt-2">
                      <div className="mb-2">
                        <div className="text-[11px] text-gray-400 font-medium">
                          MRP: <span className="line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-extrabold text-gray-900">
                            ₹{(product.finalVoucherPrice ?? product.discountedPrice).toLocaleString('en-IN')}
                          </span>
                          <span className="text-[11px] font-bold text-emerald-600">
                            with coupon
                          </span>
                          {product.discountedPrice !== product.originalPrice && (
                            <span className="text-xs text-gray-400 line-through ml-auto">
                              ₹{product.discountedPrice.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-[11px] text-amber-700 font-semibold flex items-center gap-1 mb-3">
                        <Clock className="w-3 h-3 text-amber-500" />
                        <span>{product.offerExpiry}</span>
                      </div>

                      <button 
                        onClick={() => setSelectedVoucherProduct(product)}
                        className="w-full bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-bold py-2.5 px-4 rounded-full text-xs shadow-md transition flex items-center justify-center gap-1.5"
                      >
                        <Tag className="w-3.5 h-3.5" /> Claim Extra {extraPct}% Voucher
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Product Voucher Modal (Extra 2-5% OFF on MRP) ─────────────── */}
      {selectedVoucherProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl animate-fade-in max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setSelectedVoucherProduct(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="bg-gradient-to-r from-pink-600 to-orange-500 text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                EXTRA {selectedVoucherProduct.extraDiscountPercent}% OFF ON MRP
              </span>
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Dealzy Exclusive In-Store Voucher
              </span>
            </div>

            <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-4">
              <Image 
                src={selectedVoucherProduct.image} 
                alt={selectedVoucherProduct.name} 
                fill 
                className="object-cover" 
              />
            </div>

            <h3 className="text-xl font-extrabold text-gray-900 mb-1">
              {selectedVoucherProduct.name}
            </h3>

            <div className="text-xs font-semibold text-gray-500 flex items-center gap-1.5 mb-4">
              <span>{store.name}</span> • <span>{store.location}</span>
            </div>

            {/* Price breakdown card */}
            <div className="bg-orange-50/70 border border-orange-200/80 rounded-2xl p-4 mb-4 text-xs space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Product MRP:</span>
                <span className="font-semibold line-through">₹{selectedVoucherProduct.originalPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>In-Store Base Price:</span>
                <span className="font-semibold">₹{selectedVoucherProduct.discountedPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-orange-700 font-bold border-t border-dashed border-orange-300 pt-2 pb-1">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Dealzy Voucher ({selectedVoucherProduct.extraDiscountPercent}% Extra on MRP):
                </span>
                <span className="text-emerald-700 font-extrabold">-₹{(selectedVoucherProduct.extraSavings ?? 0).toLocaleString('en-IN')} EXTRA OFF</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-orange-200 text-gray-900 font-bold text-sm">
                <span>You Pay In-Store:</span>
                <span className="text-2xl font-black text-orange-600">
                  ₹{(selectedVoucherProduct.finalVoucherPrice ?? selectedVoucherProduct.discountedPrice).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Voucher Coupon Box */}
            <div className="bg-amber-50 border-2 border-dashed border-amber-400 rounded-2xl p-4 text-center mb-4">
              <div className="text-[11px] font-extrabold text-amber-900 uppercase tracking-widest mb-1">
                GIVE THIS COUPON CODE TO SHOP OWNER FOR EXTRA OFF
              </div>
              <div className="font-mono text-2xl font-black text-orange-700 tracking-widest mb-1">
                {selectedVoucherProduct.voucherCode}
              </div>
              <div className="text-xs text-orange-700 font-semibold mb-3">
                Shop owner will deduct an extra {selectedVoucherProduct.extraDiscountPercent}% off on MRP at checkout!
              </div>
              <button 
                onClick={() => handleCopyCode(selectedVoucherProduct.voucherCode, selectedVoucherProduct.extraDiscountPercent)}
                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold transition shadow ${
                  copiedCode 
                    ? "bg-emerald-600 text-white" 
                    : "bg-orange-600 hover:bg-orange-700 text-white"
                }`}
              >
                {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedCode ? "✓ Copied to Clipboard!" : "Copy Coupon Code"}</span>
              </button>
            </div>

            {/* How to redeem */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5 text-xs text-gray-600 leading-relaxed mb-4">
              <strong className="text-gray-900 block mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                How to Get Your Extra Discount:
              </strong>
              <ol className="list-decimal list-inside space-y-1 text-gray-600">
                <li>Copy the coupon code above.</li>
                <li>Visit <strong>{store.name}</strong>.</li>
                <li>Show or give this code to the shop owner at checkout.</li>
                <li>The merchant applies your <strong>extra {selectedVoucherProduct.extraDiscountPercent}% off on the MRP</strong> to your bill!</li>
              </ol>
            </div>

            <div className="text-xs text-gray-500 mb-5 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
              <span>Valid in-store at: {store.address}</span>
            </div>

            <a 
              href={mapsUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-gray-900 hover:bg-black text-white text-xs font-bold py-3 px-4 rounded-full flex items-center justify-center gap-2 transition"
            >
              <NavIcon className="w-4 h-4" /> Get Store Directions
            </a>
          </div>
        </div>
      )}

    </div>
  );
}
