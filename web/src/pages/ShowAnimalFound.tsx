import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import '../styles/pages/show-animal-found.css';
import { Link } from "react-router-dom";
import api from "../services/api";

import AnimalFound from './AnimalFound';


interface AnimalFound {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  images: Array<{
    id: number;
    url: string;
  }>;
}


export default function ShowAnimalFound() {

  const [animalsfound, setAnimalsFound] = useState<AnimalFound[]>([]);
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
      api.get('orphanages').then(response =>{
        setAnimalsFound(response.data);
      });
  }, []);
  

  return (
    <div id="page-show-animal-found">
      <Sidebar />

      <main>
        <form className="show-animal-found-form">
          <fieldset>
            <legend>Animais Perdidos</legend>

            <ul>
              <li>
                {animalsfound.map(animalfound => {
                  return (
                      <Link style={{ textDecoration: 'none' }} to={`/animalsfound/${animalfound.id}`}>
                          <img src={animalfound.images[activeImageIndex].url} alt={animalfound.name} />
                          <h1>{animalfound.name}</h1>
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