// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

// Fonts
import { Inter, Poppins, Fira_Mono, Geist } from "next/font/google";

// Shadcn providers
import { TooltipProvider } from "../components/ui/tooltip";
import { Toaster } from "../components/ui/sonner";
import { AuthProvider, QueryProvider} from "../providers"
import { cn } from "../lib/utils";

import { CookieConsentBanner } from "../components/home";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const firaMono = Fira_Mono({
  variable: "--font-fira-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Haseri",
  description: "Haseri local service marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", inter.variable, poppins.variable, firaMono.variable, "font-sans", geist.variable)}
    >
      <head>
        {/* Load Noto Sans Ethiopic from Google Fonts CDN */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Ethiopic:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <style>{`
          :root {
            --font-noto-ethiopic: 'Noto Sans Ethiopic', system-ui, sans-serif;
          }
        `}</style>
      </head>
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <AuthProvider>
            <TooltipProvider>
              {children}
              <CookieConsentBanner />
              <Toaster richColors position="top-right" closeButton />
            </TooltipProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}