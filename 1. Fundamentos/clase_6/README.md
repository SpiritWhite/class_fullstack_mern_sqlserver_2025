# 📚 SQL Server: CRUD Completo, Normalización y Tipos de Datos

## 🚀 **Ejemplo CRUD Completo con DDL y DML**

### 📂 **DDL - Definición de Estructuras**

```sql
-- Crear base de datos
CREATE DATABASE TiendaOnline;
GO

USE TiendaOnline;
GO

-- Crear tabla de Clientes (Forma Normal 1)
CREATE TABLE Clientes (
    ClienteID INT IDENTITY(1,1) PRIMARY KEY,
    Nombre NVARCHAR(100) NOT NULL,
    Apellido NVARCHAR(100) NOT NULL,
    Email NVARCHAR(255) UNIQUE,
    Telefono NVARCHAR(20),
    FechaRegistro DATETIME2 DEFAULT GETDATE(),
    Activo BIT DEFAULT 1
);
GO

-- Crear tabla de Categorías
CREATE TABLE Categorias (
    CategoriaID INT IDENTITY(1,1) PRIMARY KEY,
    Nombre NVARCHAR(50) NOT NULL UNIQUE,
    Descripcion NVARCHAR(255),
    FechaCreacion DATETIME2 DEFAULT GETDATE()
);
GO

-- Crear tabla de Productos (Forma Normal 2)
CREATE TABLE Productos (
    ProductoID INT IDENTITY(1,1) PRIMARY KEY,
    Nombre NVARCHAR(100) NOT NULL,
    Descripcion NVARCHAR(500),
    Precio DECIMAL(10,2) NOT NULL CHECK (Precio > 0),
    Stock INT DEFAULT 0 CHECK (Stock >= 0),
    CategoriaID INT NOT NULL,
    FechaCreacion DATETIME2 DEFAULT GETDATE(),
    Activo BIT DEFAULT 1,
    CONSTRAINT FK_Productos_Categorias 
        FOREIGN KEY (CategoriaID) REFERENCES Categorias(CategoriaID)
);
GO

-- Crear tabla de Pedidos (Forma Normal 3)
CREATE TABLE Pedidos (
    PedidoID INT IDENTITY(1,1) PRIMARY KEY,
    ClienteID INT NOT NULL,
    FechaPedido DATETIME2 DEFAULT GETDATE(),
    Estado NVARCHAR(20) DEFAULT 'Pendiente' 
        CHECK (Estado IN ('Pendiente', 'Confirmado', 'Enviado', 'Entregado', 'Cancelado')),
    Total DECIMAL(10,2) DEFAULT 0,
    CONSTRAINT FK_Pedidos_Clientes 
        FOREIGN KEY (ClienteID) REFERENCES Clientes(ClienteID)
);
GO

-- Crear tabla de DetallesPedido
CREATE TABLE DetallesPedido (
    DetalleID INT IDENTITY(1,1) PRIMARY KEY,
    PedidoID INT NOT NULL,
    ProductoID INT NOT NULL,
    Cantidad INT NOT NULL CHECK (Cantidad > 0),
    PrecioUnitario DECIMAL(10,2) NOT NULL,
    Subtotal AS (Cantidad * PrecioUnitario),
    CONSTRAINT FK_Detalles_Pedidos 
        FOREIGN KEY (PedidoID) REFERENCES Pedidos(PedidoID),
    CONSTRAINT FK_Detalles_Productos 
        FOREIGN KEY (ProductoID) REFERENCES Productos(ProductoID)
);
GO

-- Crear índices para mejorar rendimiento
CREATE INDEX IX_Clientes_Email ON Clientes(Email);
CREATE INDEX IX_Pedidos_ClienteID ON Pedidos(ClienteID);
CREATE INDEX IX_Productos_CategoriaID ON Productos(CategoriaID);
CREATE INDEX IX_DetallesPedido_PedidoID ON DetallesPedido(PedidoID);
GO
```

### 🔄 **DML - Operaciones CRUD**

