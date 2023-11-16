const express = require("express");
const mariadb = require("mariadb");
const bcrypt = require('bcryptjs');
const cors = require("cors");
require('dotenv').config();
const app = express()
const port = process.env.PORT || 3000;

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
})

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json('Hello la Team !')
})

app.get('/jeux', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM Jeux');
        conn.release();
        res.status(200).json(rows);
    }
    catch (err) {
        console.log(err);
    }
})

app.get('/jeux/:id', async (req, res) => {
    const id = req.params.id;
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM article WHERE id = ?', [id]);
        conn.release();
        res.status(200).json(rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Erreur Serveur' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM Utilisateurs WHERE email = ?', [email])
        conn.release();
        if (rows.length > 0) {
            const user = rows[0];
            const match = await bcrypt.compare(password, user.pwd);
            if (match) {
                res.status(200).json({
                    id: user.id,
                    prenom: user.prenom,
                    email: user.email,
                    message: 'Connexion réussie'}
                )
            } else {
                res.status(401).json('Données incorrectes');
            }
        } else {
            res.status(404).json('Données incorrectes');
        }
    } catch (error) {
        res.status(500).json('Erreur inconnue');
    }
})

app.get('/louer', async (req,res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query('SELECT * FROM Louer');
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Erreur Serveur' });
    }
})

app.post('/rent', async (req,res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query('INSERT INTO Louer (comment, date_emprunt, date_retour, id_1, id_2) VALUES (?, ?, ?, ?, ?)', {
        });
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Erreur Serveur' });
    }
})

app.get('/utilisateurs', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM Utilisateurs');
        conn.release();
        res.status(200).json(rows);
    }
    catch (err) {
        console.log(err);
    }
})

app.get('/utilisateurs/:id', async (req, res) => {
    const id = req.params.id;
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM Utilisateurs WHERE id = ?', [id]);
        conn.release();
        res.status(200).json(rows[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Erreur Serveur' });
    }
});

app.post('/utilisateurs', async (req, res) => {
    const newUser = req.body;
    let conn;
    try {
        conn = await pool.getConnection();

        const hashedPassword = await bcrypt.hash(newUser.pwd, 10);

        // const hashedEmail = await bcrypt.hash(newUser.email, 10);

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

app.delete('/utilisateurs/:id', async (req, res) => {
    const id = req.params.id;
    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query('DELETE FROM Utilisateurs WHERE id = ?', [id]);
        conn.release();
        res.status(200).json({ message: 'Utilisateur supprimée' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Erreur Serveur' });
    }
});


app.listen(port, () => console.log(`Le serveur écoute sur : http:localhost:${port}`))