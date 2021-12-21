import dogs from './dogs.json';

// This gets the dog names from dogs.json and sorts them
const names = Object.values(dogs)
  .map((dog) => dog.name)
  .sort();

/*
  This implements the GET /dogs API service. Alternatively, we could implement this to get the dog
  names from a database.
*/
export function get(req, res) {
  res.end(JSON.stringify(names));
}
