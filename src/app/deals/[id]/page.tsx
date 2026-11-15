"use client";

import Image from "next/image";
import Link from "next/link";
import { DEALS } from "@/data/mock";
import { MapPin, Star, Clock, ShieldCheck, Share2 } from "lucide-react";
import { use } from "react";

export default function DealDetails({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const deal = DEALS.find(d => d.id === resolvedParams.id) || DEALS[0];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12 bg-white rounded-2xl p-4 md:p-8 shadow-sm border border-gray-100">
        <div className="w-full md:w-1/2">
          <div className="relative h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden border border-gray-100">
            <Image src={deal.image} alt={deal.title} fill className="object-cover" />
            <div className="absolute top-4 left-4 bg-orange-500 text-white font-bold px-3 py-1.5 rounded-lg text-sm shadow-md">
              {deal.discount} OFF
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-green-100 text-green-800 text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wide">Verified Deal</span>
            <div className="flex items-center gap-1 text-sm text-gray-500 font-medium">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-500" />
              {deal.rating}
            </div>
          </div>
          
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">{deal.title}</h1>
          
          <div className="flex items-end gap-3 mb-6">
            <span className="text-4xl font-extrabold text-gray-900">₹{deal.offerPrice}</span>
            <span className="text-xl text-gray-400 line-through mb-1">₹{deal.originalPrice}</span>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 mb-8 border border-gray-100 space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
              <div>
                <Link href={`/store/${deal.storeId}`} className="font-semibold text-gray-900 hover:text-green-700 hover:underline inline-block">
                  {deal.storeName}
                </Link>
                <p className="text-sm text-gray-600 mt-0.5">{deal.distance} away from your location</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-orange-500 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">Limited Time Offer</p>
                <p className="text-sm text-orange-600 mt-0.5">{deal.validity}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-green-700 hover:bg-green-800 text-white font-medium py-3.5 px-6 rounded-xl text-lg transition flex items-center justify-center gap-2">
              Claim this Deal
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3.5 px-6 rounded-xl transition flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
          
          <div className="mt-6 flex items-center gap-2 text-sm text-gray-500 justify-center sm:justify-start">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            <span>Show this deal at the store to claim.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
