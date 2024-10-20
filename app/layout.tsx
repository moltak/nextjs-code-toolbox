import './globals.css'
import { Inter } from 'next/font/google'
import SideMenu from '../components/SideMenu'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'JSON Tools',
  description: 'JSON formatting and conversion tools',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={inter.className}>
        <div className="flex">
          <SideMenu />
          <main className="flex-grow p-8">{children}</main>
        </div>
      </body>
    </html>
  )
}
