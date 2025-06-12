import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Import Inter from next/font
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

// Initialize Inter font
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'ProNetwork',
  description: 'Professional networking platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <head>
        {/* Google Fonts link is managed by next/font, so explicit link tags for Inter are not needed here if using next/font. */}
        {/* If not using next/font, the link tags would be:
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        */}
      </head>
      <body className="font-body antialiased bg-background text-foreground min-h-screen flex flex-col">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
