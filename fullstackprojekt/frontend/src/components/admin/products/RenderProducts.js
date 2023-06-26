import React, {useState, useEffect} from 'react'
import convertDate from '../../../services/timestamp'

export default function RenderProducts() {

const [allProducts, setAllProducts] = useState([]);

useEffect(() => {
    fetch('http://localhost:8000/admin/products')
        .then(res => res.json())        
        .then(data => setAllProducts(data))
        .catch(error => console.error('Failed to fetch products:', error));
}, [setAllProducts])

  return (
    <div className="flex flex-col w-full mt-4 text-center items-center gap-10">
            <table className="w-full text-center">
              <thead>
                <tr>
                  <th className="p-2">Product ID</th>
                  <th className="p-2">Product Name</th>
                  <th className="p-2">Product Description</th>
                  <th className="p-2">Product Price</th>
                  <th className="p-2">Product Category</th>
                  <th className="p-2">Product Stock</th>
                  <th className="p-2">Created At</th>
                  <th className="p-2">Updated At</th>
                  <th className="p-2">Edit</th>
                  <th className="p-2">Delete</th>
                </tr>
              </thead>
              <tbody>
              {allProducts?.map((product) => (
                    <tr key={product.id}>
                        <td className="p-2">{product.id}</td>
                        <td className="p-2">{product.name}</td>
                        <td className="p-2">{product.description}</td>
                        <td className="p-2">{product.price}</td>
                        <td className="p-2">{product.category_id}</td>
                        <td className="p-2">{product.stock}</td>
                        <td className="p-2">{convertDate(product.created_at)}</td>
                        <td className="p-2">{convertDate(product.updated_at)}</td>
                        <td className="p-2 font-bold cursor-pointer">Edit</td>
                        <td className="p-2 font-bold cursor-pointer">Delete</td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
  )
}
