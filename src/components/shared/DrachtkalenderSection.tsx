'use client';

import { pollenColors } from '@/lib/pollenColors';

export interface DrachtPlant {
  name: string;
  scientificName?: string;
  startMonth: number; // 1-12
  endMonth: number; // 1-12
  color: string;
  importance: 'high' | 'medium' | 'low'; // nectar/stuifmeel waarde
}

// Helper functie om kleur te vinden op basis van plantnaam
function getColorForPlant(plantName: string): string {
  const normalizedName = plantName.toLowerCase().replace(/\s*\(.*?\)\s*/g, '').trim();
  
  for (const colorGroup of pollenColors) {
    for (const species of colorGroup.species) {
      if (normalizedName.includes(species.toLowerCase()) || species.toLowerCase().includes(normalizedName)) {
        return colorGroup.hex;
      }
    }
  }
  
  // Default kleur als geen match
  return '#D3D3D3';
}

export const DRACHT_PLANTS: DrachtPlant[] = [
  { name: 'Aalbes', scientificName: 'Ribes', startMonth: 4, endMonth: 5, color: getColorForPlant('Aalbes'), importance: 'medium' as const },
  { name: 'Aardbei', scientificName: 'Fragaria', startMonth: 4, endMonth: 6, color: getColorForPlant('Aardbei'), importance: 'medium' as const },
  { name: 'Akelei', scientificName: 'Aquilegia', startMonth: 5, endMonth: 7, color: getColorForPlant('Akelei'), importance: 'low' as const },
  { name: 'Appel', scientificName: 'Malus', startMonth: 4, endMonth: 5, color: getColorForPlant('Appel'), importance: 'high' as const },
  { name: 'Aster', scientificName: 'Aster', startMonth: 8, endMonth: 10, color: getColorForPlant('Aster'), importance: 'medium' as const },
  { name: 'Bernagie', scientificName: 'Borago officinalis', startMonth: 6, endMonth: 9, color: getColorForPlant('Bernagie'), importance: 'medium' as const },
  { name: 'Braam', scientificName: 'Rubus', startMonth: 6, endMonth: 8, color: getColorForPlant('Braam'), importance: 'medium' as const },
  { name: 'Brem', scientificName: 'Cytisus', startMonth: 5, endMonth: 6, color: getColorForPlant('Brem'), importance: 'medium' as const },
  { name: 'Els', scientificName: 'Alnus', startMonth: 2, endMonth: 3, color: getColorForPlant('Els'), importance: 'medium' as const },
  { name: 'Esdoorn', scientificName: 'Acer', startMonth: 4, endMonth: 5, color: getColorForPlant('Esdoorn'), importance: 'high' as const },
  { name: 'Facelia', scientificName: 'Phacelia tanacetifolia', startMonth: 6, endMonth: 9, color: getColorForPlant('Facelia'), importance: 'high' as const },
  { name: 'Guldenroede', scientificName: 'Solidago', startMonth: 7, endMonth: 10, color: getColorForPlant('Guldenroede'), importance: 'medium' as const },
  { name: 'Hazelaar', scientificName: 'Corylus avellana', startMonth: 1, endMonth: 3, color: getColorForPlant('Hazelaar'), importance: 'high' as const },
  { name: 'Heide', scientificName: 'Calluna vulgaris', startMonth: 8, endMonth: 9, color: getColorForPlant('Heide'), importance: 'high' as const },
  { name: 'Helenium', scientificName: 'Helenium', startMonth: 7, endMonth: 9, color: getColorForPlant('Helenium'), importance: 'low' as const },
  { name: 'Kers', scientificName: 'Prunus avium', startMonth: 4, endMonth: 5, color: getColorForPlant('Kers'), importance: 'high' as const },
  { name: 'Klaproos', scientificName: 'Papaver rhoeas', startMonth: 5, endMonth: 8, color: getColorForPlant('Klaproos'), importance: 'medium' as const },
  { name: 'Klaver (Witte)', scientificName: 'Trifolium repens', startMonth: 5, endMonth: 10, color: getColorForPlant('Klaver'), importance: 'high' as const },
  { name: 'Kogeldistel', scientificName: 'Echinops', startMonth: 7, endMonth: 9, color: getColorForPlant('Kogeldistel'), importance: 'medium' as const },
  { name: 'Koningskaars', scientificName: 'Verbascum', startMonth: 6, endMonth: 9, color: getColorForPlant('Koningskaars'), importance: 'low' as const },
  { name: 'Koolzaad', scientificName: 'Brassica napus', startMonth: 4, endMonth: 6, color: getColorForPlant('Koolzaad'), importance: 'high' as const },
  { name: 'Maïs', scientificName: 'Zea mays', startMonth: 7, endMonth: 9, color: getColorForPlant('Maïs'), importance: 'low' as const },
  { name: 'Meidoorn', scientificName: 'Crataegus', startMonth: 5, endMonth: 6, color: getColorForPlant('Meidoorn'), importance: 'medium' as const },
  { name: 'Paardenbloem', scientificName: 'Taraxacum', startMonth: 3, endMonth: 10, color: getColorForPlant('Paardenbloem'), importance: 'high' as const },
  { name: 'Paardenkastanje', scientificName: 'Aesculus', startMonth: 4, endMonth: 5, color: getColorForPlant('Paardenkastanje'), importance: 'medium' as const },
  { name: 'Peer', scientificName: 'Pyrus', startMonth: 4, endMonth: 5, color: getColorForPlant('Peer'), importance: 'high' as const },
  { name: 'Raapzaad', scientificName: 'Brassica rapa', startMonth: 4, endMonth: 6, color: getColorForPlant('Raapzaad'), importance: 'medium' as const },
  { name: 'Sneeuwbes', scientificName: 'Symphoricarpos', startMonth: 5, endMonth: 7, color: getColorForPlant('Sneeuwbes'), importance: 'low' as const },
  { name: 'Sneeuwklokje', scientificName: 'Galanthus', startMonth: 1, endMonth: 3, color: getColorForPlant('Sneeuwklokje'), importance: 'low' as const },
  { name: 'Stekelbes', scientificName: 'Ribes uva-crispa', startMonth: 4, endMonth: 5, color: getColorForPlant('Stekelbes'), importance: 'medium' as const },
  { name: 'Tulp', scientificName: 'Tulipa', startMonth: 4, endMonth: 5, color: getColorForPlant('Tulp'), importance: 'low' as const },
  { name: 'Wederik', scientificName: 'Lythrum', startMonth: 6, endMonth: 9, color: getColorForPlant('Wederik'), importance: 'medium' as const },
  { name: 'Wilgensoorten', scientificName: 'Salix', startMonth: 3, endMonth: 4, color: getColorForPlant('Wilgensoorten'), importance: 'high' as const },
  { name: 'Winterlinde', scientificName: 'Tilia cordata', startMonth: 6, endMonth: 7, color: getColorForPlant('Winterlinde'), importance: 'high' as const },
  { name: 'Witte steenklaver', scientificName: 'Melilotus albus', startMonth: 6, endMonth: 9, color: getColorForPlant('Witte steenklaver'), importance: 'high' as const },
  { name: 'Zomerlinde', scientificName: 'Tilia platyphyllos', startMonth: 6, endMonth: 7, color: getColorForPlant('Zomerlinde'), importance: 'high' as const },
  { name: 'Zonnebloem', scientificName: 'Helianthus annuus', startMonth: 7, endMonth: 10, color: getColorForPlant('Zonnebloem'), importance: 'high' as const },
].sort((a, b) => a.name.localeCompare(b.name, 'nl'));

