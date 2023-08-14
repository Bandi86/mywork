import React, { useState, useEffect } from 'react';

export default function AnimatedCard({ icon, number, description, showNumbers }) {
    const [showNumber, setShowNumber] = useState(false);
  
    useEffect(() => {
      setShowNumber(true);
    }, []);
  
    return (
      <div className="flex flex-col items-center animate-pop-up">
        {icon}
        <span className={`mt-2 text-center text-gray-700 ${showNumber ? 'animate-fade-in' : 'opacity-0'}`}>
          {showNumber && (
            <>
              <span className="animate-count-up">{number}</span> <br /> {description}
            </>
          )}
        </span>
      </div>
    );
  }
