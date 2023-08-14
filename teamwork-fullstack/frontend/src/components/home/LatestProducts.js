import { Carousel } from "flowbite-react";

export default function LatestProducts({products, setProducts, images, setImages})  {  

  return (
    <>
      {products.length > 0 ? (
        <Carousel>
          {products.map((product, index) => (
            <div
              key={index}
              className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white"
            >
              {images.map((image, imgIndex) => (
                <img key={imgIndex} src={image} alt="product" />
              ))}
              {product.name} {product.price}
            </div>
          ))}
        </Carousel>
      ) : (
        null
      )}
    </>
  );
}
