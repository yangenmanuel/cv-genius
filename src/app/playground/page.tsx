'use client'

import Cv from '@/components/CV'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import { useState } from 'react'

export default function Playground () {
  const [data, setData] = useState({
    name: String,
    role: String,
    email: String,
    phone: String,
    linkedIn: String,
    github: String,
    profile: String
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(data)
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  return (
    <main className='mx-auto flex flex-col lg:flex-row [&>section]:flex-1'>
      <section className='border'>
        <h2>Add your information</h2>

        <form className=''>
          <div className='p-5'>
            <h2>Datos Personales</h2>

            <div className=''>
              <label>Nombre</label>
              <input className='text-black p-1' type='text' name='name' required onChange={handleChange} />
            </div>

            <div className='m-2'>
              <label>Rol</label>
              <input className='text-black p-1' type='text' name='role' placeholder='Ingeniero de Software, Junior Frontend Developer etc...' onChange={handleChange} />
            </div>

            <div className='m-2'>
              <label>Correo</label>
              <input className='text-black p-1' type='email' name='email' placeholder='example@example.com' onChange={handleChange} />
            </div>

            <div className='m-2'>
              <label>Teléfono</label>
              <input className='text-black p-1' type='number' name='phone' onChange={handleChange} />
            </div>

            <div className='m-2'>
              <label>LinkedIn</label>
              <input className='text-black p-1' type='text' name='linkedIn' placeholder='in/username' onChange={handleChange} />
            </div>

            <div className='m-2'>
              <label>Github</label>
              <input className='text-black p-1' type='text' name='github' placeholder='github.com/username' onChange={handleChange} />
            </div>

            <div className='m-2'>
              <label>Acerca de ti</label>
              <textarea name='profile' placeholder='Habla un poco sobre ti. Cuantos anos de experiencia tienes, que puedes aportar y que te destaca. No te preocupes, la inteligencia artificial te dará una mano 😉' onChange={handleChange} />
            </div>
          </div>

          <div className='p-5'>
            <input className='text-black p-1' type='text' name='experience' placeholder='Experiencia' onChange={handleChange} />
            <input className='text-black p-1' type='text' name='projects' placeholder='Proyectos personales' onChange={handleChange} />
            <input className='text-black p-1' type='text' name='habilites' placeholder='Habilidades' onChange={handleChange} />
            <input className='text-black p-1' type='text' name='languages' placeholder='Idiomas' onChange={handleChange} />
          </div>
        </form>
      </section>

      <section className='border'>
        <h2>Preview</h2>
        <PDFViewer className='h-[85%] w-full'>
          <Cv {...data} />
        </PDFViewer>

        <div className=''>
          {/* Need 2 times the Cv component with the same props because one is the pdf rendering in the browser
              and other is the pdf that is going to be downloaded
          */}
          <div className='flex items-center justify-center p-1'>
            <PDFDownloadLink fileName='CV' document={<Cv {...data} />}>
              {({ loading }) => (loading ? <p>'Cargando'</p> : <button className='text-blue-50 py-2 px-4 bg-blue-500 rounded-md after:content-["↡"] after:ml-2 hover:bg-blue-200 hover:text-black hover:drop-shadow-2xl transition-all duration-300 mx-auto'>Descargar</button>)}
            </PDFDownloadLink>
          </div>
        </div>
      </section>
    </main>
  )
}
