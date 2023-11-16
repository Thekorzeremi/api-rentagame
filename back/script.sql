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

INSERT INTO Jeux (id, nom, note, prix, descr, image)
VALUES 
('101', 'Assassin\'s Creed', 4.5, 29.99, 'Jeu d\'action-aventure', 'https://static.posters.cz/image/750/affiches-et-posters/assassin-s-creed-iii-cover-i12703.jpg'),
('102', 'FIFA 22', 4.0, 49.99, 'Jeu de simulation de football', 'https://a.espncdn.com/photo/2021/0709/r878390_864x1296_2-3.jpg'),
('103', 'The Legend of Zelda', 4.8, 59.99, "Jeu d\'aventure fantastique", 'https://static.posters.cz/image/750/affiches-et-posters/zelda-breath-of-the-wild-game-cover-i34556.jpg'),
('104', 'Call of Duty: Warzone', 4.2, 0.00, 'Jeu de tir en ligne', 'https://cdn.mobygames.com/covers/11179296-call-of-duty-warzone-20-xbox-one-front-cover.jpg'),
('105', 'Minecraft', 4.7, 24.99, "Jeu de construction et d\'aventure", 'https://gpstatic.com/acache/66/18/1/fr/packshot-27f95370fd8a786059edfb9506703d18.jpg');

INSERT INTO Louer (id, date_emprunt, date_retour, id_1, id_2)
VALUES 
('201', '2023-11-01 10:00:00', '2023-11-05 18:00:00', '101', '1'),
('202', '2023-10-20 14:30:00', '2023-10-25 12:00:00', '103', '2'),
('203', '2023-11-08 09:15:00', '2023-11-12 20:30:00', '105', '3'),
('204', '2023-10-15 11:45:00', '2023-10-18 17:00:00', '102', '4'),
('205', '2023-11-03 16:20:00', '2023-11-10 10:45:00', '104', '5');

INSERT INTO Utilisateurs (id, pseudo, email, pwd)
VALUES 
('1', 'Joueur1', 'joueur1@email.com', 'motdepasse1'),
('2', 'Gamer2', 'gamer2@email.com', 'motdepasse2'),
('3', 'Player3', 'player3@email.com', 'motdepasse3'),
('4', 'User4', 'user4@email.com', 'motdepasse4'),
('5', 'Player5', 'player5@email.com', 'motdepasse5');
