'use client'

import './styles.css'

import Cv from '@/components/CV'
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer/lib/react-pdf.browser.cjs'
import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

async function getOfferData (id: string) {
  const res = await fetch(`/api/getOffer?offerId=${id}`)
  const json = await res.json()

  return json
}

async function improveCv ({ totalWorkExperiences, abilities, offerData, role, profile }) {
  const body = { totalWorkExperiences, abilities, offerData, role, profile }
  // console.log(body)
  const res = await fetch('/api/improveCv', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(body)
  })
  const parsedRes = await res.json()
  const a = parsedRes.improved
  return a
}

export default function Playground () {
  const [data, setData] = useState({
    user: String,
    role: String,
    profile: String,
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

  const [abilities, setAbilities] = useState([])

  const [languages, setLanguages] = useState([])

  const [offerId, setOfferId] = useState('')

  const [offerData, setOfferData] = useState({
    imgUrl: String,
    title: String,
    description: String,
    skillsList: Array
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    // console.log(data)
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
    // console.log(workExperienceForm)
  }

  const handleClick = () => {
    modalRef.current.showModal()
  }

  const handleAddWorkExperience = (e: React.FormEvent) => {
    e.preventDefault()
    setTotalWorkExperiences([...totalWorkExperiences, workExperienceForm])
    console.log(totalWorkExperiences)
    modalRef.current.close()
  }

  const handleDelete = (index: number) => {
    const updatedTotalWorkExperiences = [...totalWorkExperiences]
    updatedTotalWorkExperiences.splice(index, 1)
    setTotalWorkExperiences(updatedTotalWorkExperiences)
  }

  const handleAddAbility = () => {
    setAbilities([...abilities, abilityRef.current.value])
    // console.log(abilities)
  }

  const handleDeleteAbility = (index: number) => {
    const updatedAbilities = [...abilities]
    updatedAbilities.splice(index, 1)
    setAbilities(updatedAbilities)
  }

  const handleAddLanguages = () => {
    const lang = languageRef.current.value

    if (languages.indexOf(lang) === -1 && lang !== '') {
      setLanguages([...languages, lang])
    }
    // console.log(languages)
  }

  const handleDeleteLanguage = (index: number) => {
    const updatedLanguages = [...languages]
    updatedLanguages.splice(index, 1)
    setLanguages(updatedLanguages)
  }

  const handleJobLink = () => {
    const regex = /^https:\/\/www\.infojobs\.net\/(.*)$/ig
    const link = linkRef.current.value
    const isValidLink = regex.test(link)

    if (isValidLink && link.includes('/of-i')) {
      const start = link.indexOf('/of-i') + 5
      const end = link.indexOf('?')

      const slicedJobId = link.slice(start, end)
      setOfferId(slicedJobId)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { role, profile } = data
    const res = await improveCv({
      totalWorkExperiences,
      offerData,
      abilities,
      role,
      profile
    })
    const { AIabilities, AIrole, AIworkExperiences, AIprofile } = res

    setAbilities(AIabilities)
    setData({ ...data, role: AIrole, profile: AIprofile })
    setTotalWorkExperiences(AIworkExperiences)

    roleRef.current.value = AIrole
    profileRef.current.value = AIprofile
    // console.log(res)
  }

  useEffect(() => {
    (async () => {
      const res = await getOfferData(offerId)
      setOfferData({
        title: res.title,
        imgUrl: res.profile?.logoUrl,
        description: res.description,
        skillsList: res.skillsList
      })
    })()
  }, [offerId])

  const modalRef = useRef(null)
  const abilityRef = useRef(null)
  const languageRef = useRef(null)
  const linkRef = useRef(null)
  const roleRef = useRef(null)
  const profileRef = useRef(null)

  return (
    <main className='mx-auto flex flex-col lg:flex-row [&>section]:flex-1'>
      <section className=''>
        <form id='mainForm' onSubmit={handleSubmit} autoComplete='off' />
        <form id='modalForm' onSubmit={handleAddWorkExperience} autoComplete='off' />
        <h2>Agrega tu información</h2>
            <div className='p-5 flex flex-wrap gap-3'>
              <div className='m-2'>
                <label className='block mb-2'>Nombre</label>
                <input form='mainForm' className='px-3 py-2 bg-[#202024] text-gray-300' type='text' name='user' required onChange={handleChange} />
              </div>
              <div className='m-2'>
                <label className='block mb-2'>Correo</label>
                <input form='mainForm' className='px-3 py-2 bg-[#202024] text-gray-300' type='email' name='email' placeholder='example@example.com' onChange={handleChange} />
              </div>
              <div className='m-2'>
                <label className='block mb-2'>Teléfono</label>
                <input form='mainForm' className='px-3 py-2 bg-[#202024] text-gray-300' type='number' name='phone' onChange={handleChange} />
              </div>
              <div className='m-2'>
                <label className='block mb-2'>LinkedIn</label>
                <input form='mainForm' className='px-3 py-2 bg-[#202024] text-gray-300' type='text' name='linkedIn' placeholder='in/username' onChange={handleChange} />
              </div>
              <div className='m-2'>
                <label className='block mb-2'>Github</label>
                <input form='mainForm' className='px-3 py-2 bg-[#202024] text-gray-300' type='text' name='github' placeholder='github.com/username' onChange={handleChange} />
              </div>
              <div className='m-2'>
                <label className='block mb-2'>Rol</label>
                <input form='mainForm' className='px-3 py-2 bg-[#202024] text-gray-300' type='text' name='role' placeholder='Junior Frontend' required ref={roleRef} onChange={handleChange} />
              </div>
              <div className='m-2 w-full '>
                <label className='block mb-2'>Acerca de ti</label>
                <textarea form='mainForm' className='px-3 py-2 bg-[#202024] text-gray-300 w-[92%] h-24' name='profile' placeholder='Habla un poco sobre ti. Cuantos anos de experiencia tienes, que puedes aportar y que te destaca. No te preocupes, la inteligencia artificial te dará una mano 😉' required ref={profileRef} onChange={handleChange} />
              </div>
            </div>
              <div className='p-5'>
                <div className=' mb-3'>
                  <label className='mr-5'>Añadir experiencia laboral</label>
                  <button className='px-3 py-1 border-2 border-blue-500 rounded-md text-gray-200 font-bold' onClick={handleClick}>+</button>
                </div>
                <dialog ref={modalRef} className='rounded-md bg-[#]'>
                  <button className='px-2 py-1 absolute -translate-x-4 -translate-y-4 font-bold text-red-500 hover:cursor-pointer' onClick={() => modalRef.current.close()}>✕</button>
                  <div className='mt-3'>
                    <label>Compañía</label>
                    <input form='modalForm' type='text' name='company' onChange={handleWorkDataChange} required />
                  </div>
                  <div>
                    <label>Desde:</label>
                    <input form='modalForm' type='month' name='from' onChange={handleWorkDataChange} required />
                  </div>
                  <div>
                    <label>Hasta</label>
                    <input form='modalForm' type='month' name='to' onChange={handleWorkDataChange} required />
                  </div>
                  <div>
                    <label>Rol: </label>
                    <input form='modalForm' type='text' name='jobRole' onChange={handleWorkDataChange} required />
                  </div>
                  <div className=''>
                    <label className='block'>Que labor desempeñaste?</label>
                    <textarea form='modalForm' name='description' cols={30} rows={10} onChange={handleWorkDataChange} required />
                  </div>
                  <div className='flex justify-center'>
                    <button className='px-3 py-2 bg-blue-500 rounded-md text-gray-200' form='modalForm' type='submit'>Añadir</button>
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
                <div className='lg:w-3/4'>
                  <label>Habilidades</label>
                  <input className='text-black p-1 ml-2' type='text' name='habilites' placeholder='JavaScript, React, Trabajo en Equipo etc...' ref={abilityRef} />
                  <button className='px-3 py-1 border-2 border-blue-500 rounded-md text-gray-200 font-bold' onClick={handleAddAbility}>+</button>
                  <div className='my-4 flex gap-4 flex-wrap text-sm'>
                    {abilities?.map((ability, i) => {
                      return (
                        <span className='flex justify-between items-center gap-2 border border-blue-500 pl-3 rounded-xl' key={i}>
                          <span>{ability}</span>
                          <button className='px-2 rounded-xl py-1' onClick={() => handleDeleteAbility(i)}>✕</button>
                        </span>
                      )
                    })}
                  </div>
                </div>
                <div className='lg:w-3/4'>
                  <label className='mr-2'>Idiomas</label>
                  <select className='text-black' data-placeholder='Choose a Language...' onChange={handleAddLanguages} ref={languageRef}>
                    <option value='' defaultChecked />
                    <option value='Inglés'>Inglés</option>
                    <option value='Español'>Español</option>
                    <option value='Francés'>Francés</option>
                    <option value='Alemán'>Alemán</option>
                    <option value='Italiano'>Italiano</option>
                    <option value='Portugués'>Portugués</option>
                    <option value='Chino'>Chino</option>
                  </select>
                  <div className='my-4 flex gap-4 flex-wrap text-sm'>
                    {languages?.map((language, i) => {
                      return (
                        <span className='flex justify-between items-center gap-2 border border-blue-500 pl-3 rounded-xl' key={i}>
                          <span>{language}</span>
                          <button className='px-2 rounded-xl py-1' onClick={() => handleDeleteLanguage(i)}>✕</button>
                        </span>
                      )
                    })}
                  </div>
                </div>
                {/* TODO: check link validation */}
                <div className=''>
                  <label>Link de la oferta de trabajo de <span className='font-source-sans-pro font-extrabold bg-clip-text fill-transparent text-fill-transparent bg-gradient-to-r from-indigo-500 from-10% to-sky-500 text-lg'>InfoJobs</span></label>
                  <p className='w-[60ch] text-gray-400'>*En otra pestaña de tu navegador abre la oferta de trabajo y copia y pega el link de la misma. La usaremos para adaptar tu perfil a las necesidades de la empresa y que encajes perfectamente para la oferta</p>
                  <input className='text-black p-1 mt-2 w-full' type='text' name='offerId' required placeholder='https://www.infojobs.net/...' onChange={handleJobLink} ref={linkRef} />
                  {typeof offerData.title === 'string' && (
                    <div className='mt-3 lg:w-3/4 bg-[#202024] flex flex-row justify-between items-center rounded-lg'>
                      <div className=''>
                        {typeof offerData.imgUrl === 'string'
                          ? <Image src={offerData.imgUrl} className='rounded-s-lg inline' alt='logo image' width={110} height={110} />
                          : <Image src='/no-pic.webp' className='rounded-s-lg inline' alt='logo image' width={110} height={110} />
                        }
                      </div>
                      <span className='ml-5'>{offerData.title}</span>
                    </div>
                  )}
                </div>
              </div>
        <button type='submit' form='mainForm'>Hacer la magia 🪄</button>
      </section>

      <section className=''>
        <h2>Preview</h2>
        <PDFViewer className='h-[85%] w-full'>
          <Cv {...data} languages={languages} workExperiences={totalWorkExperiences} abilities={abilities} />
        </PDFViewer>
        <div className='flex items-center justify-center p-1'>
      <PDFDownloadLink fileName='CV' document={<Cv {...data} languages={languages} />}>
      {({ loading }) => (loading ? <p>'Cargando'</p> : <button className='text-blue-50 py-2 px-4 bg-blue-500 rounded-md after:content-["↡"] after:ml-2 hover:bg-blue-200 hover:text-black hover:drop-shadow-2xl transition-all duration-300 mx-auto'>Descargar</button>)}
      </PDFDownloadLink>
    </div>
      </section>
    </main>
  )
}
