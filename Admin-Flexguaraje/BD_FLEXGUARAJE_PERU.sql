create database flexguaraje_peru;
use flexguaraje_peru;

# TABLA ROLESSSSSSSSSSSSSSSSSSSSSS
create table roles (
	id_roles int primary key auto_increment,
    nombre_rol varchar(20) not null,
    estado varchar(15) not null default 'Activo',
    constraint UQ_nombre_rol UNIQUE (nombre_rol),
	CONSTRAINT valores_estado_roles CHECK (estado IN ('Activo', 'Desactivado'))
);
# DATOS PARA LA TABLA ROLES
INSERT INTO roles (nombre_rol, estado) VALUES 
('Administrador', 'Activo'),
('Propietario', 'Activo');

# TABLAAAAAAAA PERMISOSSSSSSSSSS
create table permisos (
	id_permiso int primary key auto_increment,
    id_roles int not null,
    nombre_permiso varchar(20) not null,
    estado varchar(15) not null default 'Activo',
	constraint FK_permisos_cuenta foreign key (id_roles) references roles(id_roles),
	CONSTRAINT valores_Estado_permisos CHECK (estado IN ('Activo', 'Desactivado')),
	constraint nombre_permiso UNIQUE (nombre_permiso)
);
# DATOS PARA LA TABLA PERMISOS.
INSERT INTO permisos (id_roles, nombre_permiso, estado) VALUES 
(1, 'Gestión', 'Activo'),
(2, 'Supervisión', 'Activo');

# TABLA usuario ( administrador, propietario y otros)
create table usuario (
	id_usuario int primary key auto_increment,
    dni varchar(8) not null,
    nombre varchar(30) not null,
    apellido_paterno varchar(20) not null,
    apellido_materno varchar(20) not null,
    email varchar(30) not null,
    telefono varchar(9) not null,
	CONSTRAINT UQ_dni UNIQUE (dni)
);
# 15 DATOS PARA LA TABLA USUARIOS
INSERT INTO usuario (dni, nombre, apellido_paterno, apellido_materno, email, telefono) VALUES
('12345678', 'Juan', 'Pérez', 'López', 'juan.perez@example.com', '912345678'),
('23456789', 'María', 'Gómez', 'Sánchez', 'maria.gomez@example.com', '923456789'),
('34567890', 'Carlos', 'Ramírez', 'Martínez', 'carlos.ramirez@example.com', '934567890'),
('45678901', 'Ana', 'Torres', 'Vargas', 'ana.torres@example.com', '945678901'),
('56789012', 'Luis', 'Fernández', 'Rojas', 'luis.fernandez@example.com', '956789012'),
('67890123', 'Lucía', 'Díaz', 'Hernández', 'lucia.diaz@example.com', '967890123'),
('78901234', 'Pedro', 'Castillo', 'Morales', 'pedro.castillo@example.com', '978901234'),
('89012345', 'Elena', 'Ramos', 'Guzmán', 'elena.ramos@example.com', '989012345'),
('90123456', 'Jorge', 'Alvarez', 'Paredes', 'jorge.alvarez@example.com', '900123456'),
('01234567', 'Camila', 'Ruiz', 'Salas', 'camila.ruiz@example.com', '911234567'),
('11234567', 'Sofía', 'Mendoza', 'Chávez', 'sofia.mendoza@example.com', '922345678'),
('22345678', 'Miguel', 'Vega', 'Ortega', 'miguel.vega@example.com', '933456789'),
('33456789', 'Isabel', 'Cruz', 'Flores', 'isabel.cruz@example.com', '944567890'),
('44567890', 'Ricardo', 'Lopez', 'Rios', 'ricardo.lopez@example.com', '955678901'),
('55678901', 'Daniela', 'Ponce', 'Espinoza', 'daniela.ponce@example.com', '966789012');

