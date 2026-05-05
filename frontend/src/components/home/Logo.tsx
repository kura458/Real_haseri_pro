"use client";
// This component renders the logo for the Haseri platform, which consists of a stylized "H" inside a colored box and the brand name "Haseri." The logo is responsive and can be customized in size through props. It also includes a hover animation that rotates the box when hovered over, creating an engaging visual effect for users.
import React from "react";
import Link from "next/link";

type LogoProps = {
	size?: "sm" | "md" | "lg";
	href?: string;
};

const sizeStyles = {
	sm: {
		box: "w-9 h-9",
		text: "text-xl",
		word: "text-2xl",
	},
	md: {
		box: "w-10 h-10",
		text: "text-2xl",
		word: "text-3xl",
	},
	lg: {
		box: "w-12 h-12",
		text: "text-2xl",
		word: "text-4xl",
	},
};

export const Logo = ({ size = "md", href = "/" }: LogoProps) => {
	const styles = sizeStyles[size];

	return (
		<Link href={href} className="flex items-center gap-3 group">
			<div
				className={`${styles.box} bg-primary rounded-none flex items-center justify-center transform group-hover:rotate-90 transition-transform duration-500`}
			>
				<span className={`text-white font-black ${styles.text}`}>H</span>
			</div>
			<span className={`${styles.word} font-black font-heading tracking-tighter text-foreground uppercase`}>
				Haseri<span className="text-primary">.</span>
			</span>
		</Link>
	);
};
