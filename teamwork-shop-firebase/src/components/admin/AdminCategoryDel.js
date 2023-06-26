import React, { useEffect, useState } from 'react';
import { read } from '../../services/productServices';
import { useParams, useNavigate } from 'react-router-dom';
import { removeItemAndNavigate } from '../../services/productServices';
import '../../styles/admin.style.css';


export default function AdminCategoryDel() {
    const pathParameters = useParams();
    const [category, setCategory] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        read(`categories/${pathParameters.id}`).then((res) => res.json()).then((json) => setCategory(json))
    }, [])

    return (
        <>
                <div className="table">
                <div className="table-body">
                <div className= 'table-body-cell'> {category.name} </div>
                </div>
            </div>
            <button onClick={deleteProductHandler}>Törlés</button>
            <button onClick={backHandler}>Mégsem</button>
        </>
    )

    function deleteProductHandler() {
        if (window.confirm(`Biztosan törli a "${category.name}" kategóriát?`)) removeItemAndNavigate(pathParameters.id, 'categories', navigate, '/admin/kategoriak')
        else return null
    }

    function backHandler() {
        navigate('/admin/kategoriak')
    }
}