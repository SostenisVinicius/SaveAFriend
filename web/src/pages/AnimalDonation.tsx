import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo} from "react-icons/fi";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useParams } from 'react-router-dom';

import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";

import '../styles/pages/orphanage.css';

interface AnimalDonation {
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

interface AnimalDonationParams {
  id: string;
}

export default function AnimalDonation() {
  const params = useParams<AnimalDonationParams>();
  const [animaldonation, setAnimalDonation] = useState<AnimalDonation>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
      api.get(`orphanages/${params.id}`).then(response =>{
        setAnimalDonation(response.data);
      });
  }, [params.id]);

  if (!animaldonation) {
    return <p>Carregando ...</p>;
  }

  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img src={animaldonation.images[activeImageIndex].url} alt={animaldonation.name} />

          <div className="images">
            {animaldonation.images.map((image, index) => {
              return (
                <button 
                  key={image.id} 
                  className={activeImageIndex === index ? 'active' : ''} 
                  type="button"
                  onClick={() => {
                    setActiveImageIndex(index);
                  }}
                >
                  <img src={image.url} alt={animaldonation.name} />
                </button>
              );
            })}
          </div>
          
          <div className="orphanage-details-content">
            <h1>{animaldonation.name}</h1>
            <p>{animaldonation.about}</p>

            <div className="map-container">
              <MapContainer 
                center={[animaldonation.latitude,animaldonation.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={mapIcon} position={[animaldonation.latitude,animaldonation.longitude]} />
              </MapContainer>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${animaldonation.latitude},${animaldonation.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />


            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {animaldonation.opening_hours}
              </div>
              { animaldonation.open_on_weekends ? (
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