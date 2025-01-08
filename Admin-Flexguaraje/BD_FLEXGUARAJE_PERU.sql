create database flexguaraje_peru;
use flexguaraje_peru;

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

#DATOS CLIENTES
INSERT INTO cliente (dni, nombre, apellido_paterno, apellido_materno, telefono, email, direccion, nota_adicional) VALUES
('12345678', 'JUAN PABLO', 'GARCIA', 'MARTINEZ', '987654321', 'juanpablo@example.com', 'Calle Ficticia 123', 'Sin Discapacidad'),
('23456789', 'ANA MARIA', 'LOPEZ', 'RODRIGUEZ', '987654322', 'anamaria@example.com', 'Av. Siempre Viva 456', 'Sin Discapacidad'),
('34567890', 'CARLOS ANDRES', 'PEREZ', 'GOMEZ', '987654323', 'carlosandres@example.com', 'Calle Real 789', 'Sin Discapacidad'),
('45678901', 'MARIA ELENA', 'GUTIERREZ', 'HERNANDEZ', '987654324', 'mariaelena@example.com', 'Calle Principal 101', 'Sin Discapacidad'),
('56789012', 'LUIS FERNANDO', 'MARTINEZ', 'SERRANO', '987654325', 'luisfernando@example.com', 'Calle Secundaria 202', 'Sin Discapacidad'),
('67890123', 'ISABEL CRISTINA', 'PEREZ', 'MORALES', '987654326', 'isabelcristina@example.com', 'Calle Nueva 303', 'Sin Discapacidad'),
('78901234', 'JUAN CARLOS', 'CASTRO', 'ROJAS', '987654327', 'juancarlos@example.com', 'Calle Vieja 404', 'Sin Discapacidad'),
('89012345', 'MARIA JOSE', 'RAMIREZ', 'CASTAÑO', '987654328', 'mariajose@example.com', 'Av. Los Álamos 505', 'Sin Discapacidad'),
('90123456', 'RAUL ENRIQUE', 'SALGADO', 'PEREZ', '987654329', 'raulenrique@example.com', 'Calle del Sol 606', 'Sin Discapacidad'),
('01234567', 'CARMEN LUZA LUISA', 'GARCIA', 'VILLALBA', '987654330', 'carmenluz@example.com', 'Calle de la Luna 707', 'Sin Discapacidad'),
('12345679', 'JUAN JOSE', 'MARTINEZ', 'MARTIN', '987654331', 'juanjose@example.com', 'Calle del Mar 808', 'Sin Discapacidad'),
('23456780', 'LAURA ISABEL CAMILA', 'TORO', 'MUÑOZ', '987654332', 'lauraisabel@example.com', 'Calle del Bosque 909', 'Sin Discapacidad'),
('34567891', 'PEDRO ALBERTO', 'DIAZ', 'SALAZAR', '987654333', 'pedroalberto@example.com', 'Calle Central 1010', 'Sin Discapacidad'),
('45678902', 'MARIA PATRICIA', 'VARGAS', 'SUAREZ', '987654334', 'mariapatricia@example.com', 'Calle de la Paz 1111', 'Sin Discapacidad'),
('56789013', 'ALEJANDRO FRANCISCO', 'MARTINEZ', 'FERNANDEZ', '987654335', 'alejandrofrancisco@example.com', 'Calle Libertad 1212', 'Sin Discapacidad'),
('67890124', 'ANDREA LILIANA GABRIELA', 'GUTIERREZ', 'PEREZ', '987654336', 'andrealiliana@example.com', 'Calle del Río 1313', 'Sin Discapacidad'),
('78901235', 'FERNANDO JIMENEZ', 'PEREZ', 'FLORES', '987654337', 'fernandojimenex@example.com', 'Calle del Águila 1414', 'Sin Discapacidad'),
('89012346', 'JULIAN ESTEBAN', 'CASTAÑO', 'HERRERA', '987654338', 'julianesteban@example.com', 'Av. El Bosque 1515', 'Sin Discapacidad'),
('90123457', 'CAROLINA BEATRIZ', 'MORA', 'GUTIERREZ', '987654339', 'carolinabeatriz@example.com', 'Calle Rosario 1616', 'Sin Discapacidad'),
('01234568', 'RAFAEL ALEJANDRO', 'FERNANDEZ', 'SILVA', '987654340', 'rafaelalejandro@example.com', 'Calle del Norte 1717', 'Sin Discapacidad');

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
    fecha_inicio_alquiler DATE NOT NULL,
    fecha_fin_alquiler DATE NOT NULL,
	total_dias_alquiler VARCHAR(20) NOT NULL,
    estado varchar(15) NOT NULL default 'No_Ignorar',
    CONSTRAINT FK_Alquiler_Cliente FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
    CONSTRAINT FK_Alquiler_Espacio FOREIGN KEY (id_espacio) REFERENCES espacio(id_espacio),
	CONSTRAINT CHK_Alquiler_estado CHECK (estado IN ('Ignorar','No_Ignorar')),
    CONSTRAINT CHK_Fechas_Alquiler CHECK (fecha_inicio_alquiler <= fecha_fin_alquiler)
);

#TABLA BOLETAAAAAAAAAAAAAAAAA
CREATE TABLE boleta (
    id_boleta INT auto_increment PRIMARY KEY,
    id_alquiler INT NOT NULL,
    codigo_boleta VARCHAR(15) NOT NULL,
    metodo_pago VARCHAR(30) NOT NULL default "Efectivo",
    fecha_emision DATE NOT NULL,
    monto_base DECIMAL(10, 2) NOT NULL,
    monto_igv DECIMAL(10, 2) NOT NULL,
    monto_pagar DECIMAL(10, 2) NOT NULL,
    CONSTRAINT FK_boleta_Alquiler FOREIGN KEY (id_alquiler) REFERENCES alquileres(id_alquiler),
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

