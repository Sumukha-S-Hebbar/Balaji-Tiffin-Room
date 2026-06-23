import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { MenuSection } from '@/components/sections/Menu';
import { ConciergeSection } from '@/components/sections/Concierge';
import { KitchenPulse } from '@/components/sections/KitchenPulse';
import { GallerySection } from '@/components/sections/Gallery';
import { ReservationsSection } from '@/components/sections/Reservations';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <KitchenPulse />
      <MenuSection />
      <ConciergeSection />
      <GallerySection />
      <ReservationsSection />
      
      {/* Premium Footer */}
      <footer className="py-24 bg-background border-t border-primary/10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-12">
          <div className="space-y-4">
            <h2 className="font-headline text-4xl text-primary tracking-widest uppercase">Dravida Heritage</h2>
            <p className="font-body text-sm text-foreground/40 max-w-md mx-auto">
              Preserving the sacred flavors of the South. Artisan Idly, Dosa, and Vada since 1924.
            </p>
          </div>
          
          <div className="flex gap-12 font-body text-xs uppercase tracking-[0.3em] text-foreground/60">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Heritage</a>
            <a href="#" className="hover:text-primary transition-colors">Careers</a>
          </div>
          
          <div className="pt-12 border-t border-primary/5 w-full">
            <p className="text-[10px] text-foreground/30 uppercase tracking-widest">
              © {new Date().getFullYear()} Dravida Heritage. Crafted for the Discerning.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}