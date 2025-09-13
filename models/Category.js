import connect from "@/lib/db";

export async function getCategories() {
  const db = await connect();
  return db.db().collection("categories").find({}).toArray();
}
