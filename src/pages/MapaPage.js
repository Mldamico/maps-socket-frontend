import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXJlY3l1cyIsImEiOiJja2o5eG41YWc0MDcyMnJtMGM2M2ZkYmJwIn0.akEmx2junt8OndcUHAsokA";

const puntoInicial = {
  lng: 5,
  lat: 34,
  zoom: 2
};

export const MapaPage = () => {
  const [mapa, setMapa] = useState(null);
  const mapaDiv = useRef();
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapaDiv.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [puntoInicial.lng, puntoInicial.lat],
      zoom: puntoInicial.zoom
    });
    setMapa(map);
  }, []);
  return (
    <>
      <div className="mapContainer" ref={mapaDiv}></div>
    </>
  );
};
