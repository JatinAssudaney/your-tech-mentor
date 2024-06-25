import type { Metadata } from "next";
import { Source_Code_Pro } from "next/font/google";
import "./globals.css";
import { ConfigProvider } from "antd";

const inter = Source_Code_Pro({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your Tech Mentor",
  description: "Let AI guide you to become a successfull software engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/noun-teacher-642111.svg" />
      </head>
      <body className={inter.className}>
        <ConfigProvider theme={{ token: { fontFamily: "Source Code Pro" } }}>
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}
