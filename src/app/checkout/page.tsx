"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, CreditCard, Banknote } from "lucide-react";

export default function Checkout() {
  const [step, setStep] = useState(1);
  const [payment, setPayment] = useState("upi");
  const [orderId] = useState(() => Math.floor(10000 + Math.random() * 90000));

  if (step === 3) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-gray-600 mb-8">Your order #DLZ-{orderId} has been placed successfully.</p>
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 text-left">
          <p className="font-medium text-gray-900 mb-2">Delivery to:</p>
          <p className="text-sm text-gray-600">Rahul Sharma<br/>#142, Sector 22B<br/>Chandigarh, 160022</p>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600">Estimated Delivery</p>
            <p className="font-medium text-gray-900">Tomorrow by 8 PM</p>
          </div>
        </div>
        <Link href="/" className="bg-green-700 hover:bg-green-800 text-white font-medium py-3 px-8 rounded-lg inline-block transition">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          {/* Step 1: Address */}
          <div className={`bg-white rounded-xl border ${step === 1 ? 'border-green-500 ring-1 ring-green-500' : 'border-gray-200'} p-6 transition-all`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <span className="bg-gray-100 text-gray-700 w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
                Delivery Address
              </h2>
              {step > 1 && <button onClick={() => setStep(1)} className="text-green-600 text-sm font-medium">Edit</button>}
            </div>
            
            {step === 1 ? (
              <div className="space-y-4">
                <div className="border border-green-200 bg-green-50 rounded-lg p-4 cursor-pointer relative">
                  <div className="absolute top-4 right-4 w-4 h-4 rounded-full border-4 border-green-600"></div>
                  <p className="font-bold text-gray-900">Rahul Sharma <span className="bg-gray-200 text-xs px-2 py-0.5 rounded ml-2 font-normal">Home</span></p>
                  <p className="text-sm text-gray-600 mt-1">#142, Sector 22B<br/>Chandigarh, 160022<br/>Ph: +91 9876543210</p>
                </div>
                <button className="text-green-700 font-medium text-sm flex items-center gap-1">
                  + Add New Address
                </button>
                <button onClick={() => setStep(2)} className="w-full bg-green-700 hover:bg-green-800 text-white font-medium py-3 rounded-lg mt-4 transition">
                  Deliver Here
                </button>
              </div>
            ) : (
              <div className="text-sm text-gray-600">
                <p><span className="font-medium text-gray-900">Rahul Sharma</span> • #142, Sector 22B, Chandigarh</p>
              </div>
            )}
          </div>

          {/* Step 2: Payment */}
          <div className={`bg-white rounded-xl border ${step === 2 ? 'border-green-500 ring-1 ring-green-500' : 'border-gray-200'} p-6 transition-all opacity-${step >= 2 ? '100' : '50'}`}>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
              <span className="bg-gray-100 text-gray-700 w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
              Payment Method
            </h2>
            
            {step === 2 && (
              <div className="space-y-3">
                <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer ${payment === 'upi' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <input type="radio" name="payment" checked={payment === 'upi'} onChange={() => setPayment('upi')} className="w-4 h-4 text-green-600 focus:ring-green-500" />
                  <span className="font-medium text-gray-900 flex-1">UPI (Google Pay, PhonePe, Paytm)</span>
                  <Banknote className="w-5 h-5 text-gray-400" />
                </label>
                <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer ${payment === 'card' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <input type="radio" name="payment" checked={payment === 'card'} onChange={() => setPayment('card')} className="w-4 h-4 text-green-600 focus:ring-green-500" />
                  <span className="font-medium text-gray-900 flex-1">Credit / Debit Card</span>
                  <CreditCard className="w-5 h-5 text-gray-400" />
                </label>
                <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer ${payment === 'cod' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <input type="radio" name="payment" checked={payment === 'cod'} onChange={() => setPayment('cod')} className="w-4 h-4 text-green-600 focus:ring-green-500" />
                  <span className="font-medium text-gray-900 flex-1">Cash on Delivery</span>
                  <Banknote className="w-5 h-5 text-gray-400" />
                </label>
              </div>
            )}
          </div>
        </div>

        <div className="w-full lg:w-80">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Price Details</h2>
            <div className="space-y-3 text-sm text-gray-600 mb-4">
              <div className="flex justify-between">
                <span>Total MRP</span>
                <span>₹3,798</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Discount on MRP</span>
                <span>-₹1,118</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span className="text-green-600">Free</span>
              </div>
            </div>
            <div className="border-t border-dashed border-gray-200 pt-4 mb-6">
              <div className="flex justify-between items-end">
                <span className="font-bold text-gray-900">Amount Payable</span>
                <span className="text-xl font-bold text-gray-900">₹2,680</span>
              </div>
            </div>
            
            <button 
              disabled={step < 2}
              onClick={() => setStep(3)} 
              className="w-full bg-green-700 hover:bg-green-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition"
            >
              Pay ₹2,680
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
