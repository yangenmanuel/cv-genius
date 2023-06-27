import './globals.css'
import { Source_Sans_3, Lato } from 'next/font/google'

const sourceSansPro = Source_Sans_3({
  weight: '700',
  subsets: ['latin'],
  variable: '--font-source-sans-pro'
})

const lato = Lato({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-lato'
})

export const metadata = {
  title: 'CVGenius',
  description: `Optimize your job application with our AI-powered curriculum generator. Tailor your curriculum to match Infojobs' requirements using advanced algorithms. Maximize your chances of landing the perfect job. Try now!`
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='es' className={`${sourceSansPro.variable} ${lato.variable}`}>
      <body className='bg-[#000414] text-white h-screen'>{children}</body>
    </html>
  )
}
