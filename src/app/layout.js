import localFont from "next/font/local";
import "./globals.css";
import LayoutWrapper from "@/components/shared/layout-wrapper";
import Head from "next/head";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "the Green Cloister",
  description: "Student-run environmental publication with roots at Winchester College",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>the Green Cloister</title> {/* Ensure the title updates */}
        <meta name="description" content="Student-run environmental publication with roots at Winchester College" />
        <link rel="icon" href="/favicon.png" /> {/* Ensure favicon is set */}
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
