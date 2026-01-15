import DrachtkalenderSection from '@/components/shared/DrachtkalenderSection';

export const dynamic = 'force-dynamic';

export default function DrachtkalenderPage() {
  return (
    <>
      <section className="page-header" data-page="—">
        <div className="container">
          <h1 className="heading-primary">Drachtkalender</h1>
          <p className="page-header__subtitle">
            Bloeiperiodes van belangrijke bijenplanten door het jaar heen
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="info-box info-box--warning">
            <p>
              <strong>Let op:</strong> Dit is een algemene drachtkalender voor België/Nederland. 
              De exacte bloeiperiodes kunnen variëren per locatie en weersomstandigheden.
            </p>
          </div>
          <DrachtkalenderSection />
        </div>
      </section>
    </>
  );
}
