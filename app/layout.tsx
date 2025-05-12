import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Reachinbox - Smart Email Management",
  description: "Manage your emails efficiently with Reachinbox",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-900 text-gray-100`}>
        {children}
        <Script id="theme-script" strategy="beforeInteractive">
          {`
            // Check if theme is stored in localStorage
            const storedTheme = localStorage.getItem('theme')
            if (storedTheme === 'light') {
              document.documentElement.classList.remove('dark')
            } else {
              document.documentElement.classList.add('dark')
            }
          `}
        </Script>
      </body>
    </html>
  )
}
