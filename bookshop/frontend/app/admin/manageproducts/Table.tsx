import { Product } from "../../shared/types"

// Props type
type Props = {
    products: Product[];
    generateUniqueId: () => string;
  };
  
  const Table = ({ products, generateUniqueId }: Props) => {
    return (
      <table className="table-auto border-collapse border overflow-auto border-slate-800 mb-4">
        <thead>
          <tr>
            <th className="px-4 py-2 bg-slate-300">Product ID</th>
            <th className="px-4 py-2 bg-slate-300">Product Title</th>
            <th className="px-4 py-2 bg-slate-300">Product Description</th>
            <th className="px-4 py-2 bg-slate-300">Product Price</th>
            <th className="px-4 py-2 bg-slate-300">Product Category</th>
            <th className="px-4 py-2 bg-slate-300">Product Stock</th>
            <th className="px-4 py-2 bg-slate-300">Edit</th>
            <th className="px-4 py-2 bg-slate-300">Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={generateUniqueId()}>
              <td className="border px-4 py-2">{product.id}</td>
              <td className="border px-4 py-2">{product.title}</td>
              <td className="border px-4 py-2">{product.description}</td>
              <td className="border px-4 py-2">{product.price}</td>
              <td className="border px-4 py-2">{product.category}</td>
              <td className="border px-4 py-2">{product.stock}</td>
              <td className="border px-4 py-2">
                <input type="checkbox" />
              </td>
              <td className="border px-4 py-2">
                <input type="checkbox" />
              </td>
              <td className="border px-4 py-2">
                <button className="p-2 mt-2 text-lg text-white bg-black rounded-md">
                  Confirm
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default Table;
  
  