#### ✅ **CREATE - Insertar Datos**
```sql
-- Insertar categorías
INSERT INTO Categorias (Nombre, Descripcion) 
VALUES 
    ('Electrónicos', 'Dispositivos electrónicos y gadgets'),
    ('Ropa', 'Prendas de vestir'),
    ('Hogar', 'Artículos para el hogar');

-- Insertar clientes
INSERT INTO Clientes (Nombre, Apellido, Email, Telefono) 
VALUES 
    ('María', 'García', 'maria.garcia@email.com', '+34 600 111 222'),
    ('Carlos', 'López', 'carlos.lopez@email.com', '+34 600 333 444');

-- Insertar productos
INSERT INTO Productos (Nombre, Descripcion, Precio, Stock, CategoriaID) 
VALUES 
    ('iPhone 14', 'Smartphone Apple iPhone 14 128GB', 999.99, 50, 1),
    ('Samsung TV', 'Televisor Samsung 55" 4K UHD', 699.99, 25, 1),
    ('Jeans Azules', 'Jeans casuales color azul', 49.99, 100, 2);

-- Insertar pedido completo
BEGIN TRANSACTION;
    DECLARE @NuevoPedidoID INT;

    -- Crear pedido
    INSERT INTO Pedidos (ClienteID) 
    VALUES (1);
    
    SET @NuevoPedidoID = SCOPE_IDENTITY();
    
    -- Agregar detalles del pedido
    INSERT INTO DetallesPedido (PedidoID, ProductoID, Cantidad, PrecioUnitario) 
    VALUES 
        (@NuevoPedidoID, 1, 2, 999.99),
        (@NuevoPedidoID, 3, 1, 49.99);
    
    -- Actualizar total del pedido
    UPDATE Pedidos 
    SET Total = (
        SELECT SUM(Subtotal) 
        FROM DetallesPedido 
        WHERE PedidoID = @NuevoPedidoID
    ) 
    WHERE PedidoID = @NuevoPedidoID;

COMMIT TRANSACTION;
```

#### 👀 **READ - Consultar Datos**
```sql
-- Consulta básica de clientes
SELECT ClienteID, Nombre, Apellido, Email 
FROM Clientes 
WHERE Activo = 1;

-- Consulta con JOIN para ver pedidos completos
SELECT 
    p.PedidoID,
    c.Nombre + ' ' + c.Apellido AS Cliente,
    p.FechaPedido,
    p.Estado,
    p.Total,
    COUNT(dp.DetalleID) AS TotalProductos
FROM Pedidos p
    INNER JOIN Clientes c ON p.ClienteID = c.ClienteID
    LEFT JOIN DetallesPedido dp ON p.PedidoID = dp.PedidoID
WHERE p.Estado != 'Cancelado'
GROUP BY p.PedidoID, c.Nombre, c.Apellido, p.FechaPedido, p.Estado, p.Total;

-- Subconsulta para productos con stock bajo
SELECT 
    ProductoID,
    Nombre,
    Precio,
    Stock
FROM Productos 
WHERE Stock < 10 AND Activo = 1;

-- Consulta con funciones agregadas
SELECT 
    c.Nombre AS Categoria,
    COUNT(p.ProductoID) AS TotalProductos,
    AVG(p.Precio) AS PrecioPromedio,
    SUM(p.Stock) AS StockTotal
FROM Categorias c
    LEFT JOIN Productos p ON c.CategoriaID = p.CategoriaID
GROUP BY c.CategoriaID, c.Nombre;
```

#### ✏️ **UPDATE - Actualizar Datos**
```sql
-- Actualizar precio de un producto
UPDATE Productos 
SET Precio = 849.99 
WHERE ProductoID = 1;

-- Actualizar stock después de una venta
UPDATE Productos 
SET Stock = Stock - 2 
WHERE ProductoID = 1;

-- Actualizar estado de múltiples pedidos
UPDATE Pedidos 
SET Estado = 'Enviado' 
WHERE Estado = 'Confirmado' 
    AND FechaPedido < DATEADD(day, -1, GETDATE());

-- Actualizar con JOIN
UPDATE p
SET p.Stock = p.Stock + 10
FROM Productos p
INNER JOIN Categorias c ON p.CategoriaID = c.CategoriaID
WHERE c.Nombre = 'Electrónicos';
```

