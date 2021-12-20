const { MongoClient } = require('mongodb');

/*
  MongoDB thinks localhost is a different database instance than 127.0.0.1. The mongo shell uses
  127.0.0.1, so we use that to hit the same instance.
*/
// Docker compose service for mongodb is called "mongo"
const url = 'mongodb://root:example@mongo:27017';
// These are recommended MongoDB options to avoid deprecation warnings.
const options = { useNewUrlParser: true, useUnifiedTopology: true };
// This holds the dogs collection, so we only retrieve it once per session.
let collection;

export async function getCollection() {
  if (!collection) {
    const client = await MongoClient.connect(url, options);
    /*
      This gets access to the "animals" MongoDB database. There is no need to call the close method
      on db (see http://mng.bz/qMqw).
    */
    const db = client.db('animals');
    collection = await db.collection('dogs');
  }

  return collection;
}
