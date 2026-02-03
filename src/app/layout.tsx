import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header, BottomNav, DisclaimerFooter } from "@/components/layout";
import { FloatingCallButton } from "@/components/emergency";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "DOTQUY.NHANH - Nhận biết & phản ứng nhanh với đột quỵ",
  description: "Website hỗ trợ nhận biết dấu hiệu đột quỵ nhanh chóng. Test BE FAST 15 giây, số cấp cứu theo tỉnh, hướng dẫn xử lý khẩn cấp.",
  keywords: ["đột quỵ", "cấp cứu", "BE FAST", "stroke", "115", "cấp cứu đột quỵ"],
  authors: [{ name: "DOTQUY.NHANH" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ĐộtQuỵ",
  },
  openGraph: {
    title: "DOTQUY.NHANH - Nhận biết & phản ứng nhanh với đột quỵ",
    description: "Test BE FAST 15 giây. Gọi cấp cứu 1 chạm. Hướng dẫn xử lý khẩn cấp.",
    type: "website",
    locale: "vi_VN",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#dc2626",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.variable} font-sans antialiased bg-[--background] text-[--foreground]`}>
        <Header />

        <main className="min-h-screen pb-24 md:pb-8">
          {children}
        </main>

        <DisclaimerFooter />
        <BottomNav />

        {/* Floating Call Button - Fixed position */}
        <div className="fixed bottom-20 left-4 right-4 z-50 md:bottom-6 md:left-auto md:right-6 md:w-72">
          <FloatingCallButton size="lg" />
        </div>
      </body>
    </html>
  );
}
