import http from 'http';
import express from 'express';
import mssql from 'mssql';

//// FUNCIONES GENERALES

function isObjectEmpty(objectName) {
    return (
      objectName &&
      Object.keys(objectName).length === 0 &&
      objectName.constructor === Object
    );
}


//// CONSTANTES

const PORT = 8080;


//// CONFIGURACION DE EXPRESS

const application = express();
const server = http.createServer(application);

///// CONEXION DE BASE DE DATOS

const sqlConfiguration = {
  user: 'sa',
  password: 'YourStrong!Passw0rd',
  database: 'tienda',
  server: 'localhost',
  port: 1433,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  }
};

const createConnection = async (config) => {
  try {
    const client = await mssql.connect(config);
    await client.query('SELECT 1 + 1');
    console.log('Database connection successfull');
    return client;
  } catch (error) {
    console.error(error);
    return error;
  }
}

//// PATRON ADAPTADOR Y SINGLETON
const instance = await createConnection(sqlConfiguration);

//// CONFIGURACION DE RUTAS Y MIDDLEWARES

application.use(express.json({ limit: '10mb' }));

application.get('/', (req, res, next) => {
  res.send('<h1> API SERVER UP!!</h1>');
});

application.get('/users', async (req, res, next) => {
  console.log('GET List Users');
  try {
    const users = await instance.query(`select
       u.ID as userId,
       u.Username as username,
       u.Email as email,
       p.FName as firstName,
       p.LName as lastName
      from person as p inner join users as u on u.IdPerson = p.Id
      where u.desactive = 0`);

    if (users.recordset.length <= 0)
      return res.status(404).json({
        status: 404,
        error: 'DATA NOT FOUND'
      });

      return res.status(200).json({
        data: users.recordset
      });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: 'INTERNAL SERVER ERROR'
    });
  }
});

application.get('/users/:id', async (req, res, next) => {
  console.log('GET ID Users');
  try {
    const params = req.params;

    if (!params.id)
      return res.status(400).json({
        status: 400,
        error: 'REQUIRED USER ID'
      });

    const { recordset: data } = await instance.query(`select top 1
      u.ID as userId,
      u.Username as username,
      u.Email as email,
      p.FName as firstName,
      p.LName as lastName
      from person as p inner join users as u on u.IdPerson = p.Id WHERE u.id = ${params.id}`);

    if (data.length <= 0)
      return res.status(404).json({
        status: 404,
        error: 'DATA NOT FOUND'
      });

    const user = data[0];

    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: 'INTERNAL SERVER ERROR'
    });
  }
});

application.post('/users', async (req, res, next) => {
  console.log('POST Create Users');
  try {
    if (isObjectEmpty(req.body))
      return res.status(400).json({
        status: 400,
        error: 'NOT DATA SUPPLY'
      }); 

    const obj = req.body;

    const { recordset: isExist } = await instance.query(`select * from users where Username = '${obj.username}' or Email = '${obj.email}';`);

    if (isExist.length > 0)
      return res.status(400).json({
        status: 400,
        error: 'USER IS ALREADY!'
      }); 

    const request = instance.request();
    request.input('Fname', obj.firstName);
    request.input('LName', obj.lastName);

    const { recordset } = await request.query(`insert into person (FName, LName) output inserted.* Values (@FName, @LName);`);

    const person = recordset[0];

    if (!person.ID)
      return res.status(400).json({
        status: 400,
        error: 'NOT CREATED USERS'
      }); 

    await instance.query(`insert into users (Username, Email, Password, IdPerson) Values ('${obj.username}', '${obj.email}', '${obj.password}', ${person.ID})`);

    return res.status(200).json({
      status: 200,
      message: 'Created users successfull'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 500,
      error: 'INTERNAL SERVER ERROR'
    });
  }
});

application.put('/users/:id', async (req, res, next) => {
  console.log('PUT ID Users');
  try {
    const params = req.params;

    if (!params.id)
      return res.status(400).json({
        status: 400,
        error: 'REQUIRED USER ID'
      });
    
    if (isObjectEmpty(req.body))
      return res.status(400).json({
        status: 400,
        error: 'NOT DATA SUPPLY'
      }); 

    const obj = req.body;

    const { recordset: isExist } = await instance.query(`select top 1 p.id from users as u inner join person as p on p.id = u.idperson where u.ID = ${params.id};`);

    if (isExist.length <= 0)
      return res.status(404).json({
        status: 404,
        error: 'USER NOT FOUND!'
      });

    const person = isExist[0];
    
    const { rowsAffected } = await instance.query(`update person set FName = '${obj.firstName}', LName = '${obj.lastName}' where ID = ${person.id}`);

    if (rowsAffected.length <= 0)
      return res.status(400).json({
        status: 400,
        error: 'ERROR DATA UPDATE'
      });

    return res.status(200).json({
      status: 200,
      message: 'USER UPDATED INFO'
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      error: 'INTERNAL SERVER ERROR'
    });
  }
});

application.delete('/users/:id', async (req, res, next) => {
  console.log('DELETE ID Users');
  try {
    const params = req.params;

    if (!params.id)
      return res.status(400).json({
        status: 400,
        error: 'REQUIRED USER ID'
      });

    const { recordset: isExist } = await instance.query(`select top 1 p.id from users as u inner join person as p on p.id = u.idperson where u.ID = ${params.id};`);

    if (isExist.length <= 0)
      return res.status(404).json({
        status: 404,
        error: 'USER NOT FOUND!'
      });
    
    const { rowsAffected } = await instance.query(`update users set Desactive = 1 where ID = ${params.id}`);

    if (rowsAffected.length <= 0)
      return res.status(400).json({
        status: 400,
        error: 'ERROR DESACTIVE USER'
      });

    return res.status(200).json({
      status: 200,
      message: 'USER DESACTIVE'
    });
    
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: 'INTERNAL SERVER ERROR'
    });
  }
});

application.all(/.*/, (req, res, next) => {
  res.status(404).json({
    status: 404,
    error: 'NOT FOUND'
  });
});


///// LEVANTAMIENTO DEL SERVIDOR EN EL PUERTO ESPECIFICADO

server.listen(PORT, () => {
  console.log(`Server listen in port ${PORT}`);
});