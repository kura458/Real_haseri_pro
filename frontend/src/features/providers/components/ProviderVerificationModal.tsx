"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { useProviderVerification } from "../hooks/useProviderVerification";
import {
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Loader2,
  CheckCircle2,
  UploadCloud,
  FileText,
  Camera,
  XCircle,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { cn } from "@/src/lib/utils";

interface ProviderVerificationModalProps {
  trigger?: React.ReactNode;
}

export function ProviderVerificationModal({ trigger }: ProviderVerificationModalProps) {
  const { submit, checkStatus, loading } = useProviderVerification();
  const [status, setStatus] = useState<{ status: string; verified_at: string | null } | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [idFile, setIdFile] = useState<File | null>(null);
  const [docFile, setDocFile] = useState<File | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);

  const idInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (isOpen) {
      const getStatus = async () => {
        const data = await checkStatus();
        setStatus(data);
      };
      getStatus();
    }
  }, [isOpen, checkStatus]);

  const handleSubmit = async () => {
    if (!idFile) {
      toast.error("Please upload your ID document.");
      return;
    }

    const formData = new FormData();
    formData.append("id_document", idFile);
    if (docFile) {
      formData.append("supporting_document", docFile);
    }

    const data = await submit(formData);
    if (data !== null) {
      const updatedStatus = await checkStatus();
      setStatus(updatedStatus);
      toast.success("Verification documents submitted successfully!");
      setIsOpen(false);
    } else {
      toast.error("Submission failed. Please try again.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const startCamera = async () => {
    setCameraError(null);
    setIsCameraReady(false);
    setIsCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = async () => {
          try {
            await videoRef.current?.play();
            setIsCameraReady(true);
          } catch {
            setCameraError("Camera is blocked. Please allow access and try again.");
          }
        };
      }
    } catch {
      setCameraError("Unable to access camera. Please check permissions.");
      setIsCameraOpen(false);
    }
  };

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    setIsCapturing(true);
    const width = video.videoWidth || 1280;
    const height = video.videoHeight || 720;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, width, height);
    canvas.toBlob(
      (blob) => {
        if (blob) {
          const file = new File([blob], `id-capture-${Date.now()}.jpg`, { type: "image/jpeg" });
          setIdFile(file);
        }
        setIsCapturing(false);
        setIsCameraOpen(false);
        setIsCameraReady(false);
        stopCamera();
      },
      "image/jpeg",
      0.92
    );
  };

  useEffect(() => {
    if (!isOpen) {
      setIdFile(null);
      setDocFile(null);
      setIsCameraOpen(false);
      setCameraError(null);
      setIsCameraReady(false);
      stopCamera();
    }
  }, [isOpen]);

  const isVerified = status?.status === "approved";
  const isPending = status?.status === "pending";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-none h-11 font-black uppercase tracking-widest text-[10px]">
            Verify Identity
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="w-[98vw] max-w-[98vw] md:max-w-[85vw] lg:max-w-5xl p-0 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden flex flex-col max-h-[98vh] sm:rounded-2xl shadow-2xl">
        <div className="p-6 pb-0 shrink-0">
          <DialogHeader className="text-left">
            <DialogTitle className="text-base font-black uppercase tracking-widest text-slate-900 dark:text-white">
              Technician Verification
            </DialogTitle>
            <DialogDescription className="text-[10px] font-semibold text-slate-500">
              Upload your ID and a supporting document to verify.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-4">
            <div className="flex items-center gap-3">
              {isVerified ? (
                <ShieldCheck className="w-5 h-5 text-primary" />
              ) : isPending ? (
                <ShieldAlert className="w-5 h-5 text-amber-500" />
              ) : (
                <ShieldAlert className="w-5 h-5 text-slate-500" />
              )}
              <div>
                <p className="text-[11px] font-black uppercase tracking-widest text-slate-900 dark:text-white">
                  {isVerified ? "Verified" : isPending ? "Pending Review" : "Not Verified"}
                </p>
                <p className="text-[9px] font-semibold text-slate-500">
                  {isVerified && status?.verified_at
                    ? `Active since ${new Date(status.verified_at).toLocaleDateString()}`
                    : isPending
                    ? "We are reviewing your documents."
                    : "Complete verification to unlock premium job access."}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {!isVerified && !isPending && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white mb-3">
                  Government ID <span className="text-red-500">*</span>
                </p>
                <div className="space-y-4">
                  {isCameraOpen && (
                    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-3">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">
                          Camera
                        </p>
                        <Button
                          type="button"
                          variant="outline"
                          className="h-7 text-[10px] font-black uppercase tracking-widest"
                          onClick={() => {
                            setIsCameraOpen(false);
                            setIsCameraReady(false);
                            stopCamera();
                          }}
                        >
                          Close
                        </Button>
                      </div>
                      <button
                        type="button"
                        onClick={handleCapture}
                        disabled={isCapturing || !isCameraReady}
                        className="relative w-full aspect-square rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900"
                        aria-label="Capture photo"
                      >
                        <video
                          ref={videoRef}
                          playsInline
                          muted
                          autoPlay
                          className="w-full h-full object-cover"
                        />
                        {!isCameraReady && !cameraError && (
                          <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold uppercase tracking-widest text-slate-500">
                            Starting...
                          </span>
                        )}
                        {cameraError && (
                          <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold uppercase tracking-widest text-rose-500 px-3 text-center">
                            {cameraError}
                          </span>
                        )}
                        {isCameraReady && !cameraError && (
                          <span className="absolute bottom-2 right-2 p-2 rounded-full bg-black/60 text-white">
                            <Camera className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </button>
                    </div>
                  )}
                  <div className="flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={startCamera}
                      className="flex-1 flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 py-4 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
                    >
                      <Camera className="w-5 h-5 text-primary" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-700">Take Photo</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => idInputRef.current?.click()}
                      className="flex-1 flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 py-4 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
                    >
                      <UploadCloud className="w-5 h-5 text-primary" />
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-700">Upload ID</span>
                    </button>
                  </div>
                  <input
                    type="file"
                    ref={idInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => setIdFile(e.target.files?.[0] || null)}
                  />
                  {idFile && (
                    <div className="flex items-center gap-2 text-primary pt-2">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-[10px] font-bold truncate">{idFile.name}</span>
                      <button type="button" onClick={() => setIdFile(null)} className="ml-auto text-slate-400 hover:text-slate-600">X</button>
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white mb-3">
                  Supporting Document <span className="text-slate-400">(optional)</span>
                </p>
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => docInputRef.current?.click()}
                    className="w-full flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 py-4 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
                  >
                    <FileText className="w-5 h-5 text-primary" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-700">Upload Document</span>
                  </button>
                  <input
                    type="file"
                    ref={docInputRef}
                    className="hidden"
                    accept=".pdf,image/*"
                    onChange={(e) => setDocFile(e.target.files?.[0] || null)}
                  />
                  {docFile && (
                    <div className="flex items-center gap-2 text-primary pt-2">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-[10px] font-bold truncate">{docFile.name}</span>
                      <button type="button" onClick={() => setDocFile(null)} className="ml-auto text-slate-400 hover:text-slate-600">X</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 sm:p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 shrink-0 flex justify-center">
          {!isVerified && !isPending ? (
            <Button
              onClick={handleSubmit}
              disabled={loading || !idFile}
              className={cn(
                "h-12 rounded-xl px-8 sm:px-28",
                "font-black uppercase tracking-widest text-[9px] transition-all",
                "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 gap-1.5 shadow-lg shadow-slate-900/20",
                "w-full sm:w-auto max-w-[280px] sm:max-w-none"
              )}
            >
              <CheckCircle2 size={14} />
              Submit
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="w-full sm:w-auto h-12 rounded-xl px-12 border-slate-200 dark:border-slate-800 font-black uppercase tracking-widest text-[9px] transition-all hover:bg-slate-50 dark:hover:bg-slate-900"
            >
              Close
            </Button>
          )}
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </DialogContent>
    </Dialog>
  );
}