#### 🗑️ **DELETE - Eliminar Datos**
```sql
-- Eliminar lógicamente (soft delete)
UPDATE Clientes 
SET Activo = 0 
WHERE ClienteID = 2;

-- Eliminar detalles de pedido cancelado
DELETE FROM DetallesPedido 
WHERE PedidoID IN (
    SELECT PedidoID FROM Pedidos WHERE Estado = 'Cancelado'
);

-- Eliminar pedidos cancelados antiguos
DELETE FROM Pedidos 
WHERE Estado = 'Cancelado' 
    AND FechaPedido < DATEADD(month, -6, GETDATE());

-- Eliminar con transacción para seguridad
BEGIN TRANSACTION;
    DELETE FROM DetallesPedido WHERE PedidoID = 5;
    DELETE FROM Pedidos WHERE PedidoID = 5;
COMMIT TRANSACTION;
```

## 📊 **LAS 5 FORMAS NORMALES - Explicación con Ejemplo**

### 🎯 **Ejemplo Inicial (Sin Normalizar) - Tabla Desnormalizada**
```sql
-- ❌ MAL DISEÑADO - Viola todas las formas normales
CREATE TABLE PedidosDesnormalizados (
    PedidoID INT,
    FechaPedido DATE,
    ClienteID INT,
    ClienteNombre NVARCHAR(100),
    ClienteEmail NVARCHAR(255),
    ProductoID INT,
    ProductoNombre NVARCHAR(100),
    ProductoCategoria NVARCHAR(50),
    CategoriaDescripcion NVARCHAR(255),  -- Dependencia transitiva
    Precio DECIMAL(10,2),
    Cantidad INT,
    Total AS (Precio * Cantidad)
);
```

### 1️⃣ **PRIMERA FORMA NORMAL (1FN)**
**Regla**: Eliminar grupos repetitivos y asegurar atomicidad de los datos.

**❌ Antes**:
```sql
-- Viola 1FN - Múltiples productos en mismo registro
PedidoID | Cliente  | Productos
-----------------------------------------
1        | María    | iPhone 14, Jeans, TV
```

**✅ Después**:
```sql
-- Cumple 1FN - Cada producto en registro separado
PedidoID | Producto    | Cantidad
---------------------------------
1        | iPhone 14   | 2
1        | Jeans Azules| 1
1        | Samsung TV  | 1
```

### 2️⃣ **SEGUNDA FORMA NORMAL (2FN)**
**Regla**: Debe estar en 1FN y todos los atributos no clave deben depender de TODA la clave primaria.

**❌ Problema en DetallesPedido**:
```sql
-- Si la clave primaria fuera (PedidoID, ProductoID)
DetalleID | PedidoID | ProductoID | ProductoNombre | Precio
-----------------------------------------------------------
-- ❌ ProductoNombre depende solo de ProductoID, no de toda la clave
```

**✅ Solución**:
```sql
-- Tabla DetallesPedido (depende de toda la clave)
DetalleID | PedidoID | ProductoID | Cantidad | PrecioUnitario

-- Tabla Productos (información independiente)
ProductoID | ProductoNombre | Descripcion | PrecioBase
```

### 3️⃣ **TERCERA FORMA NORMAL (3FN)**
**Regla**: Debe estar en 2FN y eliminar dependencias transitivas (atributos que dependen de otros atributos no clave).

**❌ Ejemplo de violación**:
```sql
-- En tabla Productos:
ProductoID | Nombre | CategoriaID | CategoriaNombre | CategoriaDescripcion
-- ❌ CategoriaNombre depende de CategoriaID, no directamente de ProductoID
```

**✅ Solución**:
```sql
-- Tabla Productos (solo FK a categoría)
ProductoID | Nombre | CategoriaID

-- Tabla Categorías (datos independientes)
CategoriaID | CategoriaNombre | CategoriaDescripcion
```

### 4️⃣ **CUARTA FORMA NORMAL (4FN)**
**Regla**: Eliminar dependencias multivaluadas independientes.

**❌ Ejemplo hipotético**:
```sql
-- Un producto puede tener múltiples categorías y múltiples proveedores
ProductoID | CategoriaID | ProveedorID
---------------------------------------
1          | 1           | 101
1          | 1           | 102  -- ❌ Dependencias multivaluadas
1          | 2           | 101
```

**✅ Solución**:
```sql
-- Tabla ProductoCategoria
ProductoID | CategoriaID

-- Tabla ProductoProveedor  
ProductoID | ProveedorID
```

