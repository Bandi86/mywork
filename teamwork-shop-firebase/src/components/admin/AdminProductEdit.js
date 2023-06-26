import AdminSingleProduct from './AdminSingleProduct';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { read } from '../../services/productServices';
import AdminProductFormEdit from './AdminProductFormEdit.js'
import { updateItemAndNavigate } from '../../services/productServices';
import '../../styles/admin.style.css';
import AdminImageForm from './AdminImageForm';
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { app } from '../../repositories/API_repo';

export default function AdminProductEdit() {

    const pathParameters = useParams();
    const [product, setProduct] = useState({})
    const [productAttr, setProductAttr] = useState({
        title: "",
        id: "",
        price: "",
        categoryId:"",
        image: "",
        description:"",
        attr1:"",
        attr2:"",
        attr3:""
    })
    const navigate = useNavigate()
    const [file, setFile] = useState(null);
    const [uploadedUrl, setUploadedUrl] = useState(null);
    
    useEffect(() => {
        read(`termekek/${pathParameters.id}`).then((res) => res.json()).then((json) => setProduct(json))
        console.log(product)
    }, [])

    useEffect(() => {
        if (Object.keys(product).length > 0) setter()
        console.log(product)
    }, [product])

    

    function setter() {
        return setProductAttr(product)
    }

    function backHandler() {
       return navigate(`/admin/termekek/${pathParameters.listPage}`)
    }

    function setProductInput(productKey, e) {
        return setProductAttr({ ...productAttr, [productKey]: e.target.value })
    }
    function fileChange(e) {
        return setFile(e.target.files[0]);
    }

       
    function updateHandler() {
        if (window.confirm (
            `A termék adatai a következőképpen módosulnak: \n
            ${product.id}" --> "${productAttr.id}" \n
            "${product.title}" --> "${productAttr.title}" \n
            ${product.price} Ft --> ${productAttr.price} Ft 
        `));
        else return null;
       
        fileUpload (file, pathParameters.id);
            
        
              
    }
    
    function fileUpload(file, id) {
        if (!file) {
            return;
        }
        const storage = getStorage(app);
        const fileRef = ref(storage, "images/" + file.name);
        return uploadBytes(fileRef, file)
            .then((uploadResult) => {
                 return getDownloadURL
                 (uploadResult?.ref)
                    .then((url) => {

                        setUploadedUrl(url);
                        return url;
                    })
                    .then((upUrl) => {
						return updateItemAndNavigate(pathParameters.id, { ...productAttr, image: upUrl }, 'termekek', navigate, `/admin/termekek/${pathParameters.listPage}`)
					});
                    
            })
            

    }


    return (
        <>
            <div className="table">
            <div className="table-body">
                    <AdminSingleProduct products={product} />
                </div>
            </div>
            <AdminProductFormEdit stateVar={productAttr} callback={setProductInput} />
            <AdminImageForm callback={fileChange}/>
            <button onClick={updateHandler}>Mentés</button>
            <button onClick={backHandler}>Mégsem</button>
        </>
    )

    // WORK IN PROGRESS - KOVÁCS ÁDÁM

    // function updateMessage(title, id, price){
    //     console.log("...............");
    //     // console.log(product.title)
    //     // console.log(product.id)
    //     // console.log(product.price)
    //     // console.log(productAttr.title)
    //     // console.log(productAttr.id)
    //     // console.log(productAttr.price)
    //     // console.log(product.title === productAttr.title)
    //     message = "A termék a következőképpen módosul: \n";
    //     if(id !== productAttr.id) message += `"${id}" --> "${productAttr.id}" \n`;
    //     if(title !== productAttr.title) message += `"${title}" --> "${productAttr.title}" \n`;
    //     if(price !== productAttr.price) message += `${price} Ft --> ${productAttr.price} Ft`;
    //     else message = "A termék adatai nem módosulnak."
    //     return message;
    // }

    

}