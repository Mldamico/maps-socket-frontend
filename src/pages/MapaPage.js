import React, { useEffect, useContext } from 'react';
import { useMapbox } from '../hooks/useMapbox';
import mapboxgl from 'mapbox-gl';
import { SocketContext } from '../context/SocketContext';
mapboxgl.accessToken =
  'pk.eyJ1IjoiYXJlY3l1cyIsImEiOiJja2o5eG41YWc0MDcyMnJtMGM2M2ZkYmJwIn0.akEmx2junt8OndcUHAsokA';

const puntoInicial = {
  lng: -58.5456,
  lat: -34.5969,
  zoom: 17,
};
export const MapaPage = () => {
  const { socket } = useContext(SocketContext);
  const {
    agregarMarcador,
    actualizarPosicion,
    coords,
    setRef,
    nuevoMarcador$,
    movimientoMarcador$,
  } = useMapbox(puntoInicial);

  useEffect(() => {
    socket.on('marcadores-activos', (marcadores) => {
      for (const key of Object.keys(marcadores)) {
        agregarMarcador(marcadores[key], key);
      }
    });
  }, [socket, agregarMarcador]);

  useEffect(() => {
    nuevoMarcador$.subscribe((marker) => {
      socket.emit('marcador-nuevo', marker);
    });
  }, [nuevoMarcador$, socket]);
  useEffect(() => {
    movimientoMarcador$.subscribe((marker) => {
      socket.emit('marcador-actualizado', marker);
    });
  }, [movimientoMarcador$, socket]);

  useEffect(() => {
    socket.on('marcador-actualizado', (marker) => {
      actualizarPosicion(marker);
    });
  }, [actualizarPosicion, socket]);

  useEffect(() => {
    socket.on('marcador-nuevo', (marcador) => {
      agregarMarcador(marcador, marcador.id);
    });
  }, [socket, agregarMarcador]);
  return (
    <>
      <div className='infoWindow'>
        Lng: {coords.lng} | lat: {coords.lat} | zoom: {coords.zoom}
      </div>
      <div className='mapContainer' ref={setRef}></div>
    </>
  );
};
