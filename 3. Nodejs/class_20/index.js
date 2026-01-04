import express from 'express';
import { Server } from './src/server/server.js';



const bootstrap = async () => {

  const instance = express();
  const port = 8787;

  const webserver = new Server(instance, port);
  
  webserver.listen;

};


bootstrap();