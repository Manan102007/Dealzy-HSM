"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid, Tag, ShoppingCart, User, Search, MapPin, Bell } from "lucide-react";
import { useState } from "react";

export function Navigation() {
  const pathname = usePathname();
  const [location, setLocation] = useState("Chandigarh");

  const bottomNavItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Categories", href: "/categories", icon: Grid },
    { name: "Deals", href: "/deals", icon: Tag },
    { name: "Cart", href: "/cart", icon: ShoppingCart },
    { name: "Profile", href: "/profile", icon: User },
  ];

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:flex sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-4 items-center gap-6 shadow-sm">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center">
            <Tag className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold text-green-900 tracking-tight">Dealzy</span>
        </Link>
        
        <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full cursor-pointer hover:bg-gray-100">
          <MapPin className="w-4 h-4 text-green-700" />
          <select 
            className="bg-transparent outline-none cursor-pointer"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option>Chandigarh</option>
            <option>Mohali</option>
            <option>Zirakpur</option>
          </select>
        </div>

        <div className="flex-1 max-w-2xl relative">
          <input 
            type="text" 
            placeholder="Search products, stores, deals..." 
            className="w-full bg-gray-100 border-none rounded-full py-2.5 pl-11 pr-4 focus:ring-2 focus:ring-green-500 outline-none"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-2.5" />
        </div>

        <nav className="flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link href="/deals" className="hover:text-green-700 transition">Deals</Link>
          <Link href="/stores" className="hover:text-green-700 transition">Stores</Link>
          <Link href="/shop" className="hover:text-green-700 transition">Utensils</Link>
        </nav>

        <div className="flex items-center gap-5">
          <Link href="/cart" className="relative text-gray-700 hover:text-green-700 transition">
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">2</span>
          </Link>
          <Link href="/profile" className="text-gray-700 hover:text-green-700 transition">
            <User className="w-6 h-6" />
          </Link>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3 shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-green-700 rounded-lg flex items-center justify-center">
              <Tag className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-green-900 tracking-tight">Dealzy</span>
          </Link>
          <div className="flex items-center gap-4">
            <Bell className="w-6 h-6 text-gray-600" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded-full border border-gray-100">
            <MapPin className="w-3 h-3 text-green-700" />
            <span className="truncate max-w-[80px]">{location}</span>
          </div>
          <div className="flex-1 relative">
            <input 
              type="text" 
              placeholder="Search deals..." 
              className="w-full bg-gray-100 border-none rounded-full py-2 pl-9 pr-3 text-sm focus:ring-2 focus:ring-green-500 outline-none"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2" />
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-200 flex items-center justify-around py-2 px-2 z-50 pb-safe shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex flex-col items-center gap-1 p-2 min-w-[64px] ${isActive ? 'text-green-700' : 'text-gray-500'}`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'fill-green-50 stroke-green-700' : ''}`} />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
