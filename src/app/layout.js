import { Playfair_Display, Lora } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/shared/layout-wrapper";
import Head from "next/head";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"], // Adjust weight if needed
  variable: "--font-playfair",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400"], // Regular weight for body text
  variable: "--font-lora",
});

export const metadata = {
  title: "the Green Cloister",
  description:
    "Student-run environmental publication with roots at Winchester College",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>the Green Cloister</title> {/* Ensure the title updates */}
        <meta
          name="description"
          content="Student-run environmental publication with roots at Winchester College"
        />
        <link rel="icon" href="/favicon.png" /> {/* Ensure favicon is set */}
      </Head>
      <body className={`${lora.className} antialiased bg-white`}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
