import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/client";
import { hasAccess } from "@/lib/auth-helpers";
import { authOptions } from "@/lib/auth-options";
import Hero from "@/components/magazine/Hero";
import Section from "@/components/magazine/Section";
import Button from "@/components/magazine/Button";
import Card from "@/components/magazine/Card";

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

  const hasApiaries = user.apiaries.length > 0;
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
    <>
      {/* Hero Section */}
      <Hero
        title={`Hallo ${user.name}`}
        subtitle="Hier kan je alles beheren"
        text="Beheer je bijenstanden, kasten en observaties op één overzichtelijk platform."
        image="/assets/hero-new.jpg"
        imageAlt="Bijenhouden"
      />

      {/* How it works Section */}
      <Section variant="cream" size="lg">
        <div className="text-center mb-12">
          <h2
            className="text-display text-3xl mb-4"
            style={{ fontWeight: "400", color: "var(--color-primary)" }}
          >
            Zo werkt dit
          </h2>
          <p
            className="text-base"
            style={{
              maxWidth: "700px",
              margin: "0 auto",
              color: "var(--color-secondary)",
            }}
          >
            Jouw platform voor efficiënt bijenbeheer
          </p>
        </div>

        <div className="grid grid--3">
          <Card
            title="Bijenstanden"
            description="Beheer je locaties waar je bijenkasten staan. Voeg nieuwe bijenstanden toe en houd alles georganiseerd."
            category="LOCATIES"
          />
          <Card
            title="Kasten"
            description="Registreer je bijenkasten per bijenstand. Volg het type kast en de volksterkte."
            category="REGISTRATIE"
          />
          <Card
            title="Observaties"
            description="Noteer je waarnemingen bij elke kast. Houd bij wat je ziet en registreer belangrijke momenten."
            category="MONITORING"
          />
        </div>
      </Section>

      {/* Stats Section */}
      <Section variant="white" size="lg">
        <div className="text-center mb-12">
          <h2
            className="text-display text-3xl mb-4"
            style={{ fontWeight: "400", color: "var(--color-primary)" }}
          >
            Jouw overzicht
          </h2>
        </div>

        <div className="grid grid--3">
          <div className="card card--elevated">
            <div className="card__content" style={{ textAlign: "center" }}>
              <h3
                className="text-display"
                style={{
                  fontSize: "3rem",
                  fontWeight: "300",
                  color: "var(--color-primary)",
                  marginBottom: "var(--space-3)",
                }}
              >
                {totalApiaries}
              </h3>
              <p
                style={{
                  color: "var(--color-secondary)",
                  marginBottom: "var(--space-6)",
                }}
              >
                Bijenstanden
              </p>
              <Button
                href={`/account/${userId}/apiaries`}
                variant="secondary"
                size="sm"
              >
                Bekijk alle
              </Button>
            </div>
          </div>

          <div className="card card--elevated">
            <div className="card__content" style={{ textAlign: "center" }}>
              <h3
                className="text-display"
                style={{
                  fontSize: "3rem",
                  fontWeight: "300",
                  color: "var(--color-primary)",
                  marginBottom: "var(--space-3)",
                }}
              >
                {totalHives}
              </h3>
              <p
                style={{
                  color: "var(--color-secondary)",
                  marginBottom: "var(--space-6)",
                }}
              >
                Kasten
              </p>
              <Button
                href={`/account/${userId}/hives`}
                variant="secondary"
                size="sm"
              >
                Bekijk alle
              </Button>
            </div>
          </div>

          <div className="card card--elevated">
            <div className="card__content" style={{ textAlign: "center" }}>
              <h3
                className="text-display"
                style={{
                  fontSize: "3rem",
                  fontWeight: "300",
                  color: "var(--color-primary)",
                  marginBottom: "var(--space-3)",
                }}
              >
                {totalObservations}
              </h3>
              <p
                style={{
                  color: "var(--color-secondary)",
                  marginBottom: "var(--space-6)",
                }}
              >
                Observaties
              </p>
              <Button
                href={`/account/${userId}/observations`}
                variant="secondary"
                size="sm"
              >
                Bekijk alle
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Quick Actions Section */}
      <Section variant="cream" size="lg">
        <div className="text-center mb-12">
          <h2
            className="text-display text-3xl mb-4"
            style={{ fontWeight: "400", color: "var(--color-primary)" }}
          >
            Toevoegen
          </h2>
          <p
            className="text-base"
            style={{
              maxWidth: "700px",
              margin: "0 auto",
              color: "var(--color-secondary)",
            }}
          >
            Voeg nieuwe items toe aan je platform
          </p>
        </div>

        <div className="grid grid--3">
          <Link
            href={`/account/${userId}/apiaries/new`}
            className="card card--elevated"
            style={{ textDecoration: "none" }}
          >
            <div className="card__content">
              <span
                className="card__category"
                style={{ color: "var(--color-accent)" }}
              >
                LOCATIE
              </span>
              <h3 className="card__title">+ Bijenstand</h3>
              <p className="card__description">
                Voeg een nieuwe locatie toe waar je bijenkasten staan
              </p>
            </div>
          </Link>

          <Link
            href={`/account/${userId}/apiaries`}
            className="card card--elevated"
            style={{ textDecoration: "none" }}
          >
            <div className="card__content">
              <span
                className="card__category"
                style={{ color: "var(--color-accent)" }}
              >
                KAST
              </span>
              <h3 className="card__title">+ Kast</h3>
              <p className="card__description">
                Registreer een nieuwe bijenkast op een bestaande bijenstand
              </p>
            </div>
          </Link>

          <Link
            href={`/account/${userId}/observations`}
            className="card card--elevated"
            style={{ textDecoration: "none" }}
          >
            <div className="card__content">
              <span
                className="card__category"
                style={{ color: "var(--color-accent)" }}
              >
                WAARNEMING
              </span>
              <h3 className="card__title">+ Observatie</h3>
              <p className="card__description">
                Maak een nieuwe waarneming bij één van je bijenkasten
              </p>
            </div>
          </Link>
        </div>
      </Section>
    </>
  );
}
