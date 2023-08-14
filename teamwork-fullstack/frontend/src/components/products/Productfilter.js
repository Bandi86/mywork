import react, { useState } from "react";


export default function PriceFilter({ onFilter }) {
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");


    const handleFilterByPrice = () => {
        onFilter(minPrice, maxPrice);
            };
            
            return (
                <>
        <div className="flex justify-center mt-4">
            <input
                type="text"
                placeholder="Min price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
                type="text"
                placeholder="Max price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                />
            <button onClick={handleFilterByPrice}>Szűrés</button>
        </div>
    </>
)
};
