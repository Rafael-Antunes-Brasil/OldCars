import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: 'Carros antigos - Seu portal de veículos clássicos',
  description: 'Explore o mundo dos carros antigos com artigos, histórias e dicas de restauração. Tudo sobre veículos clássicos em um só lugar.',
  openGraph: {
    title: 'Carros antigos - Seu portal de veículos clássicos',
    description: 'Conheça a história por trás dos veículos que marcaram época e descubra como preservar essas joias automotivas.'
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true
    }
  },
  alternates: {
    canonical: '/',
  },
  keywords: ['carros antigos', 'motos antigos', 'veículos clássicos', 'restauração de carros', 'automóveis vintage', 'nostalgia'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className="antialiased min-h-screen flex flex-col bg-zinc-900 text-white"
        suppressHydrationWarning
      >
        <Header />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
