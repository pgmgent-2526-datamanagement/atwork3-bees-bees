import { redirect } from 'next/navigation';
import prisma from '@/lib/client';
import ObservationForm from '@/components/forms/ObservationForm';
import Link from 'next/link';

export default async function AccountApiaryHiveObservationPage({
  searchParams,
}: {
  searchParams: Promise<{ hiveId?: string }>;
}) {
  const { hiveId } = await searchParams;

  if (!hiveId) {
    throw new Error('hiveId is required');
  }

  const hive = await prisma.hive.findUnique({
    where: { id: parseInt(hiveId) },
    select: { type: true, colonyType: true },
  });

  if (!hive) redirect(`/apiaries`);

  return (
    <>
      {/* <Link
        style={{ marginTop: '6rem' }}
        href={`/hives/${hiveId}`}
        className="breadcrumb"
      >
        ← Terug naar kast
      </Link> */}
      <h1 style={{ marginTop: '6rem' }} className="title">
        Nieuwe observatie
      </h1>
      <ObservationForm
        hiveId={hiveId}
        hiveName={`${hive.type} - ${hive.colonyType}`}
      />
    </>
  );
}
