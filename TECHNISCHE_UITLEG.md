

## 1. MAPBOX GEOCODING - Hoe werkt het?

### Wat is geocoding?
**Adres → GPS coördinaten omzetten**
- Gebruiker typt "Graslei 20, Gent"
- API geeft terug: `{ latitude: 51.0543, longitude: 3.7174 }`

### Waarom Mapbox?
- **Nauwkeurigheid**: Betere resultaten dan gratis alternatieven
- **Snelheid**: Snel response (< 1 seconde)
- **Limiet**: 100.000 requests/maand gratis
- **Features**: Autocomplete, address suggestions

### Hoe werkt het in de code?

#### Bestand: `src/components/forms/ApiaryForm.tsx`

```typescript
// Lijn 122-147
const geocodeAddress = async () => {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  
  // STAP 1: Probeer eerst Mapbox (als token beschikbaar)
  if (mapboxToken) {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?country=BE,NL&limit=1&access_token=${mapboxToken}`
    );
    
    const mapboxData = await response.json();
    
    // STAP 2: Extract coördinaten uit response
    if (mapboxData.features && mapboxData.features.length > 0) {
      const [lng, lat] = mapboxData.features[0].center; // Let op: lng eerst!
      setLatitude(lat.toString());
      setLongitude(lng.toString());
      return;
    }
  }
  
  // STAP 3: Fallback naar Nominatim (gratis)
  // Als Mapbox niet werkt of geen token
}
```

### De flow:
```
Gebruiker typt adres
       ↓
Klik "Zoek locatie"
       ↓
API call naar Mapbox
       ↓
Mapbox response: { features: [{ center: [lng, lat] }] }
       ↓
Extract coördinaten
       ↓
Toon op kaart (InteractiveApiaryMap component)
```

### Nominatim Fallback
Als Mapbox niet beschikbaar:
```typescript
// STAP 3 (vervolg): Nominatim (OpenStreetMap)
const response = await fetch(
  `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&countrycodes=be,nl&limit=1`
);

const data = await response.json();
if (data.length > 0) {
  setLatitude(data[0].lat);
  setLongitude(data[0].lon);
}
```

### API Response Voorbeeld (Mapbox):
```json
{
  "features": [
    {
      "center": [3.7174, 51.0543],  // [longitude, latitude]
      "place_name": "Graslei 20, 9000 Gent, Belgium",
      "relevance": 1
    }
  ]
}
```

### Waarom twee methodes (adres + GPS)?
**Desktop (adres):**
- Desktop heeft geen GPS
- Adres typen is nauwkeuriger
- Gebruiker kan specifieke locatie kiezen

**Mobiel (GPS):**
- Smartphones hebben GPS chip
- Browser Geolocation API: `navigator.geolocation.getCurrentPosition()`
- Nauwkeurigheid: 5-20 meter (afhankelijk van signaal)

---

## 2. INTERACTIEVE KAART - Hoe werkt het?

### React Map GL
**Library:** `react-map-gl` (wrapper rond Mapbox GL)

#### Bestand: `src/components/forms/InteractiveApiaryMap.tsx`

```typescript
// Lijn 17-70
const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

return (
  <Map
    mapboxAccessToken={mapboxToken}
    mapStyle="mapbox://styles/mapbox/satellite-streets-v12"  // Satelliet view
    initialViewState={{
      longitude: longitude,
      latitude: latitude,
      zoom: 15
    }}
    onMove={(evt) => setViewState(evt.viewState)}  // Track map beweging
  >
    {/* Draggable marker */}
    <Marker
      longitude={longitude}
      latitude={latitude}
      draggable={true}  // Gebruiker kan marker slepen!
      onDragEnd={(evt) => {
        setLongitude(evt.lngLat.lng);
        setLatitude(evt.lngLat.lat);
        onLocationChange(evt.lngLat.lat, evt.lngLat.lng);  // Update parent
      }}
    />
  </Map>
);
```

### Features:
1. **Draggable marker**: Gebruiker kan marker verslepen voor fine-tuning
2. **Satellite view**: Zie echte luchtfoto's van bijenstand
3. **Zoom controls**: In/uit zoomen
4. **Responsive**: Werkt op desktop en mobiel

### Foerageergebied Cirkels
**In:** `src/components/shared/ApiaryMap.tsx`

```typescript
// Lijn 110-125
const createCircle = (radius: number) => {
  const points = 64;  // 64 punten voor vloeiende cirkel
  const coords = [];
  
  // Bereken afstand in graden (1 graad ≈ 111km)
  const distanceX = radius / (111320 * Math.cos(latitude * Math.PI / 180));
  const distanceY = radius / 110574;
  
  // Maak cirkel met trigonometrie
  for (let i = 0; i < points; i++) {
    const theta = (i / points) * (2 * Math.PI);
    const x = distanceX * Math.cos(theta);
    const y = distanceY * Math.sin(theta);
    coords.push([longitude + x, latitude + y]);
  }
  
  return coords;
};

