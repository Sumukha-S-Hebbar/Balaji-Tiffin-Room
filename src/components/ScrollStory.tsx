
"use client"

import React, { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PlaceHolderImages } from '@/lib/placeholder-images';

gsap.registerPlugin(ScrollTrigger);

export function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dosaRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const section4Ref = useRef<HTMLDivElement>(null);
  const potatoRef = useRef<HTMLDivElement>(null);
  const chutneyRef = useRef<HTMLDivElement>(null);
  const sambarRef = useRef<HTMLDivElement>(null);

  const images = {
    dosa: PlaceHolderImages.find(i => i.id === 'hero-dosa'),
    potato: PlaceHolderImages.find(i => i.id === 'potato-filling'),
    chutney: PlaceHolderImages.find(i => i.id === 'chutney-side'),
    sambar: PlaceHolderImages.find(i => i.id === 'sambar-side'),
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Pinning the Dosa Container
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: dosaRef.current,
        scrub: true,
      });

      // Section 1: Hero Fade Out
      gsap.to(section1Ref.current, {
        scrollTrigger: {
          trigger: section1Ref.current,
          start: "center center",
          end: "bottom top",
          scrub: true,
        },
        opacity: 0,
        y: -100,
      });

      // Section 2: Golden Crisp (Text Left)
      gsap.fromTo(section2Ref.current, 
        { opacity: 0, x: -100 },
        {
          opacity: 1, x: 0,
          scrollTrigger: {
            trigger: section2Ref.current,
            start: "top center",
            end: "center center",
            scrub: true,
          }
        }
      );
      gsap.to(section2Ref.current, {
        opacity: 0, x: -100,
        scrollTrigger: {
          trigger: section2Ref.current,
          start: "center top",
          end: "bottom top",
          scrub: true,
        }
      });

      // Section 3: Spiced Heart (Text Right + Potato)
      gsap.fromTo(section3Ref.current,
        { opacity: 0, x: 100 },
        {
          opacity: 1, x: 0,
          scrollTrigger: {
            trigger: section3Ref.current,
            start: "top center",
            end: "center center",
            scrub: true,
          }
        }
      );
      gsap.fromTo(potatoRef.current,
        { opacity: 0, x: 200, rotate: 45 },
        {
          opacity: 1, x: 0, rotate: 0,
          scrollTrigger: {
            trigger: section3Ref.current,
            start: "top center",
            end: "center center",
            scrub: true,
          }
        }
      );
      gsap.to([section3Ref.current, potatoRef.current], {
        opacity: 0, x: 100,
        scrollTrigger: {
          trigger: section3Ref.current,
          start: "center top",
          end: "bottom top",
          scrub: true,
        }
      });

      // Section 4: Accompaniments (Flank Dosa)
      gsap.fromTo([chutneyRef.current, sambarRef.current],
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1, scale: 1,
          scrollTrigger: {
            trigger: section4Ref.current,
            start: "top center",
            end: "center center",
            scrub: true,
          }
        }
      );
      
      // BG Color Transition
      gsap.to(containerRef.current, {
        backgroundColor: "#EFEBE9", // Warm Sepia shift
        scrollTrigger: {
          trigger: section4Ref.current,
          start: "top center",
          end: "bottom bottom",
          scrub: true,
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-[400vh] bg-background">
      {/* Pinned Asset Layer */}
      <div ref={dosaRef} className="fixed inset-0 flex items-center justify-center pointer-events-none z-20">
        <div className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] flex items-center justify-center">
          {/* Main Dosa */}
          <div className="relative w-full h-full dosa-shadow rounded-full overflow-hidden border-4 border-white/50">
            <Image 
              src={images.dosa?.imageUrl || ''} 
              alt="The Udupi Masterpiece" 
              fill 
              className="object-cover"
              priority
            />
          </div>

          {/* Sliding Graphics */}
          <div ref={potatoRef} className="absolute -right-24 top-0 w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden shadow-xl border-4 border-white/80 opacity-0">
             <Image src={images.potato?.imageUrl || ''} alt="Potato Filling" fill className="object-cover" />
          </div>
          
          <div ref={chutneyRef} className="absolute -left-32 bottom-0 w-24 h-24 md:w-40 md:h-40 rounded-full overflow-hidden shadow-xl border-4 border-white/80 opacity-0">
             <Image src={images.chutney?.imageUrl || ''} alt="Chutney" fill className="object-cover" />
          </div>

          <div ref={sambarRef} className="absolute -right-32 bottom-0 w-24 h-24 md:w-40 md:h-40 rounded-full overflow-hidden shadow-xl border-4 border-white/80 opacity-0">
             <Image src={images.sambar?.imageUrl || ''} alt="Sambar" fill className="object-cover" />
          </div>
        </div>
      </div>

      {/* Narrative Sections */}
      
      {/* 1. Hero */}
      <section ref={section1Ref} className="relative h-screen flex flex-col items-center justify-center text-center px-6 z-10">
        <span className="font-display italic text-lg md:text-2xl mb-4 opacity-60">Karnataka's Culinary Jewel</span>
        <h1 className="font-headline text-6xl md:text-9xl uppercase tracking-tighter leading-none mb-6">
          The Udupi <br/> Masterpiece
        </h1>
        <p className="font-body text-sm uppercase tracking-[0.5em] opacity-40">Scroll to Deconstruct</p>
      </section>

      {/* 2. The Golden Crisp */}
      <section ref={section2Ref} className="relative h-screen flex items-center justify-start px-6 md:px-24 z-10">
        <div className="max-w-md space-y-6">
          <h2 className="font-headline text-5xl md:text-7xl">The Golden <br/> Crisp</h2>
          <p className="font-body text-lg md:text-xl text-foreground/80 leading-relaxed">
            Crafted from a 14-hour fermented symphony of stone-ground rice and black lentils. 
            The result? A lace-thin crust that shatters like glass, revealing the warmth within.
          </p>
          <div className="w-16 h-px bg-foreground/20" />
        </div>
      </section>

      {/* 3. The Spiced Heart */}
      <section ref={section3Ref} className="relative h-screen flex items-center justify-end px-6 md:px-24 z-10">
        <div className="max-w-md space-y-6 text-right">
          <h2 className="font-headline text-5xl md:text-7xl">The Spiced <br/> Heart</h2>
          <p className="font-body text-lg md:text-xl text-foreground/80 leading-relaxed">
            Beneath the golden exterior lies the "Potato Palya"—a hand-mashed medley of turmeric, 
            fresh curry leaves, and toasted mustard seeds.
          </p>
          <div className="w-16 h-px bg-foreground/20 ml-auto" />
        </div>
      </section>

      {/* 4. The Accompaniments */}
      <section ref={section4Ref} className="relative h-screen flex flex-col items-center justify-end pb-32 px-6 z-10">
        <div className="max-w-2xl text-center space-y-8">
          <h2 className="font-headline text-5xl md:text-7xl">The Trinity</h2>
          <p className="font-body text-lg md:text-xl text-foreground/80 leading-relaxed italic">
            "No masterpiece is complete without its echoes."
          </p>
          <p className="font-body text-sm md:text-base opacity-70 max-w-lg mx-auto">
            Cool coconut chutney meets the steaming, tamarind-infused tang of heritage sambar. 
            A century-old ritual, served on a single plate.
          </p>
          <div className="pt-12">
            <button className="px-12 py-4 border border-foreground font-headline text-xl hover:bg-foreground hover:text-background transition-colors duration-500">
              Reserve Your Seat
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
