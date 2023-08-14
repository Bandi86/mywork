import { useEffect, useState } from "react";
import HomeProductRender from "../home/HomeProductRender";
import Icons from "../home/Icons";
import SingleProductHome from "../home/SingleProductHome";


export default function Home() {
  const [showComponents, setShowComponents] = useState(false);

  function handleScroll() {
    const isBottom =
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight;
    if (isBottom) {
      setShowComponents(true);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bg-main">
      <div
        className="animate-fade"
      >
        <SingleProductHome />
      </div>
      {showComponents ?  <div
        className="animate-fade"
      >
        <Icons />
        <HomeProductRender />

      </div> : null}    
    </div>
  );
}
