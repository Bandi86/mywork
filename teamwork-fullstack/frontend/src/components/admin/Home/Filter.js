
//const [minPrice, setMinPrice] = useState("");     
//const [maxPrice, setMaxPrice] = useState("");



useEffect(() => { (!searchParams.get("page") ||            
 !searchParams.get("sortBy") ||            
  !searchParams.get("sortOrder")) && setSearchParams({page: 1, sortBy: "title", sortOrder: "asc", minPrice: "0"});    
            
  crud.getAllProducts().then((json) => {setProducts(formatBody(json)); 
    setProducts((products) =>sortingMethods(searchParams.get("sortBy"),searchParams.get("sortOrder"),products) 
    );
}); 
    }, [searchParams]);
    
const toggleSortOrder = () => {
    const orderParam = searchParams.get("sortOrder");
    if (orderParam === "asc") searchParams.set("sortOrder", "desc");
    else if (orderParam === "desc") searchParams.set("sortOrder", "asc");
    setSearchParams(searchParams);
};
const handleSortChange = (sortByParam) => {
    searchParams.set("sortBy", sortByParam);
    setSearchParams(searchParams);     
};
const handlePriceFilter = () => {
    setProducts((products) => priceIntervalumSorting(minPrice, maxPrice, products));
}; 
const viewedProducts = calculateViewedItems(products,searchParams.get("page"), viewItems);

return (
<>
<>
<Filter products={products} setProducts={setProducts} onSortChange={handleSortChange}/>
</>
<div>
    <input type="number" value={minPrice} onChange={(product)=> setMinPrice(product.target.value)} placeholder="Min. ár"/> 
    <input type="number" value={maxPrice} onChange={(product) => setMaxPrice(product.target.value)} placeholder="Max. ár"/>   
    <button onClick={() => handlePriceFilter()}>Szűrés</button>
</div>
<table className="admin-productlist-table"> 
    <thead>
        <tr>
            <th>
                <button onClick={() => {handleSortChange("id");toggleSortOrder();}}>Termék id{" "}{searchParams.get("sortBy") === "id" &&(searchParams.get("sortOrder") === "asc" ? "▼" : "▲")}</button>
            </th>
            <th>
                <button onClick={() => {handleSortChange("title");toggleSortOrder();}}>Termék megnevezés{" "}{searchParams.get("sortBy") === "title" && (searchParams.get("sortOrder") === "asc" ? "▼" : "▲")}</button>
            </th>
            <th><button onClick={() => {handleSortChange("price");toggleSortOrder();}}>Termék ár{searchParams.get("sortBy") === "price" && (searchParams.get("sortOrder") === "asc" ? "▼" : "▲")}</button>
            </th>
            <th>Szerkesztés</th>
            <th>Törlés</th>
        </tr>
    </thead>
    
    <tbody>
        {viewedProducts.map((product) => {
            return (
            <tr className="admin-product-item" key={product.id}>
                <td>
                    {product.id}
                </td>
                <td>
                    {product.title}
                </td>
                <td>
                    {product.price}
                </td>
                <td>
                    <NavLink to={`/admin/termekek/${product.id}/modositas`}>Szerkesztés</NavLink>
                </td>
                <td>
                    <NavLink to={`/admin/termekek/${product.id}/torles`}>Törlés</NavLink>
                </td>
            </tr>
            );
        })} 
    </tbody>
</table>
 <Pagination searchParams={searchParams} setSearchParams={setSearchParams} list={products} viewItems={viewItems}/>
 </>);
