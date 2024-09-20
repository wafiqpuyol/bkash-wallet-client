import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ApolloProvider from "@/queries/apolloProvider"
import { apolloClient } from "@/queries/apolloClient"
import { ToastContainer } from "react-toastify";
import { MonitorProvider } from "@/context/MonitorContext"

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

export const metadata: Metadata = {
  title: "Octoprob",
  description: "Monitor service become ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ApolloProvider client={apolloClient}>
          <MonitorProvider>
            {children}
          </MonitorProvider>
          <ToastContainer />
        </ApolloProvider>
      </body>
    </html>
  );
}
