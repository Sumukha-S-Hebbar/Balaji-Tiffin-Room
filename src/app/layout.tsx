import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dravida Heritage | Authentic South Indian Fine Dining',
  description: 'Experience the vintage elegance of South Indian culinary heritage at Dravida Heritage. Premium Idly, Dosa, and Vada since ages.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Lora:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground selection:bg-primary/30">
        <div className="vintage-overlay" />
        {children}
      </body>
    </html>
  );
}
