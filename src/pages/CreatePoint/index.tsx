import React from 'react';
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import './styles.css';

import logo from '../../assets/logo.svg'
const CreatePoint = () => {
    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta" />

                <Link to="/">
                    <FiArrowLeft />
                    Voltar para Home
                </Link>
            </header>

            <form>
                <h1>Cadastro do <br /> ponto de coleta</h1>
                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                        />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                            />
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione um endereço no mapa</span>
                    </legend>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estados (UF)</label>
                            <select className="uf" id="uf">
                                <option value="0">Selecione uma UF</option>
                            </select>
                        </div>

                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select className="city" id="city">
                                <option value="0">Selecione uma cidade</option>
                            </select>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Items de coleta</h2>
                        <span>Selecione um ou mais itens abaixo</span>
                    </legend>

                    <ul className="items-grid">
                        <li>
                            <img alt="item" />
                            <span>Óleo de cozinha</span>
                        </li>
                        <li>
                            <img alt="item" />
                            <span>Óleo de cozinha</span>
                        </li>
                        <li>
                            <img alt="item" />
                            <span>Óleo de cozinha</span>
                        </li>
                        <li>
                            <img alt="item" />
                            <span>Óleo de cozinha</span>
                        </li>
                        <li>
                            <img alt="item" />
                            <span>Óleo de cozinha</span>
                        </li>
                        <li>
                            <img alt="item" />
                            <span>Óleo de cozinha</span>
                        </li>

                    </ul>
                </fieldset>

                <button type="submit">Cadastrar ponto de coleta</button>
            </form>

        </div>
    );
}

export default CreatePoint;
