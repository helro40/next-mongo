import connect from "@/lib/db";

export async function getCategories() {
  const db = await connect();
  return await db.db().collection("categories").find({}).toArray();
}
