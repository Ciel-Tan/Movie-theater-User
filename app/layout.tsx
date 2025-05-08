import type React from "react"
import { Inter } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import { Suspense } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { AccountProvider } from "@/context/accountContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "CielTanMovies - Movie Theater"
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AccountProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <Suspense>
                <main className="flex-1">{children}</main>
              </Suspense>
              <Footer />
            </div>
          </AccountProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
