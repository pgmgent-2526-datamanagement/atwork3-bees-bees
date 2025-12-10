import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/client";
import { authOptions } from "@/lib/auth-options";
import Hero from "@/components/magazine/Hero";
import Section from "@/components/magazine/Section";
import Button from "@/components/magazine/Button";
import Card from "@/components/magazine/Card";
import { MapPin, Box, Eye } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  // Haal gebruiker op met userId uit params
  const user = await prisma.user.findUnique({
    where: { id: session?.user?.id },
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

  const isNewUser =
    totalApiaries === 0 && totalHives === 0 && totalObservations === 0;

  return (
    <>
      <Hero
        title={`Hallo ${user.name}`}
        subtitle={
          isNewUser
            ? "Welkom bij BEES - Uw digitale platform voor bijenbeheer"
            : "Beheer uw bijenstanden, kasten en observaties"
        }
        image="/assets/hero-new.jpg"
        imageAlt="BEES Platform Account"
        showScroll={false}
      />

      {isNewUser ? (
        // Voor nieuwe gebruikers: uitleg en stappenplan
        <>
          <Section variant="white" size="lg">
            <div
              style={{
                maxWidth: "800px",
                margin: "0 auto",
                textAlign: "center",
              }}
            >
              <h2
                className="text-display text-3xl mb-6"
                style={{ fontWeight: "400", color: "var(--color-primary)" }}
              >
                Begin met uw digitale bijenlogboek
              </h2>
              <p
                className="text-base mb-8"
                style={{
                  color: "var(--color-text-light)",
                  lineHeight: "1.8",
                }}
              >
                BEES helpt u om alle informatie over uw bijenstanden, kasten en
                waarnemingen overzichtelijk bij te houden. In drie eenvoudige
                stappen start u met digitaal bijenhouden.
              </p>
            </div>
          </Section>

          <Section variant="cream" size="lg">
            <div className="grid grid--3">
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    backgroundColor: "var(--color-cream)",
                    border: "2px solid var(--color-accent)",
                    color: "var(--color-accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto var(--space-6)",
                  }}
                >
                  <MapPin size={36} strokeWidth={1.5} />
                </div>
                <h3
                  className="text-display text-xl mb-4"
                  style={{ fontWeight: "600", color: "var(--color-primary)" }}
                >
                  Voeg een bijenstand toe
                </h3>
                <p
                  style={{
                    color: "var(--color-text-light)",
                    lineHeight: "1.6",
                    marginBottom: "var(--space-6)",
                  }}
                >
                  Begin met het registreren van de locatie waar uw bijenkasten
                  staan. Geef deze een herkenbare naam zoals "Tuin" of
                  "Boerderij Janssens".
                </p>
              </div>

              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    backgroundColor: "var(--color-cream)",
                    border: "2px solid var(--color-accent)",
                    color: "var(--color-accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto var(--space-6)",
                  }}
                >
                  <Box size={36} strokeWidth={1.5} />
                </div>
                <h3
                  className="text-display text-xl mb-4"
                  style={{ fontWeight: "600", color: "var(--color-primary)" }}
                >
                  Registreer uw kasten
                </h3>
                <p
                  style={{
                    color: "var(--color-text-light)",
                    lineHeight: "1.6",
                    marginBottom: "var(--space-6)",
                  }}
                >
                  Voeg de bijenkasten toe die op uw bijenstand staan. Noteer het
                  type kast en de sterkte van het volk.
                </p>
              </div>

              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    backgroundColor: "var(--color-cream)",
                    border: "2px solid var(--color-accent)",
                    color: "var(--color-accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto var(--space-6)",
                  }}
                >
                  <Eye size={36} strokeWidth={1.5} />
                </div>
                <h3
                  className="text-display text-xl mb-4"
                  style={{ fontWeight: "600", color: "var(--color-primary)" }}
                >
                  Start met observaties
                </h3>
                <p
                  style={{
                    color: "var(--color-text-light)",
                    lineHeight: "1.6",
                    marginBottom: "var(--space-6)",
                  }}
                >
                  Registreer uw waarnemingen per kast. Houd de gezondheid,
                  activiteit en belangrijke momenten overzichtelijk bij.
                </p>
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: "var(--space-12)" }}>
              <Button href="/apiaries/new" variant="primary" size="lg">
                Start nu - Voeg eerste bijenstand toe
              </Button>
            </div>
          </Section>
        </>
      ) : (
        // Voor bestaande gebruikers: statistieken en acties
        <>
          <Section variant="white" size="lg">
            <div className="text-center mb-12">
              <h2
                className="text-display text-3xl mb-4"
                style={{ fontWeight: "400", color: "var(--color-primary)" }}
              >
                Uw overzicht
              </h2>
            </div>

            <div className="grid grid--3">
              <Link href="/apiaries" style={{ textDecoration: "none" }}>
                <div className="card card--elevated">
                  <div
                    className="card__content"
                    style={{ textAlign: "center" }}
                  >
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
                        color: "var(--color-text-light)",
                        marginBottom: "var(--space-6)",
                      }}
                    >
                      Bijenstanden
                    </p>
                    <Button variant="secondary" size="sm">
                      Bekijk alle
                    </Button>
                  </div>
                </div>
              </Link>

              <Link href="/hives" style={{ textDecoration: "none" }}>
                <div className="card card--elevated">
                  <div
                    className="card__content"
                    style={{ textAlign: "center" }}
                  >
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
                        color: "var(--color-text-light)",
                        marginBottom: "var(--space-6)",
                      }}
                    >
                      Kasten
                    </p>
                    <Button variant="secondary" size="sm">
                      Bekijk alle
                    </Button>
                  </div>
                </div>
              </Link>

              <Link href="/observations" style={{ textDecoration: "none" }}>
                <div className="card card--elevated">
                  <div
                    className="card__content"
                    style={{ textAlign: "center" }}
                  >
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
                        color: "var(--color-text-light)",
                        marginBottom: "var(--space-6)",
                      }}
                    >
                      Observaties
                    </p>
                    <Button variant="secondary" size="sm">
                      Bekijk alle
                    </Button>
                  </div>
                </div>
              </Link>
            </div>
          </Section>

          <Section variant="cream" size="lg">
            <div className="text-center mb-12">
              <h2
                className="text-display text-3xl mb-4"
                style={{ fontWeight: "400", color: "var(--color-primary)" }}
              >
                Snelle acties
              </h2>
            </div>

            <div className="grid grid--3">
              <Link href="/apiaries/new" style={{ textDecoration: "none" }}>
                <Card
                  category="TOEVOEGEN"
                  title="+ Bijenstand"
                  description="Voeg een nieuwe locatie toe voor uw bijenkasten"
                />
              </Link>
              <Link href="/apiaries" style={{ textDecoration: "none" }}>
                <Card
                  category="BEHEREN"
                  title="Bijenstanden beheren"
                  description="Bekijk en wijzig uw bestaande bijenstanden en voeg kasten toe"
                />
              </Link>
              <Link href="/observations/new" style={{ textDecoration: "none" }}>
                <Card
                  category="REGISTREREN"
                  title="+ Observatie"
                  description="Maak een nieuwe waarneming bij één van uw bijenkasten"
                />
              </Link>
            </div>
          </Section>
        </>
      )}
    </>
  );
}
