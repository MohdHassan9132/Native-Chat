import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const title = "nativeChat — One Chat. Every Conversation.";
const description =
  "nativeChat is a real-time messaging application built for conversations, groups, calls, media sharing and everyday communication.";

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    siteName: "nativeChat",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fafaf8",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-brand-warmCanvas text-brand-charcoal selection:bg-brand-cyanLight selection:text-brand-charcoal">
        {children}
      </body>
    </html>
  );
}
