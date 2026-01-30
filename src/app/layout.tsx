import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { DynamicWatermark } from '@/components/layout/dynamic-watermark';

export const metadata: Metadata = {
  title: 'Tamil Research Validator',
  description: 'A professional research and validation application by VKP-CFS',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <DynamicWatermark />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
          {children}
          <Toaster />
      </body>
    </html>
  );
}
