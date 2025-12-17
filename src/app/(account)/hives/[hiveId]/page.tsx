import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/client";
import { authOptions } from "@/lib/auth-options";
import { Hero, Section } from "@/components/layout";
import { Button, Card } from "@/components/ui";
import { Box, Eye, MapPin } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AccountApiaryHivePage({
  params,
}: {
  params: Promise<{ hiveId: string }>;
}) {
  const { hiveId } = await params;

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/auth/login");

  const hive = await prisma.hive.findUnique({
    where: { id: parseInt(hiveId) },
    include: {
      apiary: true,
      observations: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!hive) redirect("/account");

  return (
    <>
      <Hero
        title={hive.name || `${hive.type} - ${hive.colonyType}`}
        subtitle={`Bijenstand: ${hive.apiary.name}`}
        image="/assets/hero-new.jpg"
        imageAlt="Bijenkast details"
      />

      <Section variant="default" spacing="large">
        <div className="container">
          <div style={{ marginBottom: "var(--space-6)" }}>
            <Link
              href={`/apiaries/${hive.apiary.id}`}
              style={{
                color: "var(--color-primary)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--space-2)",
              }}
            >
              ← Terug naar {hive.apiary.name}
            </Link>
          </div>

          <div
            className="grid grid-2"
            style={{ gap: "var(--space-8)", alignItems: "start" }}
          >
            {/* Linker kolom: Kast informatie */}
            <div>
              <Card>
                <Card.Header>
                  <div className="card-icon">
                    <Box size={20} strokeWidth={1.5} />
                  </div>
                  <Card.Title>Kast details</Card.Title>
                </Card.Header>
                <Card.Content>
                  <Card.Description>
                    <strong>Naam:</strong> {hive.name || "Geen naam"}
                  </Card.Description>
                  <Card.Description>
                    <strong>Type kast:</strong> {hive.type}
                  </Card.Description>
                  <Card.Description>
                    <strong>Type volk:</strong> {hive.colonyType}
                  </Card.Description>
                  <Card.Description>
                    <strong>Bijenstand:</strong> {hive.apiary.name}
                  </Card.Description>
                  <Card.Description>
                    <strong>Totaal observaties:</strong>{" "}
                    {hive.observations.length}
                  </Card.Description>
                </Card.Content>
              </Card>
            </div>

            {/* Rechter kolom: Observaties */}
            <div>
              {hive.observations.length > 0 ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "var(--space-4)",
                    }}
                  >
                    <h2 style={{ margin: 0 }}>Recente observaties</h2>
                    <Button
                      href={`/observations/new?hiveId=${hive.id}`}
                      variant="primary"
                      size="medium"
                    >
                      + Nieuwe observatie
                    </Button>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "var(--space-4)",
                    }}
                  >
                    {hive.observations.map((obs) => (
                      <Card key={obs.id}>
                        <Card.Header>
                          <div className="card-icon">
                            <Eye size={20} strokeWidth={1.5} />
                          </div>
                          <Card.Title>
                            {new Date(obs.createdAt).toLocaleDateString(
                              "nl-BE",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </Card.Title>
                        </Card.Header>
                        <Card.Content>
                          <Card.Description>
                            <strong>Aantal bijen:</strong> {obs.beeCount}
                          </Card.Description>
                          <Card.Description>
                            <strong>Stuifmeelkleur:</strong> {obs.pollenColor}
                          </Card.Description>
                          {obs.notes && (
                            <Card.Description>
                              <strong>Notities:</strong> {obs.notes}
                            </Card.Description>
                          )}
                        </Card.Content>
                      </Card>
                    ))}
                  </div>
                </>
              ) : (
                <div className="section-header">
                  <h2>Nog geen observaties</h2>
                  <p>Voeg uw eerste observatie toe aan deze kast</p>
                  <div
                    className="section-actions"
                    style={{ marginTop: "var(--space-8)" }}
                  >
                    <Button
                      href={`/observations/new?hiveId=${hive.id}`}
                      variant="primary"
                      size="large"
                    >
                      + Eerste observatie toevoegen
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
