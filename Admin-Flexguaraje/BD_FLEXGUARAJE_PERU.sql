create database flexguaraje_peru;
use flexguaraje_peru;

#TABLA CLIENTESSSSSSSSSSSS
CREATE TABLE cliente (
    id_cliente INT auto_increment PRIMARY KEY,
    dni VARCHAR(8) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    telefono VARCHAR(9) NOT NULL,
    email VARCHAR(50) NOT NULL,
    Nota VARCHAR(255) DEFAULT 'Sin Discapacidad',
    CONSTRAINT UQ_dni UNIQUE (dni),
	CONSTRAINT UQ_email UNIQUE (email),
    CONSTRAINT CHK_DNI_Format CHECK (LENGTH(dni) = 8 AND dni NOT LIKE '%[^0-9]%'),
	CONSTRAINT CHK_Telefono_Format CHECK (LENGTH(telefono) = 9 AND telefono NOT LIKE '%[^0-9]%')
);

INSERT INTO cliente (id_cliente, dni, nombre, apellido, telefono, email, Nota)
VALUES
(1, '12345678', 'Carlos', 'Perez', '987654321', 'carlos.perez@mail.com', 'Sin Discapacidad'),
(2, '87654321', 'María', 'Lopez', '912345678', 'maria.lopez@mail.com', 'Sin Discapacidad'),
(3, '23456789', 'Juan', 'Gonzalez', '987123456', 'juan.gonzalez@mail.com', 'Requiere asistencia.'),
(4, '34567890', 'Ana', 'Ramirez', '912345987', 'ana.ramirez@mail.com', ''),
(5, '45678901', 'Luis', 'Diaz', '987456123', 'luis.diaz@mail.com', 'Sin Discapacidad'),
(6, '56789012', 'Sofia', 'Torres', '912456789', 'sofia.torres@mail.com', 'Sin Discapacidad'),
(7, '67890123', 'Miguel', 'Castro', '987789123', 'miguel.castro@mail.com', 'Usa silla de ruedas.'),
(8, '78901234', 'Lucia', 'Flores', '912789456', 'lucia.flores@mail.com', 'Sin Discapacidad'),
(9, '89012345', 'Jose', 'Morales', '987987654', 'jose.morales@mail.com', ''),
(10, '90123456', 'Andrea', 'Vargas', '912987321', 'andrea.vargas@mail.com', 'Problemas de visión.');

#TABLA ESPACIOSSSSS
CREATE TABLE espacio (
    id_espacio INT auto_increment PRIMARY KEY,
    codigo_espacio VARCHAR(30) NOT NULL,
    estado VARCHAR(15) NOT NULL DEFAULT 'Disponible',
    CONSTRAINT valores_estado CHECK (estado IN ('Disponible', 'Ocupado','Mantenimiento')),
    CONSTRAINT UQ_codigo_espacio UNIQUE (codigo_espacio)
);

#TABLA ESPACIOS - DATOSSSSSSSSSSSSSS
INSERT INTO espacio (id_espacio, codigo_espacio, estado)
VALUES
(1, 'E001', 'Ocupado'),
(2, 'E002', 'Ocupado'),
(3, 'E003', 'Ocupado'),
(4, 'E004', 'Ocupado'),
(5, 'E005', 'Ocupado'),
(6, 'E006', 'Ocupado'),
(7, 'E007', 'Ocupado'),
(8, 'E008', 'Ocupado'),
(9, 'E009', 'Ocupado'),
(10, 'E010', 'Ocupado'),
(11, 'E011', 'Mantenimiento'),
(12, 'E012', 'Mantenimiento'),
(13, 'E013', 'Disponible'),
(14, 'E014', 'Disponible'),
(15, 'E015', 'Disponible'),
(16, 'E016', 'Disponible'),
(17, 'E017', 'Disponible'),
(18, 'E018', 'Disponible'),
(19, 'E019', 'Disponible'),
(20, 'E020', 'Disponible');

