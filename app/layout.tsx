import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const nogard = localFont({
  src: "../public/fonts/nogard_text.ttf",
});

export const metadata: Metadata = {
  title: "Champions Assistant",
  description: "A Pokémon Champions Assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${nogard.className} min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
