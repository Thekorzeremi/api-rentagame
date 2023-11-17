const express = require("express");
const mariadb = require("mariadb");
const bcrypt = require('bcryptjs');
const cors = require("cors");
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
});

app.use(express.json());
app.use(cors());

let currentUserId = null;
let currentGameId = null;

app.get('/', (req, res) => {
    res.json('Hello la Team!');
});

app.get('/jeu', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM Jeu');
        conn.release();
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur Serveur' });
    }
});

app.post('/jeu', async (req, res) => {
    try {
        const { nom, note, prix, descr, image, type } = req.body;
        const conn = await pool.getConnection();
        const result = await conn.query('INSERT INTO Jeu (nom, note, prix, descr, image, type) VALUES (?, ?, ?, ?, ?, ?, ?)', [
            nom, note, prix, descr, image, type
        ]);
        conn.release();
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur Serveur' });
    }
});

app.get('/jeu/:id', async (req, res) => {
    const id = req.params.id;
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM Jeu WHERE idJeux = ?', [id]);
        conn.release();
        res.status(200).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur Serveur' });
    }
});

app.put('/jeu/:id', async (req, res) => {
    const id = req.params.id;
    const { nom, note, prix, descr, image, type } = req.body;

    try {
        const conn = await pool.getConnection();
        const result = await conn.query(
            'UPDATE Jeu SET nom = ?, note = ?, prix = ?, descr = ?, image = ?, type = ? WHERE idJeux = ?',
            [nom, note, prix, descr, image, type, id]
        );
        conn.release();
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur Serveur' });
    }
});

app.delete('/jeu/:id', async (req, res) => {
    const id = req.params.id;
    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query('DELETE FROM Jeu WHERE idJeux = ?', [id]);
        conn.release();
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur Serveur' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM Utilisateur WHERE email = ?', [email])
        conn.release();
        if (rows.length > 0) {
            const user = rows[0];
            const match = await bcrypt.compare(password, user.pwd);
            if (match) {
                currentUserId = user.id;
                res.status(200).json({
                    id: user.id,
                    prenom: user.prenom,
                    email: user.email,
                    message: 'Connexion réussie'
                });
            } else {
                res.status(401).json('Données incorrectes');
            }
        } else {
            res.status(404).json('Données incorrectes');
        }
    } catch (error) {
        res.status(500).json('Erreur inconnue');
    }
});

app.get('/emprunt', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query('SELECT * FROM Emprunt WHERE idUser = ?', [currentUserId]);
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur Serveur' });
    }
});

app.post('/emprunt', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query('INSERT INTO Emprunt (date_emprunt, date_retour, idJeux, idUser) VALUES (?, ?, ?, ?)', [
            req.date_emprunt,
            req.date_retour,
            req.idJeux, 
            currentUserId,
        ]);
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur Serveur' });
    }
});

app.get('/emprunt/:id', async (req, res) => {
    let conn;
    const id = req.params.id;
    try {
        conn = await pool.getConnection();
        const result = await conn.query('SELECT * FROM Emprunt WHERE idLoc = ?', [id]);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Erreur Serveur' });
    }
});

app.put('/emprunt/:id', async (req, res) => {
    const id = req.params.id;
    const { date_emprunt, date_retour, idJeux } = req.body;

    try {
        const conn = await pool.getConnection();
        const result = await conn.query(
            'UPDATE Emprunt SET date_emprunt = ?, date_retour = ?, idJeux = ? WHERE idLoc = ?',
            [date_emprunt, date_retour, idJeux, id]
        );
        conn.release();
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur Serveur' });
    }
});

app.delete('/emprunt/:id', async (req, res) => {
    let conn;
    const id = req.params.id;
    try {
        conn = await pool.getConnection();
        const result = await conn.query('DELETE FROM Emprunt WHERE idLoc = ?', [id]);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Erreur Serveur' });
    }
});

app.get('/utilisateur', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM utilisateur');
        conn.release();
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur Serveur' });
    }
});

app.get('/utilisateur/:id', async (req, res) => {
    const id = req.params.id;
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM utilisateur WHERE idUser = ?', [id]);
        conn.release();
        res.status(200).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur Serveur' });
    }
});

app.post('/utilisateur', async (req, res) => {
    const newUser = req.body;
    let conn;
    try {
        conn = await pool.getConnection();

        const hashedPassword = await bcrypt.hash(newUser.pwd, 10);

        const result = await conn.query('INSERT INTO utilisateur (pseudo, email, pwd) VALUES (?, ?, ?)', [
            newUser.pseudo,
            newUser.email,
            hashedPassword
        ]);

        const insertedUserId = result.insertId.toString();
        conn.release();
        res.status(201).json({ insertedUserId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur Serveur' });
    }
});

app.put('utilisateur/:id', async (req,res) => {
    const id = req.params.id;
    const { pseudo, email, pwd } = req.body;

    try {
        const conn = await pool.getConnection();
        const result = await conn.query(
            'UPDATE Utilisateur SET pseudo = ?, email = ?, pwd = ? WHERE idUser = ?',
            [pseudo, email, pwd, id]
        );
        conn.release();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Erreur Serveur' });
    }
})

app.delete('/utilisateur/:id', async (req, res) => {
    const id = req.params.id;
    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query('DELETE FROM utilisateur WHERE idUser = ?', [id]);
        conn.release();
        res.status(200).json({ message: 'Utilisateur supprimée' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur Serveur' });
    }
});

app.get('/comment', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM Commentaire');
        conn.release();
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur Serveur' });
    }
})

app.get('/comment/:jeu/:id', async (req, res) => {
    const id = req.params.id;
    const jeu = req.params.id;
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM Commentaire WHERE idCom = ? AND idJeux = ?', [id, jeu]);
        conn.release();
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur Serveur' });
    }
})

app.post('/comment/:jeu', async (req, res) => {
    const currentGameId =  req.params.jeu;
    const newCom = req.body;
    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query('INSERT INTO Commentaire (comment, idJeux, idUser) VALUES (?,?,?)', [
            newCom.comment,
            currentGameId,
            currentUserId
        ]);
        conn.release();
        res.status(200).json({ result })
    } catch (err) {
        res.status(500).json(err);
    }

})

app.delete('/comment/:id', async (req,res) => {
    const id = req.params.id;
    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query('DELETE FROM Commentaire WHERE idCom = ?', [id]);
        conn.release();
        res.status(200).json({ message: 'Commentaire supprimé' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur Serveur'});
    }
})

app.put('/comment/:jeu/:id', async (req,res) => {
    const id = req.params.id;
    const jeu = req.params.jeu;
    const com = req.body;
    let conn;
    try {
        const conn = await pool.getConnection();
        const result = await conn.query(
            'UPDATE Commentaire SET comment = ? WHERE idCom = ? AND idJeux = )',
            [com, id, jeu]        );
        conn.release();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Erreur Serveur' });
    }
})

app.listen(port, () => console.log(`Le serveur écoute sur : http://localhost:${port}`));