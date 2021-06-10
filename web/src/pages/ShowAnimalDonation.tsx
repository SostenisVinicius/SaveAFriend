import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import '../styles/pages/show-animal-donation.css';
import { Link } from "react-router-dom";
import api from "../services/api";

import AnimalDonation from './AnimalDonation';


interface AnimalDonation {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  images: Array<{
    id: number;
    url: string;
  }>;
}


export default function ShowAnimalDonation() {

  const [animalsdonation, setAnimalsDonation] = useState<AnimalDonation[]>([]);
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
      api.get('orphanages').then(response =>{
          setAnimalsDonation(response.data);
      });
  }, []);
  

  return (
    <div id="page-show-animal-donation">
      <Sidebar />

      <main>
        <form className="show-animal-donation-form">
          <fieldset>
            <legend>Animais para Doação</legend>

            <ul>
              <li>
                {animalsdonation.map(animaldonation => {
                  return (
                      <Link style={{ textDecoration: 'none' }} to={`/animalsdonationtest/${animaldonation.id}`}>
                          <img src={animaldonation.images[activeImageIndex].url} alt={animaldonation.name} />
                          <h1>{animaldonation.name}</h1>
                      </Link>
                  )
                })}
              </li>
            </ul>

          </fieldset>
        </form>
      </main>
    </div>
  );
}
