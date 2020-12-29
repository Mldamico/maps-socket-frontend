import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYXJlY3l1cyIsImEiOiJja2o5eG41YWc0MDcyMnJtMGM2M2ZkYmJwIn0.akEmx2junt8OndcUHAsokA";

const puntoInicial = {
  lng: -58.5456,
  lat: -34.5969,
  zoom: 17
};

export const MapaPage = () => {
  const [mapa, setMapa] = useState(null);
  const [coords, setCoords] = useState(puntoInicial);
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

  useEffect(() => {
    mapa?.on("move", () => {
      const { lng, lat } = mapa.getCenter();
      setCoords({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: mapa.getZoom().toFixed(2)
      });
    });
    return mapa?.off("move");
  }, [mapa]);
  return (
    <>
      <div className="infoWindow">
        Lng: {coords.lng} | lat: {coords.lat} | zoom: {coords.zoom}
      </div>
      <div className="mapContainer" ref={mapaDiv}></div>
    </>
  );
};