#TABLA ALQUILERESSSSSSSSSSSSSSS
CREATE TABLE alquileres (
	id_alquiler INT auto_increment PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_espacio INT NOT NULL,
    fecha_inicio_alquiler DATE NOT NULL,
    fecha_fin_alquiler DATE NOT NULL,
    CONSTRAINT FK_Alquiler_Cliente FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
    CONSTRAINT FK_Alquiler_Espacio FOREIGN KEY (id_espacio) REFERENCES espacio(id_espacio),
    CONSTRAINT UQ_Espacio_Alquilado UNIQUE (id_espacio, fecha_inicio_alquiler, fecha_fin_alquiler),
    CONSTRAINT CHK_Fechas_Alquiler CHECK (fecha_inicio_alquiler <= fecha_fin_alquiler)
);

#DATOSSS DE LA TABLA ALQUILER
INSERT INTO alquileres (id_alquiler, id_cliente, id_espacio, fecha_inicio_alquiler, fecha_fin_alquiler)
VALUES
(1, 1, 1, '2024-01-01', '2024-01-31'),
(2, 2, 2, '2024-02-01', '2024-02-28'),
(3, 3, 3, '2024-03-01', '2024-03-31'),
(4, 4, 4, '2024-04-01', '2024-04-30'),
(5, 5, 5, '2024-05-01', '2024-05-31'),
(6, 6, 6, '2024-06-01', '2024-06-30'),
(7, 7, 7, '2024-07-01', '2024-07-31'),
(8, 8, 8, '2024-08-01', '2024-08-31'),
(9, 9, 9, '2024-09-01', '2024-09-30'),
(10, 10, 10, '2024-10-01', '2024-10-31');

#TABLA BOLETAAAAAAAAAAAAAAAAA
CREATE TABLE boleta (
    id_boleta INT auto_increment PRIMARY KEY,
    id_alquiler INT NOT NULL,
    codigo_boleta VARCHAR(30) NOT NULL,
    metodo_pago VARCHAR(30) NOT NULL,
    fecha_emision DATE NOT NULL,
    monto_pagar DECIMAL(10, 2) NOT NULL,
    CONSTRAINT FK_boleta_Alquiler FOREIGN KEY (id_alquiler) REFERENCES alquileres(id_alquiler),
    CONSTRAINT CHK_Monto_boleta CHECK (monto_pagar > 0),
    CONSTRAINT UQ_boleta_Unica UNIQUE (id_alquiler, fecha_emision, codigo_boleta)
);

#DATOS DE LA TABLA BOLETA
INSERT INTO boleta (id_alquiler, codigo_boleta, metodo_pago, fecha_emision, monto_pagar)
VALUES
(1, 'B001', 'Efectivo', '2024-01-05', 150.00),
(2, 'B002', 'Efectivo', '2024-02-05', 180.00),
(3, 'B003', 'Efectivo', '2024-03-05', 170.00),
(4, 'B004', 'Efectivo', '2024-04-05', 160.00),
(5, 'B005', 'Efectivo', '2024-05-05', 200.00),
(6, 'B006', 'Tarjeta de Crédito', '2024-06-05', 180.00),
(7, 'B007', 'Transferencia Bancaria', '2024-07-05', 170.00),
(8, 'B008', 'Efectivo', '2024-08-05', 190.00),
(9, 'B009', 'Tarjeta de Débito', '2024-09-05', 200.00),
(10, 'B010', 'PayPal', '2024-10-05', 210.00);



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
    CONCAT(c.nombre, ' ', c.apellido) AS nombre,
    c.telefono AS telefono,
    a.fecha_inicio_alquiler AS fechaInicioAlquiler,
    a.fecha_fin_alquiler AS fechaFinAlquiler
FROM 
    espacio e
LEFT JOIN 
    alquileres a ON e.id_espacio = a.id_espacio
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