# TABLAAAAA CUENTAAAAAAAAAAAAAA
create table cuenta (
	id_cuenta int primary key auto_increment,
    id_usuario int not null,
    id_roles int not null,
    nombre_usuario varchar(20) not null,
    email varchar(50) not null,
    pass varchar(255) not null,
    estado varchar(15) not null default 'Activo',
	constraint FK_usuario_cuenta foreign key (id_usuario) references usuario(id_usuario),
    constraint FK_roles_cuenta foreign key (id_roles) references roles(id_roles),
	CONSTRAINT valores_estado_cuenta CHECK (estado IN ('Activo', 'Desactivado')),
    constraint UQ_usuario_unico UNIQUE (id_usuario),
    constraint UQ_usuario_cuenta UNIQUE (nombre_usuario),
    constraint UQ_email_cuenta UNIQUE (email)
);
# 15 DATOS PARA LA TABLA CUENTA
INSERT INTO cuenta (id_usuario, id_roles, nombre_usuario, email, pass, estado)
VALUES
(1, 2, 'propietario1', 'propietario1@example.com', 'password123', 'Activo'),
(2, 1, 'admin1', 'admin1@example.com', 'password123', 'Activo'),
(3, 1, 'admin2', 'admin2@example.com', 'password123', 'Activo'),
(4, 1, 'admin3', 'admin3@example.com', 'password123', 'Activo'),
(5, 1, 'admin4', 'admin4@example.com', 'password123', 'Activo'),
(6, 1, 'admin5', 'admin5@example.com', 'password123', 'Activo'),
(7, 1, 'admin6', 'admin6@example.com', 'password123', 'Desactivado'),
(8, 1, 'admin7', 'admin7@example.com', 'password123', 'Desactivado'),
(9, 1, 'admin8', 'admin8@example.com', 'password123', 'Desactivado'),
(10, 1, 'admin9', 'admin9@example.com', 'password123', 'Desactivado'),
(11, 1, 'admin10', 'admin10@example.com', 'password123', 'Desactivado'),
(12, 1, 'admin11', 'admin11@example.com', 'password123', 'Desactivado'),
(13, 1, 'admin12', 'admin12@example.com', 'password123', 'Desactivado'),
(14, 1, 'admin13', 'admin13@example.com', 'password123', 'Desactivado'),
(15, 1, 'admin14', 'admin14@example.com', 'password123', 'Desactivado');

