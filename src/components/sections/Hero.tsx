"use client"

import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Hero() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-bg');

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax-like effect */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={heroImg?.imageUrl || ''} 
          alt={heroImg?.description || ''}
          fill
          className="object-cover scale-105"
          priority
          data-ai-hint="south indian food luxury"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div className="inline-block overflow-hidden mb-6">
          <span className="block text-primary font-body uppercase tracking-[0.5em] text-xs animate-fade-in [animation-delay:0.2s] opacity-0">
            Est. 1924 • Traditional Fine Dining
          </span>
        </div>
        
        <h1 className="font-headline text-6xl md:text-9xl text-foreground mb-8 leading-tight">
          <span className="block animate-fade-in [animation-delay:0.4s] opacity-0">Savour The</span>
          <span className="block text-primary animate-fade-in [animation-delay:0.6s] opacity-0">Ancient Soul</span>
        </h1>

        <div className="max-w-2xl mx-auto animate-fade-in [animation-delay:0.8s] opacity-0">
          <p className="font-body text-lg md:text-xl text-foreground/70 mb-12 leading-relaxed">
            Experience the curated heritage of South India through our artisan Idlys, 
            Dosas, and Vadas—crafted with centuries-old fermentation secrets.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="#menu" 
              className="group relative px-10 py-4 bg-primary text-background font-bold uppercase tracking-widest overflow-hidden transition-all duration-300 hover:bg-accent hover:text-white"
            >
              Explore Menu
            </a>
            <a 
              href="#reservations" 
              className="px-10 py-4 border border-primary/50 text-primary font-bold uppercase tracking-widest hover:border-primary hover:bg-primary/5 transition-all duration-300"
            >
              The Experience
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
}