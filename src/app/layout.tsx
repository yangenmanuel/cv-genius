import './globals.css'

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
    <html lang='es'>
      <body>{children}</body>
    </html>
  )
}
