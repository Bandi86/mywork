import { useState } from "react";
import AdminCategoryForm from "./AdminCategoryForm";
import { create, update } from "../../services/productServices";
import '../../styles/admin.style.css'

export default function AdminCategoryCreate(){
    const [categoryAttr, setCategoryAttr] = useState({
        name: "",
        id: "",
    })

    function addNewCategory() {
        create(categoryAttr, 'categories')
        .then(setCategoryAttr({
            id: "",
            name: "",
        }))
        .then (json => {
            const categoryWithId ={...categoryAttr, id: json.name};
            update(categoryWithId, 'categories', json.name)
        }

        )
    }

    function setCategory(categoryKey,e){
        setCategoryAttr({ ...categoryAttr,[categoryKey]: e.target.value  })
    }

    return(
        <>
        <AdminCategoryForm stateVar={categoryAttr} callback={setCategory}/>
        <button className="newcategory-btn" onClick={addNewCategory}>Új kategória hozzáadása</button>
        </>
    );

    
}