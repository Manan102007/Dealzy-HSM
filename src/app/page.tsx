"use client";

import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, DEALS, STORES, PRODUCTS } from "@/data/mock";
import { MapPin, Star, Clock, ArrowRight, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="pb-8">
      {/* Hero Section */}
      <section className="bg-green-50 pt-8 pb-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-green-950 leading-tight">
              Big Deals. <br className="hidden md:block"/>
              <span className="text-green-700">Right Around You.</span>
            </h1>
            <p className="text-lg text-gray-700 max-w-md">
              Discover nearby stores, local offers and quality products—all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/deals" className="bg-green-700 hover:bg-green-800 text-white font-medium py-3 px-6 rounded-lg text-center transition">
                Explore Nearby Deals
              </Link>
              <Link href="/shop" className="bg-white border-2 border-green-700 text-green-700 hover:bg-green-50 font-medium py-3 px-6 rounded-lg text-center transition">
                Shop Quality Utensils
              </Link>
            </div>
          </div>
          <div className="flex-1 relative w-full h-[300px] md:h-[400px]">
            <Image 
              src="/hero.jpg" 
              alt="Local shopping experience" 
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded-2xl shadow-xl"
            />
            <div className="absolute -bottom-4 -left-4 bg-white p-3 rounded-xl shadow-lg border border-gray-100 flex items-center gap-3 animate-bounce">
              <div className="bg-orange-100 p-2 rounded-full">
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">New Deal at</p>
                <p className="text-sm font-bold text-gray-900">Sharma Kitchen</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Categories */}
      <section className="max-w-6xl mx-auto px-4 mt-12">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Explore Categories</h2>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {CATEGORIES.map((cat, i) => (
            <Link href={`/category/${cat.toLowerCase()}`} key={i} className="flex flex-col items-center gap-2 group">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full shadow-sm border border-gray-100 flex items-center justify-center group-hover:shadow-md transition group-hover:border-green-200">
                {/* Randomly colored placeholder icon for now */}
                <div className="w-8 h-8 rounded bg-gradient-to-br from-green-100 to-green-200"></div>
              </div>
              <span className="text-xs md:text-sm font-medium text-gray-700 text-center">{cat}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Deals Near You */}
      <section className="max-w-6xl mx-auto px-4 mt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Deals Near Chandigarh</h2>
          <Link href="/deals" className="text-green-700 font-medium text-sm flex items-center gap-1 hover:underline">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEALS.map(deal => (
            <div key={deal.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
              <div className="relative h-48">
                <Image src={deal.image} alt={deal.title} fill className="object-cover" />
                <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                  {deal.discount} OFF
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1 truncate">{deal.title}</h3>
                <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{deal.storeName} • {deal.distance}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-gray-900">₹{deal.offerPrice}</span>
                    <span className="text-sm text-gray-400 line-through ml-2">₹{deal.originalPrice}</span>
                  </div>
                  <Link href={`/deals/${deal.id}`} className="bg-green-50 text-green-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-100 transition">
                    View Deal
                  </Link>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span>{deal.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-orange-600">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{deal.validity}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shop Quality Utensils (Dealzy Store) */}
      <section className="max-w-6xl mx-auto px-4 mt-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Shop Quality Utensils</h2>
            <p className="text-sm text-gray-500 mt-1">Order directly from Dealzy. Delivered to your doorstep.</p>
          </div>
          <Link href="/shop" className="text-green-700 font-medium text-sm flex items-center gap-1 hover:underline">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {PRODUCTS.map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition flex flex-col">
              <div className="relative h-40 md:h-48">
                <Image src={product.image} alt={product.name} fill className="object-cover" />
                <div className="absolute top-2 left-2 bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                  {product.discount} OFF
                </div>
              </div>
              <div className="p-3 md:p-4 flex flex-col flex-1">
                <h3 className="font-medium text-gray-900 text-sm md:text-base line-clamp-2 mb-2">{product.name}</h3>
                <div className="mt-auto">
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium text-gray-700">{product.rating}</span>
                    <span className="text-xs text-gray-400">({product.reviews})</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-base md:text-lg font-bold text-gray-900">₹{product.price}</span>
                    <span className="text-xs text-gray-400 line-through">₹{product.mrp}</span>
                  </div>
                  <button className="w-full bg-green-700 hover:bg-green-800 text-white text-sm font-medium py-2 rounded-lg transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trusted Stores Near You */}
      <section className="max-w-6xl mx-auto px-4 mt-16 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Trusted Stores Near You</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STORES.map(store => (
            <div key={store.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex gap-4 hover:shadow-md transition">
              <div className="w-24 h-24 relative rounded-lg overflow-hidden shrink-0">
                <Image src={store.image} alt={store.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-bold text-gray-900">{store.name}</h3>
                  {store.isOpen && (
                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">Open</span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span>{store.rating} ({store.reviews})</span>
                  <span className="mx-1">•</span>
                  <span>{store.distance}</span>
                </div>
                <p className="text-xs text-gray-500 mb-3 truncate">{store.address}</p>
                <Link href={`/store/${store.id}`} className="text-sm font-medium text-green-700 hover:underline">
                  View Store
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
