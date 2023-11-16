import { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/Home.scss';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function Home() {
    const [jeux, setJeux] = useState([]);
    const [user, setUser] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

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

    const handleNext = () => {
        setCurrentIndex((prevIndex) => prevIndex + 2);
      };
    
      const handlePrev = () => {
        setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 2));
      };

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
            <div className="h2">
                <h2>RECOMMENDED GAMES</h2>
            </div>
            <div className="btn-carou">
                <div onClick={handlePrev}>
                    {/* <ArrowBackIosIcon /> */}
                    Précédent
                </div>
                <div onClick={handleNext}>Suivant</div>
            </div>
            <div className="carousel">
            {jeux.slice(currentIndex, currentIndex + 2).map((jeu, index) => (
                <div key={index} className="cards">
                    <div className="card">
                        <img src={jeu.image} alt="" />
                        <div className="title">
                        <span>{jeu.title}</span>
                        </div>
                        <div className="note">
                        <span>{jeu.note}</span>
                        </div>
                    </div>
                </div>
            ))}
            </div>
            <div className="container">
                <div className="h2">
                    <h2>RECENTLY ADDED</h2>
                </div>
                <div className="cards">
                    {jeux.map((jeu) => (
                        <div className="card">
                            <div className="image">
                                <img src={jeu.image} alt="" />
                            </div>
                            <div className="resume">
                                <div className="title">
                                    <span>{jeu.nom}</span>
                                </div>
                                <div className="price">
                                    <span>{jeu.prix}</span>
                                </div>
                                <div className="note">
                                    <span>{jeu.note}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="h2">
                    <h2>MOST POPULAR</h2>
                </div>
                <div className="cards">
                    {jeux.map((jeu) => (
                        <div className="card">
                            <div className="image">
                                <img src={jeu.image} alt="" />
                            </div>
                            <div className="resume">
                                <div className="title">
                                    <span>{jeu.nom}</span>
                                </div>
                                <div className="price">
                                    <span>{jeu.prix}</span>
                                </div>
                                <div className="note">
                                    <span>{jeu.note}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="h2">
                    <h2>ALL GAMES</h2>
                </div>
                <div className="cards">
                {jeux.map((jeu) => (
                    <div className="card">
                        <div className="image">
                            <img src={jeu.image} alt="" />
                        </div>
                        <div className="resume">
                            <div className="title">
                                    <span>{jeu.nom}</span>
                                </div>
                            <div className="price">
                                <span>{jeu.prix}</span>
                            </div>
                            <div className="note">
                                <span>{jeu.note}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </div>
    )
}