### 5️⃣ **QUINTA FORMA NORMAL (5FN)**
**Regla**: Descomponer hasta que no se pueda descomponer más sin perder información.

**Casos muy específicos de dependencias de reunión**.

## 🤔 **¿Por qué solo se usa hasta la 3FN en la práctica?**

### ✅ **Ventajas de parar en 3FN**:
```sql
-- 🎯 Razonamiento práctico:

-- 1. 🏎️ RENDIMIENTO: Menos JOINs necesarios
SELECT p.Nombre, c.Nombre AS Categoria
FROM Productos p
INNER JOIN Categorias c ON p.CategoriaID = c.CategoriaID;  -- Solo 1 JOIN

-- 2. 🛠️ MANTENIBILIDAD: Más fácil de entender y modificar
-- 3FN es intuitivo para desarrolladores

-- 3. ⚖️ EQUILIBRIO: Balance entre normalización y rendimiento
-- 4FN y 5FN generan tablas excesivamente fragmentadas

-- 4. 📊 APLICACIONES REALES: La mayoría de negocio cabe en 3FN
-- Transacciones, reporting, analytics funcionan bien en 3FN
```

### ❌ **Problemas de sobre-normalizar** (4FN-5FN):
```sql
-- 🔍 Ejemplo de sobre-normalización problemática:

-- ❌ Demasiadas tablas para consulta simple
SELECT 
    p.Nombre,
    pc.CategoriaID,
    c.Nombre AS Categoria,
    pp.ProveedorID, 
    pr.Nombre AS Proveedor
FROM Productos p
    INNER JOIN ProductoCategoria pc ON p.ProductoID = pc.ProductoID
    INNER JOIN Categorias c ON pc.CategoriaID = c.CategoriaID
    INNER JOIN ProductoProveedor pp ON p.ProductoID = pp.ProductoID  
    INNER JOIN Proveedores pr ON pp.ProveedorID = pr.ProveedorID;
-- 📉 Consulta con 4 JOINs vs 1 JOIN en diseño práctico
```

### 🎯 **Excepciones donde se usa más allá de 3FN**:
```sql
-- 1. 📚 SISTEMAS ACADÉMICOS: Investigación de bases de datos
-- 2. 🏦 SISTEMAS FINANCIEROS: Donde la integridad es crítica
-- 3. 🎪 DATA WAREHOUSING: Diseños dimensionales específicos
-- 4. 🔬 CIENCIA DE DATOS: Estructuras especializadas para analytics
```

## 📋 **TIPOS DE DATOS EN SQL SERVER**

### 🔢 **Numéricos Exactos**
```sql
-- Enteros
INT           -- -2^31 to 2^31-1 (4 bytes) ✅ Más usado
BIGINT        -- -2^63 to 2^63-1 (8 bytes) 🚀 Para IDs grandes
SMALLINT      -- -32,768 to 32,767 (2 bytes) 📊 Para valores pequeños
TINYINT       -- 0 to 255 (1 byte) 🎯 Para edades, porcentajes

-- Decimales exactos
DECIMAL(10,2) -- 12345678.99 ✅ Para dinero, precisión exacta
NUMERIC(10,2) -- Sinónimo de DECIMAL
MONEY         -- -922,337 tril to 922,337 tril (8 bytes) 💰 Específico para dinero
SMALLMONEY    -- -214,748.3648 to 214,748.3647 (4 bytes)
```

### 🔄 **Numéricos Aproximados**
```sql
FLOAT(24)     -- 7 dígitos de precisión 🎯 Para cálculos científicos
FLOAT(53)     -- 15 dígitos de precisión 🚀 Doble precisión
REAL          -- Sinónimo de FLOAT(24)
```

### 📅 **Fecha y Hora**
```sql
DATETIME      -- Jan 1, 1753 to Dec 31, 9999 (3.33ms precisión) ⚠️ Obsoleto
DATETIME2     -- Jan 1, 0001 to Dec 31, 9999 (100ns precisión) ✅ Recomendado
DATE          -- Solo fecha (3 bytes) 📅 Para fechas sin hora
TIME          -- Solo hora (5 bytes) ⏰ Para horas sin fecha
SMALLDATETIME -- Jan 1, 1900 to Jun 6, 2079 (1 minuto precisión) 🎯 Para fechas aproximadas
DATETIMEOFFSET-- Con zona horaria 🌍 Para aplicaciones globales
```

