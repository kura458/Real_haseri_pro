"use client";

import React from "react";
import { ProfileForm } from "@/src/features/customers/components";
import { Container, Section, Heading, Text } from "@/src/features/shared/components";
import { motion } from "framer-motion";
import { Camera, MapPin, Phone, Mail, Edit3, Shield } from "lucide-react";
import { useAuth } from "@/src/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";

export default function CustomerProfilePage() {
  const { user } = useAuth();

  return (
    <Section padding="none" className="min-h-screen bg-slate-50/50 pb-20">
      {/* Cover Image Container */}
      <div className="relative h-64 md:h-80 w-full bg-slate-900 overflow-hidden group">
        {/* Opposing Red Corner Accents */}
        <div className="absolute top-0 right-0 w-32 h-32 border-t-[6px] border-r-[6px] border-primary z-10" />
        <div className="absolute bottom-0 left-0 w-32 h-32 border-b-[6px] border-l-[6px] border-primary z-10" />
        
        {/* Placeholder Cover */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 opacity-80" />
        {user?.cover_image ? (
          <img 
            src={user.cover_image} 
            alt="Cover" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
             <div className="flex flex-col items-center gap-2 opacity-20">
                <Heading level={1} weight="black" uppercase className="text-8xl text-white tracking-tighter italic">HASERI</Heading>
             </div>
          </div>
        )}

        <Button 
          variant="secondary" 
          size="sm" 
          className="absolute bottom-6 right-6 z-20 rounded-none bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 uppercase font-black text-[10px] tracking-widest gap-2"
        >
          <Edit3 className="w-3.5 h-3.5" />
          Change Cover
        </Button>
      </div>

      <Container className="relative z-20">
        <div className="flex flex-col md:flex-row gap-8 items-start -mt-20 lg:-mt-24">
          {/* Circular Profile Image (Overlapping) */}
          <div className="relative group shrink-0">
            <Avatar className="h-40 w-40 md:h-48 md:w-48 rounded-full border-[6px] border-white shadow-2xl overflow-hidden bg-white">
              <AvatarImage src={user?.avatar} className="object-cover" />
              <AvatarFallback className="bg-slate-900 text-white text-4xl font-black uppercase">
                {user?.first_name?.[0]}{user?.last_name?.[0]}
              </AvatarFallback>
            </Avatar>
            <button className="absolute bottom-2 right-2 p-3 bg-primary text-white rounded-full border-4 border-white shadow-lg hover:scale-110 transition-transform z-30">
              <Camera className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Info */}
          <div className="flex-1 pt-4 md:pt-24 pb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Heading level={1} weight="black" uppercase className="text-3xl md:text-4xl tracking-tighter">
                    {user?.first_name} {user?.last_name}
                  </Heading>
                  {user?.is_verified && (
                    <div className="bg-green-500/10 text-green-600 p-1 rounded-full" title="Verified Account">
                       <Shield className="w-5 h-5 fill-current" />
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-y-2 gap-x-6">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-[11px] font-bold uppercase tracking-widest">{user?.address || "Add Address"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4 text-primary" />
                    <span className="text-[11px] font-bold uppercase tracking-widest">{user?.phone || "No Phone"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4 text-primary" />
                    <span className="text-[11px] font-bold uppercase tracking-widest lowercase">{user?.email}</span>
                  </div>
                </div>
              </div>
              <Button className="rounded-none bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-[0.2em] text-[10px] h-12 px-8">
                Edit Public Profile
              </Button>
            </div>
          </div>
        </div>

        {/* Content Tabs / Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-12">
          <div className="lg:col-span-2">
            <div className="bg-white border-2 border-slate-900 p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(15,23,42,0.05)]">
              <div className="mb-10 pb-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <Heading level={2} weight="black" uppercase className="text-xl tracking-widest mb-1">Account Details</Heading>
                  <Text size="xs" className="uppercase font-bold tracking-tight opacity-50">Update your personal and contact information</Text>
                </div>
              </div>
              <ProfileForm />
            </div>
          </div>

          <div className="space-y-6">
             <div className="bg-primary text-white p-8 rounded-none shadow-[12px_12px_0px_0px_rgba(225,29,72,0.1)]">
                <Heading level={3} weight="black" uppercase className="text-lg mb-4 tracking-widest italic">HASERI PRO</Heading>
                <Text className="text-white/80 text-xs font-bold leading-relaxed mb-6 uppercase tracking-tight">
                  Get access to premium marketplace features and lower transaction fees.
                </Text>
                <Button className="w-full bg-white text-primary hover:bg-slate-50 font-black uppercase tracking-widest text-[10px] rounded-none h-12">
                  Upgrade Now
                </Button>
             </div>

             <div className="bg-slate-900 text-white p-8 rounded-none shadow-[12px_12px_0px_0px_rgba(15,23,42,0.1)]">
                <Heading level={3} weight="black" uppercase className="text-lg mb-4 tracking-widest">Verification Status</Heading>
                <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 mb-6">
                   <div className="w-10 h-10 flex items-center justify-center bg-primary text-white">
                      <Shield className="w-5 h-5" />
                   </div>
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest">Identity Unverified</p>
                      <p className="text-[8px] font-bold opacity-50 uppercase">Required for payouts</p>
                   </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full border-white/20 text-white hover:bg-white/10 font-black uppercase tracking-widest text-[10px] rounded-none h-12"
                  onClick={() => window.location.href = "/customer/verify"}
                >
                  Start Verification
                </Button>
             </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