// 3 cirkels: 200m (rood), 2km (blauw), 7km (paars)
```

**Waarom deze afstanden?**
- **200m**: Primair foerageergebied (meeste trips)
- **2km**: Regulier foerageergebied
- **7km**: Maximum afstand (bij schaarste)

---

## 3. GBIF API - Plant Observaties

### Wat is GBIF?
**Global Biodiversity Information Facility**
- Wereldwijde database van plant/dier observaties
- 2+ miljard records
- Open data, gratis API
- URL: https://www.gbif.org

### Hoe gebruiken we het?

#### Bestand: `src/components/shared/ApiaryMap.tsx`

```typescript
// Lijn 82-107
async function fetchGbifData() {
  // STAP 1: Bereken bounding box (5km rondom bijenstand)
  const latMin = latitude - 0.05;   // ~5km naar zuiden
  const latMax = latitude + 0.05;   // ~5km naar noorden
  const lngMin = longitude - 0.05;  // ~5km naar westen
  const lngMax = longitude + 0.05;  // ~5km naar oosten
  
  const currentYear = new Date().getFullYear();
  
  // STAP 2: API call naar GBIF
  const url = `https://api.gbif.org/v1/occurrence/search?` +
    `kingdom=Plantae` +                                 // Alleen planten
    `&year=${currentYear}` +                            // Dit jaar
    `&decimalLatitude=${latMin},${latMax}` +           // Latitude range
    `&decimalLongitude=${lngMin},${lngMax}` +          // Longitude range
    `&limit=300` +                                      // Max 300 resultaten
    `&country=BE`;                                      // Alleen België
  
  const response = await fetch(url);
  const data = await response.json();
  
  // STAP 3: Filter en toon op kaart
  setOccurrences(data.results || []);
}
```

### API Response Voorbeeld (GBIF):
```json
{
  "results": [
    {
      "key": 123456789,
      "scientificName": "Trifolium pratense",     // Latijnse naam
      "vernacularName": "Rode klaver",             // Nederlandse naam
      "decimalLatitude": 51.0545,
      "decimalLongitude": 3.7180,
      "eventDate": "2025-07-15",
      "kingdom": "Plantae",
      "family": "Fabaceae",
      "recordedBy": "Jan Janssens"
    }
  ]
}
```

### Wat doen we met de data?

```typescript
// Lijn 53-78: Koppel GBIF data aan Drachtkalender
const isInBloom = (occ: GbifOccurrence): boolean => {
  const currentMonth = new Date().getMonth() + 1; // 1-12
  
  // STAP 1: Zoek plant in drachtkalender via scientific name
  const matchedPlant = DRACHT_PLANTS.find(plant => {
    const plantSci = plant.scientificName.toLowerCase();
    const occSci = occ.scientificName.toLowerCase();
    
    // Match als één naam de andere bevat
    // Bijv. "Malus" matcht "Malus domestica"
    return occSci.includes(plantSci) || plantSci.includes(occSci);
  });
  
  // STAP 2: Check of plant nu in bloei is
  if (matchedPlant) {
    if (matchedPlant.startMonth <= matchedPlant.endMonth) {
      return currentMonth >= matchedPlant.startMonth && 
             currentMonth <= matchedPlant.endMonth;
    }
  }
  
  // STAP 3: Default (april-september = algemeen bloei seizoen)
  return currentMonth >= 4 && currentMonth <= 9;
};

