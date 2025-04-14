import AppProvider from "@/app/app-provider";
import { baseOpenGraph } from "@/app/shared-metadata";
import Header from "@/components/header";
import SlideSession from "@/components/slide-session";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["vietnamese"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Monkey",
    default: "Monkey",
  },
  description: "Haluhak Fuck You",
  openGraph: baseOpenGraph,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <Toaster />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppProvider>
            <Header />
            {children}
            <Toaster richColors />
            <SlideSession />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
