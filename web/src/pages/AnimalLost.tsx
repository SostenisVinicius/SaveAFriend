import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo} from "react-icons/fi";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useParams } from 'react-router-dom';

import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";

import '../styles/pages/orphanage.css';

interface AnimalLost {
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
    id: number;
    url: string;
  }>;
}

interface AnimalLostParams {
  id: string;
}

export default function AnimalLost() {
  const params = useParams<AnimalLostParams>();
  const [animallost, setAnimalLost] = useState<AnimalLost>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
      api.get(`orphanages/${params.id}`).then(response =>{
        setAnimalLost(response.data);
      });
  }, [params.id]);

  if (!animallost) {
    return <p>Carregando ...</p>;
  }

  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img src={animallost.images[activeImageIndex].url} alt={animallost.name} />

          <div className="images">
            {animallost.images.map((image, index) => {
              return (
                <button 
                  key={image.id} 
                  className={activeImageIndex === index ? 'active' : ''} 
                  type="button"
                  onClick={() => {
                    setActiveImageIndex(index);
                  }}
                >
                  <img src={image.url} alt={animallost.name} />
                </button>
              );
            })}
          </div>
          
          <div className="orphanage-details-content">
            <h1>{animallost.name}</h1>
            <p>{animallost.about}</p>

           

            <hr />

            <h2>Instruções para visita</h2>
            <p>{animallost.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {animallost.opening_hours}
              </div>
              { animallost.open_on_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  fim de semana
                </div>
              ) : (
                <div className="open-on-weekends dont-open">
                  <FiInfo size={32} color="#FF669d" />
                  Não atendemos <br />
                  fim de semana
                </div>
              ) }
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}