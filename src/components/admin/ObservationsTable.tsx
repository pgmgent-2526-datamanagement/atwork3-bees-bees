import { Observation, Hive, Apiary, User } from '@prisma/client';
import Link from 'next/link';

interface ObservationsTableProps {
  observations: Array<
    Observation & {
      hive?: Hive & {
        apiary?: Apiary & { user?: User };
      };
    }
  >;
  showHive?: boolean;
  showApiary?: boolean;
  showUser?: boolean;
  currentPath?: string;
  currentPage: number;
  totalPages: number;
}

export default function ObservationsTable({
  observations,
  showHive = true,
  showApiary = true,
  showUser = true,
  currentPath,
  currentPage,
  totalPages,
}: ObservationsTableProps) {
  return (
    <>
      <table className="table" style={{ marginTop: '6rem' }}>
        <thead>
          <tr>
            <th>Aantal bijen</th>
            <th>Stuifmeel kleur</th>
            <th>Notities</th>
            {showHive && <th>Kast</th>}
            {showApiary && <th>Bijenstand</th>}
            {showUser && <th>Eigenaar</th>}
            <th>Aangemaakt</th>
          </tr>
        </thead>
        <tbody>
          {observations.map(observation => (
            <tr key={observation.id}>
              <td>{observation.beeCount}</td>
              <td>{observation.pollenColor}</td>
              <td>{observation.notes || '-'}</td>
              {showHive && observation.hive && (
                <td>
                  <Link href={`/admin/hives/${observation.hive.id}`}>
                    {observation.hive.name}
                  </Link>
                </td>
              )}
              {showApiary && observation.hive?.apiary && (
                <td>
                  <Link href={`/admin/apiaries/${observation.hive.apiary.id}`}>
                    {observation.hive.apiary.name}
                  </Link>
                </td>
              )}
              {showUser && observation.hive?.apiary?.user && (
                <td>
                  <Link href={`/admin/users/${observation.hive.apiary.userId}`}>
                    {observation.hive.apiary.user.name}
                  </Link>
                </td>
              )}
              <td>
                {new Date(observation.createdAt).toLocaleDateString('nl-BE')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 'var(--space-4)',
            marginTop: 'var(--space-12)',
          }}
        >
          <Link
            href={`${currentPath}?page=${
              currentPage > 1 ? currentPage - 1 : 1
            }`}
          >
            <button className="btn btn--secondary" disabled={currentPage === 1}>
              Vorige
            </button>
          </Link>
          <span style={{ color: 'var(--color-text-light)' }}>
            Pagina {currentPage} van {totalPages}
          </span>
          <Link
            href={`${currentPath}?page=${
              currentPage < totalPages ? currentPage + 1 : totalPages
            }`}
          >
            <button
              className="btn btn--secondary"
              disabled={currentPage === totalPages}
            >
              Volgende
            </button>
          </Link>
        </div>
      )}
    </>
  );
}
