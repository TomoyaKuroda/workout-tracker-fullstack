import './globals.css'
import { Inter } from 'next/font/google'
import SessionProvider from './SessionProvider'
import Layout from '@/components/Layout'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Workout Tracker',
  description: 'Track your workouts and achieve your fitness goals',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Layout>{children}</Layout>
        </SessionProvider>
      </body>
    </html>
  )
}