const API_URL = "https://fuego-502d2-default-rtdb.europe-west1.firebasedatabase.app/";



const addToCart = async(product) => {
    return fetch(`${API_URL}products.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
    .then(res => res.json())
}

const getProducts = async(id) => {
    return fetch(`${API_URL}products.json`)
      .then(res => res.json())
     
}

const productCrud = {
  addToCart,
  getProducts
}

export default productCrud;  
/*  */