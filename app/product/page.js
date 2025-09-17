"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export default function Home() {
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE; // Correct variable
  console.debug("API_BASE", API_BASE);

  const { register, handleSubmit, reset } = useForm();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE}/product`);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch categories
  const fetchCategory = async () => {
    try {
      const res = await fetch(`${API_BASE}/category`);
      const data = await res.json();
      setCategory(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Create product
  const createProduct = async (data) => {
    try {
      await fetch(`${API_BASE}/product`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      reset(); // Clear form after submit
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  // Delete product
  const deleteById = (id) => async () => {
    if (!confirm("Are you sure?")) return;
    try {
      await fetch(`${API_BASE}/product/${id}`, { method: "DELETE" });
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategory();
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-row gap-4">
      {/* Product Form */}
      <div className="flex-1 w-64">
        <form onSubmit={handleSubmit(createProduct)}>
          <div className="grid grid-cols-2 gap-4 m-4 w-1/2">
            <div>Code:</div>
            <div>
              <input
                {...register("code", { required: true })}
                className="border border-black w-full"
              />
            </div>
            <div>Name:</div>
            <div>
              <input
                {...register("name", { required: true })}
                className="border border-black w-full"
              />
            </div>
            <div>Description:</div>
            <div>
              <textarea
                {...register("description", { required: true })}
                className="border border-black w-full"
              />
            </div>
            <div>Price:</div>
            <div>
              <input
                type="number"
                {...register("price", { required: true, valueAsNumber: true })}
                className="border border-black w-full"
              />
            </div>
            <div>Category:</div>
            <div>
              <select
                {...register("category", { required: true })}
                className="border border-black w-full"
              >
                {category.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2">
              <input
                type="submit"
                value="Add"
                className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              />
            </div>
          </div>
        </form>
      </div>

      {/* Product List */}
      <div className="border m-4 bg-slate-300 flex-1 w-64">
        <h1 className="text-2xl">Products ({products.length})</h1>
        <ul className="list-disc ml-8">
          {products.map((p) => (
            <li key={p._id}>
              <button onClick={deleteById(p._id)} className="border p-1 mr-2">
                ❌
              </button>
              <Link href={`/product/${p._id}`} className="font-bold">
                {p.name}
              </Link>{" "}
              - {p.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
