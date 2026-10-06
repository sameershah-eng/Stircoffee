import React, { useState } from 'react';
import { Menu, X, Coffee, Clock, MapPin, ShoppingBag } from 'lucide-react';
import { SHOP_INFO } from '../data/coffeeData';

interface NavbarProps {
  onOpenOrderModal: () => void;
  isOpenNow: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenOrderModal, isOpenNow }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'World Roasters', href: '#roasters' },
    { label: 'Menu', href: '#menu' },
    { label: 'Stir Lates', href: '#lates' },
    { label: 'Stamp Pass', href: '#passport' },
    { label: 'Flavor Match', href: '#flavor-match' },
    { label: 'Visit', href: '#visit' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-stone-50/90 backdrop-blur-md border-b border-stone-200/70 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single element wordmark (Display face) */}
        <a
          href="#"
          className="text-xl sm:text-2xl font-extrabold tracking-tight text-stone-900 font-display flex items-center gap-2 group whitespace-nowrap"
        >
          <span className="tracking-wider uppercase">STIR COFFEE</span>
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-700 font-sans hidden sm:inline">
            · BRIXTON
          </span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="hover:text-stone-950 transition-colors whitespace-nowrap py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-stone-900 hover:after:w-full after:transition-all after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-stone-200 text-xs font-medium text-stone-700 shadow-2xs">
            <span
              className={`w-2 h-2 rounded-full ${
                isOpenNow ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
              }`}
            />
            <span>{isOpenNow ? 'Open in Brixton' : 'Opens 7:30 AM'}</span>
          </div>

          <button
            onClick={onOpenOrderModal}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors shadow-xs whitespace-nowrap"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Reserve Beans</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-700 hover:text-stone-900 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-stone-50 border-b border-stone-200 px-5 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="flex items-center gap-2 text-xs text-stone-500 pb-2 border-b border-stone-200">
            <MapPin className="w-3.5 h-3.5 text-amber-700" />
            <span>111 Brixton Hill, London SW2 1AA</span>
          </div>
          <div className="grid grid-cols-1 gap-2 pt-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-base font-medium text-stone-800 hover:text-amber-800 py-2 px-2 rounded-md hover:bg-stone-100 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrderModal();
              }}
              className="w-full py-2.5 text-center text-sm font-semibold text-white bg-stone-900 rounded-lg shadow-sm"
            >
              Reserve Roasted Beans
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
