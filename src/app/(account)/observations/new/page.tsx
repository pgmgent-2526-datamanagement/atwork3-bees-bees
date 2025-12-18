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
      <section className="page-header" data-page="—">
        <div className="container">
          <h1 className="page-header__title">Nieuwe observatie</h1>
          <p className="page-header__subtitle">{hive.type} - {hive.colonyType}</p>
        </div>
      </section>

      <section className="section section--default">
        <div className="container container--narrow">
          <ObservationForm
            hiveId={hiveId}
            hiveName={`${hive.type} - ${hive.colonyType}`}
          />
        </div>
      </section>
    </>
  );
}
