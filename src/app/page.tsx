import Link from 'next/link'

export default function Home () {
  return (
    <main className='h-screen w-screen flex flex-col items-center justify-center'>
        <h1 className='text-7xl lg:text-8xl pointer-events-none font-source-sans-pro bg-clip-text fill-transparent text-fill-transparent bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%
        before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:blur-xl before:content-[""] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:-translate-x-3 after:-translate-y-1/3 after:rounded-lg after:bg-gradient-conic after:blur-2xl after:content-[""] before:bg-gradient-to-br before:from-emerald-500 before:to-indigo-500 before:opacity-10 after:from-sky-900 after:via-[#0141ff] after:opacity-40 before:lg:h-[360px] before:border'
        >
          CVGenius
        </h1>
        <p className='mt-8 mb-5 text-md w-4/5 lg:w-1/3 lg:text-lg mx-auto text-center'>
          Crea currículums personalizados para cada oferta de trabajo en <span className='font-source-sans-pro font-extrabold bg-clip-text fill-transparent text-fill-transparent bg-gradient-to-r from-indigo-500 from-10% to-sky-500'>InfoJobs</span> con un poderoso generador de CVs basado en IA
        </p>
        <Link className='py-2 pl-4 pr-8 text-white bg-blue-700 rounded-md after:absolute after:content-["↗"] after:ml-2 hover:bg-blue-200 hover:text-black hover:drop-shadow-2xl hover:after:scale-150 transition-all duration-300 after:transition-transform after:duration-300' href='/playground'>Pruébalo gratis!</Link>

    </main>
  )
}
