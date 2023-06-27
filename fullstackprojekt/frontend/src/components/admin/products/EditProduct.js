import React from 'react'
import { useParams } from 'react-router-dom'
import AddProducts from './AddProducts'


export default function EditProduct() {
    const { id } = useParams();
    console.log(id);
  return (
    <>        
        <AddProducts id={id} />
    </>
  )
}
