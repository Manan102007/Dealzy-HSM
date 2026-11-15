"use client";

import Image from "next/image";
import { PRODUCTS } from "@/data/mock";
import { Star, Filter, ArrowUpDown } from "lucide-react";

export default function Shop() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Shop Quality Utensils</h1>
          <p className="text-gray-500 mt-1">Directly from Dealzy to your kitchen.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
            <Filter className="w-4 h-4" /> Filters
          </button>
          <button className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
            <ArrowUpDown className="w-4 h-4" /> Sort
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {PRODUCTS.map(product => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition flex flex-col">
            <div className="relative h-48 md:h-56">
              <Image src={product.image} alt={product.name} fill className="object-cover" />
              <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
                {product.discount} OFF
              </div>
            </div>
            <div className="p-4 flex flex-col flex-1">
              <span className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wider">{product.category}</span>
              <h3 className="font-medium text-gray-900 line-clamp-2 mb-2">{product.name}</h3>
              <div className="mt-auto">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                  <span className="text-xs text-gray-400">({product.reviews})</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
                  <span className="text-sm text-gray-400 line-through">₹{product.mrp}</span>
                </div>
                <p className="text-xs text-green-700 font-medium mb-4">{product.delivery}</p>
                <button className="w-full bg-green-700 hover:bg-green-800 text-white font-medium py-2.5 rounded-lg transition">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
