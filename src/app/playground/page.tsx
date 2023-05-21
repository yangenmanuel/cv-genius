export default function Playground () {
  return (
    <main className=''>
      <section className='lg:inline-block border w-1/2'>
        <h2>Add your information</h2>

        <form>
          <div className='p-5'>
            <h2>Datos Personales</h2>
            <input type='text' name='nameField' placeholder='Nombre Completo' />
            <input type='text' name='roleField' placeholder='Rol' />
            <input type='email' name='emailField' placeholder='E-mail' />
            <input type='number' name='phoneField' placeholder='Numero celular' />
            <input type='text' name='profileField' placeholder='Acerca de ti' />
          </div>

          <div className='p-5'>
            <input type='text' name='experienceField' placeholder='Experiencia' />
            <input type='text' name='projectsField' placeholder='Proyectos personales' />
            <input type='text' name='habilitesField' placeholder='Habilidades' />
            <input type='text' name='languagesField' placeholder='Idiomas' />
          </div>
        </form>
      </section>

      <section className='lg:inline-block border w-1/2'>Cv</section>
    </main>
  )
}
