import { createProductDB } from "../../services/createProductService.js";
import createProductImage from "../../controller/image_controller/createProductImage.js";


export default async function createProduct(req, res) {
  // createProduct(payload) >  
  const { name, description, price, category, stock } = req.body;  

  if (!name || !description || !price || price === 0 || !category || stock === 0) {
    res
      .status(400)
      .json({ success: false, message: "Missing required information" });
    return;
  }

  try {
    const dbResult = await createProductDB(name, description, price, category, stock);
    const imgResult = await createProductImage(req, res, category);

    if (dbResult.success) {
      res.status(dbResult.status).json({ success: true, message: dbResult.message });
    } else {
      res.status(dbResult.status).json({ success: false, message: dbResult.message });
    }

    if (imgResult.success) {
      res.status(imgResult.status).json({ success: true, message: imgResult.message });
    } else {
      res.status(imgResult.status).json({ success: false, message: imgResult.message });
    }

    res.status(200).json({ success: true, message: "Product created" });
  } catch (error) {
    console.error("Unhandled promise rejection:", error);
    res.status(500).json({ success: false, message: "Unhandled promise rejection" });
  }
}

