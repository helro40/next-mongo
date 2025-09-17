"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { DataGrid } from "@mui/x-data-grid";

export default function Home() {

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE; // Use only NEXT_PUBLIC_API_BASE
  console.log("API_BASE:", API_BASE);

  const [categoryList, setCategoryList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  // Columns for DataGrid
  const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'order', headerName: 'Order', width: 150 },
    {
      field: 'Action', headerName: 'Action', width: 150,
      renderCell: (params) => (
        <div>
          <button onClick={() => startEditMode(params.row)}>📝</button>
          <button onClick={() => deleteCategory(params.row)}>🗑️</button>
        </div>
      )
    },
  ];

  // Fetch all categories
  async function fetchCategory() {
    try {
      const res = await fetch(`${API_BASE}/category`);
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      setCategoryList(data.map(cat => ({ ...cat, id: cat._id })));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchCategory();
  }, []);

  // Add or Update category
  async function handleCategoryFormSubmit(data) {
    try {
      if (editMode) {
        // Update category
        await fetch(`${API_BASE}/category`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        stopEditMode();
      } else {
        // Add new category
        await fetch(`${API_BASE}/category`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }
      fetchCategory();
    } catch (error) {
      console.error(error);
    }
  }

  // Start edit mode
  function startEditMode(category) {
    reset(category);
    setEditMode(true);
  }

  // Stop edit mode
  function stopEditMode() {
    reset({ name: "", order: "" });
    setEditMode(false);
  }

  // Delete category
  async function deleteCategory(category) {
    if (!confirm(`Are you sure to delete [${category.name}]?`)) return;
    try {
      await fetch(`${API_BASE}/category/${category._id}`, { method: "DELETE" });
      fetchCategory();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main>
      {/* Category Form */}
      <form onSubmit={handleSubmit(handleCategoryFormSubmit)} autoComplete="off">
        <div className="grid grid-cols-2 gap-4 w-fit m-4 border border-gray-800 p-2">
          <div>Category name:</div>
          <div>
            <input
              type="text"
              {...register("name", { required: true })}
              className="border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              autoComplete="off"
            />
          </div>

          <div>Order:</div>
          <div>
            <input
              type="number"
              {...register("order", { required: true, valueAsNumber: true })}
              className="border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              autoComplete="off"
            />
          </div>

          <div className="col-span-2 text-right">
            {editMode ? (
              <>
                <input
                  type="submit"
                  className="italic bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  value="Update"
                />
                {' '}
                <button
                  type="button"
                  onClick={stopEditMode}
                  className="italic bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
                >
                  Cancel
                </button>
              </>
            ) : (
              <input
                type="submit"
                value="Add"
                className="w-20 italic bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
              />
            )}
          </div>
        </div>
      </form>

      {/* DataGrid Table */}
      <div className="mx-4">
        <DataGrid
          rows={categoryList}
          columns={columns}
          autoHeight
          pageSize={10}
        />
      </div>

      {/* Simple list with edit/delete */}
      <div className="ml-4">
        <h1 className="text-xl font-bold">Category ({categoryList.length})</h1>
        {categoryList.map((category) => (
          <div key={category._id} className="ml-4">
            ‣
            <button onClick={() => startEditMode(category)} className="mr-2">📝</button>
            <button onClick={() => deleteCategory(category)} className="mr-2">🗑️</button>
            <Link href={`/product/category/${category._id}`} className="text-red-600">
              {category.name} → {category.order}
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
