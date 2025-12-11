import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/client";
import { authOptions } from "@/lib/auth-options";
import { Hero, Section } from "@/components/layout";
import { Button, Card } from "@/components/ui";
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
      />

      <Section variant="default" spacing="large">
        <div className="container">
          {isNewUser && (
            <div className="section-header">
              <h2>Begin met uw digitale bijenlogboek</h2>
              <p>
                In drie eenvoudige stappen start u met digitaal bijenhouden.
              </p>
            </div>
          )}

          <div className="grid grid-3">
            <Link href="/apiaries">
              <Card>
                <Card.Header>
                  <div className="card-icon">
                    <MapPin size={20} strokeWidth={1.5} />
                  </div>
                  <Card.Title>({totalApiaries}) Bijenstanden</Card.Title>
                </Card.Header>
                <Card.Content>
                  {isNewUser && totalApiaries === 0 && (
                    <div className="new-user-hint">
                      <MapPin size={14} strokeWidth={2} />
                      <span>Start hier</span>
                    </div>
                  )}
                </Card.Content>
              </Card>
            </Link>

            <Link href="/hives">
              <Card>
                <Card.Header>
                  <div className="card-icon">
                    <Box size={20} strokeWidth={1.5} />
                  </div>
                  <Card.Title>({totalHives}) Bijenkasten</Card.Title>
                </Card.Header>
                <Card.Content>
                  {isNewUser && totalHives === 0 && (
                    <div className="new-user-hint">
                      <span>Voeg eerst bijenstand toe</span>
                    </div>
                  )}
                </Card.Content>
              </Card>
            </Link>

            <Link href="/observations">
              <Card>
                <Card.Header>
                  <div className="card-icon">
                    <Eye size={20} strokeWidth={1.5} />
                  </div>
                  <Card.Title>({totalObservations}) Observaties</Card.Title>
                </Card.Header>
                <Card.Content>
                  {isNewUser && totalObservations === 0 && (
                    <div className="new-user-hint">
                      <span>Voeg eerst kasten toe</span>
                    </div>
                  )}
                </Card.Content>
              </Card>
            </Link>
          </div>
        </div>
      </Section>

      <Section variant="alt" spacing="large">
        <div className="container">
          <div className="section-header">
            <h2>Snelle acties</h2>
            <p>Voeg snel nieuwe gegevens toe aan uw bijenlogboek</p>
          </div>

          <div className="grid grid-3">
            <Link href="/apiaries/new">
              <Card>
                <Card.Header>
                  <Card.Title>+ Bijenstand</Card.Title>
                </Card.Header>
                <Card.Content>
                  <Card.Description>
                    Voeg een nieuwe locatie toe voor uw bijenkasten
                  </Card.Description>
                </Card.Content>
              </Card>
            </Link>

            <Link href="/apiaries">
              <Card>
                <Card.Header>
                  <Card.Title>+ Kast</Card.Title>
                </Card.Header>
                <Card.Content>
                  <Card.Description>
                    Registreer een nieuwe bijenkast bij een bijenstand
                  </Card.Description>
                </Card.Content>
              </Card>
            </Link>

            <Link href="/observations/new">
              <Card>
                <Card.Header>
                  <Card.Title>+ Observatie</Card.Title>
                </Card.Header>
                <Card.Content>
                  <Card.Description>
                    Maak een nieuwe waarneming bij één van uw kasten
                  </Card.Description>
                </Card.Content>
              </Card>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
