import type { Metadata } from "next";
import { Geist_Mono, Manrope } from "next/font/google";
import "./globals.css";
import "@xyflow/react/dist/style.css";
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import QueryProvider from "@/components/query-provider"



const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OpenSesame",
  description: "The AI coworker for your SaaS product",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${manrope.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <SidebarProvider>
            <AppSidebar />
            <main className="flex-1">
              {children}
            </main>
          </SidebarProvider>
        </QueryProvider>
      </body>
    </html>
  );
}


