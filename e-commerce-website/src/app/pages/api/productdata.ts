import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    _id: number,
    title: string,
    description: string,
    price: number,
    category: string,
    image: string,
    rating: number,
    numReviews: number,
    countInStock: number

}[]

const productData = [{
    _id: 1,
    title: "Nike Slim Shirt",
    description: "Slim Shirt",
    price: 120,
    category: "Shirts",
    image: "https://images.unsplash.com/photo-1612835367871-4b7b7b0b0b0b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hpcnRzJTIwc2hpcnQlMjBwaG90b3Nob3B8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80",
    rating: 4.5,
    numReviews: 10,
    countInStock: 10
}]

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    res.status(200).json(productData)
}