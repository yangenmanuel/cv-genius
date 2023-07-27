import './globals.css'
import { Source_Sans_Pro, Lato } from 'next/font/google'
import { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import LanguageSelector from '@/components/LanguageSelector'

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
  description:
    'Optimize your job application with our AI-powered curriculum generator. Tailor your curriculum to match InfoJobs requirements using advanced algorithms. Maximize your chances of landing the perfect job. Try now!',
  colorScheme: 'dark',
  creator: 'Yang Enmanuel',
  openGraph: {
    images:
      'https://res.cloudinary.com/dkjanvewl/image/upload/v1688221960/CVGenius_yqifo0.png',
    type: 'website'
  }
}

export function generateStaticParams() {
  return [{ locale: 'es' }, { locale: 'en' }, { locale: 'pt' }]
}

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  let messages
  try {
    messages = (await import(`../../messages/${locale}.json`)).default
  } catch (err) {
    notFound()
  }

  return (
    <html
      lang={locale}
      className={`${sourceSansPro.variable} ${lato.variable}`}
    >
      <body className='bg-[#000414] text-white overflow-x-hidden overflow-y-auto'>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LanguageSelector />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
