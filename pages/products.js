// pages/products.js
import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(setProducts);

    fetch("/api/categories")
      .then(res => res.json())
      .then(setCategories);
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map(p => <li key={p._id}>{p.name}</li>)}
      </ul>

      <h2>Categories</h2>
      <ul>
        {categories.map(c => <li key={c._id}>{c.name}</li>)}
      </ul>
    </div>
  );
}
