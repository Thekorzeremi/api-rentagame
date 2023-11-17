CREATE DATABASE loc;

USE loc;

CREATE TABLE Jeu (
   idJeux INT AUTO_INCREMENT,
   nom VARCHAR(80),
   note DECIMAL(2,1),
   prix DECIMAL(4,2),
   descr VARCHAR(255),
   image VARCHAR(255),
   type VARCHAR(50),
   PRIMARY KEY(idJeux)
);

CREATE TABLE Utilisateur (
   idUser INT AUTO_INCREMENT,
   pseudo VARCHAR(16),
   email VARCHAR(50),
   pwd VARCHAR(255),
   PRIMARY KEY(idUser)
);

CREATE TABLE Emprunt (
   idLoc INT AUTO_INCREMENT,
   date_emprunt DATETIME,
   date_retour DATETIME,
   idJeux VARCHAR(50) NOT NULL,
   idUser VARCHAR(50) NOT NULL,
   PRIMARY KEY(idLoc),
   FOREIGN KEY(idJeux) REFERENCES Jeu(idJeux),
   FOREIGN KEY(idUser) REFERENCES Utilisateur(idUser)
);

CREATE TABLE Commentaire (
   idCom INT AUTO_INCREMENT,
   comDate DATETIME,
   comment VARCHAR(255),
   idJeux VARCHAR(50) NOT NULL,
   idUser VARCHAR(50) NOT NULL,
   PRIMARY KEY(idCom),
   FOREIGN KEY(idJeux) REFERENCES Jeu(idJeux),
   FOREIGN KEY(idUser) REFERENCES Utilisateur(idUser)
);

INSERT INTO Jeu (idJeux, nom, note, prix, descr, image, type)
VALUES 
('1', 'The Witcher 3: Wild Hunt', 4.5, 49.99, 'Action RPG', 'https://thumbnails.pcgamingwiki.com/a/a4/The_Witcher_3_Wild_Hunt_-_cover.jpg/300px-The_Witcher_3_Wild_Hunt_-_cover.jpg', 'Adventure'),
('2', 'Minecraft', 4.8, 29.99, 'Open-world sandbox', 'https://productkeys.fi/wp-content/uploads/2021/01/minecraft.jpg', 'Simulation'),
('3', 'Fortnite', 3.9, 0.00, 'Battle Royale', 'https://cdn-uploads.gameblog.fr/images/jeux/11620/Fortnite_PC_Jaquette_002.jpg?ver=1', 'Action'),
('4', 'Halo 5', 3.8, 24.99, 'Master Chief Adventure', 'https://cdn.vox-cdn.com/thumbor/cSFIh2Z6b6z1Zs3KUdxDjJZqhkA=/59x0:865x537/1400x1400/filters:focal(59x0:865x537):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/46229378/Halo5_KeyArt_Horiz_Final.0.0.jpg', 'FPS'),
('5', 'Forza Horizon 5', 4.2, 35.99, 'Racing adventure', 'https://theouterhaven.b-cdn.net/wp-content/uploads/2021/08/E4HHJZkXMAswau7.jpg', 'Racing'),
('6', 'Sims 4', 4.5, 19.99, 'Create your world', 'https://static.fnac-static.com/multimedia/Images/FR/NR/f8/d1/52/5427704/1507-1/tsp20221215193634/Les-Sims-4-Edition-Limitee-PC.jpg', 'Simulation'),
('7', 'Fifa 22', 3.2, 24.99, 'Live football', 'https://mms.businesswire.com/media/20210711005018/en/890552/4/EAS_FIFA22_GEN5.jpg', 'Sport'),
('8', 'Call Of Duty GHOST', 2.9, 5.99, 'Kill enemies', 'https://cdn-products.eneba.com/resized-products/KRXZljO_350x200_1x-0.jpg', 'FPS');

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

INSERT INTO Commentaire (comment, comDate, idJeux, idUser)
VALUES 
('Great game!', '2023-01-15 12:00:00', '1', '1'),
('Love the building mechanics!', '2023-01-15 12:00:00', '2', '2'),
('Needs more updates.', '2023-01-15 12:00:00', '3', '3');