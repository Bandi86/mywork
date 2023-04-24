import React, { useState } from "react";
import Carousel from "./Carousel";

const MainContent = () => {
  const [sale, setSale] = useState([
    {
      name: "Pizza Fuego",
      id: 1,
      price: 2500,
      image: "./images/fuego.jpg",
    },
    {
      name: "Piedone",
      id: 2,
      price: 2800,
      image: "./images/piedone.jpg",
    },
    {
      name: "Ananasz city",
      id: 3,
      price: 2300,
      image: "./images/ananasz.jpg",
    },
  ]);

  return (
    <div className="main-content">
      <h1>Sale items</h1>
      <Carousel items={sale} />
    </div>
  );
};

export default MainContent;
Ebben az esetben létrehoztuk a MainContent komponenst, és beállítottuk az aktív elemeket a useState hook segítségével. Ezután hozzáadtuk a Carousel komponenst, amelynek az items prop-jába az adatokat adtuk át. Ezt követően a MainContent komponenst a szükséges CSS-el vagy stílusolási eszközökkel együtt megjeleníthetjük.

A Carousel komponens kódja például így nézhet ki:

jsx
Copy code
import React, { useState } from "react";

const Carousel = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevClick = () => {
    setActiveIndex((activeIndex - 1 + items.length) % items.length);
  };

  const handleNextClick = () => {
    setActiveIndex((activeIndex + 1) % items.length);
  };

  return (
    <div className="carousel">
      <div className="carousel-image">
        <img src={items[activeIndex].image} alt={items[activeIndex].name} />
      </div>
      <div className="carousel-details">
        <h2>{items[activeIndex].name}</h2>
        <p>{items[activeIndex].price} Ft</p>
      </div>
      <div className="carousel-nav">
        <button onClick={handlePrevClick}>Prev</button>
        <button onClick={handleNextClick}>Next</button>
      </div>
    </div>
  );
};

export default Carousel;