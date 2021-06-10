import React, { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { MapContainer, Marker, TileLayer, useMapEvent, useMapEvents } from 'react-leaflet';
import { useHistory } from "react-router";

import { FiLogIn, FiPlus, FiUser } from "react-icons/fi";
import mapIcon from "../utils/mapIcon";

import '../styles/pages/register.css';
import api from "../services/api";
import { Link } from "react-router-dom";

export default function Register() {
  const history = useHistory();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  const [CPF, setCPF] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereço, setEndereço] = useState('');
  const [complemento, setComplemento] = useState('');
  const [numero, setNumero] = useState('');
  const [cidade, setCidade] = useState('');
  const [UF, setUF] = useState('');
  const [CEP, setCEP] = useState('');

  async function handleSubmit(event: FormEvent){
    event.preventDefault();

    const { latitude, longitude } = position;

    const data = new FormData();

    data.append('name', nome);

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
    <div id="page-register">

      <main>
        <form onSubmit={handleSubmit} className="register-form">
          <fieldset>
            <legend><FiUser/> Cadastre-se</legend>

            <div className="input-block">
              <label htmlFor="name">CPF</label>
              <input 
              id="name" 
              value={CPF} 
              onChange={event => setNome(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="name">Senha</label>
              <input
              type="password"
              id="name" 
              value={senha} 
              onChange={event => setNome(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
              id="name" 
              value={nome} 
              onChange={event => setNome(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="name">Email</label>
              <input 
              id="name" 
              value={email} 
              onChange={event => setNome(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="name">Telefone</label>
              <input 
              id="name" 
              value={telefone} 
              onChange={event => setNome(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="name">Endereço</label>
              <input 
              id="name" 
              value={endereço} 
              onChange={event => setNome(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Complemento <span>Máximo de 300 caracteres</span></label>
              <input 
              id="name" 
              maxLength={300}
              value={complemento} 
              onChange={event => setComplemento(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="name">Número</label>
              <input 
              id="name" 
              value={numero} 
              onChange={event => setNome(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="name">Cidade</label>
              <input 
              id="name" 
              value={cidade} 
              onChange={event => setNome(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="name">UF</label>
              <input 
              id="name" 
              value={UF} 
              onChange={event => setNome(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="name">CEP</label>
              <input 
              id="name" 
              value={CEP} 
              onChange={event => setNome(event.target.value)}
              />
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>

          <div className="cadastro">
              <Link style={{ textDecoration: 'none' }} to="/login" className="cadastro-app">
                  < FiLogIn size={26} color="rgb(35, 156, 180"/>
                  <p>Já tem um cadastro? entrar</p>
              </Link>
          </div>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