### 📝 **Caracteres y Texto**
```sql
-- Caracteres de longitud fija
CHAR(10)      -- Siempre 10 caracteres ⚡ Rápido para códigos fijos
NCHAR(10)     -- CHAR Unicode 🈷️ Para idiomas internacionales

-- Caracteres de longitud variable  
VARCHAR(100)  -- Hasta 100 caracteres ✅ Más usado eficientemente
NVARCHAR(100) -- VARCHAR Unicode 🌍 Para texto multilingüe
VARCHAR(MAX)  -- Hasta 2GB de texto 📚 Para contenido grande
NVARCHAR(MAX) -- VARCHAR(MAX) Unicode

-- Texto antiguo (evitar)
TEXT          -- ⚠️ Obsoleto, usar VARCHAR(MAX)
NTEXT         -- ⚠️ Obsoleto, usar NVARCHAR(MAX)
```

### 💾 **Binarios**
```sql
BINARY(50)    -- Longitud fija binaria 🔐 Para hashes fijos
VARBINARY(50) -- Longitud variable binaria 📎 Para archivos pequeños
VARBINARY(MAX)-- Hasta 2GB binarios 🖼️ Para imágenes, documentos
IMAGE         -- ⚠️ Obsoleto, usar VARBINARY(MAX)
```

### ✅ **Booleanos y Especiales**
```sql
BIT           -- 0, 1, or NULL ✅ Para banderas booleanas
UNIQUEIDENTIFIER -- GUID (16 bytes) 🌐 Para identificadores globales
XML           -- Datos XML estructurados 📊 Para datos jerárquicos
JSON          -- SQL Server 2016+ 📄 Para datos semi-estructurados
```

## 🎯 **Mejores Prácticas en Tipos de Datos**

### ✅ **Recomendaciones**:
```sql
-- 🎯 ELECCIONES INTELIGENTES:

-- Para nombres de personas
NVARCHAR(100)  -- ✅ Mejor que VARCHAR para internacionalización

-- Para emails  
NVARCHAR(255)  -- ✅ Estándar para direcciones email

-- Para precios/monetarios
DECIMAL(10,2)  -- ✅ Precisión exacta para dinero

-- Para fechas modernas
DATETIME2      -- ✅ Mejor rango y precisión que DATETIME

-- Para banderas/booleanos
BIT            -- ✅ Optimizado para valores true/false

-- Para IDs autoincrementales
INT            -- ✅ Balance entre rango y almacenamiento
BIGINT         -- ✅ Si se esperan millones de registros
```

### ❌ **Errores Comunes**:
```sql
-- ❌ EVITAR ESTO:

-- Usar TEXT/NTEXT (obsoletos)
CREATE TABLE EjemploMalo (Descripcion TEXT);

-- Usar DATETIME para nuevas tablas
CREATE Table FechasMalas (FechaRegistro DATETIME);

-- Usar VARCHAR sin longitud definida
CREATE Table TextosMalos (Nombre VARCHAR);  -- ❌ Esto crea VARCHAR(1)

-- Usar FLOAT para dinero
CREATE Table PreciosMalos (Precio FLOAT);   -- ❌ Problemas de precisión
```

---

## 💡 **Conclusión Final**

### 🎯 **Resumen Ejecutivo**:
- **CRUD**: Base de toda aplicación de datos
- **3FN**: Punto óptimo para la mayoría de aplicaciones comerciales  
- **Tipos de datos**: Elegir según el uso real, no por defecto
- **Rendimiento**: Equilibrio entre normalización y necesidades prácticas

### 🚀 **Siguientes Pasos**:
```sql
-- Aprender sobre índices para mejorar rendimiento
CREATE INDEX IX_Productos_Nombre ON Productos(Nombre);

-- Aprender sobre procedimientos almacenados
CREATE PROCEDURE sp_ObtenerPedidosPorCliente
    @ClienteID INT
AS
BEGIN
    SELECT * FROM Pedidos WHERE ClienteID = @ClienteID;
END;

-- Aprender sobre transacciones para consistencia
BEGIN TRANSACTION;
    -- Operaciones múltiples
COMMIT TRANSACTION;
```

¡La práctica con ejemplos reales es clave para dominar SQL! 🗝️✨