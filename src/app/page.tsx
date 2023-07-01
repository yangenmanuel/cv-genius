import Link from 'next/link'

export default function Home() {
  return (
    <main className='relative flex h-[100svh] w-screen flex-col items-center justify-center overflow-hidden'>
      <h1
        className='pointer-events-none bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% bg-clip-text fill-transparent font-source-sans-pro text-7xl text-fill-transparent before:absolute
        before:h-[350px] before:w-[350px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-to-br before:from-emerald-500 before:to-indigo-500 before:opacity-20 before:blur-xl after:absolute after:h-[180px] after:w-[240px] after:-translate-x-1/3 after:-translate-y-1/3 after:rounded-lg  after:bg-gradient-conic after:from-sky-900 after:via-[#0141ff] after:opacity-40 after:blur-2xl lg:text-8xl'
      >
        CVGenius
      </h1>
      <p className='text-md mx-auto mb-5 mt-8 w-4/5 text-center lg:w-1/3 lg:text-lg'>
        Crea currículums personalizados para cada oferta de trabajo en{' '}
        <span className='bg-gradient-to-r from-indigo-500 from-10% to-sky-500 bg-clip-text fill-transparent font-source-sans-pro font-extrabold text-fill-transparent'>
          InfoJobs
        </span>{' '}
        con un poderoso generador de CVs basado en IA
      </p>
      <Link
        className='rounded-md bg-blue-700 py-2 pl-4 pr-8 text-white transition-all duration-300 after:absolute after:ml-2 after:transition-transform after:duration-300 after:content-["↗"] hover:bg-blue-200 hover:text-black hover:drop-shadow-2xl hover:after:scale-150'
        href='/playground'
      >
        Pruébalo gratis!
      </Link>
    </main>
  )
}
