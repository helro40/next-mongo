import Category from "@/models/Category";
import dbConnect from "@/lib/mongodb"; // Make sure this connects to your MongoDB

export async function GET(request, { params }) {
  await dbConnect();

  const id = params.id;
  const category = await Category.findById(id);

  if (!category) {
    return new Response(JSON.stringify({ error: "Category not found" }), { status: 404 });
  }

  return new Response(JSON.stringify(category), { status: 200 });
}

export async function DELETE(request, { params }) {
  await dbConnect();

  const id = params.id;
  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    return new Response(JSON.stringify({ error: "Category not found" }), { status: 404 });
  }

  return new Response(JSON.stringify(category), { status: 200 });
}
