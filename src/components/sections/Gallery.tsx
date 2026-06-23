"use client"

import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function GallerySection() {
  const images = PlaceHolderImages.filter(img => img.id.startsWith('vintage-kitchen'));

  return (
    <section id="gallery" className="py-24 px-6 md:px-12 bg-background relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 space-y-8">
            <span className="font-body uppercase tracking-[0.4em] text-primary text-xs">The Culinary Odyssey</span>
            <h2 className="font-headline text-5xl md:text-7xl leading-tight">A Century of <br/> <span className="text-primary italic">Craftsmanship</span></h2>
            <p className="font-body text-lg text-foreground/60 leading-relaxed">
              Before the modern era, our kitchens hummed with the sound of manual stone grinders 
              and the soft hiss of brass steamers. We maintain these antique rhythms today, 
              ensuring every bite carries the weight of a hundred years.
            </p>
            <div className="pt-8">
              <div className="w-32 h-px bg-primary/40" />
            </div>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 gap-4">
            <div className="space-y-4 pt-12">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg group">
                <Image 
                  src={images[0]?.imageUrl || ''} 
                  alt={images[0]?.description || ''} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  data-ai-hint="vintage brass cookware"
                />
                <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg group">
                <Image 
                  src={images[1]?.imageUrl || ''} 
                  alt={images[1]?.description || ''} 
                  fill 
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  data-ai-hint="traditional stone grinder"
                />
                <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <div className="bg-primary/5 p-8 rounded-lg border border-primary/10">
                <h4 className="font-headline text-2xl mb-4 text-primary">Artisanal Roots</h4>
                <p className="text-sm opacity-70 italic">"Our stone-ground batter ferments for exactly 14 hours in earthen pots."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}