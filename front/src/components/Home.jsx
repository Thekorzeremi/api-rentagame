import { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/Home.scss';

export default function Home() {
    const [jeux, setJeux] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchJeux = async () => {
            try {
                const jeuxRes = await axios.get('http://localhost:3000/jeux');
                const jeuxRecuperes = jeuxRes.data;
                const userRes = await axios.get('http://localhost:3000/utilisateurs');
                const userRecuperes = userRes.data;
                setUser(userRecuperes);
                setJeux(jeuxRecuperes);
            } catch (error) {
                console.error(error);
            }
        }

        fetchJeux();
    }, []);

    return (
        <div className='content'>
            <div className="header">
                <div className="logo">
                    <span>SCAM</span>
                </div>
                <div className="searchbar">
                    <input type="text" placeholder="Recherche"/>
                </div>
                <div className="login-btn">
                    <div className="login">
                        <span>LOGIN</span>
                    </div>
                    <div className="register">
                        <span>REGISTER</span>
                    </div>
                </div>
            </div>
            <div className="profil-banner">

            </div>
            <div className="container">
                {jeux.map((jeu) => (
                    <div className="cards">
                        <div className="card">
                            <div className="image">
                                <img id="jeuxCoverImg" src={jeu.image} alt="" />
                            </div>
                            <div className="resume">
                                <div className="title">
                                    <span>{jeu.nom}</span>
                                </div>
                                <div className="price">
                                    <span>{jeu.prix + "€"}</span>
                                </div>
                                <div className="note">
                                    <span>{jeu.note}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}