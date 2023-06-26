import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

//Contexts
import { AdminCategoryContext } from '../../context/AdminContexts';

//Services:
import { read } from '../../services/productServices';
import formatData from '../../services/formatData';

//CSS
import '../../styles/admin.style.css';

export default function AdminCategoryTable() {
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        read('categories').then((res) => res.json())
            .then((json) => {
                setCategoryList(formatData(json))
            });
        console.log(categoryList)
    }, []);
    
   

    return (
        <div className='table'>
            <div className="table-header">

                <div  >
                    <div className="table-row">
                        <div className="table-header-cells">Id</div>
                        <div className="table-header-cells">Megnevezés </div>
                        <div className="table-header-cells">Művelet</div>
                    </div>
                </div>
            </div>

            <div className="table-body"> {
                categoryList.map(category => (
                    <div className='table-row' key={uuidv4()}>
                        <div className= 'table-body-cell'> {category.id} </div>        
                        <div className= 'table-body-cell'> {category.name} </div>  
                        <div className= 'table-body-cell'> 
                                <Link to={`/admin/kategoriak/${category.id}/modositas/`}>Módosítás |</Link>
                                <Link to={`/admin/kategoriak/${category.id}/torles/`}>| Törlés</Link>
                        
                         </div>  

                    </div>


                    )
                    
                )}

            </div >
        </div>

    );
}

