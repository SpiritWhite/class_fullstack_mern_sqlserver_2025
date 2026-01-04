import { randomUUID } from 'node:crypto';
import express from 'express';
import AppDataSource from '../db/data-source.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export class Server {
  instance = express();
  port = 8282;
  path = '/api';
  readyPromise = null;
  usuarioRepo = null;
  jwtSecret = process.env.JWT_SECRET || 'mi_super_secreto';

  constructor(
    instance ,
    port
  ) {
    this.instance = instance;
    this.port = port;

    this.middlewares();
    this.routes();

    // Inicializar TypeORM en background y exponer el repo
    this.readyPromise = AppDataSource.initialize()
      .then(() => {
        this.usuarioRepo = AppDataSource.getRepository('Usuario');
        console.log('Conectado a MSSQL via TypeORM');
      })
      .catch((err) => {
        console.error('Error al inicializar DataSource:', err);
      });
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

  verifyToken = (request, response, next) => {
    const auth = request.headers?.authorization;
    if (!auth) return response.status(401).json({ error: 'No token provided' });
    const parts = auth.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') return response.status(401).json({ error: 'Invalid token format' });
    const token = parts[1];
    jwt.verify(token, this.jwtSecret, (err, payload) => {
      if (err) return response.status(401).json({ error: 'Token inválido' });
      request.user = payload;
      next();
    });
  }

  routes() {
    // RUTAS PARA USUARIOS (usando TypeORM)
    this.instance.get(`${this.path}/usuarios`, this.verifyToken, async (request, response) => {
      await this.readyPromise;
      const usuarios = await this.usuarioRepo.find();
      return response.status(200).json(usuarios);
    });

    this.instance.get(`${this.path}/usuarios/:id`, this.verifyToken, async (request, response) => {
      await this.readyPromise;
      const id = Number(request.params.id);
      const usuario = await this.usuarioRepo.findOneBy({ id });
      if (!usuario) return response.status(404).json({ error: 'No encontrado' });
      return response.status(200).json(usuario);
    });

    this.instance.post(`${this.path}/usuarios`, async (request, response) => {
      await this.readyPromise;
      const { nombre, email, password } = request.body || {};
      if (!nombre || !email || !password) return response.status(400).json({ error: 'Faltan datos' });

      try {
        const hashed = await bcrypt.hash(password, 10);
        const nuevo = this.usuarioRepo.create({ nombre, email, password: hashed });
        const saved = await this.usuarioRepo.save(nuevo);
        return response.status(201).json(saved);
      } catch (err) {
        console.error(err);
        return response.status(500).json({ error: 'Error al crear usuario' });
      }
    });

    // Login route - returns JWT
    this.instance.post(`${this.path}/login`, async (request, response) => {
      await this.readyPromise;
      const { email, password } = request.body || {};
      if (!email || !password) return response.status(400).json({ error: 'Faltan datos' });

      try {
        const usuario = await this.usuarioRepo.findOneBy({ email });
        if (!usuario) return response.status(401).json({ error: 'Credenciales inválidas' });
        const match = await bcrypt.compare(password, usuario.password);
        if (!match) return response.status(401).json({ error: 'Credenciales inválidas' });
        const token = jwt.sign({ id: usuario.id, email: usuario.email }, this.jwtSecret, { expiresIn: '1h' });
        return response.status(200).json({ token });
      } catch (err) {
        console.error(err);
        return response.status(500).json({ error: 'Error al autenticar' });
      }
    });

    this.instance.put(`${this.path}/usuarios/:id`, this.verifyToken, async (request, response) => {
      await this.readyPromise;
      const id = Number(request.params.id);
      const { nombre, email, password } = request.body || {};
      const usuario = await this.usuarioRepo.findOneBy({ id });
      if (!usuario) return response.status(404).json({ error: 'No encontrado' });

      usuario.nombre = nombre ?? usuario.nombre;
      usuario.email = email ?? usuario.email;

      if (password) {
        usuario.password = await bcrypt.hash(password, 10);
      }

      await this.usuarioRepo.save(usuario);
      return response.sendStatus(204);
    });

    this.instance.delete(`${this.path}/usuarios/:id`, this.verifyToken, async (request, response) => {
      await this.readyPromise;
      const id = Number(request.params.id);
      const usuario = await this.usuarioRepo.findOneBy({ id });
      if (!usuario) return response.status(404).json({ error: 'No encontrado' });
      await this.usuarioRepo.remove(usuario);
      return response.sendStatus(204);
    });
  }


  get listen() {
    // Inicia el servidor una vez que la inicialización de la BD termine.
    this.readyPromise
      ? this.readyPromise.then(() => {
          this.instance.listen(this.port, () => {
            console.log(`Servidor arriba, ejecutandose en el puerto ${this.port}`);
          });
        }).catch(() => {
          // Si falla la BD, igual intentamos levantar el servidor
          this.instance.listen(this.port, () => {
            console.log(`Servidor arriba (BD no disponible), puerto ${this.port}`);
          });
        })
      : this.instance.listen(this.port, () => {
          console.log(`Servidor arriba, ejecutandose en el puerto ${this.port}`);
        });
  }

}