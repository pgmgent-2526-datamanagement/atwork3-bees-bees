import { prisma } from '@/lib/client';
import ObservationsTable from '@/components/admin/ObservationsTable';
import Link from 'next/link';

export default async function AdminObservationsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const searchParamsResult = await searchParams;
  const currentPage = Number(searchParamsResult?.page ?? '1');
  const observationsPerPage = 5;
  const totalPages = Math.ceil(
    (await prisma.observation.count()) / observationsPerPage
  );
  const observations = await prisma.observation.findMany({
    skip: (currentPage - 1) * observationsPerPage,
    take: observationsPerPage,
    include: {
      hive: {
        include: {
          apiary: { include: { user: true } },
        },
      },
    },
  });

  return (
    <div style={{ marginTop: '6rem' }}>
      <Link href="/admin/">Naar startpagina beheerder</Link>
      <ObservationsTable
        observations={observations}
        showHive={true}
        showApiary={true}
        showUser={true}
        currentPage={currentPage}
        totalPages={totalPages}
        currentPath={'/admin/observations'}
      />
    </div>
  );
}
