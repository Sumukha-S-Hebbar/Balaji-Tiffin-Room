
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
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          scrollTrigger: {
            trigger: section2Ref.current,
            start: "top center",
            end: "center center",
            scrub: true,
          }
        }
      );
      gsap.to(section2Ref.current, {
        opacity: 0, y: -50,
        scrollTrigger: {
          trigger: section2Ref.current,
          start: "center top",
          end: "bottom top",
          scrub: true,
        }
      });

      // Section 3: Spiced Heart (Text Right + Potato)
      gsap.fromTo(section3Ref.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          scrollTrigger: {
            trigger: section3Ref.current,
            start: "top center",
            end: "center center",
            scrub: true,
          }
        }
      );
      gsap.fromTo(potatoRef.current,
        { opacity: 0, x: 50, scale: 0.5, rotate: 45 },
        {
          opacity: 1, x: 0, scale: 1, rotate: 0,
          scrollTrigger: {
            trigger: section3Ref.current,
            start: "top center",
            end: "center center",
            scrub: true,
          }
        }
      );
      gsap.to([section3Ref.current, potatoRef.current], {
        opacity: 0, y: -50,
        scrollTrigger: {
          trigger: section3Ref.current,
          start: "center top",
          end: "bottom top",
          scrub: true,
        }
      });

      // Section 4: Accompaniments (Flank Dosa)
      gsap.fromTo([chutneyRef.current, sambarRef.current],
        { opacity: 0, scale: 0.2 },
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
        backgroundColor: "#EFEBE9",
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
    <div ref={containerRef} className="relative min-h-[400vh] bg-background overflow-x-hidden">
      {/* Pinned Asset Layer */}
      <div ref={dosaRef} className="fixed inset-0 flex items-center justify-center pointer-events-none z-20">
        <div className="relative w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] flex items-center justify-center">
          {/* Main Dosa */}
          <div className="relative w-full h-full dosa-shadow rounded-full overflow-hidden border-4 border-white/50">
            {images.dosa && (
              <Image 
                src={images.dosa.imageUrl} 
                alt={images.dosa.description} 
                fill 
                className="object-cover"
                priority
                data-ai-hint={images.dosa.imageHint}
              />
            )}
          </div>

          {/* Sliding Graphics - Relative to Dosa Center */}
          <div ref={potatoRef} className="absolute -right-8 -top-8 sm:-right-16 sm:-top-16 w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 rounded-full overflow-hidden shadow-xl border-4 border-white/80 opacity-0 z-30">
             {images.potato && (
               <Image 
                src={images.potato.imageUrl} 
                alt={images.potato.description} 
                fill 
                className="object-cover" 
                data-ai-hint={images.potato.imageHint}
               />
             )}
          </div>
          
          <div ref={chutneyRef} className="absolute -left-12 bottom-0 sm:-left-20 w-20 h-20 sm:w-28 sm:h-28 md:w-40 md:h-40 rounded-full overflow-hidden shadow-xl border-4 border-white/80 opacity-0 z-30">
             {images.chutney && (
               <Image 
                src={images.chutney.imageUrl} 
                alt={images.chutney.description} 
                fill 
                className="object-cover" 
                data-ai-hint={images.chutney.imageHint}
               />
             )}
          </div>

          <div ref={sambarRef} className="absolute -right-12 bottom-0 sm:-right-20 w-20 h-20 sm:w-28 sm:h-28 md:w-40 md:h-40 rounded-full overflow-hidden shadow-xl border-4 border-white/80 opacity-0 z-30">
             {images.sambar && (
               <Image 
                src={images.sambar.imageUrl} 
                alt={images.sambar.description} 
                fill 
                className="object-cover" 
                data-ai-hint={images.sambar.imageHint}
               />
             )}
          </div>
        </div>
      </div>

      {/* Narrative Sections */}
      
      {/* 1. Hero */}
      <section ref={section1Ref} className="relative h-screen flex flex-col items-center justify-center text-center px-6 z-10">
        <span className="font-display italic text-lg md:text-2xl mb-4 opacity-60">Karnataka's Culinary Jewel</span>
        <h1 className="font-headline text-4xl sm:text-6xl md:text-9xl uppercase tracking-tighter leading-none mb-6">
          The Udupi <br/> Masterpiece
        </h1>
        <p className="font-body text-[10px] sm:text-sm uppercase tracking-[0.5em] opacity-40">Scroll to Deconstruct</p>
      </section>

      {/* 2. The Golden Crisp */}
      <section ref={section2Ref} className="relative h-screen flex items-center justify-center sm:justify-start px-6 md:px-24 z-10">
        <div className="max-w-xs sm:max-w-md space-y-4 sm:space-y-6 bg-background/60 backdrop-blur-sm p-4 rounded-lg sm:bg-transparent sm:p-0">
          <h2 className="font-headline text-4xl sm:text-5xl md:text-7xl">The Golden <br/> Crisp</h2>
          <p className="font-body text-sm sm:text-lg md:text-xl text-foreground/80 leading-relaxed">
            Crafted from a 14-hour fermented symphony of stone-ground rice and black lentils. 
            The result? A lace-thin crust that shatters like glass.
          </p>
          <div className="w-12 sm:w-16 h-px bg-foreground/20" />
        </div>
      </section>

      {/* 3. The Spiced Heart */}
      <section ref={section3Ref} className="relative h-screen flex items-center justify-center sm:justify-end px-6 md:px-24 z-10">
        <div className="max-w-xs sm:max-w-md space-y-4 sm:space-y-6 text-center sm:text-right bg-background/60 backdrop-blur-sm p-4 rounded-lg sm:bg-transparent sm:p-0">
          <h2 className="font-headline text-4xl sm:text-5xl md:text-7xl">The Spiced <br/> Heart</h2>
          <p className="font-body text-sm sm:text-lg md:text-xl text-foreground/80 leading-relaxed">
            Beneath the golden exterior lies the "Potato Palya"—a hand-mashed medley of turmeric, 
            fresh curry leaves, and toasted mustard seeds.
          </p>
          <div className="w-12 sm:w-16 h-px bg-foreground/20 mx-auto sm:ml-auto" />
        </div>
      </section>

      {/* 4. The Accompaniments */}
      <section ref={section4Ref} className="relative h-screen flex flex-col items-center justify-end pb-16 sm:pb-32 px-6 z-10">
        <div className="max-w-2xl text-center space-y-6 sm:space-y-8 bg-background/60 backdrop-blur-sm p-6 rounded-lg sm:bg-transparent sm:p-0">
          <h2 className="font-headline text-4xl sm:text-5xl md:text-7xl">The Trinity</h2>
          <p className="font-body text-sm sm:text-lg md:text-xl text-foreground/80 leading-relaxed italic">
            "No masterpiece is complete without its echoes."
          </p>
          <p className="font-body text-[10px] sm:text-sm md:text-base opacity-70 max-w-lg mx-auto">
            Cool coconut chutney meets the steaming, tamarind-infused tang of heritage sambar. 
            A century-old ritual, served on a single plate.
          </p>
          <div className="pt-6 sm:pt-12">
            <button className="px-8 sm:px-12 py-3 sm:py-4 border border-foreground font-headline text-lg sm:text-xl hover:bg-foreground hover:text-background transition-colors duration-500">
              Reserve Your Seat
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