#TABLA CLIENTESSSSSSSSSSSS
CREATE TABLE cliente (
    id_cliente INT auto_increment PRIMARY KEY,
    dni VARCHAR(8) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellido_paterno VARCHAR(20) NOT NULL,
    apellido_materno VARCHAR(20) NOT NULL,
    telefono VARCHAR(9) NOT NULL,
    email VARCHAR(50) NOT NULL,
    direccion VARCHAR(250) NOT NULL,
    nota_adicional VARCHAR(250) DEFAULT 'Sin Discapacidad',
    CONSTRAINT UQ_dni UNIQUE (dni),
    CONSTRAINT CHK_DNI_Format CHECK (LENGTH(dni) = 8 AND dni NOT LIKE '%[^0-9]%'),
    CONSTRAINT CHK_Telefono_Format CHECK (LENGTH(telefono) = 9 AND telefono NOT LIKE '%[^0-9]%'),
    CONSTRAINT CHK_Nombre_Apellido_Letras CHECK (nombre NOT LIKE '%[^A-Za-z]%' AND 
                                                 apellido_paterno NOT LIKE '%[^A-Za-z]%' AND 
                                                 apellido_materno NOT LIKE '%[^A-Za-z]%')
);
# 20 DATOS DE LA TABLA CLIENTE
INSERT INTO cliente (dni, nombre, apellido_paterno, apellido_materno, telefono, email, direccion, nota_adicional) VALUES
('12345678', 'Carlos', 'Gomez', 'Lopez', '912345678', 'carlos.gomez@example.com', 'Av. Siempre Viva 123, Lima', 'Sin Discapacidad'),
('23456789', 'Maria', 'Torres', 'Perez', '923456789', 'maria.torres@example.com', 'Jr. Los Pinos 456, Arequipa', 'Sin Discapacidad'),
('34567890', 'Juan', 'Ramirez', 'Garcia', '934567890', 'juan.ramirez@example.com', 'Calle Los Olivos 789, Cusco', 'Sin Discapacidad'),
('45678901', 'Elena', 'Martinez', 'Lopez', '945678901', 'elena.martinez@example.com', 'Av. Las Flores 321, Trujillo', 'Usuario con silla de ruedas'),
('56789012', 'Luis', 'Fernandez', 'Ramos', '956789012', 'luis.fernandez@example.com', 'Jr. San Juan 654, Ica', 'Sin Discapacidad'),
('67890123', 'Lucia', 'Diaz', 'Guzman', '967890123', 'lucia.diaz@example.com', 'Calle Principal 987, Piura', 'Usuario con bastón'),
('78901234', 'Pedro', 'Castillo', 'Alvarez', '978901234', 'pedro.castillo@example.com', 'Av. La Marina 147, Tacna', 'Sin Discapacidad'),
('89012345', 'Ana', 'Rios', 'Morales', '989012345', 'ana.rios@example.com', 'Jr. Amazonas 258, Chiclayo', 'Sin Discapacidad'),
('90123456', 'Jorge', 'Paredes', 'Flores', '900123456', 'jorge.paredes@example.com', 'Calle El Sol 369, Huancayo', 'Sin Discapacidad'),
('01234567', 'Sofia', 'Mendoza', 'Chavez', '911234567', 'sofia.mendoza@example.com', 'Jr. Las Palmeras 111, Puno', 'Sin Discapacidad'),
('11234567', 'Ricardo', 'Lopez', 'Salazar', '922345678', 'ricardo.lopez@example.com', 'Av. La Cultura 222, Juliaca', 'Usuario con discapacidad auditiva'),
('22345678', 'Daniela', 'Vega', 'Rojas', '933456789', 'daniela.vega@example.com', 'Calle Los Cedros 333, Tumbes', 'Sin Discapacidad'),
('33456789', 'Miguel', 'Cruz', 'Hernandez', '944567890', 'miguel.cruz@example.com', 'Jr. Los Claveles 444, Moquegua', 'Usuario con discapacidad visual'),
('44567890', 'Isabel', 'Ruiz', 'Espinoza', '955678901', 'isabel.ruiz@example.com', 'Av. San Martín 555, Chimbote', 'Sin Discapacidad'),
('55678901', 'Camila', 'Ponce', 'Vargas', '966789012', 'camila.ponce@example.com', 'Jr. Los Tulipanes 666, Cajamarca', 'Sin Discapacidad'),
('66789012', 'Jose', 'Alvarez', 'Paredes', '977890123', 'jose.alvarez@example.com', 'Calle Principal 777, Huánuco', 'Sin Discapacidad'),
('77890123', 'Karina', 'Chavez', 'Garcia', '988901234', 'karina.chavez@example.com', 'Jr. Los Jazmines 888, Ayacucho', 'Usuario con silla de ruedas'),
('88901234', 'Hector', 'Morales', 'Diaz', '999012345', 'hector.morales@example.com', 'Av. El Progreso 999, Cajamarca', 'Sin Discapacidad'),
('99012345', 'Paola', 'Garcia', 'Sanchez', '910123456', 'paola.garcia@example.com', 'Jr. Las Margaritas 123, Iquitos', 'Sin Discapacidad');

