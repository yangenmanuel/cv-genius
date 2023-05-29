import { NextResponse } from 'next/server'
import { ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from 'openai'

const INITIAL_MESSAGES = [{
  role: ChatCompletionRequestMessageRoleEnum.System,
  content: `Tu tarea es hacer un curriculum basado en información del usuario y en la descripción de un trabajo y hacer un CV de la forma mas profesional posible exaltando las características del usuario y adaptarlo para que encaje con el perfil de la descripción de la oferta de trabajo de una forma no tan evidente.

  Recibirás un objeto formato json de la siguiente forma:
  {
      "abilities": ["HTML", "React", "CSS", "Javascript", "Responsive Design", "Git"],
      "profile": "{un resumen del perfil del usuario}"
      "laboralExperience":[
    {
      company: 'Adevinta',
      from: '2023-01',
      to: '2023-02',
      jobRole: 'Junior Frontend',
      description: 'Ayude a la manutención de la pagina web de la compañía'
    },
    {
      company: 'Amazon',
      from: '2023-10',
      to: '2023-11',
      jobRole: 'Junior React Developer',
      description: 'Ayude a la manutención de la pagina web de la compañía'
    }
  ],
      "jobDescription": "Desde GeeksHubs estamos colaborando con consultora tecnológica de Tarragona que ofrece soluciones integradas de transformación digital y consultoría en materia de gestión de contratistas, seguridad y salud en el trabajo, calidad y medio ambiente.
  
  Buscamos un/a SENIOR FRONTEND DEVELOPER con al menos 4 años de experiencia en entornos JavaScript/ Typescript /React para trabajar en un equipo scrum multi-funcional.
  
  ¿Cuáles serán tus funciones principales?
  
  - Desarrollarás productos de software.
  - Contribuirás a definir la estrategia de producto y participarás en el ciclo de vida completo del desarrollo.
  - Traducirás los requisitos en productos totalmente funcionales.
  - Identificarás y evaluarás nuevas tecnologías para su implementación.
  - Diseñarás experiencias de productos excepcionales y crearás productos que sean fáciles de usar y visualmente atractivos.
  - Trabajará en un equipo Scrum junto con el Product Manager en las solicitudes de los clientes directamente relacionadas con las plataformas de la empresa.
  - Probarás y asegurarás la calidad de la plataforma junto con el equipo de control de calidad/pruebas.
  - Identificarás continuamente oportunidades de mejora de la plataforma.
  
  Tipo de industria de la oferta
  Servicios y tecnología de la información
  Categoría
  Informática y telecomunicaciones - Programación
  Nivel
  Empleado/a
  Personal a cargo
  0
  Número de vacantes
  1
  Salario
  Salario: 45.000€ - 56.000€ Bruto/año
  Beneficios sociales
  Teletrabajo"
  },
  "jobSkillSet":  [
      { skill: 'JavaScript' },
      { skill: 'typescript' },
      { skill: 'react' },
      { skill: 'frontend' },
      { skill: 'desarrollo de aplicaciones web' }
  
  Elabora una respuesta JSON del formato: 
  {
      "AIprofile": "{el perfil del usuario basado en su información pero de una manera mas profesional y adaptado un poco a la oferta}",
      "AIrole": '{cargo que desempeñará el usuario de acuerdo con la oferta de trabajo. Ejemplos son Junior Frontend Developer, Senior Ruby Developer etc...}'
      "AIworkExperiences": [{
      "company": {nombre de la primera compañía},
      "role": {rol que el usuario desempeñó}
      "description": {labor que realizo el usuario en esa compañía de una manera mejorada y de un punto de vista mas profesional;},
      "from": {fecha de inicio},
      "to": {fecha final}
  }],
      "AIabilities": [{habilidades basadas en la información de usuario y algunas habilidades mas genéricas de tal forma que se adapte mejor a la oferta. Debe ser un array de strings}]
  }
  
  Reemplaza el contenido entre llaves por las instrucciones dadas`
}]

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

export async function POST (req: Request) {
  const { offerData, totalWorkExperiences, abilities, role, profile } = await req.json()
  const allData = { offerData, totalWorkExperiences, abilities, role, profile }

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      ...INITIAL_MESSAGES,
      {
        role: 'user', content: JSON.stringify(allData)
      }
    ]
  })
  const data: string = completion.data.choices[0].message?.content!
  // console.log(JSON.parse(completion.data.choices[0].message?.content))
  return NextResponse.json({ improved: JSON.parse(data) })
}
