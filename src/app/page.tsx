import Hero from "@/components/magazine/Hero";
import Section from "@/components/magazine/Section";
import Button from "@/components/magazine/Button";
import Card from "@/components/magazine/Card";
import Stats from "@/components/magazine/Stats";
import prisma from "@/lib/client";

export const dynamic = "force-dynamic";

export default async function Home() {
  const totalObservations = await prisma.observation.count();
  const totalUsers = await prisma.user.count();
  const totalHives = await prisma.hive.count();

  return (
    <>
      <Hero
        title="Bijen Observatie Platform"
        subtitle="Uw digitale assistent voor bijenhouden"
        text="Volg uw bijenstanden, registreer observaties en krijg inzicht in uw werkwijze. Modern, overzichtelijk, effectief."
        image="/assets/hero-new.jpg"
        imageAlt="Bijen in de natuur"
      >
        <div className="flex gap-6 mt-12">
          <Button href="/platform" variant="light" size="lg">
            Lees meer
          </Button>
          <Button href="/auth/register" variant="accent" size="lg">
            Start nu
          </Button>
        </div>
      </Hero>

      <Stats
        totalObservations={totalObservations}
        totalUsers={totalUsers}
        totalHives={totalHives}
      />

      <Section variant="white" size="lg">
        <div className="text-center mb-12">
          <h2
            className="text-display text-3xl mb-4"
            style={{ fontWeight: "400", color: "var(--color-primary)" }}
          >
            Voor imkers, door imkers
          </h2>
          <p
            className="text-base"
            style={{
              color: "var(--color-text-light)",
              lineHeight: "1.6",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            Een platform dat het bijenhouden eenvoudiger, overzichtelijker en
            effectiever maakt. Alles wat je nodig hebt, op één plek.
          </p>
        </div>

        <div className="grid grid--3">
          <Card
            title="Digitaal logboek"
            description="Geen papieren boekjes meer. Registreer observaties direct vanaf je telefoon of computer."
            category="Functie"
            variant="elevated"
          />
          <Card
            title="Privé en veilig"
            description="Jouw gegevens blijven privé. Locaties van standen zijn alleen voor jou zichtbaar."
            category="Veiligheid"
            variant="elevated"
          />
          <Card
            title="Inzicht in trends"
            description="Vergelijk waarnemingen door de seizoenen heen en optimaliseer je werkwijze."
            category="Analyse"
            variant="elevated"
          />
        </div>

        <div className="text-center mt-12">
          <Button href="/vision" variant="secondary" size="lg">
            Ontdek onze visie
          </Button>
        </div>
      </Section>

      <Section variant="cream" size="lg">
        <div className="text-center">
          <h2
            className="text-display text-3xl mb-4"
            style={{ fontWeight: "400", color: "var(--color-primary)" }}
          >
            Klaar om te beginnen?
          </h2>
          <p
            className="text-base mb-10"
            style={{
              color: "var(--color-text-light)",
              lineHeight: "1.6",
              maxWidth: "600px",
              margin: "0 auto 2.5rem",
            }}
          >
            Sluit je aan bij imkers die hun bijenhouden al digitaal beheren.
            Gratis en zonder verplichtingen.
          </p>
          <div className="flex gap-6 justify-center">
            <Button href="/auth/register" variant="primary" size="lg">
              Gratis account aanmaken
            </Button>
            <Button href="/platform" variant="link">
              Bekijk hoe het werkt →
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
