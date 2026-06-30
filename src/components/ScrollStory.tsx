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
  const pinWrapperRef = useRef<HTMLDivElement>(null); 
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

        // 1. Entrance Animation - Plays ON LOAD
        gsap.fromTo(dosaRef.current, 
          { y: -300, rotate: -25, scale: 0.5, opacity: 0 },
          { y: 0, rotate: 0, scale: 1, opacity: 1, duration: 1.5, ease: "back.out(1.2)" }
        );

        // 2. Main Pinned Behavior
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: pinWrapperRef.current,
          scrub: true,
        });

        // 3. Narrative Flow tied to Scroll
        gsap.to(dosaRef.current, {
          rotate: isDesktop ? 15 : 10,
          y: isDesktop ? 40 : 20,
          scale: isDesktop ? 1.05 : 0.9,
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
          
          gsap.fromTo(section, 
            { opacity: 0, y: 100 },
            {
              opacity: 1, y: 0,
              scrollTrigger: {
                trigger: section,
                start: "top 75%",
                end: "top 30%",
                scrub: true,
              }
            }
          );

          if (!isLast) {
            gsap.to(section, {
              opacity: 0, y: -100,
              scrollTrigger: {
                trigger: section,
                start: "bottom 60%",
                end: "bottom 10%",
                scrub: true,
              }
            });
          }
        });

        // Final BG Transition
        gsap.to(containerRef.current, {
          backgroundColor: "#3E2723",
          color: "#FDFBF7",
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
    <div ref={containerRef} className="relative min-h-[400vh] bg-background transition-colors duration-1000">
      
      {/* Pinned Asset Layer */}
      <div 
        ref={pinWrapperRef} 
        className="absolute top-0 left-0 w-full h-screen flex items-center justify-center pointer-events-none z-20 px-4 md:px-6"
      >
        <div 
          ref={dosaRef} 
          className="relative w-full max-w-[400px] md:max-w-[700px] aspect-[16/10]"
        >
          {/* Main Dosa - Just the image and the drop shadow */}
          <div className="relative w-full h-full dosa-shadow">
            {images.dosa && (
              <Image 
                src={images.dosa.imageUrl} 
                alt="Folded Masala Dosa" 
                fill 
                className="object-contain"
                priority
                data-ai-hint="folded masala dosa top"
              />
            )}
          </div>
          
          {/* Floating Accents */}
          <div className="absolute -top-10 -right-10 w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shadow-2xl opacity-80">
            {images.potato && (
              <Image 
                src={images.potato.imageUrl} 
                alt="Spices" 
                fill 
                className="object-cover"
                data-ai-hint="indian spices" 
              />
            )}
          </div>
        </div>
      </div>

      {/* Narrative Sections */}
      <div className="relative z-30">
        
        {/* 1. Hero */}
        <section ref={el => { sectionsRef.current[0] = el }} className="h-screen flex flex-col items-center justify-center text-center px-6">
          <div className="max-w-4xl pt-[20vh] md:pt-0">
            <span className="font-display italic text-xl md:text-3xl mb-4 block opacity-60">Karnataka's Heritage</span>
            <h1 className="font-headline text-5xl md:text-[8rem] uppercase tracking-tighter leading-[0.85] mb-8">
              The Udupi <br/> Masterpiece
            </h1>
            <p className="font-body text-xs md:text-sm uppercase tracking-[0.6em] opacity-40 animate-pulse mt-12">
              Slowly Scroll to Reveal
            </p>
          </div>
        </section>

        {/* 2. The Golden Crisp */}
        <section ref={el => { sectionsRef.current[1] = el }} className="h-screen flex items-end md:items-center justify-center md:justify-start px-6 md:px-32 pb-24 md:pb-0">
          <div className="max-w-md text-center md:text-left">
            <h2 className="font-headline text-4xl md:text-6xl mb-6">The Golden <br/> Crisp</h2>
            <p className="font-body text-lg md:text-xl opacity-80 leading-relaxed">
              A 14-hour fermentation symphony. Hand-ground rice and black lentils, cast on heavy iron to create a crust that shatters like autumn leaves.
            </p>
          </div>
        </section>

        {/* 3. The Spiced Heart */}
        <section ref={el => { sectionsRef.current[2] = el }} className="h-screen flex items-end md:items-center justify-center md:justify-end px-6 md:px-32 pb-24 md:pb-0">
          <div className="max-w-md text-center md:text-right">
            <h2 className="font-headline text-4xl md:text-6xl mb-6">The Spiced <br/> Heart</h2>
            <p className="font-body text-lg md:text-xl opacity-80 leading-relaxed">
              Tucked inside lies the soul—yellow turmeric potatoes, tempered with fresh curry leaves and toasted mustard seeds.
            </p>
          </div>
        </section>

        {/* 4. The Finish */}
        <section ref={el => { sectionsRef.current[3] = el }} className="h-screen flex flex-col items-center justify-end md:justify-center px-6 text-center pb-24 md:pb-0">
          <div className="max-w-3xl space-y-6">
            <h2 className="font-headline text-4xl md:text-7xl">The Trinity</h2>
            <p className="font-body text-sm md:text-lg opacity-70 max-w-xl mx-auto leading-relaxed">
              Cool coconut chutney meets the steaming, tamarind-infused tang of heritage sambar. Your voyage through South Indian fine dining begins here.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
