const send = require('@polka/send-type');
// This function is used to create objects that represent document IDs.
const { ObjectId } = require('mongodb');
import { getCollection } from '../_helpers';

// This deletes a category from the database.
export async function del(req, res) {
  const { categoryId } = req.params;
  try {
    const collection = await getCollection();
    const result = await collection.deleteOne({ _id: ObjectId(categoryId) });
    if (result.deletedCount === 0) {
      send(res, 404, `no category with id ${categoryId} found`);
    } else {
      res.end();
    }
  } catch (e) {
    console.error('categories/[categoryId]/index.json.js del:', e);
    send(res, 500, { error: e });
  }
}

// This updates a category in the database.
export async function put(req, res) {
  const { categoryId } = req.params;
  const replacement = req.body;

  // The object passed to the MongoDB replaceOne method cannot have an _id property.
  delete replacement._id;

  try {
    const collection = await getCollection();
    const result = await collection.replaceOne({ _id: ObjectId(categoryId) }, replacement);

    // DOES NOT WORK FROM MONGODB 4
    // const [obj] = result.ops;
    // obj._id = categoryId;

    // WORKS FROM MONGODB 4
    const obj = await collection.findOne({ _id: ObjectId(categoryId) });

    res.end(JSON.stringify(obj));
  } catch (e) {
    console.error('categories/[categoryId]/index.json.js put:', e);
    send(res, 500, { error: e });
  }
}