// STAP 4: Toon op kaart met kleurcode
// Groen = in bloei, Grijs = niet in bloei
```

### Visualisatie op kaart:
```typescript
{plantOccurrences.map(occ => (
  <Marker
    key={occ.key}
    longitude={occ.decimalLongitude}
    latitude={occ.decimalLatitude}
  >
    <div style={{
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      backgroundColor: isInBloom(occ) ? '#4CAF50' : '#999'  // Groen of grijs
    }} />
  </Marker>
))}
```

### Popup bij klik:
Toont plant info:
- Nederlandse naam (als beschikbaar)
- Latijnse naam
- Familie
- Bloei status (⚠️ niet in bloei / ✓ in bloei)
- Datum waarneming

---

## 4. WAARNEMINGEN.BE API

### Status: NIET ACTIEF GEÏMPLEMENTEERD
**Belangrijk:** Dit bestand bestaat maar wordt **niet gebruikt** in de app!

#### Bestand: `src/lib/waarnemingen-api.ts`

### Waarom niet gebruikt?
1. **API vereist authenticatie** (API key nodig)
2. **GBIF heeft meer data** (wereldwijd vs. alleen BE/NL)
3. **Gratis tier limiet** bij waarnemingen.be
4. **Backup plan** (kan later geactiveerd worden)

### Hoe zou het werken? (hypothetisch)
```typescript
// Dit is dummy code, werkt niet in productie
const apiUrl = `https://waarnemingen.be/api/v1/observations?` + 
  `min_lat=${minLat}&max_lat=${maxLat}&` +
  `min_lon=${minLon}&max_lon=${maxLon}&` +
  `species=${BEE_FRIENDLY_SPECIES.join(',')}&` +
  `limit=100`;
```

### Wanneer zou je het gebruiken?
- Als je **alleen Belgische data** wilt (meer lokaal)
- Als je **recente waarnemingen** van imkers wilt (community data)
- Voor **specifieke bijenplanten** uit hun database

**Voor je presentatie: Zeg dat het een backup/toekomstige feature is!**

---

## 5. DRACHTKALENDER - Hoe werkt het?

### Wat is het?
Een **statische database** van 60+ planten met bloeiperiodes.

#### Bestand: `src/components/shared/DrachtkalenderSection.tsx`

### Data structuur:
```typescript
// Lijn 5-11
export interface DrachtPlant {
  name: string;                      // "Appel"
  scientificName?: string;           // "Malus"
  startMonth: number;                // 4 (april)
  endMonth: number;                  // 5 (mei)
  color: string;                     // Hex kleur van stuifmeel
  importance: 'high' | 'medium' | 'low';  // Dracht waarde
}
```

### Voorbeeld data:
```typescript
// Lijn 27-37
export const DRACHT_PLANTS: DrachtPlant[] = [
  { 
    name: 'Appel', 
    scientificName: 'Malus', 
    startMonth: 4,      // April
    endMonth: 5,        // Mei
    color: '#FFFFFF',   // Wit stuifmeel
    importance: 'high'  // Belangrijke nectarbron
  },
  { 
    name: 'Esdoorn', 
    scientificName: 'Acer', 
    startMonth: 4, 
    endMonth: 5, 
    color: '#FFFF00',   // Geel stuifmeel
    importance: 'high' 
  },
  // ... 60+ planten
];
```

### Hoe wordt kleur bepaald?

```typescript
// Lijn 14-26: Koppel plant aan stuifmeelkleur
function getColorForPlant(plantName: string): string {
  const normalizedName = plantName.toLowerCase();
  
  // Loop door stuifmeelkleuren database (pollenColors.ts)
  for (const colorGroup of pollenColors) {
    for (const species of colorGroup.species) {
      if (normalizedName.includes(species.toLowerCase())) {
        return colorGroup.hex;  // Return kleur
      }
    }
  }
  
  // Default grijs als geen match
  return '#D3D3D3';
}
```

### pollenColors database:
**Bestand:** `src/lib/pollenColors.ts`

```typescript
export const pollenColors = [
  {
    color: 'Geel',
    hex: '#FFD700',
    species: ['Koolzaad', 'Paardenbloem', 'Wilg', 'Esdoorn', ...]
  },
  {
    color: 'Wit',
    hex: '#FFFFFF',
    species: ['Appel', 'Peer', 'Kers', 'Braam', ...]
  },
  // 12 kleuren totaal
];
```

### Logica: Wat bloeit nu?

```typescript
// Lijn 77-86
const isInSeason = (plant: DrachtPlant) => {
  const currentMonth = new Date().getMonth() + 1; // 1-12
  
  if (plant.startMonth <= plant.endMonth) {
    // Normale periode (bijv. april-juni)
    return currentMonth >= plant.startMonth && 
           currentMonth <= plant.endMonth;
  } else {
    // Overwinter periode (bijv. december-februari)
    return currentMonth >= plant.startMonth || 
           currentMonth <= plant.endMonth;
  }
};
```

### Visualisatie:

```typescript
// Lijn 107-149: Tabel met bloeiperiode balken
<table>
  <thead>
    <tr>
      <th>Plant</th>
      <th>Jan</th><th>Feb</th>...<th>Dec</th>
    </tr>
  </thead>
  <tbody>
    {DRACHT_PLANTS.map(plant => (
      <tr>
        <td>{plant.name}</td>
        {MONTHS.map((_, monthIdx) => {
          const month = monthIdx + 1;
          const isActive = (
            month >= plant.startMonth && 
            month <= plant.endMonth
          );
          
          return (
            <td>
              {isActive && (
                <div 
                  className="drachtkalender__bloom-indicator"
                  style={{ backgroundColor: plant.color }}  // Gekleurde balk
                />
              )}
            </td>
          );
        })}
      </tr>
    ))}
  </tbody>
