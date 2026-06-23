"use client"

import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Clock, Users, Zap } from 'lucide-react';

const KITCHEN_STATS = [
  { label: 'Gold Dosa Stations', capacity: 85, wait: '12 min' },
  { label: 'Idly Steaming Pods', capacity: 40, wait: '4 min' },
  { label: 'Stone Grinding Units', capacity: 60, wait: 'Active' },
];

export function KitchenPulse() {
  return (
    <section className="py-12 bg-accent text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-white/10 rounded-full animate-pulse">
              <Zap className="w-8 h-8 text-primary" fill="currentColor" />
            </div>
            <div>
              <h3 className="font-headline text-3xl">Live Kitchen Pulse</h3>
              <p className="font-body text-white/70">Real-time status of our culinary floor.</p>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {KITCHEN_STATS.map((stat, i) => (
              <div key={i} className="space-y-3 bg-white/5 p-4 rounded-lg border border-white/10">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-bold uppercase tracking-widest">{stat.label}</span>
                  <span className="text-xs font-body opacity-70">{stat.wait}</span>
                </div>
                <Progress value={stat.capacity} className="h-1 bg-white/20" />
                <div className="flex items-center gap-2 text-[10px] opacity-60">
                  <Users size={10} />
                  <span>Current Occupancy: {stat.capacity}%</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 px-6 py-3 bg-black/20 rounded-full border border-white/10">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm font-bold uppercase tracking-tighter">Kitchen: Serving Now</span>
          </div>
        </div>
      </div>
    </section>
  );
}