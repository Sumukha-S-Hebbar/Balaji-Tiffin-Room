
import { ScrollStory } from '@/components/ScrollStory';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 p-8 flex justify-between items-center z-50 pointer-events-none">
        <div className="font-headline text-2xl tracking-tighter uppercase pointer-events-auto">Dravida</div>
        <div className="hidden md:flex gap-12 font-body text-xs uppercase tracking-widest pointer-events-auto">
          <a href="#" className="hover:opacity-50 transition-opacity">Heritage</a>
          <a href="#" className="hover:opacity-50 transition-opacity">Philosophy</a>
          <a href="#" className="hover:opacity-50 transition-opacity">Bookings</a>
        </div>
      </nav>
      
      <ScrollStory />

      <div className="vintage-texture" />
      
      <footer className="py-24 bg-[#EFEBE9] px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h3 className="font-headline text-4xl">Dravida Heritage</h3>
          <p className="font-body opacity-60 text-sm tracking-widest uppercase">Udupi • Bengaluru • Mysuru</p>
          <div className="h-px w-24 bg-foreground/10 mx-auto" />
          <p className="font-display italic text-lg opacity-40">"Simplicity is the ultimate sophistication of the South."</p>
        </div>
      </footer>
    </main>
  );
}
