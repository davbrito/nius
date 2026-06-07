import "../styles/globals.css";

import PageFooter from "@/components/PageFooter";
import HiddenLinks from "@/components/HiddenLinks";
import Header from "@/components/Header";
import { Cormorant_Garamond, Space_Grotesk } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

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
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${displayFont.variable} ${bodyFont.variable}`}
    >
      <body className="text-foreground relative">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <HiddenLinks />
          <div className="relative isolate flex min-h-screen flex-col">
            <Header lang={locale} />
            <main
              id="main-content"
              className="relative mx-auto w-[min(1180px,calc(100%-2rem))] flex-1 pb-16 max-[720px]:w-[min(100%-1rem,1180px)]"
            >
              {children}
            </main>
            <PageFooter />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
