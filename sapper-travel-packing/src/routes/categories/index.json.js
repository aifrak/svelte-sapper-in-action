// Using this send function simplifies returning HTTP responses.
const send = require('@polka/send-type');
import { getCollection } from './_helpers';

// This gets all the categories from the database.
export async function get(req, res) {
  try {
    const collection = await getCollection();
    const result = await collection.find().toArray();
    res.end(JSON.stringify(result));
  } catch (e) {
    console.error('categories/index.json.js get:', e);
    send(res, 500, { error: e });
  }
}

// This adds a category to the database.
export async function post(req, res) {
  const category = req.body;
  try {
    const collection = await getCollection();
    const result = await collection.insertOne(category);

    // DOES NOT WORK FROM MONGODB 4
    // const [obj] = result.ops;

    // WORKS FROM MONGODB 4
    const obj = await collection.findOne({ _id: result.insertedId });

    // The object added to the database is returned so the client can get its assigned _id value.
    res.end(JSON.stringify(obj));
  } catch (e) {
    console.error('categories/index.json.js post:', e);
    send(res, 500, { error: e });
  }
}
