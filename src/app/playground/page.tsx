'use client'

import Cv from '@/components/CV'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'

export default function Playground () {
  return (
    <main className='mx-auto flex [&>section]:flex-1'>
      <section className='border w-1/2'>
        <h2>Add your information</h2>

        <form>
          <div className='p-5'>
            <h2>Datos Personales</h2>
            <input type='text' name='nameField' placeholder='Nombre Completo' />
            <input type='text' name='roleField' placeholder='Rol' />
            <input type='email' name='emailField' placeholder='E-mail' />
            <input type='number' name='phoneField' placeholder='Numero celular' />
            <input type='text' name='profileField' placeholder='Acerca de ti' />
          </div>

          <div className='p-5'>
            <input type='text' name='experienceField' placeholder='Experiencia' />
            <input type='text' name='projectsField' placeholder='Proyectos personales' />
            <input type='text' name='habilitesField' placeholder='Habilidades' />
            <input type='text' name='languagesField' placeholder='Idiomas' />
          </div>
        </form>
      </section>

      <section className='border'>
        <h2>Preview</h2>
        <PDFViewer children={<Cv />} width='100%' height='auto' />

        <div className=''>
          <PDFDownloadLink fileName='CV' document={<Cv />}>
            {({ loading }) => (loading ? <p>'Cargando'</p> : <button className='text-blue-50 py-2 px-4 bg-blue-500 rounded-md after:content-["↡"] after:ml-2 hover:bg-blue-200 hover:text-black hover:drop-shadow-2xl transition-all duration-300'>Descargar</button>)}
          </PDFDownloadLink>
        </div>
      </section>
    </main>
  )
}
