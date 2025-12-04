import Hero from "@/components/magazine/Hero";
import Section from "@/components/magazine/Section";
import Card from "@/components/magazine/Card";
import Button from "@/components/magazine/Button";
import ContentBlock from "@/components/magazine/ContentBlock";

export default function PlatformPage() {
  return (
    <>
      <Hero
        title="Het Platform"
        subtitle="Alles wat je nodig hebt voor digitaal imkeren"
        image="/assets/hero-new.jpg"
        imageAlt="Bijenhouden met technologie"
        showScroll={true}
      />

      <Section variant="white" size="lg">
        <div className="text-center mb-12">
          <h2
            className="text-display text-3xl mb-4"
            style={{ fontWeight: "400", color: "var(--color-primary)" }}
          >
            Hoe werkt het?
          </h2>
          <p
            className="text-base"
            style={{
              color: "var(--color-text-light)",
              lineHeight: "1.6",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            In vier simpele stappen heb je jouw bijenhouden volledig
            gedigitaliseerd. Geen ingewikkelde setup, geen technische kennis
            vereist.
          </p>
        </div>

        <div className="grid grid--2 mb-16">
          <Card
            title="1. Maak een account aan"
            description="Registreer gratis in minder dan een minuut. Geen betaalgegevens nodig, geen verplichtingen."
            category="Stap 1"
            variant="elevated"
          />
          <Card
            title="2. Voeg je bijenstanden toe"
            description="Registreer de locaties van je bijenstanden. Je GPS-locaties blijven volledig privé."
            category="Stap 2"
            variant="elevated"
          />
          <Card
            title="3. Registreer je kasten"
            description="Koppel kasten aan je standen. Houd bij welke kasten waar staan en wat hun status is."
            category="Stap 3"
            variant="elevated"
          />
          <Card
            title="4. Log je waarnemingen"
            description="Noteer observaties direct bij je kastcontroles. Foto's, notities, acties – alles op één plek."
            category="Stap 4"
            variant="elevated"
          />
        </div>
      </Section>

      <Section variant="cream" size="lg">
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div className="text-center mb-12">
            <h2
              className="text-display text-3xl mb-4"
              style={{ fontWeight: "400", color: "var(--color-primary)" }}
            >
              Waarom dit platform?
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
              Papieren logboeken zijn tijdrovend, kwetsbaar en moeilijk
              doorzoekbaar. Ons platform lost dat op: alles digitaal, altijd
              toegankelijk, volledig privé.
            </p>
          </div>

          <div
            className="grid"
            style={{
              gridTemplateColumns: "1fr 1fr",
              gap: "var(--space-12)",
              alignItems: "center",
            }}
          >
            <div>
              <p
                className="text-base mb-6"
                style={{ color: "var(--color-secondary)", lineHeight: "1.75" }}
              >
                Je kunt je concentreren op je bijen in plaats van op je
                administratie. Alles wordt automatisch gesynchroniseerd en is
                altijd beschikbaar, waar je ook bent.
              </p>
              <Button href="/auth/register" variant="primary">
                Start gratis
              </Button>
            </div>
            <div
              style={{
                position: "relative",
                borderRadius: "var(--border-radius)",
                overflow: "hidden",
                boxShadow: "var(--shadow-md)",
              }}
            >
              <img
                src="/assets/hero.jpg"
                alt="Digitaal vs papier"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </div>
          </div>
        </div>
      </Section>

      <Section variant="white" size="lg">
        <div className="text-center mb-12">
          <h2
            className="text-display text-3xl mb-4"
            style={{ fontWeight: "400", color: "var(--color-primary)" }}
          >
            Belangrijkste functies
          </h2>
          <p
            className="text-base"
            style={{
              color: "var(--color-text-light)",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            Alles wat een moderne imker nodig heeft, zonder overbodige toeters
            en bellen.
          </p>
        </div>

        <div className="grid grid--3">
          <Card
            title="Bijenstanden beheren"
            description="Voeg onbeperkt bijenstanden toe met GPS-coördinaten. Alleen jij ziet waar je standen zich bevinden."
            category="Beheer"
            variant="elevated"
          />
          <Card
            title="Kasten registreren"
            description="Houd per kast bij welk type het is, sinds wanneer het er staat en wat de huidige status is."
            category="Organisatie"
            variant="elevated"
          />
          <Card
            title="Observaties loggen"
            description="Registreer waarnemingen met datum, notities, foto's en acties. Altijd en overal toegankelijk."
            category="Logboek"
            variant="elevated"
          />
          <Card
            title="Drachtkalender"
            description="Zie welke planten binnen 2-7 km van je standen bloeien. Handig voor drachtplanning."
            category="Planning"
            variant="elevated"
          />
          <Card
            title="Privacybescherming"
            description="Jouw locaties blijven privé. Andere imkers zien alleen observaties, nooit je exacte standplaatsen."
            category="Veiligheid"
            variant="elevated"
          />
          <Card
            title="Multi-device sync"
            description="Werk op je telefoon, tablet of computer. Al je gegevens worden gesynchroniseerd."
            category="Toegankelijkheid"
            variant="elevated"
          />
        </div>
      </Section>
    </>
  );
}
