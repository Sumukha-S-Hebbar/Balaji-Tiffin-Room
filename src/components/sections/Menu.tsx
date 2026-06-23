"use client"

import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';

const MENU_ITEMS = [
  {
    id: 'dosa',
    name: 'The Golden Paper Dosa',
    price: '₹450',
    description: 'A 24-inch ghee-roasted thin crepe served with artisanal coconut-ginger chutney and heritage sambar.',
    imageId: 'dosa-visual'
  },
  {
    id: 'idly',
    name: 'Kanchipuram Silk Idly',
    price: '₹380',
    description: 'Traditional steamed rice cakes infused with crushed pepper, ginger, and curry leaves in brass vessels.',
    imageId: 'idly-visual'
  },
  {
    id: 'vada',
    name: 'Black Pepper Medu Vada',
    price: '₹320',
    description: 'Crispy lentil doughnuts with a soft, airy center, stone-ground with whole black peppercorns.',
    imageId: 'vada-visual'
  }
];

export function MenuSection() {
  return (
    <section id="menu" className="py-24 px-6 md:px-12 bg-card/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="font-headline text-5xl md:text-6xl text-primary mb-4">Signature Offerings</h2>
          <div className="w-24 h-1 bg-primary/30 mx-auto" />
        </div>

        <div className="space-y-32">
          {MENU_ITEMS.map((item, idx) => {
            const img = PlaceHolderImages.find(p => p.id === item.imageId);
            const isEven = idx % 2 === 0;

            return (
              <div 
                key={item.id} 
                className={cn(
                  "flex flex-col md:flex-row items-center gap-12 md:gap-24",
                  !isEven && "md:flex-row-reverse"
                )}
              >
                {/* Image Side */}
                <div className="w-full md:w-1/2 relative group">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-2xl">
                    <Image 
                      src={img?.imageUrl || ''} 
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      data-ai-hint={img?.imageHint}
                    />
                    <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                  {/* Floating badge */}
                  <div className={cn(
                    "absolute top-8 p-6 bg-background/90 backdrop-blur-md border border-primary/20 shadow-xl",
                    isEven ? "-right-6" : "-left-6"
                  )}>
                    <span className="font-headline text-3xl text-primary">{item.price}</span>
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full md:w-1/2 space-y-6">
                  <span className="font-body uppercase tracking-widest text-primary/60 text-sm">Traditional Gourmet</span>
                  <h3 className="font-headline text-4xl md:text-5xl leading-tight">{item.name}</h3>
                  <p className="font-body text-lg text-foreground/70 leading-relaxed italic">
                    "{item.description}"
                  </p>
                  <div className="pt-8">
                    <button className="px-8 py-3 border border-primary text-primary font-bold uppercase tracking-widest hover:bg-primary hover:text-background transition-all duration-300">
                      Learn Heritage
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}