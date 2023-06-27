import AddProducts from "./AddProducts";
import RenderProducts from "./RenderProducts";

export default function AdminProducts() {
  return (
    <>
      <h1 className="text-center mt-4 text-3xl font-bold">Webshop Product List</h1>
      <div className="w-full flex flex-row mt-6">
        <div className="w-1/5 flex flex-col items-center">
          <AddProducts />
        </div>
        <div className="w-4/5">
          <RenderProducts />
        </div>
      </div>
    </>
  );
}
