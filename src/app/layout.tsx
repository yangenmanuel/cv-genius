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
  description: `Crea curriculums profesionales en minutos con nuestro 
  generador de curriculums utilizando inteligencia artificial. Accede 
  a plantillas personalizables, obtén consejos de redacción y destaca 
  tus habilidades de manera efectiva. Interfaz intuitiva, inteligencia 
  artificial avanzada y compatibilidad multiplataforma.`
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
