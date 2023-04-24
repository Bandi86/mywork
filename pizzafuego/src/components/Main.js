import "./../style/main.css"
import BootstrapCarouselComponent from "./BootstrapCarouselComponent"

export default function Main() {
 

  return (
    <main>
      <div className="bemutatkozas">
        <h1 className="text-center">Üdvözöljük a Pizza Fuego honlapján!</h1>
          <p className="text-center">A Pizza Fuego a legjobb pizzéria a városban. A legfinomabb alapanyagokból készítjük pizzáinkat, és a legjobb szakácsok készítik el.
          </p>
      </div>
      <BootstrapCarouselComponent /> 
    </main>
  )
}
