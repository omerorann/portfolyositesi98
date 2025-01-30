import "./globals.css";
import { Pixelify_Sans } from "next/font/google";
import { metadata as siteMetadata } from "./metadata";

const pixelFont = Pixelify_Sans({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const metadata = siteMetadata;

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className={pixelFont.className}>
        <div className="min-h-screen text-win98-text overflow-hidden">
          {/* Windows 98 Desktop */}
          <div className="relative min-h-screen pb-8">
            {/* Desktop Content */}
            <div className="p-4">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
