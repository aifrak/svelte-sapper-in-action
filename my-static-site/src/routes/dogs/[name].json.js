import dogs from './dogs.json';

/*
  This implements the GET /dogs/{name} API service. Alternatively, we could implement this to get
  the dog data from a database.
*/
export function get(req, res, next) {
  const { name } = req.params;
  const dog = dogs[name];

  if (dog) {
    res.end(JSON.stringify(dog));
  } else {
    const error = { message: `${name} not found` };
    res.statusCode = 404;
    res.end(JSON.stringify(error));
  }
}
