CREATE DATABASE loc;
USE loc;
CREATE TABLE Jeux(
   id VARCHAR(50),
   nom VARCHAR(80),
   note DECIMAL(2,1),
   prix DECIMAL(4,2),
   descr VARCHAR(255),
   image VARCHAR(255),
   PRIMARY KEY(id)
);

CREATE TABLE Utilisateurs(
   id VARCHAR(50),
   pseudo VARCHAR(16),
   email VARCHAR(50),
   pwd VARCHAR(255),
   PRIMARY KEY(id)
);

CREATE TABLE Location(
   id VARCHAR(50),
   comment VARCHAR(255),
   date_emprunt DATETIME,
   date_retour DATETIME,
   id_1 VARCHAR(50) NOT NULL,
   id_2 VARCHAR(50) NOT NULL,
   PRIMARY KEY(id),
   UNIQUE(id_1),
   UNIQUE(id_2),
   FOREIGN KEY(id_1) REFERENCES Jeux(id),
   FOREIGN KEY(id_2) REFERENCES Utilisateurs(id)
);
