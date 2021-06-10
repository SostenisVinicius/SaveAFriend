import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import mapMarkerImg from '../images/logo.png';
import adocao from '../images/adocao.png';
import perdido from '../images/perdido.png';
import encontrado from '../images/encontrado.png';
import '../styles/pages/orphanages-map.css';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';
import Orphanage from './Orphanage';

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    useEffect(() => {
        api.get('orphanages').then(response =>{
            setOrphanages(response.data);
        });
    }, []);

    return(
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>

                    <h2>Escolha um pet no mapa</h2>

                        <header>
                        <Link to="/animalsdonation" className="create-doacao">
                            <img src={adocao} alt="Adocao"/>
                        </Link>
                        <Link to="/animalslost" className="create-perdido">
                            <img src={perdido} alt="Perdido"/>
                        </Link>
                        <Link to="/animalsfound" className="create-encontrado">
                            <img src={encontrado} alt="Encontrado"/>
                        </Link>
                        </header>
                        <header>
                            <p>Animais para adoção</p>
                            <p>Animais perdidos</p>
                            <p>Animais encontrados</p>
                        </header>
                    
                    <p>Encontre o pet que ira trazer a felicidade pra sua vida e seja o herói :)</p>
                </header>

                <footer>
                    <strong>Brasília</strong>
                    <span>Distrito Federal</span>
                </footer>
            </aside>

            <MapContainer 
                center={[-15.8288508,-48.1299912]}
                zoom={15}
                style={{ width: '100%', height: '100%' }}
            >
                {/*<TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>*/}
                <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />

                {orphanages.map(orphanage => {
                    return (
                    <Marker
                        icon={mapIcon}
                        position={[orphanage.latitude,orphanage.longitude]}
                        key={orphanage.id}
                    >
                        <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                            {orphanage.name}
                            <Link to={`/orphanages/${orphanage.id}`}>
                                <FiArrowRight size={20} color="#FFF"/>
                            </Link>
                        </Popup>
                    </Marker>
                    )
                })}
            </MapContainer>

            <Link to="/login" className="create-orphanage">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>

    );
}

export default OrphanagesMap;
