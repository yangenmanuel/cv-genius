'use client'

import Cv from './CV'
import { PDFDownloadLink } from '@react-pdf/renderer'

export default function DownloadBtn ({ data, languages }) {
  return (
    <div className='flex items-center justify-center p-1'>
      <PDFDownloadLink fileName='CV' document={<Cv {...data} languages={languages} />}>
      {({ loading }) => (loading ? <p>'Cargando'</p> : <button className='text-blue-50 py-2 px-4 bg-blue-500 rounded-md after:content-["↡"] after:ml-2 hover:bg-blue-200 hover:text-black hover:drop-shadow-2xl transition-all duration-300 mx-auto'>Descargar</button>)}
      </PDFDownloadLink>
    </div>
  )
}