const MONTHS = ['Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];

export default function DrachtkalenderSection() {
  const currentMonth = new Date().getMonth() + 1; // 1-12

  const isInSeason = (plant: DrachtPlant) => {
    if (plant.startMonth <= plant.endMonth) {
      return currentMonth >= plant.startMonth && currentMonth <= plant.endMonth;
    } else {
      // Overwinter (bijv. december-februari)
      return currentMonth >= plant.startMonth || currentMonth <= plant.endMonth;
    }
  };

  const activePlants = DRACHT_PLANTS.filter(isInSeason);

  return (
    <div className="drachtkalender">
      {activePlants.length > 0 && (
        <div className="drachtkalender__current-bloom">
          <h4 className="drachtkalender__current-title">
            Nu in bloei ({MONTHS[currentMonth - 1]})
          </h4>
          <div className="drachtkalender__plant-tags">
            {activePlants.map(plant => (
              <span 
                key={plant.name}
                className="drachtkalender__plant-tag"
                style={{ backgroundColor: plant.color }}
              >
                {plant.name}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="drachtkalender__table-wrapper">
        <table className="drachtkalender__table">
          <thead>
            <tr>
              <th>Plant</th>
              {MONTHS.map((month, idx) => (
                <th 
                  key={month}
                  className={idx + 1 === currentMonth ? 'drachtkalender__th--current-month' : ''}
                >
                  {month}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DRACHT_PLANTS.map((plant) => {
              const inSeason = isInSeason(plant);
              return (
                <tr 
                  key={plant.name}
                  className={inSeason ? 'drachtkalender__tr--in-season' : ''}
                >
                  <td>
                    <div className="drachtkalender__plant-cell">
                      <div className={inSeason ? 'drachtkalender__plant-name--in-season' : 'drachtkalender__plant-name'}>
                        {plant.name}
                      </div>
                      {plant.scientificName && (
                        <div className="drachtkalender__plant-scientific">
                          {plant.scientificName}
                        </div>
                      )}
                    </div>
                  </td>
                  {MONTHS.map((_, monthIdx) => {
                    const month = monthIdx + 1;
                    let isActive = false;
                    
                    if (plant.startMonth <= plant.endMonth) {
                      isActive = month >= plant.startMonth && month <= plant.endMonth;
                    } else {
                      isActive = month >= plant.startMonth || month <= plant.endMonth;
                    }

                    return (
                      <td 
                        key={monthIdx}
                        className={month === currentMonth ? 'drachtkalender__month-cell drachtkalender__month-cell--current' : 'drachtkalender__month-cell'}
                      >
                        {isActive && (
                          <div 
                            className="drachtkalender__bloom-indicator"
                            style={{ backgroundColor: plant.color }}
                          />
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
