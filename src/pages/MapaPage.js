import React, { useEffect } from 'react';
import { useMapbox } from '../hooks/useMapbox';
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken =
  'pk.eyJ1IjoiYXJlY3l1cyIsImEiOiJja2o5eG41YWc0MDcyMnJtMGM2M2ZkYmJwIn0.akEmx2junt8OndcUHAsokA';

const puntoInicial = {
  lng: -58.5456,
  lat: -34.5969,
  zoom: 17,
};
export const MapaPage = () => {
  const { coords, setRef, nuevoMarcador$ } = useMapbox(puntoInicial);

  useEffect(() => {
    nuevoMarcador$.subscribe((marker) => {
      console.log(marker);
    });
  }, [nuevoMarcador$]);
  return (
    <>
      <div className='infoWindow'>
        Lng: {coords.lng} | lat: {coords.lat} | zoom: {coords.zoom}
      </div>
      <div className='mapContainer' ref={setRef}></div>
    </>
  );
};
