import { useContext, useEffect, useState } from "react";
import CountUp from "react-countup";
import { AiOutlineHeart, AiOutlineHourglass } from "react-icons/ai";
import { FiPackage } from "react-icons/fi";
import { MdProductionQuantityLimits } from "react-icons/md";
import { userContext } from "../../contexts/userContext";
import { productsCount } from "../../repositories/apiEndPoints";
import { readEntry } from "../../repositories/crud";
import AnimatedCard from "./AnimatedCard";

export default function Icons() {
  const [productsLength, setProductsLength] = useState(0);
  const [showNumbers, setShowNumbers] = useState(false);
  const { user, isloggedIn } = useContext(userContext);

  useEffect(() => {
    readEntry(productsCount).then((res) => {
      res.json().then((data) => {        
        setProductsLength(Object.values(data.resdata));
        setShowNumbers(true);
      });
    });
  }, [user, isloggedIn]);

  return (
    <>
      <div className="flex flex-row items-center justify-center gap-10 mt-10 italic">
        <AnimatedCard
          icon={<AiOutlineHeart className="text-3xl" />}
          number="6M+"
          description="satisfied customers"
          showNumbers={showNumbers}
        />
        <AnimatedCard
          icon={<AiOutlineHourglass className="text-3xl" />}
          number="within 24 hours"
          description="Fast shipping"
          showNumbers={showNumbers}
        />
        <AnimatedCard
          icon={<FiPackage className="text-3xl" />}
          number="50€"
          description="Free shipping"
          showNumbers={showNumbers}
        />
        <AnimatedCard
          icon={<MdProductionQuantityLimits className="text-3xl" />}
          number="5000+"
          description="Products"
          showNumbers={showNumbers}
        />
      </div>
      <div className="p-6 text-4xl">
        <h2 className="text-center mt-4 font-bold">
          Choose from the{" "}
          <span className="text-second">
            {showNumbers ? (
              <CountUp end={productsLength} duration={3} separator="," />
            ) : (
              "0"
            )}
          </span>{" "}
          available products
        </h2>
      </div>
    </>
  );
}