#TABLA ESPACIOSSSSS
CREATE TABLE espacio (
    id_espacio INT auto_increment PRIMARY KEY,
    codigo_espacio VARCHAR(30) NOT NULL,
    estado VARCHAR(15) NOT NULL DEFAULT 'Disponible',
    subestado VARCHAR(15) NOT NULL DEFAULT 'Desactivado',
    costo DECIMAL(7, 2) NOT NULL,
    CONSTRAINT UQ_codigo_espacio UNIQUE (codigo_espacio),
    CONSTRAINT valores_estado CHECK (estado IN ('Disponible', 'Ocupado','Mantenimiento')),
    CONSTRAINT valores_subestado CHECK (subestado IN ('Activo', 'Desactivado'))
);
# 20 DATOSSSSSSSSSSSSSS DE LA TABLA ESPACIO
INSERT INTO espacio VALUES
(1, 'E001', 'Disponible', 'Desactivado',150),
(2, 'E002', 'Disponible', 'Desactivado',150),
(3, 'E003', 'Disponible', 'Desactivado',150),
(4, 'E004', 'Disponible', 'Desactivado',150),
(5, 'E005', 'Disponible', 'Desactivado',150),
(6, 'E006', 'Disponible', 'Desactivado',130),
(7, 'E007', 'Disponible', 'Desactivado',130),
(8, 'E008', 'Disponible', 'Desactivado',130),
(9, 'E009', 'Disponible', 'Desactivado',130),
(10, 'E010', 'Disponible', 'Desactivado',130),
(11, 'E011', 'Disponible', 'Desactivado',120),
(12, 'E012', 'Disponible', 'Desactivado',120),
(13, 'E013', 'Disponible', 'Desactivado',120),
(14, 'E014', 'Disponible', 'Desactivado',120),
(15, 'E015', 'Disponible', 'Desactivado',120),
(16, 'E016', 'Disponible', 'Desactivado',110),
(17, 'E017', 'Disponible', 'Desactivado',110),
(18, 'E018', 'Disponible', 'Desactivado',110),
(19, 'E019', 'Disponible', 'Desactivado',110),
(20, 'E020', 'Disponible', 'Desactivado',110);

#TABLA ALQUILERESSSSSSSSSSSSSSS
CREATE TABLE alquileres (
	id_alquiler INT auto_increment PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_espacio INT NOT NULL,
    id_cuenta INT NOT NULL,
    fecha_inicio_alquiler DATE NOT NULL,
    fecha_fin_alquiler DATE NOT NULL,
	total_dias_alquiler VARCHAR(20) NOT NULL,
    estado varchar(15) NOT NULL default 'No_Ignorar',
    CONSTRAINT FK_Alquiler_Cliente FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
    CONSTRAINT FK_Alquiler_Espacio FOREIGN KEY (id_espacio) REFERENCES espacio(id_espacio),
    CONSTRAINT fk_alquileres_cuenta FOREIGN KEY (id_cuenta) REFERENCES Cuenta(id_cuenta),
	CONSTRAINT CHK_Alquiler_estado CHECK (estado IN ('Ignorar','No_Ignorar')),
    CONSTRAINT CHK_Fechas_Alquiler CHECK (fecha_inicio_alquiler <= fecha_fin_alquiler)
);

#TABLA BOLETAAAAAAAAAAAAAAAAA
CREATE TABLE boleta (
    id_boleta INT auto_increment PRIMARY KEY,
    id_alquiler INT NOT NULL,
    id_cuenta INT NOT NULL,
    codigo_boleta VARCHAR(15) NOT NULL,
    metodo_pago VARCHAR(30) NOT NULL default "Efectivo",
    fecha_emision DATE NOT NULL,
    monto_base DECIMAL(10, 2) NOT NULL,
    monto_igv DECIMAL(10, 2) NOT NULL,
    monto_pagar DECIMAL(10, 2) NOT NULL,
    CONSTRAINT FK_boleta_Alquiler FOREIGN KEY (id_alquiler) REFERENCES alquileres(id_alquiler),
    CONSTRAINT fk_boleta_cuenta FOREIGN KEY (id_cuenta) REFERENCES Cuenta(id_cuenta),
    constraint UQ_codigo_boleta UNIQUE (codigo_boleta),
    CONSTRAINT UQ_id_alquiler UNIQUE (id_alquiler),
    CONSTRAINT CHK_metodo_pago CHECK (metodo_pago IN ('Efectivo','tarjeta_credito','Tarjeta_debito'))
);




