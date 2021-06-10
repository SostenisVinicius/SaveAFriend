import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import '../styles/pages/show-animal-lost.css';
import { Link } from "react-router-dom";
import api from "../services/api";

import AnimalLost from './AnimalLost';


interface AnimalLost {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  images: Array<{
    id: number;
    url: string;
  }>;
}


export default function ShowAnimalLost() {

  const [animalslost, setAnimalsLost] = useState<AnimalLost[]>([]);
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
      api.get('orphanages').then(response =>{
          setAnimalsLost(response.data);
      });
  }, []);
  

  return (
    <div id="page-show-animal-lost">
      <Sidebar />

      <main>
        <form className="show-animal-lost-form">
          <fieldset>
            <legend>Animais Encontrados</legend>

            <ul>
              <li>
                {animalslost.map(animallost => {
                  return (
                      <Link style={{ textDecoration: 'none' }} to={`/animalslost/${animallost.id}`}>
                          <img src={animallost.images[activeImageIndex].url} alt={animallost.name} />
                          <h1>{animallost.name}</h1>
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