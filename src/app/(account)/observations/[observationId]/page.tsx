import prisma from '@/lib/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth-options';
import { redirect } from 'next/navigation';
import DeleteEntityButton from '@/components/shared/DeleteEntityButton';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Observation({
  params,
}: {
  params: Promise<{ observationId: string }>;
}) {
  const session = await getServerSession(authOptions);
  const { observationId } = await params;
  const observation = await prisma.observation.findUnique({
    where: { id: parseInt(observationId) },
    include: {
      hive: {
        include: { apiary: true },
      },
    },
  });
  if (!observation) {
    redirect('/not-found');
  }
  if (
    observation.hive.apiary.userId !== session?.user.id &&
    session?.user.role !== 'ADMIN'
  ) {
    redirect('/unauthorized');
  }

  return (
    <>
      <section className="page-header" data-page="03">
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <h1 className="page-header__title">Observatie</h1>
              <p className="page-header__subtitle">
                {observation.hive.name} • {observation.hive.apiary.name} • {new Date(observation.createdAt).toLocaleDateString('nl-BE')}
              </p>
            </div>
            <div style={{ display: "flex", gap: "var(--space-3)" }}>
              <Link href={`/observations/${observationId}/edit`}>
                <button className="btn btn--secondary">
                  Wijzig observatie
                </button>
              </Link>
              {observation && (
                <DeleteEntityButton
                  id={observation.id}
                  type="observation"
                  label="Verwijder"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--default">
        <div className="container container--narrow">
          <div className="card" style={{ marginBottom: "var(--space-8)" }}>
            <div style={{ marginBottom: "var(--space-6)" }}>
              <p style={{ 
                fontSize: "0.875rem",
                color: "var(--color-text-light)",
                marginBottom: "var(--space-2)"
              }}>
                Datum en tijd
              </p>
              <p style={{ 
                fontFamily: "var(--font-display)",
                fontSize: "1.125rem"
              }}>
                {new Date(observation.createdAt).toLocaleDateString('nl-BE', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })} om {new Date(observation.createdAt).toLocaleTimeString('nl-BE', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>

            <div style={{ marginBottom: "var(--space-6)" }}>
              <p style={{ 
                fontSize: "0.875rem",
                color: "var(--color-text-light)",
                marginBottom: "var(--space-2)"
              }}>
                Aantal bijen
              </p>
              <p style={{ 
                fontFamily: "var(--font-display)",
                fontSize: "1.125rem"
              }}>
                {observation.beeCount} bijen
              </p>
            </div>

            <div style={{ marginBottom: "var(--space-6)" }}>
              <p style={{ 
                fontSize: "0.875rem",
                color: "var(--color-text-light)",
                marginBottom: "var(--space-2)"
              }}>
                Stuifmeelkleur
              </p>
              <p style={{ 
                fontFamily: "var(--font-display)",
                fontSize: "1.125rem"
              }}>
                {observation.pollenColor}
              </p>
            </div>

            {observation.notes && (
              <div>
                <p style={{ 
                  fontSize: "0.875rem",
                  color: "var(--color-text-light)",
                  marginBottom: "var(--space-2)"
                }}>
                  Notities
                </p>
                <p style={{ 
                  fontSize: "0.9375rem",
                  lineHeight: "1.6"
                }}>
                  {observation.notes}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
