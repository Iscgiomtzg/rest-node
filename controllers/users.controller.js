const bcryptjs = require('bcryptjs');

const Usuario = require('./../models/user.model');

const usersGET = async (request, response) => {
  const { limit = 5, from = 0 } = request.query;
  const [total, usuarios] = await Promise.all([
    Usuario.count({ estado: true }),
    Usuario.find({ estado: true }).skip(Number(from)).limit(Number(limit))
  ]);
  response.json({
    total,
    usuarios
  });
}

const usersPUT = async (request, response) => {
  const { id } = request.params
  const { _id, password, google, correo, ...body } = request.body;
  // Validar contra BD
  if( password ){
    const salt = bcryptjs.genSaltSync();
    body.password = bcryptjs.hashSync( password, salt );
  }
  const usuario = await Usuario.findByIdAndUpdate( id, body );
  response.json({
    usuario
  });
}

const usersPOST = async (request, response) => {
  const { nombre, correo, password, role } = request.body;
  const usuario = new Usuario( { nombre, correo, password, role } );

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync( password, salt );

  //Guardar en BD
  await usuario.save();
  response.status(201).json({
    usuario
  });
}

const usersDELETE = async (request, response) => {
  const { id } = request.params;
  const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );
  response.json(usuario);
}

module.exports = {
  usersGET,
  usersPUT,
  usersPOST,
  usersDELETE
}