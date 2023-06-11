'use client'

import './styles.css'

import Cv from '@/components/CV'
import {
  PDFViewer,
  PDFDownloadLink
} from '@react-pdf/renderer/lib/react-pdf.browser.cjs'
import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

import type { UserData, WorkExperience, Languages, OfferData } from '@/types'

async function getOfferData(id: string) {
  const res = await fetch(`/api/getOffer?offerId=${id}`)
  const json = await res.json()

  return json
}

async function improveCv({
  totalWorkExperiences,
  abilities,
  offerData,
  role,
  profile
}: {
  totalWorkExperiences: WorkExperience[]
  abilities: string[]
  offerData: OfferData
  role: string
  profile: string
}) {
  const body = { totalWorkExperiences, abilities, offerData, role, profile }
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

export default function Playground() {
  const [data, setData] = useState<UserData>({
    user: '',
    role: '',
    profile: '',
    email: '',
    phone: '',
    linkedIn: '',
    github: ''
  })

  const [workExperience, setWorkExperience] = useState<WorkExperience>({
    company: '',
    from: '',
    to: '',
    jobRole: '',
    description: ''
  })

  const [totalWorkExperiences, setTotalWorkExperiences] = useState<
    WorkExperience[]
  >([])

  const [abilities, setAbilities] = useState<string[]>([])

  const [languages, setLanguages] = useState<Languages[]>([])

  const [offerId, setOfferId] = useState<string>('')

  const [offerData, setOfferData] = useState<OfferData>({
    title: '',
    imgUrl: '',
    description: '',
    skillsList: []
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }))
  }

  const handleWorkDataChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setWorkExperience((prevWorkExperience) => ({
      ...prevWorkExperience,
      [e.target.name]: e.target.value
    }))
  }

  const handleAddWorkExperience = (e: React.FormEvent) => {
    e.preventDefault()
    setTotalWorkExperiences([...totalWorkExperiences, workExperience])
    console.log(totalWorkExperiences)
    modalRef.current?.close()
  }

  const handleDelete = (index: number) => {
    const updatedTotalWorkExperiences = [...totalWorkExperiences]
    updatedTotalWorkExperiences.splice(index, 1)
    setTotalWorkExperiences(updatedTotalWorkExperiences)
  }

  const handleAddAbility = () => {
    const value = abilityRef.current?.value as string
    if (value !== '') {
      const capitalizedAbility = value.charAt(0).toUpperCase() + value.slice(1)

      setAbilities((prevAbilities) => [...prevAbilities, capitalizedAbility])
    }

    if (abilityRef.current !== null) {
      abilityRef.current.value = ''
      abilityRef.current.focus()
    }
  }

  const handleDeleteAbility = (index: number) => {
    const updatedAbilities = [...abilities]
    updatedAbilities.splice(index, 1)
    setAbilities(updatedAbilities)
  }

  const handleAddLanguages = () => {
    const lang = languageRef.current?.value as Languages

    if (!languages.includes(lang) && lang !== '') {
      setLanguages((prevLanguages) => [...prevLanguages, lang])
    }
  }

  const handleDeleteLanguage = (index: number) => {
    const updatedLanguages = [...languages]
    updatedLanguages.splice(index, 1)
    setLanguages(updatedLanguages)
  }

  const handleJobLink = () => {
    const regex = /^https:\/\/www\.infojobs\.net\/(.*)$/gi
    const link = linkRef.current?.value as string
    const isValidLink = regex.test(link)

    if (isValidLink && link.includes('/of-i')) {
      const start = link.indexOf('/of-i') + 5
      const end = link.indexOf('?')

      const slicedJobId = link.slice(start, end)
      setOfferId(slicedJobId)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true)
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

    if (roleRef.current !== null && profileRef.current !== null) {
      roleRef.current.value = AIrole
      profileRef.current.value = AIprofile
    }

    setLoading(false)
  }

  useEffect(() => {
    void (async () => {
      const res = await getOfferData(offerId)
      setOfferData({
        title: res?.title,
        imgUrl: res.profile?.logoUrl,
        description: res?.description,
        skillsList: res?.skillsList
      })
    })()
  }, [offerId])

  const modalRef = useRef<HTMLDialogElement>(null)
  const abilityRef = useRef<HTMLInputElement>(null)
  const languageRef = useRef<HTMLSelectElement>(null)
  const linkRef = useRef<HTMLInputElement>(null)
  const roleRef = useRef<HTMLInputElement>(null)
  const profileRef = useRef<HTMLTextAreaElement>(null)

  return (
    <main className='mx-auto flex flex-col lg:flex-row [&>section]:flex-1'>
      <section className=''>
        <form id='mainForm' onSubmit={handleSubmit} autoComplete='off' />
        <form
          id='modalForm'
          onSubmit={handleAddWorkExperience}
          autoComplete='off'
        />
        <h2 className='my-2 ml-5 font-source-sans-pro text-2xl font-light'>
          Agrega tu información
        </h2>
        <div className='flex flex-wrap gap-3 p-5'>
          <div className='m-2'>
            <label className='mb-2 block'>Nombre</label>
            <input
              form='mainForm'
              className='rounded-md bg-[#202024] px-3 py-2 text-gray-300'
              type='text'
              name='user'
              required
              onChange={handleChange}
            />
          </div>
          <div className='m-2'>
            <label className='mb-2 block'>Correo</label>
            <input
              form='mainForm'
              className='rounded-md bg-[#202024] px-3 py-2 text-gray-300'
              type='email'
              name='email'
              placeholder='example@example.com'
              onChange={handleChange}
            />
          </div>
          <div className='m-2'>
            <label className='mb-2 block'>Teléfono</label>
            <input
              form='mainForm'
              className='rounded-md bg-[#202024] px-3 py-2 text-gray-300'
              type='number'
              name='phone'
              onChange={handleChange}
            />
          </div>
          <div className='m-2'>
            <label className='mb-2 block'>LinkedIn</label>
            <input
              form='mainForm'
              className='rounded-md bg-[#202024] px-3 py-2 text-gray-300'
              type='text'
              name='linkedIn'
              placeholder='in/username'
              onChange={handleChange}
            />
          </div>
          <div className='m-2'>
            <label className='mb-2 block'>Github</label>
            <input
              form='mainForm'
              className='rounded-md bg-[#202024] px-3 py-2 text-gray-300'
              type='text'
              name='github'
              placeholder='github.com/username'
              onChange={handleChange}
            />
          </div>
          <div className='m-2'>
            <label className='mb-2 block'>Rol</label>
            <input
              form='mainForm'
              className='rounded-md bg-[#202024] px-3 py-2 text-gray-300'
              type='text'
              name='role'
              placeholder='Junior Frontend'
              required
              ref={roleRef}
              onChange={handleChange}
            />
          </div>
          <div className='m-2 w-full '>
            <label className='mb-2 block'>Acerca de ti</label>
            <textarea
              form='mainForm'
              className='h-24 w-[92%] rounded-md bg-[#202024] px-3 py-2 text-gray-300'
              name='profile'
              placeholder='Habla un poco sobre ti. Cuantos anos de experiencia tienes, que puedes aportar y que te destaca. No te preocupes, la inteligencia artificial te dará una mano 😉'
              required
              ref={profileRef}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='px-5'>
          <div className='mb-3'>
            <label className='mr-3'>Añadir experiencia laboral</label>
            <button
              className='rounded-md border-2 border-blue-500 px-3 py-1 font-bold text-gray-200'
              onClick={() => modalRef.current?.showModal()}
            >
              +
            </button>
          </div>
          <dialog ref={modalRef} className='rounded-md bg-[#202020]'>
            <button
              className='absolute -translate-x-4 -translate-y-4 px-2 py-1 font-bold text-red-500 hover:cursor-pointer'
              onClick={() => modalRef.current?.close()}
            >
              ✕
            </button>
            <div className='mt-5'>
              <label className='block text-white'>Compañía</label>
              <input
                className='rounded-md bg-[#353535] px-3 py-2 text-gray-300'
                form='modalForm'
                type='text'
                name='company'
                onChange={handleWorkDataChange}
                required
              />
            </div>
            <div className='mt-3'>
              <label className='block text-white'>Desde:</label>
              <input
                className='rounded-md bg-[#353535] px-3 py-2 text-gray-300'
                form='modalForm'
                type='month'
                name='from'
                onChange={handleWorkDataChange}
                required
              />
            </div>
            <div className='mt-3'>
              <label className='block text-white'>Hasta</label>
              <input
                className='rounded-md bg-[#353535] px-3 py-2 text-gray-300'
                form='modalForm'
                type='month'
                name='to'
                onChange={handleWorkDataChange}
                required
              />
            </div>
            <div className='mt-3'>
              <label className='block text-white'>Rol: </label>
              <input
                className='rounded-md bg-[#353535] px-3 py-2 text-gray-300'
                form='modalForm'
                type='text'
                name='jobRole'
                onChange={handleWorkDataChange}
                required
              />
            </div>
            <div className='mt-3'>
              <label className='block text-white'>
                Que labor desempeñaste?
              </label>
              <textarea
                className='rounded-lg bg-[#353535] px-3 py-2 text-gray-300'
                form='modalForm'
                name='description'
                cols={40}
                rows={5}
                onChange={handleWorkDataChange}
                required
              />
            </div>
            <div className='flex justify-center'>
              <button
                className='rounded-md bg-blue-500 px-3 py-2 text-gray-200'
                form='modalForm'
                type='submit'
              >
                Añadir
              </button>
            </div>
          </dialog>
          <div>
            {totalWorkExperiences?.map((item, i) => {
              return (
                <div
                  className='mb-2 block flex items-center justify-between rounded-md bg-[#202020] px-2 py-4'
                  key={i}
                >
                  <div className=''>
                    {item.from.replace('-', '/')}-{item.to.replace('-', '/')}
                    <span className='mx-5'>{item.company}</span>
                    {item.jobRole}
                  </div>
                  <div className=''>
                    <button
                      className='rounded-md border border-red-500 bg-[#202024] px-3 text-lg font-bold'
                      onClick={() => handleDelete(i)}
                    >
                      -
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
          <div className='lg:w-3/4'>
            <label>Habilidades</label>
            <input
              className='ml-3 bg-[#202024] px-3 py-2 text-gray-300'
              type='text'
              name='habilites'
              placeholder='JavaScript, React, Trabajo en Equipo etc...'
              ref={abilityRef}
            />
            <button
              className='rounded-r-md border-2 border-blue-500 px-3 py-1 text-lg font-bold text-gray-200'
              onClick={handleAddAbility}
            >
              +
            </button>
            <div className='my-4 flex flex-wrap gap-4 text-sm'>
              {abilities?.map((ability, i) => {
                return (
                  <span
                    className='flex items-center justify-between gap-2 rounded-xl border border-blue-500 pl-3'
                    key={i}
                  >
                    <span>{ability}</span>
                    <button
                      className='rounded-xl px-2 py-1'
                      onClick={() => handleDeleteAbility(i)}
                    >
                      ✕
                    </button>
                  </span>
                )
              })}
            </div>
          </div>
          <div className='lg:w-3/4'>
            <label className='custom-select'>
              Idiomas
              <select
                className='ml-3 cursor-pointer rounded-md bg-[#202024] px-3 py-2 text-gray-300 outline-none'
                data-placeholder='Choose a Language...'
                onChange={handleAddLanguages}
                ref={languageRef}
              >
                <option value='' defaultChecked />
                <option value='Inglés'>Inglés</option>
                <option value='Español'>Español</option>
                <option value='Francés'>Francés</option>
                <option value='Alemán'>Alemán</option>
                <option value='Italiano'>Italiano</option>
                <option value='Portugués'>Portugués</option>
                <option value='Chino'>Chino</option>
              </select>
            </label>
            <div className='my-4 flex flex-wrap gap-4 text-sm'>
              {languages?.map((language, i) => {
                return (
                  <span
                    className='flex items-center justify-between gap-2 rounded-xl border border-blue-500 pl-3'
                    key={i}
                  >
                    <span>{language}</span>
                    <button
                      className='rounded-xl px-2 py-1'
                      onClick={() => handleDeleteLanguage(i)}
                    >
                      ✕
                    </button>
                  </span>
                )
              })}
            </div>
          </div>
          {/* TODO: check link validation */}
          <div className=''>
            <label>
              Link de la oferta de trabajo de{' '}
              <span className='bg-gradient-to-r from-indigo-500 from-10% to-sky-500 bg-clip-text fill-transparent font-source-sans-pro text-lg font-extrabold text-fill-transparent'>
                InfoJobs
              </span>
            </label>
            <p className='w-[60ch] text-gray-400'>
              *En otra pestaña de tu navegador abre la oferta de trabajo y copia
              y pega el link de la misma. La usaremos para adaptar tu perfil a
              las necesidades de la empresa y que encajes perfectamente para la
              oferta
            </p>
            <input
              className='mt-2 w-[93%] rounded-md bg-[#202024] px-3 py-2 text-gray-300'
              form='main-form'
              autoComplete='off'
              type='text'
              name='offerId'
              required
              placeholder='https://www.infojobs.net/...'
              onChange={handleJobLink}
              ref={linkRef}
            />
            {typeof offerData?.title === 'string' && (
              <div className='mt-3 flex flex-row items-center rounded-lg bg-[#202024] lg:w-5/6'>
                <div className=''>
                  {typeof offerData.imgUrl === 'string' ? (
                    <Image
                      src={offerData.imgUrl}
                      className='inline rounded-s-lg'
                      alt='logo image'
                      width={110}
                      height={110}
                    />
                  ) : (
                    <Image
                      src='/no-pic.webp'
                      className='inline rounded-s-lg'
                      alt='logo image'
                      width={110}
                      height={110}
                    />
                  )}
                </div>
                <span className='ml-5'>{offerData.title}</span>
              </div>
            )}
          </div>
          <div className='my-5 flex items-center justify-center'>
            <button
              type='submit'
              className='submit-btn rounded-lg bg-blue-500 px-4 py-2 font-source-sans-pro text-lg font-medium transition-shadow duration-300 hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-70'
              form='mainForm'
              disabled={loading}
            >
              Hacer la magia 🪄
            </button>
          </div>
        </div>
      </section>

      <section className=''>
        <h2 className='mb-4 mt-2 font-source-sans-pro text-2xl font-light'>
          Preview
        </h2>
        <PDFViewer className='h-[85%] w-full'>
          <Cv
            {...data}
            languages={languages}
            workExperiences={totalWorkExperiences}
            abilities={abilities}
          />
        </PDFViewer>
        <div className='flex items-center justify-center p-1'>
          <PDFDownloadLink
            fileName='CV'
            document={
              <Cv
                {...data}
                languages={languages}
                workExperiences={totalWorkExperiences}
                abilities={abilities}
              />
            }
          >
            <button className='mx-auto rounded-md bg-blue-500 px-4 py-2 text-blue-50 transition-all duration-300 after:ml-2 after:content-["↡"] hover:bg-blue-200 hover:text-black hover:drop-shadow-2xl'>
              Descargar
            </button>
          </PDFDownloadLink>
        </div>
      </section>
    </main>
  )
}
