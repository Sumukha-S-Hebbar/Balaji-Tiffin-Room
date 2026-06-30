
"use client"

import React, { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dosaRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  const images = {
    dosa: PlaceHolderImages.find(i => i.id === 'hero-dosa'),
    potato: PlaceHolderImages.find(i => i.id === 'potato-filling'),
    chutney: PlaceHolderImages.find(i => i.id === 'chutney-side'),
    sambar: PlaceHolderImages.find(i => i.id === 'sambar-side'),
  };

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {

      mm.add({
        isDesktop: "(min-width: 769px)",
        isMobile: "(max-width: 768px)"
      }, (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean };

        // 1. Entrance Animation - Dosa drops in on first scroll
        gsap.fromTo(dosaRef.current, 
          { 
            y: -200, 
            rotate: -15, 
            scale: 0.8, 
            opacity: 0 
          },
          {
            y: 0,
            rotate: 0,
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "10% top",
              scrub: 1,
            }
          }
        );

        // 2. Main Pinned Behavior
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: dosaRef.current,
          scrub: true,
        });

        // 3. Narrative Flow tied to Scroll
        // Rotation and Scale changes as we move
        gsap.to(dosaRef.current, {
          rotate: isDesktop ? 360 : 180,
          scale: isDesktop ? 1.1 : 0.7,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          }
        });

        // Section Animations
        sectionsRef.current.forEach((section, i) => {
          if (!section) return;

          const isLast = i === sectionsRef.current.length - 1;
          
          // Fade In/Out sections
          gsap.fromTo(section, 
            { opacity: 0, y: 50 },
            {
              opacity: 1, y: 0,
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "top 40%",
                scrub: true,
              }
            }
          );

          if (!isLast) {
            gsap.to(section, {
              opacity: 0,
              y: -50,
              scrollTrigger: {
                trigger: section,
                start: "bottom 60%",
                end: "bottom 20%",
                scrub: true,
              }
            });
          }
        });

        // Final BG Transition
        gsap.to(containerRef.current, {
          backgroundColor: "#D7CCC8", // Warm Sepia
          scrollTrigger: {
            trigger: sectionsRef.current[3],
            start: "top center",
            end: "bottom bottom",
            scrub: true,
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-[500vh] bg-background transition-colors duration-1000">
      
      {/* Pinned Asset Layer */}
      <div 
        ref={dosaRef} 
        className="fixed inset-0 flex items-center justify-center pointer-events-none z-20 px-6"
      >
        <div className="relative w-full max-w-[300px] md:max-w-[600px] aspect-square">
          {/* Main Dosa (Semi-Circle 3D Effect) */}
          <div className="relative w-full h-full dosa-shadow rounded-full overflow-hidden border-[8px] border-white/40 backdrop-blur-sm">
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
          
          {/* Floating Accents */}
          <div className="absolute -top-10 -right-10 w-24 h-24 md:w-40 md:h-40 rounded-full border-4 border-white overflow-hidden shadow-2xl opacity-40">
            {images.potato && (
              <Image src={images.potato.imageUrl} alt="Spices" fill className="object-cover" data-ai-hint="indian spices" />
            )}
          </div>
        </div>
      </div>

      {/* Narrative Sections */}
      <div className="relative z-30">
        
        {/* 1. Hero */}
        <section 
          ref={el => { sectionsRef.current[0] = el }}
          className="h-screen flex flex-col items-center justify-center text-center px-6"
        >
          <div className="max-w-4xl">
            <span className="font-display italic text-xl md:text-3xl mb-4 block text-primary/60">Karnataka's Heritage</span>
            <h1 className="font-headline text-5xl md:text-[10rem] uppercase tracking-tighter leading-[0.85] mb-8">
              The Udupi <br/> Masterpiece
            </h1>
            <p className="font-body text-xs md:text-sm uppercase tracking-[0.6em] opacity-40 animate-pulse">
              Slowly Scroll to Reveal
            </p>
          </div>
        </section>

        {/* 2. The Golden Crisp */}
        <section 
          ref={el => { sectionsRef.current[1] = el }}
          className="h-screen flex items-center justify-center md:justify-start px-6 md:px-32"
        >
          <div className="max-w-md bg-background/80 md:bg-transparent p-8 md:p-0 backdrop-blur-md md:backdrop-blur-none rounded-2xl border border-primary/10 md:border-none shadow-xl md:shadow-none">
            <h2 className="font-headline text-4xl md:text-7xl mb-6">The Golden <br/> Crisp</h2>
            <p className="font-body text-lg md:text-2xl text-foreground/80 leading-relaxed">
              A 14-hour fermentation symphony. Hand-ground rice and black lentils, cast on heavy iron to create a crust that shatters like autumn leaves.
            </p>
            <div className="mt-8 w-16 h-1 bg-primary/20" />
          </div>
        </section>

        {/* 3. The Spiced Heart */}
        <section 
          ref={el => { sectionsRef.current[2] = el }}
          className="h-screen flex items-center justify-center md:justify-end px-6 md:px-32"
        >
          <div className="max-w-md text-center md:text-right bg-background/80 md:bg-transparent p-8 md:p-0 backdrop-blur-md md:backdrop-blur-none rounded-2xl border border-primary/10 md:border-none shadow-xl md:shadow-none">
            <h2 className="font-headline text-4xl md:text-7xl mb-6">The Spiced <br/> Heart</h2>
            <p className="font-body text-lg md:text-2xl text-foreground/80 leading-relaxed">
              Tucked inside lies the soul—yellow turmeric potatoes, tempered with fresh curry leaves and toasted mustard seeds. The warmth of a grandmother's kitchen.
            </p>
            <div className="mt-8 w-16 h-1 bg-primary/20 ml-auto mr-auto md:mr-0 md:ml-auto" />
          </div>
        </section>

        {/* 4. The Finish */}
        <section 
          ref={el => { sectionsRef.current[3] = el }}
          className="h-screen flex flex-col items-center justify-center px-6 text-center"
        >
          <div className="max-w-3xl space-y-8 bg-background/90 p-10 md:p-20 rounded-3xl border border-primary/20 shadow-2xl">
            <h2 className="font-headline text-4xl md:text-8xl">The Trinity</h2>
            <p className="font-body text-lg md:text-2xl italic opacity-80">
              "A century-old ritual, served on a single plate."
            </p>
            <p className="font-body text-sm md:text-lg text-foreground/70 max-w-xl mx-auto leading-relaxed">
              Cool coconut chutney meets the steaming, tamarind-infused tang of heritage sambar. Your voyage through South Indian fine dining begins here.
            </p>
            <div className="pt-8">
              <button className="px-12 py-5 bg-primary text-background font-headline text-2xl hover:bg-accent transition-all duration-500 transform hover:scale-105 shadow-xl">
                Reserve Your Seat
              </button>
            </div>
          </div>
        </section>
      </div>

      <div className="vintage-texture" />
    </div>
  );
}
