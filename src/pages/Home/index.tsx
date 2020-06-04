import React from 'react';
import { FiLogIn } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import './styles.css';

import logo from '../../assets/logo.svg'
const Home = () => {
    return (
        <div id="page-home">
            <div className="content">
                <header>
                    <img src={logo} alt='Ecoleta' />
                </header>

                <main>
                    <h1>Seu marketplace de coleta de resíduos</h1>
                    <p>Ajudamos pessoas a encrontrar pontos d ecoleta de forma eficiente</p>

                    <Link to="/create-point">
                        <span>
                            <FiLogIn />
                        </span>
                        <strong>
                            Cadastrar
                    </strong>
                    </Link>
                </main>
            </div>
        </div>
    );
}

export default Home;
