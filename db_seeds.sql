CREATE DATABASE vehicle_booking_management;

USE vehicle_booking_management;

CREATE TABLE vehicles(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  model VARCHAR(50) NOT NULL,
  company VARCHAR(50) NOT NULL,
  type VARCHAR(50) NOT NULL,
  class VARCHAR(50) NOT NULL,
  wheels INT NOT NULL,
  isBooked BOOLEAN DEFAULT FALSE,
  UNIQUE (model)
);

CREATE TABLE bookings(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  userFirstName VARCHAR(100) NOT NULL,
  userLastName VARCHAR(100) NOT NULL,
  bookingStartDate TIMESTAMP NOT NULL DEFAULT NOW(),
  bookingEndDate TIMESTAMP NOT NULL,
  vehicleId INT NOT NULL,
  FOREIGN KEY (vehicleId) REFERENCES vehicles(id) ON DELETE CASCADE
);

INSERT INTO vehicles (id, model, company, type, class, wheels) VALUES (1, 'Creta', 'Hyundai', 'suv', 'car', 4);
INSERT INTO vehicles (id, model, company, type, class, wheels) VALUES (2, 'Sonet', 'Kia', 'suv', 'car', 4);
INSERT INTO vehicles (id, model, company, type, class, wheels) VALUES (3, 'Brezza', 'Suzuki', 'suv', 'car', 4);
INSERT INTO vehicles (id, model, company, type, class, wheels) VALUES (4, 'Wagonr', 'Suzuki', 'hatchback', 'car', 4);
INSERT INTO vehicles (id, model, company, type, class, wheels) VALUES (5, 'Tiago', 'Tata', 'hatchback', 'car', 4);
INSERT INTO vehicles (id, model, company, type, class, wheels) VALUES (6, 'City', 'Honda', 'sedan', 'car', 4);
INSERT INTO vehicles (id, model, company, type, class, wheels) VALUES (7, 'Verna', 'Hyundai', 'sedan', 'car', 4);
INSERT INTO vehicles (id, model, company, type, class, wheels) VALUES (8, 'Glamour', 'Hero', 'sports', 'bike', 2);
INSERT INTO vehicles (id, model, company, type, class, wheels) VALUES (9, 'Pulsar', 'Tvs', 'sports', 'bike', 2);
INSERT INTO vehicles (id, model, company, type, class, wheels) VALUES (10, 'Karizma', 'Hero', 'cruiser', 'bike', 2);