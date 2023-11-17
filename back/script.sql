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
    idJeux INT NOT NULL,
    idUser INT NOT NULL,
    PRIMARY KEY(idLoc),
    FOREIGN KEY(idJeux) REFERENCES Jeu(idJeux),
    FOREIGN KEY(idUser) REFERENCES Utilisateur(idUser)
);

CREATE TABLE Commentaire (
    idCom INT AUTO_INCREMENT,
    comDate DATETIME,
    comment VARCHAR(255),
    idJeux INT NOT NULL,
    idUser INT NOT NULL,
    PRIMARY KEY(idCom),
    FOREIGN KEY(idJeux) REFERENCES Jeu(idJeux),
    FOREIGN KEY(idUser) REFERENCES Utilisateur(idUser)
);

INSERT INTO Jeu (nom, note, prix, descr, image, type)
VALUES 
("Assassin's Creed Valhalla", 4.7, 59.99, 'Viking Adventure', 'https://i.ebayimg.com/images/g/HN4AAOSwqqNfjaCX/s-l1200.jpg', 'Action RPG'),
("Cyberpunk 2077", 3.9, 39.99, 'Cyberpunk Open World', 'https://digital.datablitz.com.ph/cdn/shop/products/DATABLITZ_CyberPunk_1200x1200.png?v=1672379201', 'Action RPG'),
("Red Dead Redemption 2", 4.9, 49.99, 'Western Adventure', 'https://assets.vg247.com/current//2018/05/red_dead_redemption_2_cover_art_1.jpg', 'Action Adventure'),
("League of Legends", 4.5, 0.00, 'Multiplayer Online Battle Arena', 'https://thumbnails.pcgamingwiki.com/4/40/League_of_Legends_-_cover.jpg/300px-League_of_Legends_-_cover.jpg', 'MOBA'),
("Valorant", 4.2, 0.00, 'Tactical Shooter', 'https://m.media-amazon.com/images/I/71LTpSLz57L._AC_UF894,1000_QL80_.jpg', 'FPS'),
("The Legend of Zelda: Breath of the Wild", 4.8, 59.99, 'Action-Adventure', 'https://cdn02.plentymarkets.com/qozbgypaugq8/item/images/1613/full/PSTR-ZELDA005.jpg', 'Action Adventure'),
("Counter-Strike: Global Offensive", 4.6, 14.99, 'Tactical Shooter', 'https://cdn.medal.tv/asset/games/csgo/cover-1649885943937.jpg', 'FPS'),
("Mortal Kombat 11", 4.4, 29.99, 'Fighting Game', 'https://s3.amazonaws.com/prod-media.gameinformer.com/styles/full/s3/2019/03/29/a9bd2703/mk11_raiden.png', 'Fighting'),
("Among Us", 4.0, 4.99, 'Social Deduction Game', 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Among_Us_cover_art.jpg/220px-Among_Us_cover_art.jpg', 'Party'),
("The Elder Scrolls V: Skyrim", 4.6, 19.99, 'Open World RPG', 'https://upload.wikimedia.org/wikipedia/en/1/15/The_Elder_Scrolls_V_Skyrim_cover.png', 'Action RPG'),
("Overwatch", 4.3, 19.99, 'Team-based Shooter', 'https://m.media-amazon.com/images/I/917xadgCebL._AC_UF1000,1000_QL80_.jpg', 'FPS'),
("Genshin Impact", 4.7, 0.00, 'Open World Action RPG', 'https://upload-os-bbs.hoyolab.com/upload/2020/10/13/1078834/3191de5bb6328eb64fea21355c009837_6058951914751133206.jpg', 'Action RPG'),
("FIFA 23", 4.1, 49.99, 'Football Simulation', 'https://fifauteam.com/images/covers/fifa23/standard-ng.webp', 'Sport'),
("Hollow Knight", 4.8, 14.99, 'Metroidvania Adventure', 'https://www.gameinformer.com/sites/default/files/styles/product_box_art/public/2021/09/07/ddb20050/hollow_knight_cover.jpg', 'Action Adventure'),
("Doom Eternal", 4.5, 39.99, 'First-Person Shooter', 'https://upload.wikimedia.org/wikipedia/en/9/9d/Cover_Art_of_Doom_Eternal.png', 'FPS'),
("The Sims 5", 4.6, 29.99, 'Life Simulation', 'https://www.rachybop.com/wp-content/uploads/2020/11/the-sims-5-cover.jpg', 'Simulation'),
("Star Wars Jedi: Fallen Order", 4.4, 44.99, 'Action-Adventure', 'https://stevivor.com/wp-content/uploads/2019/06/star-wars-jedi-fallen-order-cover-standard.webp', 'Action Adventure'),
("Rocket League", 4.0, 19.99, 'Sports Racing', 'https://m.media-amazon.com/images/I/71wWWcslzvL._AC_UF1000,1000_QL80_.jpg', 'Sports'),
("Destiny 2", 4.3, 29.99, 'Online Multiplayer Shooter', 'https://i.ebayimg.com/images/g/TE8AAOSwH2ZfjVun/s-l400.jpg', 'FPS'),
("Batman: Arkham Knight", 4.6, 24.99, 'Action-Adventure', 'https://www.g-mart.com/static/f103767.jpg', 'Action Adventure'),
("Grand Theft Auto V", 4.9, 29.99, 'Open World Crime', 'https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/71bNIxi11sL.jpg', 'Action Adventure'),
("Far Cry 6", 4.2, 49.99, 'First-Person Shooter', 'https://upload.wikimedia.org/wikipedia/en/thumb/3/35/Far_cry_6_cover.jpg/220px-Far_cry_6_cover.jpg', 'FPS'),
("The Last of Us Part II", 4.7, 39.99, 'Action-Adventure', 'https://m.media-amazon.com/images/I/616+j9jEM4L._AC_UF894,1000_QL80_.jpg', 'Action Adventure'),
("NBA 2K22", 4.1, 59.99, 'Basketball Simulation', 'https://basketballforever.com/wp-content/uploads/2021/07/NBA-2k22.jpg', 'Sports'),
("Persona 5", 4.8, 49.99, 'Role-Playing Game', 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b0/Persona_5_cover_art.jpg/220px-Persona_5_cover_art.jpg', 'RPG'),
("Resident Evil Village", 4.5, 54.99, 'Survival Horror', 'https://upload.wikimedia.org/wikipedia/en/2/2c/Resident_Evil_Village.png', 'Horror'),
("Sekiro: Shadows Die Twice", 4.7, 49.99, 'Action-Adventure', 'https://static.actugaming.net/media/2018/06/sekiro-shadows-die-twice-jaquette.jpg', 'Action Adventure'),
("Assassin's Creed Odyssey", 4.5, 39.99, 'Action RPG', 'https://cdn1.epicgames.com/offer/clary/ACOdyssey_STD_Store_Portrait_1200x1600_1200x1600-3add642bad2d1207487527d53d715220', 'Action RPG'),
("Rainbow Six Siege", 4.3, 19.99, 'Tactical Shooter', 'https://cdn1.epicgames.com/offer/carnation/Carousel_BoxArt_1200x1600_1200x1600-6888b9d57181d8fcfb3472a7f70ecc49', 'FPS'),
("Watch Dogs: Legion", 4.1, 44.99, 'Action-Adventure', 'https://cdn1.epicgames.com/0a84818055e740a7be21a2e5b6162703/offer/WatchDogs_Legion_Store_Portrait_1200x1600-1200x1600-a6b2d4cce489aeeb87bad4a6db168bed.jpg', 'Action Adventure'),
("Dying Light 2", 4.4, 54.99, 'Open World Survival Horror', 'https://upload.wikimedia.org/wikipedia/en/6/6d/Dying_Light_2_cover_art.jpg', 'Horror'),
("Ghost of Tsushima", 4.8, 49.99, 'Action-Adventure', 'https://cantontiger.org/wp-content/uploads/2020/10/Week-of-September-28-Project-Oct-5-2020-at-3_48-PM-506x900.png', 'Action Adventure'),
("Madden NFL 22", 4.0, 59.99, 'American Football Simulation', 'https://s25.q4cdn.com/103200307/files/doc_multimedia/M22_MVP.jpg', 'Sports'),
("Cuphead", 4.7, 19.99, 'Run and Gun', 'https://upload.wikimedia.org/wikipedia/en/e/eb/Cuphead_%28artwork%29.png', 'Indie'),
("DOOM (2016)", 4.5, 14.99, 'First-Person Shooter', 'https://cdns-images.dzcdn.net/images/cover/30df9f6ef2a1d11f058868ebe2d29349/500x500.jpg', 'FPS'),
("The Division 2", 4.2, 29.99, 'Online Action RPG', 'https://gpstatic.com/acache/37/77/1/fr/packshot-0c65d9c7b50acd142875659f586d8261.jpg', 'Action RPG'),
("Witcher 2: Assassins of Kings", 4.3, 9.99, 'Action RPG', 'https://upload.wikimedia.org/wikipedia/en/4/40/Witcher_2_cover.jpg', 'Action RPG'),
("Monster Hunter: World", 4.6, 39.99, 'Action RPG', 'https://upload.wikimedia.org/wikipedia/en/1/1b/Monster_Hunter_World_cover_art.jpg', 'Action RPG'),
("Fallout 4", 4.4, 29.99, 'Open World RPG', 'https://image.api.playstation.com/vulcan/ap/rnd/202009/2500/D59jxQR99Jg545NKa4Nu1FmP.png', 'Action RPG'),
("FAR: Lone Sails", 4.0, 14.99, 'Adventure', 'https://image.jeuxvideo.com/medias/155293/1552926275-3045-jaquette-avant.jpg', 'Indie'),
("Subnautica", 4.7, 29.99, 'Open World Survival', 'https://cdn1.epicgames.com/offer/jaguar/SN_EpicPortrait_1200x1800-f5ebad930a2f6eb715579a056807033f', 'Adventure'),
("Cities: Skylines", 4.5, 29.99, 'City Building Simulation', 'https://cdn1.epicgames.com/6009be9994c2409099588cde6f3a5ed0/offer/EGS_CitiesSkylines_ColossalOrder_S2-1200x1600-753257537706de74735d2bc3eb656b67.jpg', 'Simulation'),
("Stardew Valley", 4.8, 14.99, 'Farming Simulation', 'https://cdn.mobygames.com/covers/1690245-stardew-valley-windows-front-cover.jpg', 'Simulation'),
("Terraria", 4.6, 9.99, 'Action-Adventure', 'https://upload.wikimedia.org/wikipedia/en/1/1a/Terraria_Steam_artwork.jpg', 'Adventure'),
("Crysis 3", 3.8, 19.99, 'First-Person Shooter', 'https://static.posters.cz/image/750/affiches-et-posters/crysis-3-cover-i13843.jpg', 'FPS'),
("Soulcalibur VI", 4.1, 29.99, 'Fighting Game', 'https://upload.wikimedia.org/wikipedia/en/8/84/Soulcalibur_VI_cover_art.jpg', 'Fighting'),
("Dead by Daylight", 4.3, 19.99, 'Survival Horror', 'https://cdn1.epicgames.com/offer/611482b8586142cda48a0786eb8a127c/EGS_DeadbyDaylight_BehaviourInteractive_S2_1200x1600-a1c30209e3b9fb63144daa9b5670f503', 'Horror'),
("Civilization VI", 4.7, 39.99, 'Turn-Based Strategy', 'https://cdn1.epicgames.com/cd14dcaa4f3443f19f7169a980559c62/offer/EGS_SidMeiersCivilizationVI_FiraxisGames_S2-860x1148-bffad83909595b7c5c60489a17056a59.jpg', 'Strategy');


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