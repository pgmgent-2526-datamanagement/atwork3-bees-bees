import Hero from "@/components/magazine/Hero";
import Section from "@/components/magazine/Section";

export default function VisionPage() {
  return (
    <>
      <Hero
        title="Onze Visie"
        subtitle="Bijenhouden voor de moderne imker"
        image="/assets/hero-new.jpg"
        imageAlt="Bijenvolk in de natuur"
        showScroll={true}
      />

      <Section variant="cream" size="xl">
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <article className="editorial">
            <header
              className="editorial__header"
              style={{ marginBottom: "var(--space-16)" }}
            >
              <div
                className="editorial__category"
                style={{
                  fontSize: "var(--text-sm)",
                  fontWeight: "500",
                  color: "var(--color-accent)",
                  marginBottom: "var(--space-4)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Missie
              </div>
              <h1
                className="editorial__title"
                style={{
                  fontSize: "var(--text-5xl)",
                  fontWeight: "300",
                  lineHeight: "1.2",
                  marginBottom: "var(--space-6)",
                }}
              >
                Digitaal imkeren, zonder complexiteit
              </h1>
              <p
                className="editorial__subtitle"
                style={{
                  fontSize: "var(--text-xl)",
                  color: "var(--color-text-light)",
                  lineHeight: "1.6",
                }}
              >
                Wij geloven dat bijenhouden eenvoudig, overzichtelijk en
                toegankelijk moet zijn. Daarom bouwen we tools die imkers écht
                helpen.
              </p>
            </header>

            <div
              className="editorial__body"
              style={{
                fontSize: "var(--text-lg)",
                lineHeight: "1.8",
                color: "var(--color-secondary)",
              }}
            >
              <p style={{ marginBottom: "var(--space-8)" }}>
                Het bijenhouden is een ambacht dat eeuwenoud is, maar de moderne
                imker heeft moderne uitdagingen. Van het bijhouden van
                waarnemingen tot het plannen van interventies: veel imkers
                werken nog met papieren logboeken, losse notities en geheugen.
              </p>

              <p style={{ marginBottom: "var(--space-12)" }}>
                Wij zagen een kans om dit anders te doen. Niet door het
                bijenhouden te veranderen, maar door het <em>bijhouden</em> te
                vereenvoudigen. Ons platform is gebouwd met één doel: imkers
                helpen focussen op wat ze het liefste doen – werken met hun
                bijen.
              </p>

              <h2
                style={{
                  fontSize: "var(--text-3xl)",
                  fontWeight: "400",
                  marginTop: "var(--space-16)",
                  marginBottom: "var(--space-8)",
                  color: "var(--color-text)",
                }}
              >
                Voor imkers, door imkers
              </h2>

              <p>
                Ons team bestaat uit mensen die zelf imkeren of nauw betrokken
                zijn bij de bijenwereld. We weten wat er speelt: te weinig tijd,
                te veel administratie, en de constante wens om beter te worden.
              </p>

              <p>
                Daarom is ons platform geen "one-size-fits-all" oplossing. Het
                is flexibel genoeg voor hobbyimkers met één of twee kasten, maar
                ook krachtig genoeg voor professionals met tientallen
                bijenstanden.
              </p>

              <div
                className="pullquote"
                style={{
                  fontSize: "var(--text-2xl)",
                  fontWeight: "300",
                  fontStyle: "italic",
                  color: "var(--color-accent)",
                  padding: "var(--space-12) 0",
                  margin: "var(--space-16) 0",
                  borderLeft: "3px solid var(--color-accent)",
                  paddingLeft: "var(--space-8)",
                }}
              >
                "Technologie moet het ambacht ondersteunen, niet overnemen."
              </div>

              <h2
                style={{
                  fontSize: "var(--text-3xl)",
                  fontWeight: "400",
                  marginTop: "var(--space-16)",
                  marginBottom: "var(--space-8)",
                  color: "var(--color-text)",
                }}
              >
                Waar we voor staan
              </h2>

              <p style={{ marginBottom: "var(--space-6)" }}>
                <strong
                  style={{ color: "var(--color-text)", fontWeight: "600" }}
                >
                  Eenvoud:
                </strong>{" "}
                Geen overbodige functies of complexe workflows. Je registreert
                wat belangrijk is, wanneer het belangrijk is.
              </p>

              <p style={{ marginBottom: "var(--space-6)" }}>
                <strong
                  style={{ color: "var(--color-text)", fontWeight: "600" }}
                >
                  Privacy:
                </strong>{" "}
                Jouw gegevens zijn van jou. We delen geen locaties met andere
                gebruikers en verkopen geen data aan derden.
              </p>

              <p style={{ marginBottom: "var(--space-6)" }}>
                <strong
                  style={{ color: "var(--color-text)", fontWeight: "600" }}
                >
                  Toegankelijkheid:
                </strong>{" "}
                Of je nu op je telefoon werkt bij de bijenstal of thuis op je
                computer: het platform werkt overaleven goed.
              </p>

              <p style={{ marginBottom: "var(--space-12)" }}>
                <strong
                  style={{ color: "var(--color-text)", fontWeight: "600" }}
                >
                  Duurzaamheid:
                </strong>{" "}
                Door slimmer te werken en beter inzicht te krijgen, kunnen
                imkers effectiever bijenhouden. Dat is goed voor de imker, en
                goed voor de bijen.
              </p>

              <h2
                style={{
                  fontSize: "var(--text-3xl)",
                  fontWeight: "400",
                  marginTop: "var(--space-16)",
                  marginBottom: "var(--space-8)",
                  color: "var(--color-text)",
                }}
              >
                De toekomst
              </h2>

              <p style={{ marginBottom: "var(--space-8)" }}>
                We zijn nog maar net begonnen. In de toekomst willen we imkers
                nog meer tools bieden: van seizoensanalyses tot
                dracht-voorspellingen op basis van lokale plantengroei. Maar
                altijd met hetzelfde uitgangspunt: technologie die ondersteunt,
                niet overheerst.
              </p>

              <p style={{ marginBottom: "0" }}>
                Want uiteindelijk gaat het niet om het platform – het gaat om de
                bijen, en de mensen die voor ze zorgen.
              </p>
            </div>
          </article>
        </div>
      </Section>
    </>
  );
}
