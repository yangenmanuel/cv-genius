'use client'

import { BsTranslate } from 'react-icons/bs'
import { useRouter } from 'next/navigation'

export default function LanguageSelector() {
  const router = useRouter()

  return (
    <nav className='flex items-center justify-end p-3'>
      <button className='transition-all gap-x-2 mr-5 relative p-2 flex justify-center items-center outline-none border-none shadow rounded focus:ring-1 focus:ring-gray-200 group'>
        <BsTranslate size={25} />
        <svg className='w-4 group-focus:-rotate-90 transition-all' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='https://www.w3.org/2000/svg'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
        </svg>
        <div className='absolute hidden group-focus:block top-10 left-0.5 mt-1 rounded-md z-20 shadow bg-[#2e2e2e]'>
          <div className='text-left [&>a]:py-1 [&>a]:px-2 [&>a]:rounded-md [&>a]:block [&>a]:relative [&>a]:z-20'>
            <a className='hover:bg-[#404040]' onClick={() => router.push('/en')}>English</a>
            <a className='hover:bg-[#404040]' onClick={() => router.push('/es')}>Espanol</a>
            <a className='hover:bg-[#404040]' onClick={() => router.push('/pt/playground')}>Portugues</a>
          </div>
        </div>
      </button>
    </nav>
  )
}
