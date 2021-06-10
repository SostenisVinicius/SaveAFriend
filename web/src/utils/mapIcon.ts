import Leaflet from 'leaflet';

import mapMarkerImg from '../images/mapIcon/logo.png';

const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,
  
    iconSize: [100, 100],
    iconAnchor: [50, 100],
    popupAnchor: [0, -75]
  })

  export default mapIcon;