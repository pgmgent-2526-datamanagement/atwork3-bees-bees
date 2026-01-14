export default function ContactPage() {
  return (
    <>
      <section className="section section-first">
        <div className="container container--narrow">
          <div className="section-header section-header text-center">
            <h1 className="heading-primary">Contact</h1>
            <p className="section-description">
              Vragen over het platform, suggesties voor verbeteringen of
              wil je gewoon hallo zeggen?
            </p>
          </div>

          <div className="text-center margin-top-large">
            <p className="text-large margin-bottom-small">
              Stuur ons een e-mail en we nemen zo snel mogelijk contact met je op.
            </p>
            <p className="text-extra-large">
              <a href="mailto:info@bees-platform.be" className="color-accent">
                info@bees-platform.be
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="section section-alternate">
        <div className="container">
          <div className="grid grid-three-columns">
            <div className="text-center">
              <h3 className="heading-tertiary">E-mail</h3>
              <p className="card__description">
                <a href="mailto:info@bees-platform.be">
                  info@bees-platform.be
                </a>
              </p>
            </div>

            <div className="text-center">
              <h3 className="heading-tertiary">Reactietijd</h3>
              <p className="card__description">
                Binnen 24 uur op werkdagen
              </p>
            </div>

            <div className="text-center">
              <h3 className="heading-tertiary">Support</h3>
              <p className="card__description">
                Maandag t/m vrijdag
                <br />
                9:00 - 17:00
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
