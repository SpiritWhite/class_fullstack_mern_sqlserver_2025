# Curso Fullstack MERN + SQL Server

![MERN Stack](https://img.shields.io/badge/Stack-MERN%20%2B%20SQL%20Server-blue)
![Duración](https://img.shields.io/badge/Duración-4%20meses-orange)
![Nivel](https://img.shields.io/badge/Nivel-Fundamentos%20a%20Intermedio-green)

Bienvenido al repositorio oficial del curso de desarrollo Fullstack con el stack MERN (MongoDB, Express.js, React, Node.js) y SQL Server. Este curso intensivo de 4 meses está diseñado para llevarte desde los fundamentos hasta un nivel intermedio en el desarrollo web fullstack.

## 📋 Descripción del Curso

Este programa de 16 semanas te guiará a través de todos los componentes necesarios para convertirte en un desarrollador fullstack competente. El curso combina teoría con práctica intensiva, culminando con un proyecto integrador que demostrará todas las habilidades adquiridas.

### 🎯 Objetivos de aprendizaje

- Fundamentos sólidos de desarrollo web (HTML, CSS, JavaScript)
- Desarrollo frontend moderno con React.js
- Construcción de APIs RESTful con Node.js y Express.js
- Manejo de bases de datos relacionales (SQL Server) y no relacionales (MongoDB)
- Seguridad y autenticación en aplicaciones web
- Conceptos de DevOps y despliegue de aplicaciones

## 🗓️ Plan de Estudios - 4 Meses

### Módulo 1: Fundamentos (Semanas 1-4)
**Objetivo:** Nivelar al grupo en los conceptos esenciales antes de profundizar en las tecnologías específicas.

- **HTML, CSS y JavaScript (Vanilla)**
  - Sintaxis básica y estructura de páginas web
  - Conceptos clave de JavaScript: variables, tipos de datos, funciones, estructuras de control, ES6+
  - Manipulación del DOM y eventos
  - Proyectos prácticos de integración

- **Introducción a las Bases de Datos**
  - Conceptos de bases de datos relacionales y no relacionales
  - Fundamentos de SQL: sintaxis básica (SELECT, INSERT, UPDATE, DELETE)
  - Práctica con SQL Server/PostgreSQL según preferencia del grupo
  - Diseño básico de esquemas de base de datos

- **Control de Versiones con Git y GitHub**
  - Comandos básicos de Git: add, commit, push, pull, branch
  - Flujo de trabajo colaborativo
  - Resolución de conflictos
  - Buenas prácticas en el uso de Git

### Módulo 2: Desarrollo Front-End con React.js (Semanas 5-8)
**Objetivo:** Creación de interfaces de usuario dinámicas con la librería más demandada del mercado.

- **Introducción a React.js**
  - Componentes funcionales y de clase
  - Propiedades (props) y estado (state)
  - Manejo de eventos y formularios
  - Listas y keys

- **Ecosistema de React**
  - Manejo de rutas con React Router
  - Manejo de estados con Context API y useReducer
  - Hooks avanzados: useEffect, useContext, useRef, custom hooks
  - Optimización de rendimiento

- **Consumo de APIs**
  - Fetching de datos con axios o fetch
  - Integración de componentes con APIs REST
  - Manejo de estados asíncronos
  - Patrones de loading y error handling

### Módulo 3: Desarrollo Back-End con Node.js (Semanas 9-12)
**Objetivo:** Construcción del servidor que dará servicio a la aplicación front-end.

- **Introducción a Node.js y Express.js**
  - Creación de servidores web
  - Manejo de rutas y middlewares
  - Servición de archivos estáticos
  - Configuración de entornos de desarrollo

- **Desarrollo de API REST**
  - Implementación de métodos HTTP (GET, POST, PUT, DELETE)
  - Conexión con bases de datos (SQL Server/PostgreSQL)
  - Uso de ORMs (Sequelize o Prisma)
  - Validación de datos y manejo de errores

- **Seguridad y Autenticación**
  - JWT (JSON Web Tokens)
  - Autenticación y autorización de usuarios
  - Seguridad en aplicaciones web (CORS, sanitización, rate limiting)
  - Hash de contraseñas con bcrypt

### Módulo 4: Proyecto Final y Temas Avanzados (Semanas 13-16)
**Objetivo:** Integración de conocimientos y introducción a temas avanzados de alta demanda.

- **Proyecto Integrador**
  - Desarrollo de una aplicación Full-Stack completa
  - Front-End con React, Back-End con Node.js, y DB con SQL
  - Planificación, desarrollo e implementación desde cero
  - Code reviews y trabajo colaborativo

- **Introducción a DevOps y Contenedores**
  - Docker para contenerizar la aplicación
  - Creación de Dockerfiles y docker-compose
  - Conceptos de CI/CD (Integración y Despliegue Continuo)
  - Despliegue en plataformas cloud (Heroku, Vercel, Railway)

- **Arquitecturas de Microservicios**
  - Introducción a la arquitectura de microservicios
  - Patrones de diseño comunes y cómo aplicarlos
  - Comunicación entre servicios
  - Ventajas y desafíos frente a arquitectura monolítica

## 🛠️ Stack Tecnológico

### Frontend
- **React** - Biblioteca de JavaScript para interfaces de usuario
- **React Router** - Enrutamiento para aplicaciones React
- **Axios** - Cliente HTTP para peticiones API
- **Context API** - Manejo de estado global

### Backend
- **Node.js** - Entorno de ejecución para JavaScript
- **Express.js** - Framework web para Node.js
- **JWT** - Autenticación con tokens
- **Bcrypt** - Encriptación de contraseñas

### Bases de Datos
- **SQL Server/PostgreSQL** - Base de datos relacional
- **MongoDB** - Base de datos NoSQL (como complemento)
- **Sequelize/Prisma** - ORM para Node.js

### Herramientas
- **Git & GitHub** - Control de versiones
- **Postman** - Testing de APIs
- **Docker** - Contenerización
- **SSMS** - SQL Server Management Studio

## 🚀 Cómo Empezar

### Prerrequisitos
- Conocimientos básicos de programación (cualquier lenguaje)
- Computadora con mínimo 8GB de RAM
- Node.js (v16 o superior) instalado
- Editor de código (VS Code recomendado)
- Cuenta en GitHub

### Instalación y Configuración

1. **Clona este repositorio:**
```bash
git clone https://github.com/SpiritWhite/class_fullstack_mern_sqlserver_2025.git
cd class_fullstack_mern_sqlserver_2025
```

2. **Configura tu entorno:**
   - Instala Node.js desde [nodejs.org](https://nodejs.org/)
   - Instala Git desde [git-scm.com](https://git-scm.com/)
   - Configura tu editor de código (recomendado: VS Code con extensiones para JavaScript y React)

3. **Por cada módulo:**
```bash
cd modulo-X/proyecto-ejemplo
npm init -y
npm install
cp .env.example .env
# Configura tus variables de entorno
npm run dev
```

## 📦 Estructura del Repositorio

```
class_fullstack_mern_sqlserver_2025/
│
├── modulo-1-fundamentos/
│   ├── semana-1-html-css/
│   ├── semana-2-javascript-basico/
│   ├── semana-3-javascript-avanzado/
│   └── semana-4-bases-datos-git/
│
├── modulo-2-react/
│   ├── semana-5-introduccion-react/
│   ├── semana-6-estado-eventos/
│   ├── semana-7-routing-apis/
│   └── semana-8-hooks-avanzados/
│
├── modulo-3-node-backend/
│   ├── semana-9-intro-node-express/
│   ├── semana-10-apis-rest/
│   ├── semana-11-bases-datos-orms/
│   └── semana-12-seguridad-autenticacion/
│
├── modulo-4-proyecto-avanzado/
│   ├── semana-13-proyecto-integracion/
│   ├── semana-14-docker-devops/
│   ├── semana-15-microservicios/
│   └── semana-16-deployment-presentacion/
│
├── proyectos/
│   ├── proyecto-final/
│   ├── ejercicios-semana/
│   └── retos-adicionales/
│
├── recursos/
│   ├── cheatsheets/
│   ├── presentaciones/
│   └── enlaces-utiles/
│
└── README.md
```

## 🎓 Evaluación 
<!-- y Certificación -->

- **Proyectos semanales:** 40%
- **Participación en clase:** 20%
- **Proyecto final:** 40%
<!-- - **Certificado** al completar satisfactoriamente el 80% de las actividades -->

## 🤝 Contribuciones

Este curso está en constante evolución. Si deseas contribuir:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/NuevaCaracteristica`)
3. Commit tus cambios (`git commit -m 'Agrega NuevaCaracteristica'`)
4. Push a la rama (`git push origin feature/NuevaCaracteristica`)
5. Abre un Pull Request

## 📞 Soporte y Comunidad

<!-- - **Discord:** [Únete a nuestra comunidad](enlace-discord) -->
- **Issues GitHub:** Reporta problemas o sugerencias
- **Sesiones de Q&A:** Semanales para resolver dudas
- **Code Reviews:** Feedback personalizado en proyectos

## 📝 Licencia

Este material está disponible bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

**¡Embárcate en este viaje de 4 meses para convertirte en desarrollador Fullstack! 🚀**

*"El mejor momento para plantar un árbol fue hace 20 años. El segundo mejor momento es ahora." - Proverbio chino*