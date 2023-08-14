// Function to get quantity for a product
const getQuantity = (productId, quantityMap) => {   
    return quantityMap[productId] || 1;
  };

  // Function to set quantity for a product
  const setQuantity = (productId, quantity, setQuantityMap) => {
    setQuantityMap((prevQuantityMap) => ({
      ...prevQuantityMap,
      [productId]: quantity,
    }));
  };

  // Function to increase quantity for a product
  const increaseQuantity = (productId, setQuantityMap) => {
    setQuantityMap((prevQuantityMap) => ({
      ...prevQuantityMap,
      [productId]: (prevQuantityMap[productId] || 1) + 1,
    }));
  };

  // Function to decrease quantity for a product
  const decreaseQuantity = (productId, setQuantityMap) => {
    setQuantityMap((prevQuantityMap) => {
      const prevQuantity = prevQuantityMap[productId] || 1;
      const newQuantity = prevQuantity > 1 ? prevQuantity - 1 : 1;
      return {
        ...prevQuantityMap,
        [productId]: newQuantity,
      };
    });
  };

  export { getQuantity, setQuantity, increaseQuantity, decreaseQuantity };