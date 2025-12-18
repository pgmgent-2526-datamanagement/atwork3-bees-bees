export default function PlatformPage() {
  return (
    <>
      <section className="page-header" data-page="02">
        <div className="container">
          <h1 className="page-header__title">Het Platform</h1>
          <p className="page-header__subtitle">
            Alles wat je nodig hebt voor digitaal imkeren
          </p>
        </div>
      </section>

      <section className="section section--default">
        <div className="container">
          <div className="section__header section__header--center">
            <h2 className="section__title">Hoe werkt het?</h2>
            <p className="section__description">
              In vier simpele stappen heb je jouw bijenhouden volledig
              gedigitaliseerd. Geen ingewikkelde setup, geen technische kennis
              vereist.
            </p>
          </div>

          <div className="grid grid--2">
            <div className="card">
              <div className="card__header">
                <h3 className="card__title">1. Maak een account aan</h3>
              </div>
              <div className="card__content">
                <p className="card__description">
                  Registreer gratis in minder dan een minuut. Geen
                  betaalgegevens nodig, geen verplichtingen.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card__header">
                <h3 className="card__title">2. Voeg je bijenstanden toe</h3>
              </div>
              <div className="card__content">
                <p className="card__description">
                  Registreer de locaties van je bijenstanden. Je GPS-locaties
                  blijven volledig privé.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card__header">
                <h3 className="card__title">3. Registreer je kasten</h3>
              </div>
              <div className="card__content">
                <p className="card__description">
                  Koppel kasten aan je standen. Houd bij welke kasten waar staan
                  en wat hun status is.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card__header">
                <h3 className="card__title">4. Log je waarnemingen</h3>
              </div>
              <div className="card__content">
                <p className="card__description">
                  Noteer observaties direct bij je kastcontroles. Foto's,
                  notities, acties – alles op één plek.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
