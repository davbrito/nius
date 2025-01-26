import "../styles/globals.css";

import PageFooter from "@/components/PageFooter";
import HiddenLinks from "@/components/HiddenLinks";
import Header from "@/components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <HiddenLinks />
        <Header />
        <main id="main-content" className="container">
          {children}
        </main>
        <PageFooter />
      </body>
    </html>
  );
}
