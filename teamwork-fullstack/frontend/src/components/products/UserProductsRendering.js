import React from "react";
import ProductsGrid from "./ProductsGrid";
import PriceFilter from "./Productfilter";

export default function UserProductsRendering() {
  return (
    <div className="min-h-min w-full flex flex-col md:flex-row">
      {/* <div className="h-full w-full md:w-1/5 flex flex-col border-slate-200">
        <PriceFilter /> 
      </div>
      <div className="w-full md:w-4/5 border-2 border-slate-200"></div> */}
      <ProductsGrid />
    </div>
  );
}
