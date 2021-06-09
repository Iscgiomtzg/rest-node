const mongoose = require('mongoose');

const dbConnection = async () =>{
  try {

    await mongoose.connect( process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    } );
    
    console.info('Base de datos conectada');
  } catch (error) {
    console.warn(error);
    throw new Error('Error al inicializar DB');
  }
}

module.exports = {
  dbConnection
}