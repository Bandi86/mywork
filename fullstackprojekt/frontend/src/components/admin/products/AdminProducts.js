import RenderProducts from "./RenderProducts";
import { Link } from "react-router-dom";

export default function AdminProducts() {
  return (
    <>
      <h1 className="text-center mt-4 text-3xl font-bold">Webshop Product List</h1>
      <Link to="/admin/products/add"><h1 className="text-center text-3xl mt-6 cursor-pointer">Add New?</h1></Link>
      <div className="w-full flex flex-row mt-6">        
          <RenderProducts />        
      </div>
    </>
  );
}
