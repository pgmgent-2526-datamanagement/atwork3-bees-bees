import { prisma } from '@/lib/client';
import ObservationsFilter from '@/components/shared/ObservationsFilter';
import Link from 'next/link';

export default async function AdminObservationsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string; color?: string }>;
}) {
  const searchParamsResult = await searchParams;
  const currentPage = Number(searchParamsResult?.page ?? '1');
  const search = searchParamsResult?.search ?? '';
  const colorFilter = searchParamsResult?.color ?? '';
  const observationsPerPage = 5;

  // Build dynamic where clause based on search parameters
  const whereClause: any = {};

  // Add search filter
  if (search) {
    whereClause.OR = [
      {
        notes: {
          contains: search,
          mode: 'insensitive',
        },
      },
      {
        hive: {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
      },
      {
        hive: {
          apiary: {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
        },
      },
    ];
  }

  // Add color filter
  if (colorFilter) {
    whereClause.pollenColor = colorFilter;
  }

  const totalObservations = await prisma.observation.count({
    where: whereClause,
  });
  const totalPages = Math.ceil(totalObservations / observationsPerPage);

  // Get all unique colors for filter dropdown
  const allColors = await prisma.observation.findMany({
    select: { pollenColor: true },
    distinct: ['pollenColor'],
  });

  const observations = await prisma.observation.findMany({
    where: whereClause,
    skip: (currentPage - 1) * observationsPerPage,
    take: observationsPerPage,
    include: {
      hive: {
        include: {
          apiary: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="page-header__top">
            <h1 className="heading-primary">Alle waarnemingen</h1>
            <p className="page-header__subtitle">
              Totaal: {totalObservations} {totalObservations === 1 ? 'waarneming' : 'waarnemingen'}
              {search && ` (gefilterd op "${search}")`}
              {colorFilter && ` (kleur: ${colorFilter})`}
            </p>
          </div>
        </div>
      </section>

      <section className="section ">
        <div className="container">
          <ObservationsFilter
            observations={observations}
            showHive={true}
            showApiary={true}
            showUser={true}
            currentPage={currentPage}
            totalPages={totalPages}
            currentPath={'/admin/observations'}
            search={search}
            colorFilter={colorFilter}
            allColors={allColors.map(c => c.pollenColor)}
          />
        </div>
      </section>
    </>
  );
}
