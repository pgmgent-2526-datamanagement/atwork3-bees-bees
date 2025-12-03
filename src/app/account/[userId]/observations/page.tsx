import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/client";

export const dynamic = "force-dynamic";

export default async function AccountObservationsPage() {
  const session = await getServerSession();
  if (!session?.user?.email) redirect("/auth/login");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      apiaries: {
        include: {
          hives: {
            include: {
              observations: {
                orderBy: {
                  createdAt: "desc",
                },
              },
            },
          },
        },
      },
    },
  });

  if (!user) redirect("/auth/login");

  const allObservations = user.apiaries.flatMap((apiary) =>
    apiary.hives.flatMap((hive) =>
      hive.observations.map((observation) => ({
        ...observation,
        hiveName: hive.type,
        hiveId: hive.id,
        apiaryName: apiary.name,
        apiaryId: apiary.id,
      }))
    )
  );

  return (
    <section className="section section--standard bg-alt">
      <div className="container">
        <div className="page-header">
          <h1 className="title">Mijn observaties</h1>
        </div>

        {allObservations.length > 0 ? (
          <div className="hives-list">
            {allObservations.map((observation) => (
              <Link
                key={observation.id}
                href={`/account/apiaries/${observation.apiaryId}/hives/${observation.hiveId}/observations/${observation.id}`}
                className="hive-card hive-card--link"
              >
                <div className="hive-card__header">
                  <h3 className="card__title">{observation.hiveName}</h3>
                  <span className="badge badge--secondary">
                    {new Date(observation.createdAt).toLocaleDateString(
                      "nl-BE",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </span>
                </div>
                <p className="card__text text-secondary">
                  Bijenstand: {observation.apiaryName}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h2 className="section__title">Nog geen observaties</h2>
            <p className="text-secondary mb-lg">
              Begin met het toevoegen van observaties aan uw kasten
            </p>
            <Link
              href="/account/apiaries"
              className="button button--primary button--large"
            >
              Naar bijenstanden
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
