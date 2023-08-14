const baseUrl = "http://localhost:8080/api";

export async function fetchOrders(limit, offset, setOrders) {
  try {
    const res = await fetch(`${baseUrl}/orders/${limit}/${offset}`);
    const data = await res.json();
    if (data.resdata.length > 0) {
      setOrders(data.resdata);
    }
  } catch (error) {
    console.error("Failed to fetch orders:", error);
  }
}

export async function fetchProducts(limit, offset, setProducts) {
  try {
    const res = await fetch(`${baseUrl}/products/${limit}/${offset}`);
    const data = await res.json();
    if (data.resdata.length > 0) {
      setProducts(data.resdata);
    }
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
}

export async function fetchProductsByCategory(limit, offset, setProducts, categoryid) {  
  try {
    const res = await fetch(`${baseUrl}/products/category/${categoryid}/${limit}/${offset}`);
    const data = await res.json();
    if (data.resdata.length > 0) {
      setProducts(data.resdata);
    }
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
}

export async function fetchCategories(limit, offset, setCategories) {
  try {
    const res = await fetch(`${baseUrl}/categories/${limit}/${offset}`);
    const data = await res.json();
    if (data.resdata.length > 0) {
      setCategories(data.resdata);
    }
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
}
export async function fetchUsers(limit, offset, setUsers) {
  try {
    const res = await fetch(`${baseUrl}/users/${limit}/${offset}`);
    const data = await res.json();
    if (data.resdata.length > 0) {
      setUsers(data.resdata);
    }
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
}

export const fetchProductSingleImage = (
  readEntry,
  productsImageEndpoint,
  productId,
  setImages
) => {
  if (productId instanceof Array) {
    const fetchPromises = productId.map((id) =>
      readEntry(productsImageEndpoint + "/" + id)
        .then((res) => res.json())
        .then((data) => {
          if (
            data.resdata &&
            Array.isArray(data.resdata) &&
            data.resdata.length > 0
          ) {
            const imagePath = data.resdata[0].path.replace(/\\/g, "/");
            return {
              productId: id,
              imageUrl: `http://localhost:8080/${imagePath}`,
            };
          }
          return null; // Ha nincs kép, visszaadunk null-t
        })
        .catch((error) => {
          console.error("Failed to fetch images for product:", id, error);
          return null;
        })
    );

    Promise.all(fetchPromises)
      .then((imageDataArray) => {
        // Szűrjük ki a null elemeket
        const filteredImageData = imageDataArray.filter(
          (data) => data !== null
        );
        // Hozzuk létre az images objektumot a termék azonosítók és kép URL-ek alapján
        const imagesObject = filteredImageData.reduce((acc, data) => {
          acc[data.productId] = data.imageUrl;
          return acc;
        }, {});
        setImages(imagesObject);
      })
      .catch((error) => console.error("Failed to fetch images:", error));
  } else {
    readEntry(productsImageEndpoint + "/" + productId)
      .then((res) => res.json())
      .then((data) => {
        if (
          data.resdata &&
          Array.isArray(data.resdata) &&
          data.resdata.length > 0
        ) {
          const imagePath = data.resdata[0].path.replace(/\\/g, "/");
          setImages({ [productId]: `http://localhost:8080/api/${imagePath}` });
        }
      })
      .catch((error) => console.error("Failed to fetch images:", error));
  }
};

export const fetchProductImages = (
  readEntry,
  productsImageEndpoint,
  productId,
  setImages
) => {
  readEntry(productsImageEndpoint + "/" + productId)
    .then((res) => res.json())
    .then((data) => {
      if (data.resdata && Array.isArray(data.resdata)) {
        const modifiedImages = data.resdata.map((image) => {
          const imagePath = image.path.replace(/\\/g, "/");
          const imageUrl = `http://localhost:8080/${imagePath}`;
          return imageUrl;
        });
        setImages(modifiedImages);
      }
    })
    .catch((error) => console.error("Failed to fetch images:", error));
};

export const fetchSingleProduct = async (
  readEntry,
  productsEndpoint,
  setter,
  id
) => {
  try {
    const res = await readEntry(`${productsEndpoint}/${id}`);
    const data = await res.json().then((data) => {
      data.resdata.map((item) => {
        setter({
          name: item.name,
          description: item.description,
          price: item.price,
          reviews: item.reviews,
          comments: item.comments,
        });
      });
    });
  } catch (error) {
    console.error("Failed to fetch single product:", error);
  }
};