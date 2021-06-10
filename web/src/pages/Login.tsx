import React, { FormEvent, useEffect, useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import '../styles/pages/login.css';

import logoImg from '../images/logo.png';
import api from '../services/api';


export default function Login() {
  const [name, setName] = useState('');
  const history = useHistory()

  async function handleLogin(event: FormEvent) {
      event.preventDefault()

      const data = new FormData();

      data.append('name', name);

      try {
          const response = await api.post('orphanages', data )

          localStorage.setItem('name', response.data.name)
          
      } catch (error) {
          alert(`Falha no login, tente novamente.`)
          history.push('/animalscreate')
      }
  }

    return(
        <div id="page-login">
        <div className="content-wrapper">
          <img src={logoImg} alt="Happy"/>
          <h1 className="logo">Be the Hero</h1>
        
        <form onSubmit={handleLogin} className="login-form">
            <fieldset>
                <h1>Login</h1>

                <div className="input-block">
                <label htmlFor="name">CPF</label>
                <input
                placeholder="Digite seu CPF"
                value={name}
                onChange={e => setName(e.target.value)}
                />
                </div>
                <div className="input-block">
                <label htmlFor="name">Senha</label>
                <input
                type="password"
                placeholder="Senha"
                id="name"
                />
                </div>
                <button className="confirm-button" type="submit">
                    Entrar
                </button>
                
                <div className="cadastro">
                    <Link style={{ textDecoration: 'none' }} to="/login/register" className="cadastro-app">
                        < FiLogIn size={26} color="rgb(255, 255, 255)"/>
                        <p>Faça um cadastro</p>
                    </Link>
                </div>
            </fieldset>
        </form>
  
          <div className="location">
            <strong>Brasília</strong>
            <span>Distrito Federal</span>
          </div>
        </div>
      </div>
    );
}