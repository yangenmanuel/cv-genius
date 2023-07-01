import './globals.css'
import { Source_Sans_Pro, Lato } from 'next/font/google'
import { Metadata } from 'next'

const sourceSansPro = Source_Sans_Pro({
  weight: '700',
  subsets: ['latin'],
  variable: '--font-source-sans-pro'
})

const lato = Lato({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-lato'
})

export const metadata: Metadata = {
  title: 'CVGenius',
  description: `Optimize your job application with our AI-powered curriculum generator. Tailor your curriculum to match Infojobs' requirements using advanced algorithms. Maximize your chances of landing the perfect job. Try now!`,
  colorScheme: 'dark',
  creator: 'Yang Enmanuel',
  openGraph: {
    images: 'https://res.cloudinary.com/dkjanvewl/image/upload/v1688221960/CVGenius_yqifo0.png',
    type: 'website'
  }
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='es' className={`${sourceSansPro.variable} ${lato.variable}`}>
      <body className='bg-[#000414] text-white'>{children}</body>
    </html>
  )
}
