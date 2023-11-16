import '../style/Home.scss'

export default function Home() {
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
                <div className="cards">
                    <div className="card">
                        <div className="image"></div>
                        <div className="resume">
                            <div className="title">
                                <span>TITLE</span>
                            </div>
                            <div className="describe">
                                <span>AZER SDC SDFG QSDF B F QSVS QCVS SDF SQDC CS SDFSQD F </span>
                            </div>
                            <div className="price">
                                <span>9.99$</span>
                            </div>
                            <div className="note">
                                <span>4</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}