"use client";

import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/data/mock";
import { Trash2, Plus, Minus, ShieldCheck } from "lucide-react";

export default function Cart() {
  const cartItems = PRODUCTS.slice(0, 2); // Using first 2 mock products as cart items

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">Your Cart (2 Items)</h1>
      
      <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 mb-4">
            <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-4">Dealzy Store Items</h2>
            <div className="flex flex-col gap-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 line-clamp-2 mb-1 text-sm md:text-base">{item.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">₹{item.price}</span>
                        <span className="text-xs text-gray-400 line-through">₹{item.mrp}</span>
                        <span className="text-xs font-bold text-green-600">{item.discount} OFF</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-gray-200 rounded-md">
                        <button className="p-1 hover:bg-gray-50 text-gray-500"><Minus className="w-4 h-4" /></button>
                        <span className="px-3 text-sm font-medium">1</span>
                        <button className="p-1 hover:bg-gray-50 text-gray-500"><Plus className="w-4 h-4" /></button>
                      </div>
                      <button className="text-red-500 text-sm font-medium hover:text-red-600 flex items-center gap-1">
                        <Trash2 className="w-4 h-4" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-80">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm text-gray-600 mb-4">
              <div className="flex justify-between">
                <span>Items Total</span>
                <span className="font-medium text-gray-900">₹3,798</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-₹1,118</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="text-green-600">Free</span>
              </div>
            </div>
            <div className="border-t border-dashed border-gray-200 pt-4 mb-4">
              <div className="flex justify-between items-end">
                <span className="font-bold text-gray-900">Total Amount</span>
                <span className="text-xl font-bold text-gray-900">₹2,680</span>
              </div>
              <p className="text-xs text-green-600 font-medium text-right mt-1">You will save ₹1,118 on this order</p>
            </div>
            
            <Link href="/checkout" className="w-full bg-green-700 hover:bg-green-800 text-white font-medium py-3 rounded-lg flex items-center justify-center transition">
              Proceed to Checkout
            </Link>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              <span>Safe and Secure Payments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
