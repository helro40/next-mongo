import { ObjectId } from "mongodb";
import connect from "@/lib/db";

export async function getProducts() {
  const db = await connect();
  return db.db().collection("products").find({}).toArray();
}

export async function createProduct(data) {
  const db = await connect();
  return db.db().collection("products").insertOne(data);
}
