import { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/Home.scss';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function Home() {
    const [jeux, setJeux] = useState([]);
    const [user, setUser] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLogin, setIsLogin] = useState(false);
    const [isRegister, setIsRegister] = useState(false);

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

    const handleLoginClick = () => {
        setIsLogin(true);
    };

    const closeLoginPopup = () => {
        setIsLogin(false);
    };

    const handleRegisterClick = () => {
        setIsRegister(true);
    };

    const closeRegisterPopup = () => {
        setIsRegister(false);
    };

    return (
        <div className='content'>
            {isLogin && (
                <div className="login-popup">
                    <div className="container">
                        <div className="title">
                            <h2>LOGIN</h2>
                        </div>
                        <div className="form">
                            <div className="email">
                                <input type="text" placeholder='Email' required/>
                            </div>
                            <div className="password">
                                <input type="password"placeholder='Password' required/>
                            </div>
                            <div className="submit">
                                <span onClick={closeLoginPopup}>SUBMIT</span>
                            </div>
                        </div>
                        <div className="close-btn" onClick={closeLoginPopup}>
                            Close
                        </div>
                    </div>
                </div>
            )}
            {isRegister && (
                <div className="register-popup">
                    <div className="container">
                        <div className="title">
                            <h2>REGISTER</h2>
                        </div>
                        <div className="form">
                            <div className="pseudo">
                                <input type="text" placeholder='Pseudo' required/>
                            </div>
                            <div className="email">
                                <input type="text" placeholder='Email' required/>
                            </div>
                            <div className="password">
                                <input type="password"placeholder='Password' required/>
                            </div>
                            <div className="submit">
                                <span onClick={closeRegisterPopup}>SUBMIT</span>
                            </div>
                        </div>
                        <div className="close-btn" onClick={closeRegisterPopup}>
                            Close
                        </div>
                    </div>
                </div>
            )}
            <div className="header">
                <div className="logo">
                    <span>SCAM</span>
                </div>
                <div className="searchbar">
                    <input type="text" placeholder="Recherche"/>
                </div>
                <div className="login-btn">
                    <div className="login" onClick={handleLoginClick}>
                        <span>LOGIN</span>
                    </div>
                    <div className="register" onClick={handleRegisterClick}>
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
                            <span>{jeu.nom}</span>
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
                                    <span>{jeu.prix}$</span>
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
                                    <span>{jeu.prix}$</span>
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
                                <span>{jeu.prix}$</span>
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