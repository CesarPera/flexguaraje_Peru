CREATE DATABASE BD;
GO

USE BD;
GO

CREATE TABLE Cliente (
    id_cliente INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL DEFAULT '',
    telefono VARCHAR(15),
    DNI VARCHAR(15) NOT NULL DEFAULT '',
    email VARCHAR(100),
    direccion VARCHAR(255)
);
---- 10 DATOS INSERTATOS PARA LA TABLA CLIENTE---------
INSERT INTO Cliente (nombre, apellido, telefono, DNI, email, direccion) VALUES
('Juan', 'Pérez', '987654321', '12345678', 'juan.perez@example.com', 'Av. Los Pinos 123'),
('María', 'Gómez', '987654322', '87654321', 'maria.gomez@example.com', 'Calle Las Flores 456'),
('Carlos', 'Ramírez', '987654323', '45678912', 'carlos.ramirez@example.com', 'Jr. Los Cedros 789'),
('Ana', 'Torres', '987654324', '65432187', 'ana.torres@example.com', 'Av. La Marina 101'),
('Luis', 'Sánchez', '987654325', '32145698', 'luis.sanchez@example.com', 'Calle El Sol 102'),
('Laura', 'Díaz', '987654326', '98712345', 'laura.diaz@example.com', 'Jr. Los Claveles 103'),
('José', 'Morales', '987654327', '12349876', 'jose.morales@example.com', 'Av. El Milagro 104'),
('Elena', 'Cruz', '987654328', '56781234', 'elena.cruz@example.com', 'Calle Los Laureles 105'),
('Pedro', 'Vega', '987654329', '78965432', 'pedro.vega@example.com', 'Jr. Los Álamos 106'),
('Claudia', 'Fuentes', '987654330', '45612387', 'claudia.fuentes@example.com', 'Av. El Bosque 107');





CREATE TABLE Espacio (
    id_espacio INT IDENTITY(1,1) PRIMARY KEY,
    estado VARCHAR(20) NOT NULL,
    fecha_inicio_alquiler DATE, 
    fecha_fin_alquiler DATE,
    codigo_espacio VARCHAR(50) NOT NULL  
);

-----20 DATOS INSERTADOS PARA LA TABLA ESPACIO----

INSERT INTO Espacio (estado, fecha_inicio_alquiler, fecha_fin_alquiler, codigo_espacio) VALUES
('Disponible', NULL, NULL, 'ESP-001'),
('Alquilado', '2024-11-01', '2024-11-15', 'ESP-002'),
('Reservado', '2024-12-01', '2024-12-10', 'ESP-003'),
('Disponible', NULL, NULL, 'ESP-004'),
('Alquilado', '2024-10-20', '2024-11-05', 'ESP-005'),
('Mantenimiento', NULL, NULL, 'ESP-006'),
('Disponible', NULL, NULL, 'ESP-007'),
('Alquilado', '2024-11-10', '2024-11-25', 'ESP-008'),
('Disponible', NULL, NULL, 'ESP-009'),
('Reservado', '2024-12-05', '2024-12-15', 'ESP-010'),
('Disponible', NULL, NULL, 'ESP-011'),
('Alquilado', '2024-10-01', '2024-10-15', 'ESP-012'),
('Mantenimiento', NULL, NULL, 'ESP-013'),
('Disponible', NULL, NULL, 'ESP-014'),
('Alquilado', '2024-11-20', '2024-12-01', 'ESP-015'),
('Disponible', NULL, NULL, 'ESP-016'),
('Reservado', '2024-12-15', '2024-12-25', 'ESP-017'),
('Disponible', NULL, NULL, 'ESP-018'),
('Mantenimiento', NULL, NULL, 'ESP-019'),
('Disponible', NULL, NULL, 'ESP-020');





CREATE TABLE Factura (
    id_factura INT IDENTITY(1,1) PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_espacio INT NOT NULL,
    fecha_emision DATE NOT NULL,
    monto_total DECIMAL(10, 2) NOT NULL,
    detalle NVARCHAR(MAX),
    CONSTRAINT FK_Factura_Cliente FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente),
    CONSTRAINT FK_Factura_Espacio FOREIGN KEY (id_espacio) REFERENCES Espacio(id_espacio)
);

-------------- CONSULTAS --------- 
SELECT * FROM Cliente; 
SELECT * FROM Espacio; 
SELECT * FROM Factura;
