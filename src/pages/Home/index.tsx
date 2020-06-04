import React from 'react';
import './styles.css';

import logo from '../../assets/logo.svg'
const Home = () => {
    return (
        <div id="page-home">
            <div className="content">
                <header>
                    <img src={logo} alt='Ecoleta' />
                </header>
            </div>

            <main>
                <h1>Seu marketplace de coleta de resíduos</h1>
                <p>Ajudamos pessoas a encrontrar pontos d ecoleta de forma eficiente</p>

                <a href="/cadastro">
                    <span>
                        >
                    </span>
                    <strong>
                        Cadastrar
                    </strong>
                </a>
            </main>
        </div>
    );
}

export default Home;
