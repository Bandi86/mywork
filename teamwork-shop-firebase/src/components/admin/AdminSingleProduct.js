
export default function AdminSingleProduct(props) {
    return (
        <>
            <div className="table-body-cell">{props.products.id}</div>
            <div className="table-body-cell">{props.products.title}</div>
            <div className="table-body-cell">{props.products.price}</div>
            <div className="table-body-cell "><img
						src={props.products.image}
						alt=''
                        className="small-image"
			/></div>
            
        </>
    )
}