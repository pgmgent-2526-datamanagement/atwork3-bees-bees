import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/client";
import { hasAccess } from "@/lib/auth-helpers";
import { authOptions } from "@/lib/auth-options";

export const dynamic = "force-dynamic";

export default async function AccountPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  // Check authorization: admin or owner
  if (!hasAccess(session, userId)) {
    redirect("/unauthorized");
  }

  // Haal gebruiker op met userId uit params
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      apiaries: {
        include: {
          hives: {
            include: {
              observations: {
                orderBy: { createdAt: "desc" },
                take: 5,
              },
            },
          },
        },
      },
    },
  });

  if (!user) {
    redirect("/unauthorized");
  }

  const totalApiaries = user.apiaries.length;
  const totalHives = user.apiaries.reduce(
    (sum, apiary) => sum + apiary.hives.length,
    0
  );
  const totalObservations = user.apiaries.reduce(
    (sum, apiary) =>
      sum +
      apiary.hives.reduce(
        (hiveSum, hive) => hiveSum + hive.observations.length,
        0
      ),
    0
  );

  return (
    <section className="section section--standard bg-alt">
      <div className="container">
        {/* Header met welkom */}
        <div className="account-header">
          <h1 className="title">Welkom, {user.name}</h1>
          <p className="text-secondary">
            Beheer uw bijenstanden, kasten en observaties op één plek
          </p>
        </div>

        {/* Statistieken */}
        <div className="stats-grid">
          <Link
            href={`/account/${userId}/apiaries`}
            className="stat-card stat-card--link"
          >
            <h3 className="stat-card__number">{totalApiaries}</h3>
            <p className="stat-card__label">Bijenstanden</p>
          </Link>
          <Link
            href={`/account/${userId}/hives`}
            className="stat-card stat-card--link"
          >
            <h3 className="stat-card__number">{totalHives}</h3>
            <p className="stat-card__label">Kasten</p>
          </Link>
          <Link
            href={`/account/${userId}/observations`}
            className="stat-card stat-card--link"
          >
            <h3 className="stat-card__number">{totalObservations}</h3>
            <p className="stat-card__label">Observaties</p>
          </Link>
        </div>

        {/* Quick actions */}
        <div className="quick-actions">
          <h2 className="section__title">Snelle acties</h2>
          <div className="grid grid--2">
            <Link
              href={`/account/${userId}/apiaries/new`}
              className="action-card"
            >
              <h3 className="card__title">+ Nieuwe kast</h3>
              <p className="card__text">
                Registreer een nieuwe bijenstand met kasten
              </p>
            </Link>
            <Link href={`/account/${userId}/apiaries`} className="action-card">
              <h3 className="card__title">+ Nieuwe observatie</h3>
              <p className="card__text">
                Voeg een waarneming toe aan uw kasten
              </p>
            </Link>
          </div>
        </div>

        {/* Foto grid */}
        <div className="photo-grid">
          <div className="photo-grid__item">
            <Image
              src="/assets/hive-1.jpg"
              alt="Bijenkast"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="photo-grid__item">
            <Image
              src="/assets/hero.jpg"
              alt="Bijenwaarnemingen"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
