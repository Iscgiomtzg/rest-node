const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  nombre: {
    type: String,
    required: [true, 'Name is mandatory']
  },
  correo: {
    type: String,
    required: [true, 'Email is mandatory'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is mandatory']
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: [true, 'Role is mandatory'],
    enum: ['ADMIN', 'USER'],
  },
  estado: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false,
  }
});

// Remove from obj password and  __v
UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
}

module.exports = model( 'User' ,UserSchema );