'use client'

import Cv from '@/components/CV'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import { useState, useRef } from 'react'

export default function Playground () {
  const [data, setData] = useState({
    user: String,
    role: String,
    email: String,
    phone: String,
    linkedIn: String,
    github: String
  })

  const [workExperienceForm, setWorkExperienceForm] = useState({
    company: String,
    from: String,
    to: String,
    jobRole: String,
    description: String
  })

  const [totalWorkExperiences, setTotalWorkExperiences] = useState([]<workExperienceForm>)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(data)
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleWorkDataChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setWorkExperienceForm({
      ...workExperienceForm,
      [e.target.name]: e.target.value
    })
    console.log(workExperienceForm)
  }

  const handleClick = () => {
    modalRef.current.showModal()
  }

  const addWorkExperience = () => {
    setTotalWorkExperiences([...totalWorkExperiences, workExperienceForm])
    console.log(totalWorkExperiences)
    modalRef.current.close()
  }

  const handleDelete = (index: number) => {
    const updatedTotalWorkExperiences = [...totalWorkExperiences]
    updatedTotalWorkExperiences.splice(index, 1)
    setTotalWorkExperiences(updatedTotalWorkExperiences)
  }

  const modalRef = useRef(null)

  return (
    <main className='mx-auto flex flex-col lg:flex-row [&>section]:flex-1'>
      <section className=''>
        <h2>Add your information</h2>

          <div className='p-5'>
            <h2>Datos Personales</h2>

            <div className=''>
              <label>Nombre</label>
              <input className='text-black p-1' type='text' name='user' required onChange={handleChange} />
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
            <div className=' mb-3'>
              <label className='mr-5'>Añadir experiencia laboral</label>
              <button className='px-3 py-1 border-2 border-blue-500 rounded-md text-gray-200 font-bold' onClick={handleClick}>+</button>
            </div>

            <dialog ref={modalRef} className='rounded-md bg-[#]'>
              <div>
                <label>Compañía</label>
                <input type='text' name='company' onChange={handleWorkDataChange} required />
              </div>
              <div>
                <label>Desde:</label>
                <input type='month' name='from' onChange={handleWorkDataChange} required />
              </div>
              <div>
                <label>Hasta</label>
                <input type='month' name='to' onChange={handleWorkDataChange} required />
              </div>
              <div>
                <label>Rol: </label>
                <input type='text' name='jobRole' onChange={handleWorkDataChange} required />
              </div>
              <div className=''>
                <label className='block'>Que labor desempeñaste?</label>
                <textarea name='description' cols={30} rows={10} onChange={handleWorkDataChange} required />
              </div>
              <div className='flex justify-center'>
                <button className='px-3 py-2 bg-blue-500 rounded-md text-gray-200' onClick={addWorkExperience}>Añadir</button>
              </div>
            </dialog>

            <div>
              {totalWorkExperiences && totalWorkExperiences.map((item, i) => {
                return (
                  <div className='bg-[#202020] px-2 py-4 block rounded-md mb-2 flex justify-between items-center' key={i}>
                    <div className=''>
                      {item.from.replace('-', '/')}-{item.to.replace('-', '/')}
                      <span className='mx-5'>{item.company}</span>
                      {item.jobRole}
                    </div>
                    <div className=''>
                      <button className='bg-[#202024] border border-red-500 px-3 rounded-md font-bold text-lg' onClick={() => handleDelete(i)}>-</button>
                    </div>
                  </div>
                )
              })}
            </div>

            <input className='text-black p-1' type='text' name='habilites' placeholder='Habilidades' onChange={handleChange} />
            <input className='text-black p-1' type='text' name='languages' placeholder='Idiomas' onChange={handleChange} />
          </div>
      </section>

      <section className=''>
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
