import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="section bg-alt">
        <div className="container container--medium">
          <h1 className="title title--xl text-center">Over Ons</h1>
          <p className="subtitle text-center">
            Een digitale oplossing voor biodynamische imkers
          </p>
        </div>
      </section>

      {/* Wie zijn wij - Biodyn Imkers geschiedenis */}
      <section className="section">
        <div className="container container--medium">
          <h2 className="section__title">Wie zijn wij?</h2>
          <div className="about__content">
            <p>
              Biodyn Imkers is een vereniging van biodynamische imkers die sinds 
              1980 actief is in Vlaanderen. Wij geloven in een respectvolle 
              omgang met bijen en streven naar een natuurlijke manier van imkeren.
            </p>
            <p>
              Onze leden delen hun kennis en ervaringen om samen te leren en 
              te groeien. Door jarenlange ervaring hebben we een schat aan 
              observaties verzameld over bijenstanden, drachtplanten en 
              imkerpraktijken.
            </p>
            <p>
              Meer weten over onze geschiedenis?{" "}
              <a 
                href="https://www.biodynimkers.be/geschiedenis/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="link"
              >
                Bezoek onze website
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Waarom deze webapp? */}
      <section className="section bg-alt">
        <div className="container container--medium">
          <h2 className="section__title">Waarom deze webapp?</h2>
          <div className="about__reasons">
            <div className="reason">
              <h3 className="reason__title">Kennis Behouden</h3>
              <p className="reason__text">
                Door decennia verzamelen onze imkers waardevolle observaties. 
                Deze kennis verdwijnt vaak of blijft in notitieboekjes. 
                Met deze webapp bewaren we alles digitaal en toegankelijk.
              </p>
            </div>
            <div className="reason">
              <h3 className="reason__title">Samen Leren</h3>
              <p className="reason__text">
                Elke imker heeft unieke ervaringen. Door observaties te delen 
                kunnen we van elkaar leren en patronen ontdekken die anders 
                onopgemerkt blijven.
              </p>
            </div>
            <div className="reason">
              <h3 className="reason__title">Data-gedreven Imkeren</h3>
              <p className="reason__text">
                Met een centraal systeem kunnen we trends analyseren, 
                drachtkalenders opstellen en betere beslissingen nemen 
                gebaseerd op historische data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 types observaties */}
      <section className="section">
        <div className="container container--medium">
          <h2 className="section__title">Drie Types Observaties</h2>
          <div className="observation-types">
            <div className="observation-type">
              <div className="observation-type__number">1</div>
              <h3 className="observation-type__title">Kast Observaties</h3>
              <p className="observation-type__text">
                Noteer de staat van je bijenkasten: populatiegrootte, 
                broed, honingopbrengst, gezondheid. Volg de ontwikkeling 
                van elke kast doorheen het seizoen.
              </p>
            </div>
            <div className="observation-type">
              <div className="observation-type__number">2</div>
              <h3 className="observation-type__title">Planten Observaties</h3>
              <p className="observation-type__text">
                Documenteer welke planten bloeien in jouw omgeving. 
                Bouw een drachtkalender op en ontdek welke planten 
                belangrijk zijn voor jouw bijenstanden.
              </p>
            </div>
            <div className="observation-type">
              <div className="observation-type__number">3</div>
              <h3 className="observation-type__title">Imker Observaties</h3>
              <p className="observation-type__text">
                Leg je eigen werkzaamheden vast: wanneer heb je wat gedaan, 
                welke interventies waren nodig, wat waren de resultaten. 
                Leer van je eigen geschiedenis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Huidige vs toekomstige workflow */}
      <section className="section bg-alt">
        <div className="container container--large">
          <h2 className="section__title">Van Papier naar Digitaal</h2>
          <div className="workflow-comparison">
            <div className="workflow-comparison__column">
              <h3 className="workflow-comparison__title">Vroeger</h3>
              <ul className="workflow-comparison__list">
                <li>Observaties in verschillende notitieboekjes</li>
                <li>Moeilijk terug te vinden</li>
                <li>Niet te delen met andere imkers</li>
                <li>Geen overzicht over meerdere jaren</li>
                <li>Handmatig grafieken maken</li>
              </ul>
            </div>
            <div className="workflow-comparison__column">
              <h3 className="workflow-comparison__title">Nu</h3>
              <ul className="workflow-comparison__list">
                <li>Alles op één plaats, altijd beschikbaar</li>
                <li>Zoeken en filteren in seconden</li>
                <li>Automatisch delen binnen de vereniging</li>
                <li>Historische trends in één oogopslag</li>
                <li>Automatische statistieken en grafieken</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Voor wie? */}
      <section className="section">
        <div className="container container--medium">
          <h2 className="section__title">Voor Wie is Deze App?</h2>
          <div className="about__content">
            <p>
              Deze webapp is ontwikkeld voor <strong>leden van Biodyn Imkers</strong>, 
              maar we hopen in de toekomst ook andere imkersverenigingen te verwelkomen.
            </p>
            <p>
              Of je nu een ervaren imker bent met decennia ervaring, of net 
              begint met je eerste bijenstand - deze tool helpt je om systematisch 
              je observaties bij te houden en te leren van anderen.
            </p>
          </div>
        </div>
      </section>

      {/* Toekomstplannen */}
      <section className="section bg-alt">
        <div className="container container--medium">
          <h2 className="section__title">Toekomstplannen</h2>
          <div className="future-plans">
            <div className="future-plan">
              <h3 className="future-plan__title">Mobiele App</h3>
              <p className="future-plan__text">
                Een native mobiele applicatie voor iOS en Android, 
                zodat je direct bij je bijenstanden observaties kan invoeren.
              </p>
            </div>
            <div className="future-plan">
              <h3 className="future-plan__title">Geavanceerde Analytics</h3>
              <p className="future-plan__text">
                Machine learning algoritmes die patronen detecteren en 
                voorspellingen doen over drachtperiodes en kastontwikkeling.
              </p>
            </div>
            <div className="future-plan">
              <h3 className="future-plan__title">Community Features</h3>
              <p className="future-plan__text">
                Forums, kennisbank en mogelijkheid om vragen te stellen 
                aan ervaren imkers binnen de vereniging.
              </p>
            </div>
            <div className="future-plan">
              <h3 className="future-plan__title">Open voor Andere Verenigingen</h3>
              <p className="future-plan__text">
                We willen dit platform open stellen voor andere imkersverenigingen 
                in Vlaanderen en daarbuiten.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container container--small text-center">
          <h2 className="title title--lg">Klaar om te beginnen?</h2>
          <p className="subtitle">
            Registreer je account en start vandaag nog met digitale observaties
          </p>
          <div className="button-group">
            <Link href="/auth/register" className="button button--primary">
              Registreer Nu
            </Link>
            <Link href="/" className="button button--secondary">
              Terug naar Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
