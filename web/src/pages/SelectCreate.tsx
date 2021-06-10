import React from "react";

import '../styles/pages/select-create.css';
import { Link } from "react-router-dom";


import adocao from '../images/adocao.png';
import perdido from '../images/perdido.png';
import encontrado from '../images/encontrado.png';

export default function SelectCreate() {

  return (
    <div id="page-select-create">
        <legend>Criar novo</legend>
      <main className="select-create">
        <div>
            <Link style={{ textDecoration: 'none' }} to="/animalsdonation/create" className="select-create-button">
                <img src={adocao} alt="adocao" />
                <p>Animal para Doação</p>
            </Link>
        </div>
        <div>
            <Link style={{ textDecoration: 'none' }} to="/orphanages/create" className="select-create-button">
                <img src={perdido} alt="perdido" />
                <p>Animal Perdido</p>
            </Link>
        </div>
        <div>
            <Link style={{ textDecoration: 'none' }} to="/orphanages/create" className="select-create-button">
                <img src={encontrado} alt="encontrado" />
                <p>Animal Encontrado</p>
            </Link>
        </div>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
