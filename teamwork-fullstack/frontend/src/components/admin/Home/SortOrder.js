
import React, { useState } from 'react';

const SortableButton = ({ payload }) => {

  const [clickCount, setClickCount] = useState(0);



  const buttonStyle = {
    opacity: clickCount >= 2 ? 0 : 1, // A gomb láthatósága a kurzor fölött
    transition: 'opacity 0.3s ease-in-out', // Áttűnési animáció
    cursor: 'pointer',
  };

  const handleClick = () => {
    setClickCount((prevCount) => prevCount + 1);
  };

  return (
    <button


      style={buttonStyle}
      onClick={() => {
        if (clickCount === 2) {
         
          setClickCount(0); 
        } else {
          handleClick(); // A kattintások számának növelése
        }
      }}
    > {payload[1] == "desc" ? '▲' : '▼'}
    </button>
  );
};

export default SortableButton;
