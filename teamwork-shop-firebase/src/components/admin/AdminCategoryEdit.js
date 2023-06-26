import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { read, updateItemAndNavigate } from '../../services/productServices';
import AdminCategoryForm from './AdminCategoryForm.js';

import '../../styles/admin.style.css';

export default function AdminCategoryEdit() {
    const pathParameters = useParams();
    const [category, setCategory] = useState({})
    const [categoryAttr, setCategoryAttr] = useState({
        id:'',
        name: '',
    
    })
    const navigate = useNavigate();

    useEffect(() => {
        read(`categories/${pathParameters.id}`).then((res) => res.json()).then((json) => setCategory(json))
        console.log(category)
    }, [])

    useEffect(() => {
        if (Object.keys(category).length > 0) setter()
        console.log(category)
    }, [category])

    return (
        <>
            <div className="table">
                <div className="table-body"></div>
            </div>
            <AdminCategoryForm stateVar={categoryAttr} callback={setCategoryInput} />
            <button onClick={updateHandler}>Mentés</button>
            <button onClick={backHandler}>Mégsem</button>
        </>
    )

    function setter() {
        return setCategoryAttr(category)
    }

    function backHandler() {
        navigate(`/admin/kategoriak/`)
    }

    function setCategoryInput(categoryKey, e) {
        setCategoryAttr({ ...categoryAttr, [categoryKey]: e.target.value })
    }

    function updateHandler() {
        if (window.confirm(`Biztosan átnevezi a "${category.name}" kategoriát arra, hogy: \n "${categoryAttr.name}" ?`)) updateItemAndNavigate(pathParameters.id, categoryAttr, 'categories', navigate, `/admin/kategoriak`)
        else return null
    }
}