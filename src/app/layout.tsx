import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "قادة الاقتصاد | Economy Leaders",
  description: "منصة إعلامية سعودية تُبرز دور القطاع الخاص في تحقيق مستهدفات رؤية السعودية 2030",
  keywords: ["قادة الاقتصاد", "Economy Leaders", "السعودية 2030", "برنامج اقتصادي"],
  authors: [{ name: "رام الجزيرة للإنتاج الإعلامي" }],
  openGraph: {
    title: "قادة الاقتصاد | Economy Leaders",
    description: "منصة إعلامية سعودية تُبرز دور القطاع الخاص في تحقيق مستهدفات رؤية السعودية 2030",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        {/* Google Fonts - Arabic & English */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700;800&family=Almarai:wght@300;400;700;800&family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
        {/* Font Awesome 6 Free - All Icons */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          crossOrigin="anonymous"
        />
        {/* Animate.css */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
      </head>
      <body className="antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
