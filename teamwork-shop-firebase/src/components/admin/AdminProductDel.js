import React, { useEffect, useState } from 'react';
import { read } from '../../services/productServices';
import AdminSingleProduct from './AdminSingleProduct';
import { useParams, useNavigate } from 'react-router-dom';
import { removeItemAndNavigate } from '../../services/productServices';
import '../../styles/admin.style.css';

export default function AdminProductDel() {
    const pathParameters = useParams();
    const [product, setProduct] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        read(`termekek/${pathParameters.id}`).then((res) => res.json()).then((json) => setProduct(json))
    }, [])

    return (
        <>
                <div className="table">
                <div className="table-body">
                    <AdminSingleProduct products={product} />
                </div>
            </div>
            <button onClick={deleteProductHandler}>Törlés</button>
            <button onClick={backHandler}>Mégsem</button>
        </>
    )

    function deleteProductHandler() {
        if (window.confirm(`Biztosan törli a következő terméket? \n Név: ${product.title} \n Ár: ${product.price} Ft`)) removeItemAndNavigate(pathParameters.id, 'termekek', navigate, `/admin/termekek/${pathParameters.listPage}`)
        else return null
    }

    function backHandler() {
        navigate(`/admin/termekek/${pathParameters.listPage}`)
    }
}