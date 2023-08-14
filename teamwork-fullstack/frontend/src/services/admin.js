import { ordersEndpoint, productsEndpoint, categoriesEndpoint } from "../repositories/apiEndPoints";

export async function fetchItems(
  fetchOrders,
  fetchProducts,
  fetchCategories,
  limit,
  offset,
  setOrders,
  setProducts,
  setCategories
) {
  try {
    await fetchOrders(limit, offset, setOrders);
    await fetchProducts(limit, offset, setProducts);
    await fetchCategories(limit, offset, setCategories);
  } catch (error) {
    console.error("Fail with fetch data:", error);
  }
}


export const fetchForCurrentPage = async (
  currentPage,
  readEntry,
  endpoint,
  limit,
  setter
) => {
  try {   
    const res = await readEntry(`${endpoint}/${limit}/${(currentPage - 1) * limit}`);
    const data = await res.json();
    setter(data.resdata);
  } catch (error) {
    console.error("Failed to fetch", error);
  }
};


export const handlePageChange = (
  page,
  selectedTab,
  setCurrentPage, 
  render, 
  readEntry,
  setOrders, 
  setProducts, 
  setCategories 
) => {
  setCurrentPage(page);

  let endpoint = ""; 
  let setter = ""; 

  if (selectedTab === 0) {
    endpoint = ordersEndpoint;
    setter = setOrders;
  } else if (selectedTab === 1) {
    endpoint = productsEndpoint;
    setter = setProducts;
  } else if (selectedTab === 2) {
    endpoint = categoriesEndpoint;
    setter = setCategories;
  }

  fetchForCurrentPage(page, readEntry, endpoint, render.limit, setter);
};