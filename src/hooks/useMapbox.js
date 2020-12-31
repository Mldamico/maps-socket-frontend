import { useRef, useEffect, useCallback, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { v4 } from 'uuid';
import { Subject } from 'rxjs';

export const useMapbox = (puntoInicial) => {
  const mapaDiv = useRef();
  const setRef = useCallback((node) => {
    mapaDiv.current = node;
  }, []);
  const mapa = useRef(null);
  const [coords, setCoords] = useState(puntoInicial);
  const marcadores = useRef({});

  const movimientoMarcador = useRef(new Subject());
  const nuevoMarcador = useRef(new Subject());

  const agregarMarcador = useCallback((ev, id) => {
    const { lng, lat } = ev.lngLat || ev;
    const marker = new mapboxgl.Marker();
    marker.id = id ?? v4();
    marker.setLngLat([lng, lat]).addTo(mapa.current).setDraggable(true);
    marcadores.current[marker.id] = marker;
    if (!id) {
      nuevoMarcador.current.next({ id: marker.id, lng, lat });
    }

    marker.on('drag', ({ target }) => {
      const { id } = target;
      const { lng, lat } = target.getLngLat();
      movimientoMarcador.current.next({ id, lng, lat });
    });
  }, []);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapaDiv.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [puntoInicial.lng, puntoInicial.lat],
      zoom: puntoInicial.zoom,
    });
    mapa.current = map;
  }, [puntoInicial]);

  useEffect(() => {
    mapa.current?.on('move', () => {
      const { lng, lat } = mapa.current.getCenter();
      setCoords({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: mapa.current.getZoom().toFixed(2),
      });
    });
    return mapa.current?.off('move');
  }, []);

  useEffect(() => {
    mapa.current?.on('click', agregarMarcador);
  }, [agregarMarcador]);

  const actualizarPosicion = useCallback(({ id, lng, lat }) => {
    marcadores.current[id].setLngLat([lng, lat]);
  }, []);

  return {
    agregarMarcador,
    actualizarPosicion,
    coords,
    setRef,
    marcadores,
    nuevoMarcador$: nuevoMarcador.current,
    movimientoMarcador$: movimientoMarcador.current,
  };
};
