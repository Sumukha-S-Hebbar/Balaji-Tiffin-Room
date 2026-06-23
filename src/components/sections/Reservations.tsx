"use client"

import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarDays, Clock, Users, ChevronRight } from 'lucide-react';

export function ReservationsSection() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <section id="reservations" className="py-24 px-6 md:px-12 bg-card relative">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="font-headline text-5xl md:text-6xl text-primary mb-6">Secure Your Table</h2>
        <p className="font-body text-lg text-foreground/70">
          Reservations at Dravida Heritage are an invitation to slow down and savor. 
          Book your voyage through our vintage dining hall.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          <Card className="bg-background border-primary/20 p-6 overflow-hidden">
            <CardContent className="p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md mx-auto scale-110"
              />
            </CardContent>
          </Card>

          <div className="bg-background border border-primary/20 rounded-xl p-8 flex flex-col justify-between">
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="flex items-center gap-2 uppercase tracking-widest text-[10px] text-primary/60 font-bold">
                    <Clock size={12} /> Time
                  </Label>
                  <Select>
                    <SelectTrigger className="bg-card border-primary/20 h-12">
                      <SelectValue placeholder="Select Slot" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="8:00 AM">8:00 AM</SelectItem>
                      <SelectItem value="9:30 AM">9:30 AM</SelectItem>
                      <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label className="flex items-center gap-2 uppercase tracking-widest text-[10px] text-primary/60 font-bold">
                    <Users size={12} /> Guests
                  </Label>
                  <Select>
                    <SelectTrigger className="bg-card border-primary/20 h-12">
                      <SelectValue placeholder="No. of Guests" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 People</SelectItem>
                      <SelectItem value="4">4 People</SelectItem>
                      <SelectItem value="6+">Private Booth (6+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="flex items-center gap-2 uppercase tracking-widest text-[10px] text-primary/60 font-bold">
                  Personal Details
                </Label>
                <Input placeholder="Full Name" className="bg-card border-primary/20 h-12" />
                <Input placeholder="Email Address" className="bg-card border-primary/20 h-12" />
              </div>
            </div>

            <Button className="w-full mt-12 bg-primary hover:bg-accent text-background hover:text-white h-14 font-bold text-lg uppercase tracking-widest group transition-all">
              Confirm Reservation
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}