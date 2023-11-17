CREATE DATABASE loc;

USE loc;

CREATE TABLE Jeu(
   idJeux VARCHAR(50),
   nom VARCHAR(80),
   note DECIMAL(2,1),
   prix DECIMAL(4,2),
   descr VARCHAR(255),
   image VARCHAR(255),
   type VARCHAR(50),
   PRIMARY KEY(idJeux)
);

CREATE TABLE Utilisateur(
   idUser VARCHAR(50),
   pseudo VARCHAR(16),
   email VARCHAR(50),
   pwd VARCHAR(255),
   PRIMARY KEY(idUser)
);

CREATE TABLE Emprunt(
   idLoc VARCHAR(50),
   date_emprunt DATETIME,
   date_retour DATETIME,
   idJeux VARCHAR(50) NOT NULL,
   idUser VARCHAR(50) NOT NULL,
   PRIMARY KEY(idLoc),
   UNIQUE(idJeux),
   UNIQUE(idUser),
   FOREIGN KEY(idJeux) REFERENCES Jeu(idJeux),
   FOREIGN KEY(idUser) REFERENCES Utilisateur(idUser)
);

CREATE TABLE Commentaire(
   idCom COUNTER,
   comment VARCHAR(255),
   idJeux VARCHAR(50) NOT NULL,
   idUser VARCHAR(50) NOT NULL,
   PRIMARY KEY(idCom),
   UNIQUE(idJeux),
   UNIQUE(idUser),
   FOREIGN KEY(idJeux) REFERENCES Jeu(idJeux),
   FOREIGN KEY(idUser) REFERENCES Utilisateur(idUser)
);

INSERT INTO Jeu (idJeux, nom, note, prix, descr, image, type)
VALUES 
('1', 'The Witcher 3: Wild Hunt', 4.5, 49.99, 'Action RPG', 'witcher3.jpg', 'Adventure'),
('2', 'Minecraft', 4.8, 29.99, 'Open-world sandbox', 'minecraft.jpg', 'Simulation'),
('3', 'Fortnite', 3.9, 0.00, 'Battle Royale', 'fortnite.jpg', 'Action');

INSERT INTO Utilisateur (idUser, pseudo, email, pwd)
VALUES 
('1', 'Gamer123', 'gamer123@email.com', 'password123'),
('2', 'Player456', 'player456@email.com', 'securepassword'),
('3', 'GamingMaster', 'mastergamer@email.com', 'gaming123');

INSERT INTO Emprunt (idLoc, date_emprunt, date_retour, idJeux, idUser)
VALUES 
('1', '2023-01-15 12:00:00', '2023-01-22 18:00:00', '1', '1'),
('2', '2023-02-05 15:30:00', '2023-02-12 20:00:00', '2', '2'),
('3', '2023-03-10 10:00:00', '2023-03-17 14:45:00', '3', '3');

INSERT INTO Commentaire (comment, idJeux, idUser)
VALUES 
('Great game!', '1', '1'),
('Love the building mechanics!', '2', '2'),
('Needs more updates.', '3', '3');
