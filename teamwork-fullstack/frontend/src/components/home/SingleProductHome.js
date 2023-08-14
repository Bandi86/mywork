import { Carousel } from "flowbite-react";
import a from "../../assets/1.jpg";
import b from "../../assets/2.jpg";
import c from "../../assets/3.jpg";
import d from "../../assets/4.jpg";
import f from "../../assets/f.jpg";


export default function SingleProductHome() {
  const slide = [a,b,c,d,f];

  return (
    <div className="flex justify-center">
      <div className="bg-opacity-75 gap-4 rounded-md w-full border-slate-300 p-8">
        <div className="h-[44rem] p-4">
          <Carousel>
            {slide.map((image, imgIndex) => (
              <img key={imgIndex} src={image} alt="slide" />
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
