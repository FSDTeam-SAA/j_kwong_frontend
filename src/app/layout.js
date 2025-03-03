import { AR_One_Sans } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/shared/layout-wrapper";
import Head from "next/head";

const arOneSans = AR_One_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Regular, Medium, SemiBold, Bold, ExtraBold
  variable: "--font-ar-one-sans",
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
      <body className={`${arOneSans.className} antialiased bg-white`}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
