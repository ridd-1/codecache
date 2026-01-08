import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "CodeCache | A Component Library",
  description: "Programming made easy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased ${montserrat.className}`}>
          <Providers>
        <Navbar/>
        {children}
        <Footer/>
        </Providers>
      </body>
    </html>
  );
}
