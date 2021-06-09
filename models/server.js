const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.db');

class Server {
  constructor(){
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = '/api/users';

    //Conexion a BD
    this.conectDB();

    // Middlewares
    this.middlewares();

    //Rutas
    this.routes();
  }

  async conectDB(){
    await dbConnection();
  }

  middlewares(){
    //CORS 
    this.app.use( cors() );

    // Lectura y parseo de body
    this.app.use( express.json() );

    //Directorio Publico
    this.app.use( express.static('public') );
  }

  routes(){

    this.app.use(this.usuariosPath, require('../routes/user.routes'));

  }

  listen(){
    this.app.listen( this.port, () => {
      console.log('Servidor corriendo en puerto:', this.port);
    });
  }

}

module.exports = Server;