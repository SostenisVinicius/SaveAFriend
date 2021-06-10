import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo} from "react-icons/fi";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useParams } from 'react-router-dom';

import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";

import '../styles/pages/animal-donation-test.css';

interface AnimalDonationTest {
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

interface AnimalDonationTestParams {
  id: string;
}

export default function AnimalDonationTestTest() {
  const params = useParams<AnimalDonationTestParams>();
  const [animaldonationtest, setAnimalDonationTest] = useState<AnimalDonationTest>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
      api.get(`orphanages/${params.id}`).then(response =>{
        setAnimalDonationTest(response.data);
      });
  }, [params.id]);

  if (!animaldonationtest) {
    return <p>Carregando ...</p>;
  }

  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img src={animaldonationtest.images[activeImageIndex].url} alt={animaldonationtest.name} />

          <div className="images">
            {animaldonationtest.images.map((image, index) => {
              return (
                <button 
                  key={image.id} 
                  className={activeImageIndex === index ? 'active' : ''} 
                  type="button"
                  onClick={() => {
                    setActiveImageIndex(index);
                  }}
                >
                  <img src={image.url} alt={animaldonationtest.name} />
                </button>
              );
            })}
          </div>
          
          <div className="orphanage-details-content">
            <h1>{animaldonationtest.name}</h1>

            <div className="raca">
                <h3>Raça</h3>
                <p>Ragdoll</p>
            </div>

            <div className="sexo">
                <h3>Sexo</h3>
                <p>Femea</p>
            </div>

            <div className="sobre">
                <h3>Sobre</h3>
                <p>{animaldonationtest.about}</p>
            </div>

            <div className="endereco">
                <h3>Endereço</h3>
                <p>QNP 05 Conj. P  25</p>
            </div>

            <div className="map-container">
              <MapContainer 
                center={[animaldonationtest.latitude,animaldonationtest.longitude]} 
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
                <Marker interactive={false} icon={mapIcon} position={[animaldonationtest.latitude,animaldonationtest.longitude]} />
              </MapContainer>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${animaldonationtest.latitude},${animaldonationtest.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <div className="email">
                <h3>Email</h3>
                <p>testemail@gmail.com</p>
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