# ---------- CONSULTASSSSSSSSSS -----------
use flexguaraje_peru;
select * from roles;
select * from permisos;
select * from usuario;
select * from cuenta;
select * from cliente;
select * from espacio;
select * from alquileres;
select * from boleta;



# VISUALIZAR LOS DATOS COMBINADOS DE ROLES Y PERMISOS
SELECT 
    r.nombre_rol, 
    r.estado AS estado_rol, 
    p.nombre_permiso, 
    p.estado AS estado_permiso
FROM roles r
JOIN permisos p ON r.id_roles = p.id_roles;

# VISUALIZAR LOS DATOS COMBINADOS DE USUARIO Y CUENTA
SELECT 
	u.dni,
    u.nombre AS nombre_usuario,
    u.apellido_paterno, 
    u.apellido_materno, 
    c.nombre_usuario AS cuenta_usuario, 
    c.email AS cuenta_email,
    c.pass AS cuenta_contraseña,
    c.estado AS estado_cuenta
FROM usuario u
JOIN cuenta c ON u.id_usuario = c.id_usuario;

# VISUALIZAR LOS DATOS COMBINADOS DE ROLES, PERMISOS Y CUENTA
SELECT 
    r.nombre_rol, 
    p.nombre_permiso, 
    c.nombre_usuario AS cuenta_usuario, 
    c.email AS cuenta_email,
	c.estado AS estado_cuenta
FROM roles r
JOIN permisos p ON r.id_roles = p.id_roles
JOIN cuenta c ON r.id_roles = c.id_roles;

# VISUALIZAR LOS DATOS COMBINADOS DE ALQUILERES, CLIENTE Y ESPACIO
SELECT 
	c.dni AS cliente_dni, 
    CONCAT(c.nombre, ' ', c.apellido_paterno,' ', c.apellido_materno) AS nombre_completo,
    e.codigo_espacio AS espacio_codigo,
	e.estado AS estado_espacio,
    e.costo AS espacio_costo,
    a.fecha_inicio_alquiler, 
    a.fecha_fin_alquiler, 
    a.total_dias_alquiler
FROM alquileres a
JOIN cliente c ON a.id_cliente = c.id_cliente
JOIN espacio e ON a.id_espacio = e.id_espacio;

# VISUALIZAR LOS DATOS DE LA TABLA COMBINADO - ALQUILER CON ESPACIO AL MISMO TIEMPO
SELECT 
    e.codigo_espacio AS codigoEspacio,
    e.estado AS estado,
    c.dni AS dni,
    CONCAT(c.nombre, ' ', c.apellido_paterno,' ', c.apellido_materno) AS nombre_completo,
    c.telefono AS telefono,
    a.fecha_inicio_alquiler AS fechaInicioAlquiler,
    a.fecha_fin_alquiler AS fechaFinAlquiler,
    a.total_dias_alquiler as DiasAlquiler
FROM 
    espacio e
LEFT JOIN 
    alquileres a ON e.id_espacio = a.id_espacio AND a.estado = 'No_Ignorar'
LEFT JOIN 
    cliente c ON a.id_cliente = c.id_cliente;

# VISUALIZAR DATOS COMBINADAS DE BOLETA, ALQUILERES Y CUENTA
SELECT 
    b.codigo_boleta, 
    b.fecha_emision, 
    b.metodo_pago, 
    b.monto_pagar, 
    a.fecha_inicio_alquiler, 
    a.fecha_fin_alquiler, 
    c.nombre_usuario AS cuenta_usuario
FROM boleta b
JOIN alquileres a ON b.id_alquiler = a.id_alquiler
JOIN cuenta c ON b.id_cuenta = c.id_cuenta;



