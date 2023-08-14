import {
  fetchProducts,
  fetchProductsByCategory,
} from "../repositories/refreshCrud";

export function fetchProductsInGrid(limit, page, setProducts, categoryid) {
  const offset = page * limit;
  if (categoryid == undefined) {
    fetchProducts(limit, offset, setProducts)
      .then((newProducts) => {
        console.log("szar");
        if (Array.isArray(newProducts)) {
          return newProducts;
        } else {
          throw new Error("Invalid data format returned from fetchProducts.");
        }
      })
      .catch((error) => {
        // console.error("Failed to fetch products:", error);
      });
  } else {
    fetchProductsByCategory(limit, offset, setProducts, categoryid)
      .then((newProducts) => {
        if (Array.isArray(newProducts)) {
          return newProducts;
        } else {
          throw new Error("Invalid data format returned from fetchProducts.");
        }
      })
      .catch((error) => {
        // console.error("Failed to fetch products:", error);
      });
  }
}
