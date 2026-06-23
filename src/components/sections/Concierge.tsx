"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { aiDishRecommendation } from '@/ai/flows/ai-dish-recommendation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sparkles, History, Send, Loader2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export function ConciergeSection() {
  const [preferences, setPreferences] = useState<string[]>([]);
  const [currentPref, setCurrentPref] = useState('');
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const conciergeImg = PlaceHolderImages.find(img => img.id === 'concierge-avatar');

  const handleAddPreference = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPref.trim()) {
      setPreferences([...preferences, currentPref.trim()]);
      setCurrentPref('');
    }
  };

  const getRecommendations = async () => {
    setIsLoading(true);
    try {
      const result = await aiDishRecommendation({
        dietaryPreferences: preferences,
        dietaryRestrictions: [] // Simple version
      });
      setRecommendations(result.recommendations);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="concierge" className="py-24 px-6 md:px-12 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="space-y-8 animate-fade-in">
          <div className="flex items-center gap-4">
            <div className="w-16 h-px bg-primary" />
            <span className="font-body text-primary uppercase tracking-[0.3em] text-xs">GenAI Powered</span>
          </div>
          
          <h2 className="font-headline text-5xl md:text-6xl leading-tight">Heritage Concierge</h2>
          
          <p className="font-body text-lg text-foreground/70 leading-relaxed">
            Unsure what suits your palate? Our AI steward draws from a century of culinary logs 
            to suggest the perfect fermented pairing for your dietary journey.
          </p>

          <div className="space-y-6 bg-card/50 p-8 rounded-xl border border-primary/20">
            <form onSubmit={handleAddPreference} className="flex gap-2">
              <Input 
                value={currentPref}
                onChange={(e) => setCurrentPref(e.target.value)}
                placeholder="E.g. Spicy, Vegan, Extra crispy..."
                className="bg-background border-primary/20 focus-visible:ring-primary text-foreground"
              />
              <Button type="submit" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-background">
                Add
              </Button>
            </form>

            <div className="flex flex-wrap gap-2">
              {preferences.map((p, i) => (
                <Badge key={i} variant="secondary" className="bg-primary/20 text-primary border-none py-1 px-3">
                  {p}
                </Badge>
              ))}
            </div>

            <Button 
              onClick={getRecommendations} 
              disabled={isLoading || preferences.length === 0}
              className="w-full bg-accent hover:bg-accent/90 text-white font-bold h-12"
            >
              {isLoading ? <Loader2 className="animate-spin mr-2" /> : <Sparkles className="mr-2 w-4 h-4" />}
              Generate Personalized Menu
            </Button>
          </div>
        </div>

        <div className="relative min-h-[500px]">
          {recommendations.length > 0 ? (
            <div className="space-y-6 animate-fade-in">
              {recommendations.map((rec, i) => (
                <Card key={i} className="bg-card/80 border-primary/20 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <History className="w-5 h-5 text-primary" />
                    <CardTitle className="font-headline text-2xl text-primary">{rec.dishName}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="font-body text-foreground/80 leading-relaxed italic">{rec.description}</p>
                    <div className="bg-primary/10 p-4 rounded-md border-l-2 border-primary">
                      <p className="text-sm font-medium text-primary">Heritage Insight:</p>
                      <p className="text-sm text-foreground/70">{rec.reason}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6 opacity-40">
              <div className="relative w-48 h-48 rounded-full overflow-hidden border-2 border-primary/20">
                <Image 
                  src={conciergeImg?.imageUrl || ''} 
                  alt="Concierge" 
                  fill 
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <p className="font-headline text-2xl">Waiting for your preferences...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}