</table>
```

### Voorbeeld visualisatie:
```
Plant          Jan Feb Mrt Apr Mei Jun Jul Aug Sep Okt Nov Dec
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Appel                      ███ ███
Esdoorn                    ███ ███
Koolzaad                   ███ ███ ███
Paardenbloem           ███ ███ ███ ███ ███ ███ ███ ███
Linde                              ███ ███
```

**Legend:**
- ███ = Gekleurde balk (kleur = stuifmeelkleur)
- Huidige maand = highlighted

---

## 6. KOPPELING: GBIF ↔ DRACHTKALENDER

### Hoe werkt de koppeling?

**Scenario:** GBIF vindt "Rode klaver" (Trifolium pratense) op kaart

**STAP 1:** Check of plant in drachtkalender staat
```typescript
const matchedPlant = DRACHT_PLANTS.find(plant => {
  // Vergelijk wetenschappelijke namen
  const plantSci = plant.scientificName.toLowerCase();  // "trifolium"
  const occSci = occ.scientificName.toLowerCase();      // "trifolium pratense"
  
  // Match als één de andere bevat
  return occSci.includes(plantSci) || plantSci.includes(occSci);
});
```

**STAP 2:** Als match → gebruik drachtkalender bloeiperiode
```typescript
if (matchedPlant) {
  // Gebruik startMonth en endMonth uit drachtkalender
  return currentMonth >= matchedPlant.startMonth && 
         currentMonth <= matchedPlant.endMonth;
}
```

**STAP 3:** Toon met juiste kleur op kaart
```typescript
<Marker>
  <div style={{
    backgroundColor: isInBloom(occ) 
      ? '#4CAF50'  // Groen = in bloei
      : '#999'     // Grijs = niet in bloei
  }} />
</Marker>
```

### Voorbeeld flow:
```
GBIF data: "Trifolium pratense" (lat: 51.05, lng: 3.72)
       ↓
Zoek in DRACHT_PLANTS → gevonden! "Klaver (Witte)"
       ↓
startMonth: 5, endMonth: 10
       ↓
Huidige maand: 7 (juli)
       ↓
7 >= 5 && 7 <= 10 → TRUE → IN BLOEI
       ↓
