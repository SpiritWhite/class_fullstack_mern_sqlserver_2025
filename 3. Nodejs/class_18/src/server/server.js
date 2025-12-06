import { randomUUID } from 'node:crypto';
import express from 'express';


let productos = [
  {
    id: 1,
    nombre: 'Producto 1',
    cantidad: 90
  },
  {
    id: 2,
    nombre: 'Producto 2',
    cantidad: 120
  },
];



export class Server {
  instance = express();
  port = 8282;
  path = '/api';

  constructor(
    instance ,
    port
  ) {
    this.instance = instance;
    this.port = port;

    this.middlewares();
    this.routes();
  }

  middlewares() {
    // PARSEO
    this.instance.use(express.json());
    // LOGGER
    this.instance.use((request, response, next) => {
      console.log(`NUMERO PETICION ${randomUUID()} ${request.method.toUpperCase()} ${request.url}`);
      next()
    })
    // DELETE
    this.instance.use((request, response, next) => {
      const method = request.method.toUpperCase();

      if (method === 'DELETE') console.log('HAZ EJECUTADO UN DELETE');

      next()
    })
  }

  routes() {
    // LISTA
    this.instance.get(`${this.path}/productos`, (request, response) => {
      return response.status(200).json(productos);
    });
    // ITEM UNICO
    this.instance.get(`${this.path}/productos/:id`, (request, response) => {
      const id = request.params.id;

      const producto = productos.filter(ft => ft.id === Number(id))[0];

      return response.status(200).json(producto);
    });
    // CREACION
    this.instance.post(`${this.path}/productos`, (request, response) => {
      if (!request.body) return response.status(400).json({
        status: 400,
        error: 'No suplio de un body en la respuesta'
      });
      const body = request.body;

      if (!body.nombre) {
        return response.status(400).json({
          status: 400,
          error: 'No suplio de los datos del nombre'
        });
      }
      if (!body.cantidad) {
        return response.status(400).json({
          status: 400,
          error: 'No suplio de los datos de la cantidad'
        });
      }

      const id = productos.length + 1;

      const producto = {
        id,
        nombre: body.nombre,
        cantidad: body.cantidad
      };

      productos.push(producto);

      return response.status(201).json(producto);
    });
    // ACTUALIZACION
    this.instance.put(`${this.path}/productos/:id`, (request, response) => {
      if (!request.body) return response.status(400).json({
        status: 400,
        error: 'No suplio de un body en la respuesta'
      });
      const { nombre, cantidad } = request.body;
      const id = request.params.id;


      const producto = productos.filter(ft => ft.id === Number(id))[0];

      productos = [
        ...productos.filter(ft => ft.id !== Number(id)),
        {
          ...producto,
          nombre,
          cantidad
        }
      ];

      return response.sendStatus(204);
    });
    // ELIMINACION
    this.instance.delete(`${this.path}/productos/:id`, (request, response) => {
      if (!request.body) return response.status(400).json({
        status: 400,
        error: 'No suplio de un body en la respuesta'
      });
      const id = request.params.id;

      productos = productos.filter(ft => ft.id !== Number(id));

      return response.sendStatus(204);
    });
  }


  get listen() {
    this.instance.listen(this.port, () => {
      console.log(`Servidor arriba, ejecutandose en el puerto ${this.port}`);
    });
  }

}