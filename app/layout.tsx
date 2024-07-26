import Canvas from "@/app/_components/CanvasBG";
import Header from "@/app/_components/HeaderComponents/Header";
import type { Metadata } from "next";
import { Inter, Orbitron, Silkscreen } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ContextStuffProvider } from "@/lib/Context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | NEON",
    default: "Welcome | NEON",
  },
  description: "Home page of NEON Website home for good fashion",
};

const silkscreen = Silkscreen({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  variable: "--fontSilkscreen",
});
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: [],
  variable: "--orbitron",
});

const tiny5 = localFont({
  src: "../public/fonts/Tiny5-Regular.ttf",
  display: "swap",
  variable: "--tiny5",
});
const saibaOutline = localFont({
  src: "../public/fonts/SAIBA-45-Outline.ttf",
  display: "swap",
  variable: "--saibaOutline",
});
const saiba = localFont({
  src: "../public/fonts/SAIBA-45.ttf",
  display: "swap",
  variable: "--saiba",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${silkscreen.variable} ${orbitron.variable} ${tiny5.variable}${saiba.variable} ${saibaOutline.variable} `}
      >
        <Canvas />
        <ContextStuffProvider>
          <div className="h-full ">
            <main className=" "> {children}</main>
          </div>
        </ContextStuffProvider>
      </body>
    </html>
  );
}
