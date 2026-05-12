"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Container, Section, Heading, LoadingSpinner } from "@/src/features/shared/components";
import {
  ShieldCheck,
  MapPin,
  Camera,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  UploadCloud,
  FileText,
  XCircle,
  AlertCircle
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { useAuth } from "@/src/hooks/useAuth";
import { useProviderProfile } from "../hooks/useProviderProfile";
import { useProviderVerification } from "../hooks/useProviderVerification";
import { toast } from "react-hot-toast";
import { cn } from "@/src/lib/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export function TechnicianOnboarding() {
  const { user } = useAuth();
  const router = useRouter();
  const { update: updateProfile, loading: profileLoading } = useProviderProfile();
  const { submit: submitVerification, checkStatus, loading: verificationLoading } = useProviderVerification();
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    const init = async () => {
      const status = await checkStatus();
      if (status && (status.status === "pending" || status.status === "approved")) {
        router.push("/technician/profile");
      } else {
        setCheckingStatus(false);
      }
    };
    init();
  }, [checkStatus, router]);

  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({
    city: "",
    woreda: "",
    kebele: "",
    specific_location: "",
    label: "Workshop"
  });

  const [idFile, setIdFile] = useState<File | null>(null);
  const [docFile, setDocFile] = useState<File | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const idInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if ((user as any)?.address) {
      setAddress(prev => ({ ...prev, ...(user as any).address }));
    }
  }, [user]);

  useEffect(() => {
    if (isCameraOpen && stream && videoRef.current) {
      const video = videoRef.current;
      video.srcObject = stream;
      const handleReady = () => {
        video.play().then(() => setIsCameraReady(true)).catch(console.error);
      };
      video.addEventListener('loadedmetadata', handleReady);
      video.addEventListener('playing', handleReady);
      return () => {
        video.removeEventListener('loadedmetadata', handleReady);
        video.removeEventListener('playing', handleReady);
      };
    }
  }, [isCameraOpen, stream]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(t => t.stop());
      setStream(null);
    }
    setIsCameraOpen(false);
    setIsCameraReady(false);
  }, [stream]);

  const startCamera = async () => {
    setCameraError(null);
    setIsCameraReady(false);
    setIsCameraOpen(true);
    try {
      const s = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } }
      });
      setStream(s);
    } catch (err) {
      setCameraError("Camera access failed");
      setIsCameraOpen(false);
    }
  };

  const handleCapture = () => {
    const v = videoRef.current;
    const c = canvasRef.current;
    if (!v || !c) return;
    c.width = v.videoWidth;
    c.height = v.videoHeight;
    c.getContext("2d")?.drawImage(v, 0, 0);
    c.toBlob(blob => {
      if (blob) setIdFile(new File([blob], `id-${Date.now()}.jpg`, { type: "image/jpeg" }));
      stopCamera();
    }, "image/jpeg", 0.9);
  };

  const handleNext = async () => {
    if (step === 1) {
      if (!address.city || !address.woreda) return toast.error("City and Woreda are required");
      const success = await updateProfile(address);
      if (success) setStep(2);
    } else if (step === 2) {
      if (!idFile) return toast.error("Please provide your National ID");
      setStep(3);
    } else if (step === 3) {
      const fd = new FormData();
      fd.append("national_id", idFile);
      if (docFile) {
        fd.append("proof_document", docFile);
        fd.append("proof_document_type", "coc");
      }

      const success = await submitVerification(fd);
      if (success) {
        toast.success("Identity verified!");
        router.push("/technician/profile");
      }
    }
  };

  if (checkingStatus) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative">
      <Section className="w-full flex-grow flex flex-col justify-center py-6 sm:py-12 px-4 sm:px-6">
        <Container className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border border-border/50 p-6 sm:p-10 shadow-2xl shadow-primary/5 rounded-none space-y-10"
          >

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-primary">Onboarding Flow</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{step}/3</span>
              </div>
              <h1 className="text-4xl font-black uppercase tracking-tighter mb-3">
                Setup <span className="text-primary">Identity</span>
              </h1>
              <div className="flex gap-2">
                {[1, 2, 3].map(s => (
                  <div key={s} className={cn("h-1 flex-1 transition-all duration-500",
                    step >= s ? "bg-primary" : "bg-slate-100 dark:bg-slate-800"
                  )} />
                ))}
              </div>
            </div>

            <div className="min-h-[340px]">
              {step === 1 ? (
                <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2">
                  <div className="p-4 bg-primary/5 border border-primary/20 flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary">Workspace Details</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} placeholder="City *" className="rounded-none border border-border h-12 focus-visible:ring-0 focus-visible:border-primary transition-all bg-background/50 hover:border-primary/50 font-bold" />
                    <Input value={address.woreda} onChange={e => setAddress({ ...address, woreda: e.target.value })} placeholder="Woreda *" className="rounded-none border border-border h-12 focus-visible:ring-0 focus-visible:border-primary transition-all bg-background/50 hover:border-primary/50 font-bold" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input value={address.kebele} onChange={e => setAddress({ ...address, kebele: e.target.value })} placeholder="Kebele" className="rounded-none border border-border h-12 focus-visible:ring-0 focus-visible:border-primary transition-all bg-background/50 hover:border-primary/50 font-bold" />
                    <Input value={address.specific_location} onChange={e => setAddress({ ...address, specific_location: e.target.value })} placeholder="Location" className="rounded-none border border-border h-12 focus-visible:ring-0 focus-visible:border-primary transition-all bg-background/50 hover:border-primary/50 font-bold" />
                  </div>
                </div>
              ) : step === 2 ? (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                  <div className="p-4 bg-primary/5 border border-primary/20 flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary">National ID Verification</p>
                  </div>

                  {isCameraOpen ? (
                    <div className="relative aspect-video bg-black border border-border overflow-hidden">
                      <video ref={videoRef} playsInline autoPlay className="w-full h-full object-cover" />
                      {!isCameraReady && <div className="absolute inset-0 flex items-center justify-center bg-background/90 text-foreground text-[9px] font-black uppercase">Warming Up...</div>}
                      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-6">
                        <Button onClick={handleCapture} disabled={!isCameraReady} className="rounded-full w-16 h-16 bg-white border-8 border-primary shadow-2xl" />
                        <Button onClick={stopCamera} className="rounded-full w-12 h-12 bg-slate-900"><XCircle className="w-6 h-6 text-white" /></Button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <button onClick={startCamera} className="h-40 border border-border hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-4 group">
                        <Camera className="w-7 h-7 text-muted-foreground group-hover:text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-foreground/70">Take Live ID Photo</span>
                      </button>
                      <button onClick={() => idInputRef.current?.click()} className="h-40 border border-border hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center gap-4 group">
                        <UploadCloud className="w-7 h-7 text-muted-foreground group-hover:text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-foreground/70">Upload National ID</span>
                      </button>
                    </div>
                  )}

                  <input ref={idInputRef} type="file" hidden accept="image/*" onChange={e => setIdFile(e.target.files?.[0] || null)} />

                  {idFile && (
                    <div className="p-5 bg-primary/5 border border-primary/20 text-primary flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <CheckCircle2 className="w-6 h-6" />
                        <span className="text-[11px] font-black uppercase truncate max-w-[200px]">{idFile.name}</span>
                      </div>
                      <Button variant="ghost" onClick={() => setIdFile(null)} className="hover:bg-primary/10"><XCircle className="w-5 h-5" /></Button>
                    </div>
                  )}

                  <div className="pt-6 border-t border-border">
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4 text-center">Other Documentation (Optional)</p>
                    <Button variant="outline" onClick={() => docInputRef.current?.click()} className="w-full h-16 rounded-none bg-background/50 flex justify-between px-6 border border-border hover:border-primary/50 transition-all">
                      <span className="text-[10px] font-black uppercase tracking-widest text-foreground/70">{docFile ? docFile.name : "Attach COC/License"}</span>
                      <UploadCloud className="w-4 h-4 text-muted-foreground" />
                    </Button>
                    <input ref={docInputRef} type="file" hidden accept=".pdf,image/*" onChange={e => setDocFile(e.target.files?.[0] || null)} />
                  </div>
                </div>
              ) : step === 3 ? (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                  <div className="p-4 bg-primary/5 border border-primary/20 flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary">Review Submission</p>
                  </div>
                  <div className="border border-border p-8 space-y-6 bg-background/50">
                    <div className="flex items-start gap-4">
                      <MapPin className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Location</p>
                        <p className="text-sm font-black uppercase tracking-tight">{address.city}, {address.woreda}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <FileText className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Documents</p>
                        <p className="text-sm font-black uppercase tracking-tight truncate max-w-[240px]">{idFile?.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-10">
              {step > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setStep(s => s - 1)}
                  className="flex-1 h-16 rounded-none border border-border font-black uppercase tracking-[0.2em] text-[10px] hover:border-primary/50 transition-all"
                >
                  <ArrowLeft className="w-4 h-4 mr-3" /> Back
                </Button>
              )}
              <Button
                onClick={handleNext}
                disabled={profileLoading || verificationLoading}
                className="flex-[2] h-16 rounded-none bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-slate-950/20 transition-all active:scale-[0.98]"
              >
                {profileLoading || verificationLoading ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <>
                    <span>{step === 3 ? "Submit Identity" : "Continue"}</span>
                    <ArrowRight className="ml-3 w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </motion.div>

          <div className="mt-12 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} Haseri Marketplace. All rights reserved.
          </div>
        </Container>
      </Section>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
