const { ObjectId } = require('mongodb');
import { getCollection } from './_helpers';

export async function get(req, res) {
  try {
    const collection = await getCollection();
    // This gets all the documents (objects) in the dogs MongoDB collection.
    const result = await collection.find().toArray();
    // This returns an array of dog objects as JSON.
    res.end(JSON.stringify(result));
  } catch (e) {
    console.error('index.json.js get:', e);
    res.status(500).json({ error: e.message });
  }
}

export async function post(req, res) {
  const dog = req.body;
  try {
    const collection = await getCollection();
    // This adds a dog to the dogs MongoDB collection.
    const result = await collection.insertOne(dog);

    // This gets the inserted document, which contains all the dog data plus its assigned unique ID.
    // DOES NOT WORK FROM MONGODB 4
    // const [obj] = result.ops;

    // WORKS FROM MONGODB 4
    const obj = await collection.findOne({ _id: result.insertedId });

    // This returns the dog object to the client as JSON, primarily so it has access to its ID.
    res.end(JSON.stringify(obj));
  } catch (e) {
    console.error('index.json.js post:', e);
    res.status(500).json({ error: e.message });
  }
}
