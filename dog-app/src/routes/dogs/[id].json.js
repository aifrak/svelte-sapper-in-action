// This function is used to create objects that represent document IDs.
const { ObjectId } = require('mongodb');
import { getCollection } from './_helpers';

export async function del(req, res) {
  // This gets the ID of the dog to delete from a path parameter
  const { id } = req.params;
  try {
    const collection = await getCollection();
    // This attempts to delete the document with a given ID from the dogs collection.
    const result = await collection.deleteOne({ _id: ObjectId(id) });
    if (result.deletedCount === 0) {
      res.status(404).send(`no dog with id ${id} found`);
    } else {
      res.end();
    }
  } catch (e) {
    console.error('[id].json.js del:', e);
    res.status(500).json({ error: e.message });
  }
}

export async function put(req, res) {
  // This gets the ID of the dog to update from a path parameter.
  const { id } = req.params;
  const replacement = req.body;

  // The object passed to the MongoDB replaceOne method cannot have an _id property, so we remove it.
  delete replacement._id;

  try {
    const collection = await getCollection();
    // This updates a document in the dogs collection identified by its unique ID.
    const result = await collection.replaceOne({ _id: ObjectId(id) }, replacement);

    // DOES NOT WORK FROM MONGODB 4
    // const [obj] = result.ops;

    // WORKS FROM MONGODB 4
    const obj = await collection.findOne({ _id: ObjectId(id) });

    // This restores the _id property in the object that will be returned as JSON.
    // DOES NOT WORK FROM MONGODB 4
    // obj._id = id;

    res.end(JSON.stringify(obj));
  } catch (e) {
    console.error('[id].json.js put:', e);
    res.status(500).json({ error: e.message });
  }
}
