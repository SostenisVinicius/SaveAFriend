import React, { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { MapContainer, Marker, TileLayer, useMapEvent, useMapEvents } from 'react-leaflet';
import { useHistory } from "react-router";

import { FiPlus } from "react-icons/fi";

import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";

import '../styles/pages/create-animal-donation.css';
import api from "../services/api";

export default function CreateAnimalDonation() {
  const history = useHistory();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  function handleSeletecImages(event: ChangeEvent<HTMLInputElement>){
    if (!event.target.files){
      return;
    }

    const selectedImages = Array.from(event.target.files);

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });
    setPreviewImages(selectedImagesPreview);
  }

  async function handleSubmit(event: FormEvent){
    event.preventDefault();

    const { latitude, longitude } = position;

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));
    images.forEach(image => {
      data.append('images', image);
    })

    await api.post('orphanages', data);

    alert('Cadastro realizado com sucesso!');

    history.push('/app');
  }


  function HandleMapClick() {
    const map = useMapEvents({
      click(event) {
        const { lat, lng } = event.latlng;
        setPosition({
          latitude: lat,
          longitude: lng,
        });
      },
    });
    
    return (
      position.latitude !== 0 ? (
        <Marker
          position={[position.latitude, position.longitude]}
          interactive={true}
          icon={mapIcon}
        />
      ) : null
    )}

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input 
              id="name" 
              value={name} 
              onChange={event => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="name">Raça</label>
              <input 
              id="name" 
              value={name} 
              onChange={event => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Sexo</label>

              <div className="button-select">
                <button 
                type="button" 
                className={open_on_weekends ? 'active' : ''}
                onClick={() => setOpenOnWeekends(true)}
                >
                  Macho
                </button>
                <button 
                type="button"
                className={!open_on_weekends ? 'active' : ''}
                onClick={() => setOpenOnWeekends(false)}
                >
                  Femea
                </button>
              </div>
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea 
              id="name" 
              maxLength={300}
              value={about} 
              onChange={event => setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map(image => {
                  return (
                    <img key={image} src={image} alt={name} />
                  )
                })}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>

                <input multiple onChange={handleSeletecImages} type="file" id="image[]" />
            </div>

            <div className="input-block">
                <label htmlFor="name">Endereço</label>
                <input 
                id="name" 
                value={name} 
                onChange={event => setName(event.target.value)}
                />
            </div>

            <div className="input-block">
                <label htmlFor="name">Número</label>
                <input 
                id="name" 
                value={name} 
                onChange={event => setName(event.target.value)}
                />
            </div>

              <MapContainer 
              center={[-15.8124317,-48.1285127]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
              
              <HandleMapClick/>

            </MapContainer >

            <div className="input-block">
                <label htmlFor="name">Email</label>
                <input 
                id="name" 
                value={name} 
                onChange={event => setName(event.target.value)}
                />
            </div>

            <div className="input-block">
                <label htmlFor="name">Telefone</label>
                <input 
                id="name" 
                value={name} 
                onChange={event => setName(event.target.value)}
                />
            </div>
              
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
