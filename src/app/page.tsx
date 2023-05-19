export default function Home () {
  return (
    <main className='w-4/5 mx-auto flex flex-col gap-6 h-full justify-center'>
      <div className=''>
        <h1 className='text-8xl pointer-events-none font-source-sans-pro font-bold bg-clip-text fill-transparent text-fill-transparent bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% '>CVGenius</h1>
      </div>
      <p className='w-1/2 text-lg'>
        Destaca tus habilidades y experiencia de manera efectiva
        para destacarte en el mercado laboral. Crea un currículum
        impactante y consigue el trabajo de tus sueños con facilidad.
      </p>
      <div className='mt-2'>
        <a className='py-2 px-4 bg-blue-500 rounded-md after:content-["↗"] after:ml-2 hover:bg-blue-200 hover:text-black hover:drop-shadow-2xl transition-all duration-300' href='/creator'>Pruébalo gratis!</a>
      </div>
    </main>
  )
}
