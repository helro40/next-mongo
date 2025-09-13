import { getProducts, createProduct } from "@/models/Product";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const products = await getProducts();
    res.status(200).json(products);
  } else if (req.method === "POST") {
    const product = await createProduct(req.body);
    res.status(201).json(product);
  } else {
    res.status(405).end();
  }
}
