"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import { Menu, X, Search, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useAuth } from "@/src/hooks/useAuth";
import { UserMenu } from "@/src/features/shared/components";

export const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Explore", href: "/jobs" },
    { name: "Providers", href: "/providers" },
    { name: "Categories", href: "/categories" },
    { name: "How it Works", href: "/how-it-works" },
    { name: "About", href: "/about" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "mx-auto max-w-7xl h-16 rounded-xl flex items-center justify-between px-6 transition-all duration-300 border-2",
          isScrolled
            ? "bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border-primary/40 shadow-[0_0_20px_-5px_rgba(225,29,72,0.15)]"
            : "bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-primary/20"
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-primary rounded-none flex items-center justify-center transform group-hover:rotate-90 transition-transform duration-500">
            <span className="text-white font-black text-2xl">H</span>
          </div>
          <span className="text-2xl font-black font-heading tracking-tighter text-foreground uppercase">
            Haseri<span className="text-primary">.</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-foreground/70 hover:text-primary">
            <Search className="w-5 h-5" />
          </Button>
          
          <div className="h-4 w-px bg-border/60 mx-1" />

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="text-foreground/70 hover:text-primary relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
              </Button>
              <UserMenu />
            </div>
          ) : (
            <>
              <Button variant="ghost" className="rounded-none font-bold uppercase text-xs tracking-widest" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button className="rounded-none px-5 h-10 bg-primary hover:bg-primary/90 text-white font-bold uppercase text-xs tracking-widest shadow-none border-2 border-primary transition-all active:scale-95" asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-24 left-4 right-4 bg-white dark:bg-slate-950 rounded-none p-8 shadow-2xl border-2 border-foreground md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-2xl font-black uppercase tracking-tighter hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-border my-2" />
              <div className="flex flex-col gap-4">
                {isAuthenticated ? (
                  <UserMenu />
                ) : (
                  <>
                    <Button variant="outline" className="rounded-none w-full h-14 border-2 border-foreground font-bold uppercase tracking-widest" asChild>
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button className="rounded-none w-full h-14 bg-primary text-white font-bold uppercase tracking-widest" asChild>
                      <Link href="/register/customer">Join Now</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
