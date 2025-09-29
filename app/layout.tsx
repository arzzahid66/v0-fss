import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins, Noto_Nastaliq_Urdu } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

const notoNastaliqUrdu = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-urdu",
})

export const metadata: Metadata = {
  title: "Fatima School & College - Our Motto: Play, Laugh, Learn",
  description:
    "Leading educational institution in Faisalabad, Pakistan. Nurturing young minds with Unity, Faith, and Discipline since our foundation.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} ${poppins.variable} ${notoNastaliqUrdu.variable} antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </body>
    </html>
  )
}
