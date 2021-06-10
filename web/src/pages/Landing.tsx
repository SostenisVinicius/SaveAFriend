import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import '../styles/pages/landing.css';

import logoImg from '../images/logo.png';

function Landing() {
    return(
        <div id="page-landing">
        <div className="content-wrapper">
          <img src={logoImg} alt="Happy"/>
          <h1 className="logo">Be the Hero</h1>
  
          <main>
            <h1>Leve felicidade para muitos animais</h1>
            <p>Ajude um pet a encontrar um lar.</p>
          </main>
  
          <div className="location">
            <strong>Brasília</strong>
            <span>Distrito Federal</span>
          </div>
  
          <Link to="/app" className="enter-app">
            <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6"/>
          </Link>
        </div>
      </div>
    );
}

export default Landing;