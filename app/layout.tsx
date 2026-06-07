import "../styles/globals.css";

import PageFooter from "@/components/PageFooter";
import HiddenLinks from "@/components/HiddenLinks";
import Header from "@/components/Header";
import { Cormorant_Garamond, Space_Grotesk } from "next/font/google";
import { negotiateLanguage } from "@/lib/language";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const bodyFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "700"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = await negotiateLanguage();
  return (
    <html lang={lang} data-scroll-behavior="smooth">
      <body
        className={`${displayFont.variable} ${bodyFont.variable} text-ink relative bg-[radial-gradient(circle_at_top_left,rgba(187,77,0,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(21,110,92,0.12),transparent_24%),linear-gradient(180deg,#fbf6ed_0%,#f5f1e8_38%,#efe5d6_100%)] antialiased`}
      >
        <HiddenLinks />
        <div className="relative isolate flex min-h-screen flex-col">
          <Header lang={lang} />
          <main
            id="main-content"
            className="relative mx-auto w-[min(1180px,calc(100%-2rem))] flex-1 pb-16 max-[720px]:w-[min(100%-1rem,1180px)]"
          >
            {children}
          </main>
          <PageFooter />
        </div>
      </body>
    </html>
  );
}
