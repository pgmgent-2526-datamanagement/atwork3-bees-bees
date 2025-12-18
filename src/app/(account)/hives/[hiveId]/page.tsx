import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import prisma from '@/lib/client';
import { authOptions } from '@/lib/auth-options';
import DeleteEntityButton from '@/components/shared/DeleteEntityButton';

export const dynamic = 'force-dynamic';

export default async function AccountApiaryHivePage({
  params,
  searchParams,
}: {
  params: Promise<{ hiveId: string }>;
  searchParams?: Promise<{ page?: string }>;
}) {
  const { hiveId } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect('/auth/login');

  const hive = await prisma.hive.findUnique({
    where: { id: parseInt(hiveId) },
    include: {
      apiary: true,
    },
  });

  if (!hive) redirect('/account');
  const apiaryId = hive.apiary.id;
  const searchParamsResult = await searchParams;
  const currentPage = parseInt(searchParamsResult?.page ?? '1', 10);
  const totalObservations = await prisma.observation.count({
    where: { hiveId: parseInt(hiveId) },
  });
  const observationsPerPage = 3;
  const totalPages = Math.ceil(totalObservations / observationsPerPage);
  const observations = await prisma.observation.findMany({
    where: { hiveId: parseInt(hiveId) },
    skip: (currentPage - 1) * observationsPerPage,
    take: observationsPerPage,
  });

  return (
    <>
      <section className="page-header" data-page="—">
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <h1 className="page-header__title">{hive.name}</h1>
              <p className="page-header__subtitle">
                {hive.apiary.name} • {totalObservations} {totalObservations === 1 ? 'observatie' : 'observaties'} • {hive.type} • {hive.colonyType}
              </p>
            </div>
            <div style={{ display: "flex", gap: "var(--space-3)" }}>
              <Link href={`/hives/${hive.id}/edit`}>
                <button className="btn btn--secondary">
                  Wijzig kast
                </button>
              </Link>
              {hive && (
                <DeleteEntityButton
                  id={hive.id}
                  type="hive"
                  label="Verwijder"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">

          <div className="grid grid--2" style={{ alignItems: "flex-start", gap: "var(--space-16)" }}>
            <div>
              <h2 style={{ 
                fontFamily: "var(--font-display)",
                fontSize: "1.5rem",
                fontWeight: "500",
                marginBottom: "var(--space-6)"
              }}>
                Locatie details
              </h2>
              <div className="card" style={{ marginBottom: "var(--space-8)" }}>
                <div style={{ marginBottom: "var(--space-4)" }}>
                  <p style={{ 
                    fontSize: "0.875rem",
                    color: "var(--color-text-light)",
                    marginBottom: "var(--space-2)"
                  }}>
                    Coördinaten
                  </p>
                  <p style={{ 
                    fontFamily: "var(--font-display)",
                    fontSize: "1.125rem"
                  }}>
                    {hive.apiary.latitude.toFixed(6)}, {hive.apiary.longitude.toFixed(6)}
                  </p>
                </div>
                <div style={{ marginBottom: "var(--space-4)" }}>
                  <p style={{ 
                    fontSize: "0.875rem",
                    color: "var(--color-text-light)",
                    marginBottom: "var(--space-2)"
                  }}>
                    Drachtgebied
                  </p>
                  <p style={{ fontSize: "0.875rem" }}>
                    Bijen zoeken voedsel binnen 2-7km van deze locatie
                  </p>
                </div>
                <a 
                  href={`https://www.google.com/maps?q=${hive.apiary.latitude},${hive.apiary.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <button className="btn btn--secondary btn--sm" style={{ width: "100%" }}>
                    Open in Google Maps
                  </button>
                </a>
              </div>
            </div>

            <div>
              <div 
                style={{
                  width: "100%",
                  height: "400px",
                  background: "rgba(0, 0, 0, 0.05)",
                  border: "1px solid rgba(0, 0, 0, 0.08)",
                  borderRadius: "8px",
                  overflow: "hidden",
                  position: "relative"
                }}
              >
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${hive.apiary.latitude},${hive.apiary.longitude}&zoom=15&maptype=satellite`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--default">
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-8)" }}>
            <h2 style={{ 
              fontFamily: "var(--font-display)",
              fontSize: "2rem",
              fontWeight: "400"
            }}>
              Observaties bij deze kast
            </h2>
            {observations.length > 0 && (
              <Link href={`/observations/new?hiveId=${hive.id}`}>
                <button className="btn btn--primary">
                  + Nieuwe observatie
                </button>
              </Link>
            )}
          </div>

          {observations.length > 0 ? (
            <>
              <div className="grid grid--2">
                {observations.map(obs => (
                  <Link key={obs.id} href={`/observations/${obs.id}`} style={{ textDecoration: "none" }}>
                    <div className="card" style={{ cursor: "pointer", height: "100%" }}>
                      <p className="card__category">
                        {new Date(obs.createdAt).toLocaleDateString('nl-BE')}
                      </p>
                      <h3 className="card__title">
                        {new Date(obs.createdAt).toLocaleTimeString('nl-BE', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </h3>
                      <div style={{ display: "flex", gap: "var(--space-3)", marginTop: "var(--space-4)" }}>
                        <span className="badge">{obs.beeCount} bijen</span>
                        <span className="badge">{obs.pollenColor}</span>
                      </div>
                      {obs.notes && (
                        <p style={{ 
                          marginTop: "var(--space-4)",
                          fontSize: "0.875rem",
                          color: "var(--color-text-light)",
                          lineHeight: "1.5"
                        }}>
                          {obs.notes}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
              
              {totalPages > 1 && (
                <div style={{ 
                  display: "flex", 
                  justifyContent: "center", 
                  gap: "var(--space-3)",
                  marginTop: "var(--space-12)"
                }}>
                  {currentPage > 1 && (
                    <Link href={`/hives/${hiveId}?page=${currentPage - 1}`}>
                      <button className="btn btn--secondary">← Vorige</button>
                    </Link>
                  )}
                  <span style={{ 
                    display: "flex", 
                    alignItems: "center",
                    padding: "0 var(--space-4)",
                    fontSize: "0.875rem",
                    color: "var(--color-text-light)"
                  }}>
                    Pagina {currentPage} van {totalPages}
                  </span>
                  {currentPage < totalPages && (
                    <Link href={`/hives/${hiveId}?page=${currentPage + 1}`}>
                      <button className="btn btn--secondary">Volgende →</button>
                    </Link>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="card" style={{ textAlign: "center", padding: "var(--space-16)" }}>
              <p style={{ color: "var(--color-text-light)" }}>Nog geen observaties</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
