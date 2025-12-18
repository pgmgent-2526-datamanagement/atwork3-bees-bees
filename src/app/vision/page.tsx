export default function VisionPage() {
  return (
    <>
      <section className="page-header" data-page="01">
        <div className="container">
          <h1 className="page-header__title">Wie we zijn</h1>
          <p className="page-header__subtitle">
            Van organische beweging in 2009 tot officiële VZW in 2025
          </p>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="grid grid--2" style={{ alignItems: "center", gap: "var(--space-16)" }}>
            <div>
              <div style={{ 
                fontSize: "6rem", 
                fontFamily: "var(--font-display)", 
                fontWeight: "300",
                lineHeight: "1",
                marginBottom: "var(--space-8)"
              }}>
                2009
              </div>
              <div className="quote" style={{ border: "none", padding: 0 }}>
                "Het bijenvolk was spiegel voor de werking"
              </div>
            </div>
            
            <div>
              <h2 style={{ 
                fontFamily: "var(--font-display)", 
                fontSize: "2.5rem",
                fontWeight: "400",
                marginBottom: "var(--space-6)"
              }}>
                Waar het begon
              </h2>
              <p style={{ fontSize: "1.125rem", lineHeight: "1.8", marginBottom: "var(--space-4)" }}>
                Een kleine groep imkers vindt elkaar rond het werk van Rudolf Steiner. 
                Zijn voordrachtcyclus "De Bijen" wordt hun kompas.
              </p>
              <p style={{ fontSize: "1.125rem", lineHeight: "1.8" }}>
                Maandelijkse bijeenkomsten bij elkaar thuis. Elke sessie start met 
                dezelfde tekst van Steiner – een ritueel dat vandaag nog bestaat.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--default">
        <div className="container">
          <div className="section__header" style={{ textAlign: "center" }}>
            <h2 className="section__title">Van pioniers naar professionals</h2>
          </div>

          <div className="grid grid--3">
            <div className="card" style={{ textAlign: "center" }}>
              <div style={{ 
                fontSize: "4rem", 
                fontFamily: "var(--font-display)",
                fontWeight: "300",
                color: "var(--color-text)",
                marginBottom: "var(--space-4)"
              }}>
                2010
              </div>
              <h3 className="card__title" style={{ fontSize: "1.25rem", marginBottom: "var(--space-3)" }}>
                Eerste cursus
              </h3>
              <p className="card__text">
                Nederlandse experts Albert Muller en Wim Grasstek leggen de 
                basis. Hun begeestering werkt aanstekelijk.
              </p>
            </div>

            <div className="card" style={{ textAlign: "center" }}>
              <div style={{ 
                fontSize: "4rem", 
                fontFamily: "var(--font-display)",
                fontWeight: "300",
                color: "var(--color-text)",
                marginBottom: "var(--space-4)"
              }}>
                2022
              </div>
              <h3 className="card__title" style={{ fontSize: "1.25rem", marginBottom: "var(--space-3)" }}>
                Eigen lesgevers
              </h3>
              <p className="card__text">
                Lutgart Teuwen en Roger Wynants voltooien de lerarenopleiding. 
                Vlaanderen krijgt eigen stemmen.
              </p>
            </div>

            <div className="card" style={{ textAlign: "center" }}>
              <div style={{ 
                fontSize: "4rem", 
                fontFamily: "var(--font-display)",
                fontWeight: "300",
                color: "var(--color-text)",
                marginBottom: "var(--space-4)"
              }}>
                2025
              </div>
              <h3 className="card__title" style={{ fontSize: "1.25rem", marginBottom: "var(--space-3)" }}>
                Officiële VZW
              </h3>
              <p className="card__text">
                Van organische beweging naar gestructureerde organisatie. 
                Barend Weyens haalt meesteropleiding.
              </p>
            </div>
          </div>
        </div>
      </section>



      <section className="section section--alt">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">Wat we doen</h2>
            <p className="section__subtitle">
              Vanuit de VZW wordt veel centraal gecoördineerd
            </p>
          </div>

          <div className="grid grid--2">
            <div className="feature-card feature-card--01">
              <div className="feature-card__number">01</div>
              <h3 className="feature-card__title">Opleidingen & Workshops</h3>
              <p className="feature-card__text">
                Van basiscursussen tot verdiepende opleidingen. Ook workshops
                zoals korfvlechten, waskaarsen trekken en lezingen van
                buitenlandse sprekers.
              </p>
            </div>

            <div className="feature-card feature-card--02">
              <div className="feature-card__number">02</div>
              <h3 className="feature-card__title">Netwerk & Begeleiding</h3>
              <p className="feature-card__text">
                BD-Bee Buddies bieden ondersteuning aan imkers. Regionale
                leesgroepen en een jaarlijks Midwinterevent versterken de
                gemeenschap.
              </p>
            </div>

            <div className="feature-card feature-card--03">
              <div className="feature-card__number">03</div>
              <h3 className="feature-card__title">Informatieplatform</h3>
              <p className="feature-card__text">
                Website met ledengroep, zwermlijsten en digitale tools om het
                bijenhouden overzichtelijk bij te houden.
              </p>
            </div>

            <div className="feature-card feature-card--04">
              <div className="feature-card__number">04</div>
              <h3 className="feature-card__title">Samenwerking & Dialoog</h3>
              <p className="feature-card__text">
                Werking naar kinderen en scholen, samenwerking met biodynamische
                landbouwers en dialoog met wetenschappers en natuurbeschermers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--default">
        <div className="container">
          <div className="grid grid--2" style={{ alignItems: "center", gap: "var(--space-16)" }}>
            <div>
              <h2 style={{ 
                fontFamily: "var(--font-display)", 
                fontSize: "3rem",
                fontWeight: "400",
                lineHeight: "1.2",
                marginBottom: "var(--space-6)"
              }}>
                Imkeren naar de aard en het wezen van de bij
              </h2>
              <p style={{ fontSize: "1.25rem", lineHeight: "1.7", marginBottom: "var(--space-6)" }}>
                Respect voor de honingbij als levend organisme. Zo min mogelijk 
                ingrijpen op haar natuurlijke levenswijze.
              </p>
              <div style={{
                borderLeft: "4px solid var(--color-text)",
                paddingLeft: "var(--space-6)",
                fontStyle: "italic",
                fontSize: "1.125rem",
                color: "var(--color-text-light)"
              }}>
                Holistische bijenteelt die gezondheid, welzijn en biodiversiteit 
                centraal stelt.
              </div>
            </div>

            <div style={{
              background: "rgba(0, 0, 0, 0.03)",
              padding: "var(--space-12)",
              border: "1px solid rgba(0, 0, 0, 0.06)"
            }}>
              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.5rem",
                fontWeight: "500",
                marginBottom: "var(--space-6)"
              }}>
                BD-Bee Buddies
              </h3>
              <p style={{ lineHeight: "1.7", marginBottom: "var(--space-4)" }}>
                De praktijk blijft verrassen. Vragen en onzekerheden blijven 
                komen, hoe goed opgeleid je ook bent.
              </p>
              <p style={{ lineHeight: "1.7", fontWeight: "500" }}>
                Daarom begeleiden ervaren imkers nieuwkomers via het 
                BD-Bee Buddies programma.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
