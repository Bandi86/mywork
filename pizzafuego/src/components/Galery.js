import { galeryImages } from "./GaleryData"
import "./../style/galery.css"

export default function Galery() {
  
  return (
    <div className="galery-container">
      <h1>Fotók és pillanatképek</h1>
      <div className="galery">
        {
          galeryImages.map((image, index) => 
            <div key={index} className="galery-item">
              <img src={image} alt="" />
            </div>
          )
        }
      </div>
    </div>
  )
}
