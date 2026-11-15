"use client";

import Image from "next/image";
import Link from "next/link";
import { DEALS } from "@/data/mock";
import { MapPin, Star, Clock, Filter, ArrowUpDown } from "lucide-react";

export default function Deals() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Top Deals Near You</h1>
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-600 bg-gray-100 w-fit px-3 py-1.5 rounded-full">
            <MapPin className="w-4 h-4 text-green-700" />
            <span>Showing deals near <strong>Chandigarh</strong></span>
          </div>
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

      <div className="flex overflow-x-auto pb-4 gap-2 mb-6 no-scrollbar">
        {["All Categories", "Utensils", "Clothing", "Footwear", "Home Appliances", "Electronics"].map((cat, i) => (
          <button key={i} className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition ${i === 0 ? 'bg-green-700 text-white' : 'bg-white border border-gray-200 text-gray-700 hover:border-green-500'}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DEALS.map(deal => (
          <div key={deal.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
            <div className="relative h-48 md:h-56">
              <Image src={deal.image} alt={deal.title} fill className="object-cover" />
              <div className="absolute top-3 left-3 bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded">
                {deal.discount} OFF
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1">{deal.title}</h3>
              <div className="flex items-center gap-1.5 text-sm text-gray-600 mb-4 bg-gray-50 p-2 rounded-lg">
                <MapPin className="w-4 h-4 text-green-700" />
                <span className="font-medium text-gray-800">{deal.storeName}</span>
                <span className="text-gray-400 mx-1">•</span>
                <span>{deal.distance} away</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-2xl font-bold text-gray-900">₹{deal.offerPrice}</span>
                  <span className="text-sm text-gray-400 line-through ml-2">₹{deal.originalPrice}</span>
                </div>
                <Link href={`/deals/${deal.id}`} className="bg-green-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-green-800 transition">
                  Claim Deal
                </Link>
              </div>
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-medium text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-gray-700">{deal.rating} Rating</span>
                </div>
                <div className="flex items-center gap-1.5 text-orange-600 bg-orange-50 px-2 py-1 rounded">
                  <Clock className="w-4 h-4" />
                  <span>{deal.validity}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
