"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, UtensilsCrossed } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-6 px-6 md:px-12",
      isScrolled ? "bg-background/95 backdrop-blur-md py-4 border-b border-primary/20" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-3">
          <UtensilsCrossed className="w-8 h-8 text-primary group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-headline text-2xl tracking-widest text-primary uppercase">Dravida Heritage</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12">
          {['Menu', 'Gallery', 'Concierge', 'Reservations'].map((item) => (
            <Link 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="font-body text-sm uppercase tracking-widest text-foreground/70 hover:text-primary transition-colors duration-300"
            >
              {item}
            </Link>
          ))}
          <Link 
            href="#reservations" 
            className="px-6 py-2 bg-primary text-background font-bold uppercase text-xs tracking-widest hover:bg-accent hover:text-white transition-all duration-300"
          >
            Book Table
          </Link>
        </div>

        {/* Mobile Trigger */}
        <button 
          className="md:hidden text-primary"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 bg-background/98 z-40 md:hidden flex flex-col items-center justify-center gap-8 transition-transform duration-500",
        isMenuOpen ? "translate-y-0" : "-translate-y-full"
      )}>
        {['Menu', 'Gallery', 'Concierge', 'Reservations'].map((item) => (
          <Link 
            key={item} 
            href={`#${item.toLowerCase()}`}
            onClick={() => setIsMenuOpen(false)}
            className="font-headline text-4xl text-foreground hover:text-primary transition-colors"
          >
            {item}
          </Link>
        ))}
      </div>
    </nav>
  );
}