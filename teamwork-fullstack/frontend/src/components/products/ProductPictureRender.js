import { useEffect, useState } from "react";
import { productsImageEndpoint } from "../../repositories/apiEndPoints";
import { readEntry } from "../../repositories/crud";
import { fetchProductImages } from "../../repositories/refreshCrud";

export default function ProductPictureRender({ product }) {
  const [hovered, setHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [sliderInterval, setSliderInterval] = useState(null);
  const [shouldBlur, setShouldBlur] = useState(true);

  let productId = product.id;

  useEffect(() => {
    try {   
    fetchProductImages(readEntry, productsImageEndpoint, productId, setImages)
    } catch (error) {
      console.log(error);
    }
  }, [productId]);

  useEffect(() => {
    if (sliderInterval) {
      clearInterval(sliderInterval);
    }

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        return (prevIndex + 1) % images.length;
      });
    }, 2000);

    setSliderInterval(interval);

    return () => {
      if (sliderInterval) {
        clearInterval(sliderInterval);
      }
      setShouldBlur(false);
    };
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="h-60 flex items-center justify-center">
        <p>No images available</p>
      </div>
    );
  }

  return (
    <div className="relative h-60 md:h-80 flex justify-center items-center">
      <img
        className={`absolute top-0 right-0 h-full w-full scale-110 object-contain ${
          shouldBlur ? "filter blur-sm" : ""
        }`}
        src={images[currentImageIndex]}
        alt={images[currentImageIndex]?.filename}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />

      <div className="absolute bottom-0 mb-4 flex w-full justify-center space-x-4">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-3 w-3 rounded-full border-2 border-white ${
              index === currentImageIndex ? "bg-first" : "bg-second"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
