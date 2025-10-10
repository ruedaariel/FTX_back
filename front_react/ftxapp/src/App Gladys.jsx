

import HeaderCrud from './components/componentsShare/header/HeaderCrud.jsx'
import CrudEjercicioBasico from './components/admin/adminEjercicio/CrudEjercicioBasico.jsx'

  
function App() {
  return (
    <div>
      
      {/* <Header />
      <Carousel />
      <Porqueelegirnos />
      <Tutrainer />
      <Planes />
      <Testimonios />
      <Faq /> */}
      {/* <Footer /> */}
      {/* <LoginApi /> */}
      <HeaderCrud title="Gestion de Ejercicios"></HeaderCrud>
      <CrudEjercicioBasico></CrudEjercicioBasico>
     

    </div>
  )
}

export default App
