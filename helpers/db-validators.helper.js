const Role = require('../models/role.model');
const Usuario = require('./../models/user.model');

const isRoleValid = async (role = '') => {
  const checkRole = await Role.findOne({ role });
  if( !checkRole ) throw new Error(`El rol ${role} no esta registrado en la base de datos`);
}

const isEmailExists = async (correo = '') => {
  const verifyEmail = await Usuario.findOne({ correo });
  if( verifyEmail ) throw new Error ('El correo ya esta registrado');
}

const isUserByIdExists = async ( id ) => {
  const userExists = await Usuario.findById(id);
  if( !userExists ) throw new Error('El id no existe');
}

module.exports = {
  isRoleValid,
  isEmailExists,
  isUserByIdExists

}