Toon groene marker op kaart
```

### Waarom deze koppeling?
1. **GBIF** geeft **locatie** van planten
2. **Drachtkalender** geeft **bloeiperiode**
3. **Samen**: "Deze plant bloeit NU op 2km van je bijenstand!"

---

## 7. SAMENVATTING VOOR PRESENTATIE

### Mapbox
**Vraag:** "Hoe werkt de geocoding?"
**Antwoord:** 
- Gebruiker typt adres
- API call naar Mapbox met adres
- Mapbox geeft GPS coördinaten terug
- Fallback naar Nominatim (gratis) als Mapbox niet werkt
- Toon locatie op interactieve satelliet kaart

### GBIF
**Vraag:** "Wat is GBIF en hoe gebruik je het?"
**Antwoord:**
- GBIF = wereldwijde database van plant observaties
- We halen planten op binnen 5km van bijenstand
- Filter op dit jaar en België
- Toon als markers op kaart
- Groen als in bloei (via drachtkalender), grijs als niet

### Drachtkalender
**Vraag:** "Hoe weet je wanneer planten bloeien?"
**Antwoord:**
- Statische database van 60+ planten
- Elke plant heeft startMonth en endMonth
- Gekoppeld aan stuifmeelkleuren (12 kleuren)
- Visualisatie als tabel met gekleurde balken
- Highlight huidige maand

### Koppeling
**Vraag:** "Hoe werk GBIF en drachtkalender samen?"
**Antwoord:**
- GBIF geeft **locaties** van planten
- Drachtkalender geeft **bloeiperiodes**
- We matchen op wetenschappelijke naam
- Als match: gebruik bloeiperiode om te checken of plant NU bloeit
- Toon met juiste kleur (groen/grijs) op kaart

### Waarnemingen.be
**Vraag:** "Gebruiken jullie waarnemingen.be?"
**Antwoord:**
- Nee, momenteel niet actief
- Bestand bestaat als backup/toekomstige feature
- GBIF heeft meer data en is makkelijker te gebruiken
- Kan later geactiveerd worden voor lokale data

---

## 8. CODE LOCATIES (CHEAT SHEET)

### Geocoding (Mapbox/Nominatim)
- **File:** `src/components/forms/ApiaryForm.tsx`
- **Functie:** `geocodeAddress()` (lijn 122-186)
- **GPS:** `getCurrentLocation()` (lijn 54-100)

### Interactieve Kaart
- **File:** `src/components/forms/InteractiveApiaryMap.tsx`
- **Draggable marker:** Lijn 62-72

### GBIF API
- **File:** `src/components/shared/ApiaryMap.tsx`
- **Fetch functie:** `fetchGbifData()` (lijn 84-107)
- **Bloom check:** `isInBloom()` (lijn 54-78)

### Drachtkalender
- **File:** `src/components/shared/DrachtkalenderSection.tsx`
- **Data:** `DRACHT_PLANTS` (lijn 27-67)
- **Check functie:** `isInSeason()` (lijn 77-86)
- **Visualisatie:** Lijn 107-174

### Stuifmeelkleuren
- **File:** `src/lib/pollenColors.ts`
- **Data:** `pollenColors` array met 12 kleuren

### Waarnemingen.be (NIET ACTIEF)
- **File:** `src/lib/waarnemingen-api.ts`
- **Status:** Niet gebruikt in productie

---

## 9. VEELGESTELDE VRAGEN

### Q: Waarom Mapbox en niet alleen Google Maps?
**A:** Mapbox is goedkoper (100k gratis requests), customizable satellite views, en betere privacy. Google Maps is duurder en vereist credit card.

### Q: Wat als Mapbox token niet werkt?
**A:** Automatische fallback naar Nominatim (OpenStreetMap). App blijft werken, alleen iets minder nauwkeurig.

### Q: Waarom GBIF en niet waarnemingen.be?
**A:** GBIF heeft meer data (wereldwijd), geen API key nodig, en beter gedocumenteerd. Waarnemingen.be is backup optie.

### Q: Hoe actueel is de GBIF data?
**A:** We filteren op `year=${currentYear}`, dus alleen observaties van dit jaar. GBIF update dagelijks.

### Q: Klopt de drachtkalender voor heel België?
**A:** Nee, het is een algemene kalender. Bloeiperiode verschilt per regio (klimaat). Daarom kan gebruiker custom periodes toevoegen via ApiaryPlant tabel.

### Q: Waarom 3 cirkels (200m, 2km, 7km)?
**A:** Gebaseerd op onderzoek:
- 200m = 80% van trips
- 2km = 95% van trips  
- 7km = absolute maximum (bij schaarste)

### Q: Hoe weet je welke kleur stuifmeel een plant heeft?
**A:** Gebaseerd op imker kennis en literatuur. Gekoppeld aan pollenColors.ts database. Niet 100% wetenschappelijk maar representatief.

---

