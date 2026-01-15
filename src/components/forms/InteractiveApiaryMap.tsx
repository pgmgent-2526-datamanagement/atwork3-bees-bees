'use client';
import { useState, useCallback, useEffect, useRef } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface InteractiveApiaryMapProps {
  latitude: number;
  longitude: number;
  onLocationChange: (lat: number, lng: number) => void;
}

export default function InteractiveApiaryMap({
  latitude,
  longitude,
  onLocationChange,
}: InteractiveApiaryMapProps) {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';
  const isInternalUpdate = useRef(false);
  
  const [markerPosition, setMarkerPosition] = useState({
    latitude,
    longitude,
  });

  const [viewState, setViewState] = useState({
    latitude,
    longitude,
    zoom: 16,
  });

  // Update marker en view alleen bij externe wijzigingen (edit pagina laden)
  useEffect(() => {
    if (!isInternalUpdate.current) {
      setMarkerPosition({ latitude, longitude });
      setViewState({ latitude, longitude, zoom: 16 });
    }
    isInternalUpdate.current = false;
  }, [latitude, longitude]);

  // Gecombineerde handler voor pin verplaatsen (drag of click)
  const handleLocationUpdate = useCallback(
    (newLat: number, newLng: number) => {
      isInternalUpdate.current = true;
      setMarkerPosition({ latitude: newLat, longitude: newLng });
      onLocationChange(newLat, newLng);
    },
    [onLocationChange]
  );

  return (
    <div className="form__group">
      <label className="form__label">Verfijn locatie op kaart:</label>
      <p className="form__help" style={{ marginBottom: '0.75rem' }}>
        Sleep de pin of klik op de kaart om de exacte locatie aan te passen
      </p>
      <div
        style={{
          width: '100%',
          height: '400px',
          borderRadius: '8px',
          overflow: 'hidden',
          border: '2px solid var(--color-primary)',
        }}
      >
        <Map
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          mapboxAccessToken={mapboxToken}
          mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
          style={{ width: '100%', height: '100%' }}
          onClick={(e) => handleLocationUpdate(e.lngLat.lat, e.lngLat.lng)}
        >
          <NavigationControl position="top-right" />
          <Marker
            latitude={markerPosition.latitude}
            longitude={markerPosition.longitude}
            draggable
            onDragEnd={(e) => handleLocationUpdate(e.lngLat.lat, e.lngLat.lng)}
          >
            <div
              style={{
                width: '30px',
                height: '30px',
                backgroundColor: 'var(--color-primary)',
                borderRadius: '50% 50% 50% 0',
                transform: 'rotate(-45deg)',
                border: '3px solid white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                cursor: 'grab',
              }}
            />
          </Marker>
        </Map>
      </div>
      <p className="form__help" style={{ marginTop: '0.5rem', fontStyle: 'italic' }}>
        💡 Tip: Zoom in voor meer precisie bij het plaatsen van de pin
      </p>
    </div>
  );
}
