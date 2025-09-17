import Product from "@/models/Product";
import dbConnect from "@/lib/db"; // Make sure this points to your db.js

export async function GET(request, { params }) {
  await dbConnect(); // connect to MongoDB

  const id = params.id; // ensure your route param matches [id] in filename
  const product = await Product.findById(id).populate("category");

  if (!product) {
    return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });
  }

  return new Response(JSON.stringify(product), { status: 200 });
}

export async function DELETE(request, { params }) {
  await dbConnect(); // connect to MongoDB

  const id = params.id;
  const deleted = await Product.findByIdAndDelete(id);

  if (!deleted) {
    return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });
  }

  return new Response(JSON.stringify(deleted), { status: 200 });
}
