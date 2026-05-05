"use client";
// This component renders a Google Quick Login prompt that appears on the homepage when the Google Identity Services library is ready. It uses the useGoogleRegister hook to handle the login process and displays a styled prompt with a call-to-action button for users to continue with their Google account.
import React, { useEffect, useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Cookie, Loader2 } from "lucide-react";
import { useGoogleRegister } from "@/src/features/auth/shared";

export const GoogleQuickLogin = () => {
	const { googleLoading, googleReady, handleGoogleLogin } = useGoogleRegister();
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		if (googleReady && typeof window !== "undefined" && window.google?.accounts?.id) {
			window.google.accounts.id.prompt((notification: any) => {
				if (notification.isDisplayMoment() && notification.isDisplayed()) {
					setIsVisible(true);
				} else if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
					setIsVisible(false);
				}
			});
		}
	}, [googleReady]);

	if (!isVisible) return null;

	return (
		<div className="w-full border-2 border-border bg-white/80 dark:bg-slate-950/70 backdrop-blur-xl p-6 sm:p-8 relative overflow-hidden group">
			<div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
			<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
				<div className="flex gap-4">
					<div className="p-3 bg-primary/10 rounded-full hidden sm:flex shrink-0">
						<Cookie className="w-6 h-6 text-primary" />
					</div>
					<div>
						<p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2">Instant Access</p>
						<h3 className="text-2xl font-black tracking-tighter uppercase leading-none">Welcome back to Haseri</h3>
						<p className="text-sm text-muted-foreground max-w-md mt-3 font-medium">Jump back into your projects in one click. Secure, fast, and verified.</p>
					</div>
				</div>
				<Button
					onClick={handleGoogleLogin}
					disabled={googleLoading}
					className="rounded-none h-14 px-10 bg-primary text-white font-black uppercase text-xs tracking-[0.2em] border-2 border-primary hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 active:scale-95"
				>
					{googleLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
					{googleLoading ? "Authenticating..." : "Continue with Google"}
				</Button>
			</div>
		</div>
	);
};
