import Category from "@/models/Category";
import dbConnect from "@/lib/mongodb"; // make sure you connect to MongoDB

export async function GET(request) {
  await dbConnect();

  const pno = request.nextUrl.searchParams.get("pno");
  if (pno) {
    const size = 3; // TODO: fix hardcode
    const startIndex = (pno - 1) * size;
    const categories = await Category.find()
      .sort({ order: -1 })
      .skip(startIndex)
      .limit(size);
    return new Response(JSON.stringify(categories), { status: 200 });
  }

  const s = request.nextUrl.searchParams.get("s");
  if (s) {
    const categories = await Category
      .find({ name: { $regex: s, $options: "i" } })
      .sort({ order: -1 });
    return new Response(JSON.stringify(categories), { status: 200 });
  }

  const categories = await Category.find().sort({ order: -1 });
  return new Response(JSON.stringify(categories), { status: 200 });
}

export async function POST(request) {
  await dbConnect();
  const body = await request.json();
  const category = new Category(body);
  await category.save();
  return new Response(JSON.stringify(category), { status: 201 });
}

export async function PUT(request) {
  await dbConnect();
  const body = await request.json();
  const category = await Category.findByIdAndUpdate(body._id, body, { new: true });
  return new Response(JSON.stringify(category), { status: 200 });
}
