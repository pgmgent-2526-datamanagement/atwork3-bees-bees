'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ApiaryForm({
  initialApiary,
}: {
  initialApiary?: string;
}) {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    if (!initialApiary) return;
    async function fetchApiary() {
      const res = await fetch(`/api/apiaries/${initialApiary}`);
      if (res.ok) {
        const data = await res.json();
        console.log('Fetched apiary data:', data);
        setName(data.name);
        setLatitude(data.latitude.toString());
        setLongitude(data.longitude.toString());
      } else {
        console.error('Failed to fetch apiary data');
      }
    }
    fetchApiary();
  }, [initialApiary]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const apiaryData = {
      name,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    };

    try {
      let response;
      const url = initialApiary
        ? `/api/apiaries/${initialApiary}`
        : '/api/apiaries';
      let method = initialApiary ? 'PUT' : 'POST';
      response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiaryData),
      });

      if (!response.ok) throw new Error('Kon bijenstand niet aanmaken');
      router.push(`/apiaries`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Er ging iets mis');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      {error && (
        <div style={{ 
          padding: "var(--space-4)", 
          marginBottom: "var(--space-6)",
          background: "rgba(220, 38, 38, 0.1)",
          border: "1px solid rgba(220, 38, 38, 0.3)",
          borderRadius: "4px",
          color: "#dc2626"
        }}>
          <p>{error}</p>
        </div>
      )}

      <div className="form__group">
        <label htmlFor="name" className="form__label">
          Naam bijenstand
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="form__input"
          placeholder="bv. Tuin achteraan, Bij de beek"
          required
        />
      </div>

      <div className="form__group">
        <label htmlFor="latitude" className="form__label">
          Latitude
        </label>
        <input
          type="number"
          id="latitude"
          value={latitude}
          onChange={e => setLatitude(e.target.value)}
          step="any"
          className="form__input"
          placeholder="51.2194"
          required
        />
      </div>

      <div className="form__group">
        <label htmlFor="longitude" className="form__label">
          Longitude
        </label>
        <input
          type="number"
          id="longitude"
          value={longitude}
          onChange={e => setLongitude(e.target.value)}
          step="any"
          className="form__input"
          placeholder="4.4025"
          required
        />
        <p className="form__help">
          Tip: Gebruik Google Maps om de exacte coördinaten van je bijenstand te vinden
        </p>
      </div>

      <div className="form__actions">
        <button
          type="submit"
          disabled={loading}
          className="btn btn--primary btn--large"
        >
          {loading
            ? initialApiary
              ? 'Bewerken...'
              : 'Toevoegen...'
            : initialApiary
            ? 'Bewerk bijenstand'
            : 'Bijenstand toevoegen'}
        </button>
      </div>
    </form>
  );
}
