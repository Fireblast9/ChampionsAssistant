import githubLogo from "@/images/githubLogo.png";
import type { Metadata } from "next";
import { NavigationGuardProvider } from "next-navigation-guard";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

const nogard = localFont({
  src: "../fonts/nogard_text.ttf",
});

const baseTitle = "Champions Assistant";
const baseDesc = "A Pokémon Champions Assistant";
const baseUrl = new URL("https://calc.soulsbros.ch");

export const metadata: Metadata = {
  title: {
    template: `%s - ${baseTitle}`,
    default: baseTitle,
  },
  description: baseDesc,
  authors: [{ name: "Soulsbros", url: "https://soulsbros.ch" }],
  metadataBase: baseUrl,
  openGraph: {
    type: "website",
    url: baseUrl,
    title: {
      template: `%s - ${baseTitle}`,
      default: baseTitle,
    },
    description: baseDesc,
    siteName: baseTitle,
    images: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-CH" className="h-full antialiased">
      <body className={`${nogard.className} min-h-full flex flex-col`}>
        <NavigationGuardProvider>{children}</NavigationGuardProvider>
        <footer className="flex space-x-2 p-4 items-center justify-center">
          <p>&copy;{new Date().getFullYear()} Fireblast9</p>
          <Link
            href="https://github.com/Fireblast9/ChampionsAssistant"
            target="_blank"
            className="hover:rotate-45 transition-all"
          >
            <Image src={githubLogo} width={32} alt="GitHub logo" />
          </Link>
        </footer>
      </body>
    </html>
  );
}
