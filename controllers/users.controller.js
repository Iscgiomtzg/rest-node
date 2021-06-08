const usersGET = (request, response) => {
  const query = request.query;
  response.json({
    msg: 'GET API - Controller',
    query
  });
}

const usersPUT = (request, response) => {
  const id = request.params.id
  response.json({
    msg: 'PUT API - Controller',
    id
  });
}

const usersPOST = (request, response) => {
  const body = request.body;
  response.status(201).json({
    msg: 'POST API - Controller',
    body
  });
}

const usersDELETE = (request, response) => {
  response.json({
    msg: 'DELETE API - Controller'
  });
}

module.exports = {
  usersGET,
  usersPUT,
  usersPOST,
  usersDELETE
}