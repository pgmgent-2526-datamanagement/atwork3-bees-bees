'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ObservationsTable from '../shared/ObservationsTable';

interface Observation {
  id: number;
  beeCount: number;
  pollenColor: string;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
  hiveId: number;
  hive?: {
    id: number;
    name: string;
    apiary?: {
      id: number;
      name: string;
      userId: string;
      user?: { id: string; name: string };
    };
  };
}

export default function ObservationsFilter({
  observations,
  currentPage,
  totalPages,
  currentPath,
  showHive = true,
  showApiary = true,
  showUser = true,
  search: initialSearch = '',
  colorFilter: initialColorFilter = '',
  allColors = [],
}: {
  observations: Observation[];
  currentPage: number;
  totalPages: number;
  currentPath: string;
  showHive?: boolean;
  showApiary?: boolean;
  showUser?: boolean;
  search?: string;
  colorFilter?: string;
  allColors?: string[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(initialSearch);
  const [colorFilter, setColorFilter] = useState(initialColorFilter);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    params.delete('page'); // Reset to page 1 when filtering
    router.push(`${currentPath}?${params.toString()}`);
  };

  const handleColorChange = (value: string) => {
    setColorFilter(value);
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('color', value);
    } else {
      params.delete('color');
    }
    params.delete('page'); // Reset to page 1 when filtering
    router.push(`${currentPath}?${params.toString()}`);
  };

  // Get all unique colors for the dropdown - use allColors prop
  const colors = allColors.length > 0 ? allColors : [...new Set(observations.map(o => o.pollenColor))];

  return (
    <>
      <div className="section-header">
        {/* <Link href="/admin" className="back-link">
          ←
        </Link> */}
        <div className="filters">
          <input
            type="text"
            placeholder="Zoek op notities of kast..."
            value={search}
            onChange={e => handleSearchChange(e.target.value)}
            className="form__input"
          />

          <select
            value={colorFilter}
            onChange={e => handleColorChange(e.target.value)}
            className="form__select"
          >
            <option value="">Alle kleuren</option>
            {colors.map(color => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ObservationsTable
        observations={observations as any}
        showHive={showHive}
        showApiary={showApiary}
        showUser={showUser}
        currentPage={currentPage}
        totalPages={totalPages}
        currentPath={currentPath}
      />
    </>
  );
}
