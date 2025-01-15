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


# TABLAAAAA CUENTAAAAAAAAAAAAAA
create table cuenta (
	id_cuenta int primary key auto_increment,
    id_roles int not null,
    usuario varchar(20) not null,
    email varchar(50) not null,
    pass varchar(30) not null,
    estado varchar(15) not null default 'Activo',
    constraint FK_roles_cuenta foreign key (id_roles) references roles(id_roles),
	CONSTRAINT valores_estado_cuenta CHECK (estado IN ('Activo', 'Desactivado')),
    constraint UQ_email_cuenta UNIQUE (email),
    constraint UQ_usuario_cuenta UNIQUE (usuario)
);

# TABLA ADMINISTRADORRRRRRRRRR
create table administrador (
	id_admin int primary key auto_increment,
    id_cuenta int not null,
    dni varchar(8) not null,
    nombre varchar(30) not null,
    apellido_paterno varchar(20) not null,
    apellido_materno varchar(20) not null,
    email varchar(30) not null,
    telefono varchar(9) not null,
	constraint FK_admin_cuenta foreign key (id_cuenta) references cuenta(id_cuenta)
);

# TABLA PROPIETARIOOOOOOOOOO
create table propietario (
	id_pripietario int primary key auto_increment,
    id_cuenta int not null,
	dni varchar(8) not null,
    nombre varchar(30) not null,
    apellido_paterno varchar(20) not null,
    apellido_materno varchar(20) not null,
	telefono varchar(9) not null,
	constraint FK_propit_cuenta foreign key (id_cuenta) references cuenta(id_cuenta)
 );

#TABLA CLIENTESSSSSSSSSSSS
CREATE TABLE cliente (
    id_cliente INT auto_increment PRIMARY KEY,
    id_cuenta INT NOT NULL,
    dni VARCHAR(8) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellido_paterno VARCHAR(20) NOT NULL,
    apellido_materno VARCHAR(20) NOT NULL,
    telefono VARCHAR(9) NOT NULL,
    email VARCHAR(50) NOT NULL,
    direccion VARCHAR(250) NOT NULL,
    nota_adicional VARCHAR(250) DEFAULT 'Sin Discapacidad',
    CONSTRAINT fk_cliente_cuenta FOREIGN KEY (id_cuenta) REFERENCES Cuenta(id_cuenta),
    CONSTRAINT UQ_dni UNIQUE (dni),
    CONSTRAINT CHK_DNI_Format CHECK (LENGTH(dni) = 8 AND dni NOT LIKE '%[^0-9]%'),
    CONSTRAINT CHK_Telefono_Format CHECK (LENGTH(telefono) = 9 AND telefono NOT LIKE '%[^0-9]%'),
    CONSTRAINT CHK_Nombre_Apellido_Letras CHECK (nombre NOT LIKE '%[^A-Za-z]%' AND 
                                                 apellido_paterno NOT LIKE '%[^A-Za-z]%' AND 
                                                 apellido_materno NOT LIKE '%[^A-Za-z]%')
);

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

#TABLA ESPACIOS - DATOSSSSSSSSSSSSSS
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
select * from cliente;
select * from espacio;
select * from alquileres;
select * from boleta;

DELETE FROM alquileres WHERE id_alquiler = 12;


# VISUALIZAR LOS DATOS DE LA TABLA COMBINADO - ALQUILER
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

    

# VISUALIZAR LOS DATOS DE LA TABLA COMBINADO - BOLETA
SELECT 
    b.codigo_boleta, 
    b.fecha_emision, 
    b.metodo_pago, 
    b.monto_pagar, 
    c.dni AS cliente_dni, 
    e.codigo_espacio AS codigoEspacio
FROM boleta b
JOIN alquileres a ON b.id_alquiler = a.id_alquiler
JOIN cliente c ON a.id_cliente = c.id_cliente
JOIN espacio e ON a.id_espacio = e.id_espacio;

