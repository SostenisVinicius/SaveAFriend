import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import mapMarkerImg from '../images/logo.png';
import adocao from '../images/adocao.png';
import perdido from '../images/perdido.png';
import encontrado from '../images/encontrado.png';

import '../styles/components/sidebar.css';

export default function Sidebar() {
    const history = useHistory();
    const { goBack } = useHistory();

    function handleClickApp(){
        history.push("/app");
    }
    function handleClickDonate(){
        history.push("/animalsdonation");
    }
    function handleClickLost(){
        history.push("/animalslost");
    }
    function handleClickFound(){
        history.push("/animalsfound");
    }

    return (
    <aside className="app-sidebar">
        <img src={mapMarkerImg} alt="Happy" onClick={handleClickApp}/>

        <div className="animals">
            <img src={adocao} alt="Adoção" onClick={handleClickDonate}/>
            <img src={perdido} alt="Perdido" onClick={handleClickLost}/>
            <img src={encontrado} alt="Encontrado" onClick={handleClickFound}/>
        </div>

        <footer>
            <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#FFF" />
            </button>
        </footer>
    </aside>
    );
}
