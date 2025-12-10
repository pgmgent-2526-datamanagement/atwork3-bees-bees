import Hero from "@/components/magazine/Hero";
import Section from "@/components/magazine/Section";
import Button from "@/components/magazine/Button";

export default function ContactPage() {
  return (
    <>
      <Hero
        title="Contact"
        subtitle="Vragen of feedback? We horen graag van je"
        image="/assets/hero-new.jpg"
        imageAlt="Contact met BEES Platform"
        showScroll={false}
      />

      <Section variant="white" size="lg">
        <div className="text-center mb-12">
          <h2
            className="text-display text-3xl mb-4"
            style={{ fontWeight: "400", color: "var(--color-primary)" }}
          >
            Neem contact op
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
            Heb je vragen over het platform, suggesties voor verbeteringen of
            wil je gewoon hallo zeggen? Vul het formulier in en we nemen zo snel
            mogelijk contact met je op.
          </p>
        </div>

        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <form className="form">
            <div className="form__group">
              <label htmlFor="name" className="form__label">
                Naam
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form__input"
                required
              />
            </div>

            <div className="form__group">
              <label htmlFor="email" className="form__label">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form__input"
                required
              />
            </div>

            <div className="form__group">
              <label htmlFor="subject" className="form__label">
                Onderwerp
              </label>
              <select id="subject" name="subject" className="form__select">
                <option value="algemeen">Algemene vraag</option>
                <option value="technisch">Technische ondersteuning</option>
                <option value="suggestie">Suggestie</option>
                <option value="samenwerking">Samenwerking</option>
              </select>
            </div>

            <div className="form__group">
              <label htmlFor="message" className="form__label">
                Bericht
              </label>
              <textarea
                id="message"
                name="message"
                className="form__textarea"
                required
              ></textarea>
              <p className="form__help">
                Vertel ons waar we je mee kunnen helpen
              </p>
            </div>

            <div className="form__actions form__actions--center">
              <Button type="submit" variant="primary" size="lg">
                Verstuur bericht
              </Button>
            </div>
          </form>
        </div>
      </Section>

      <Section variant="cream" size="lg">
        <div className="grid grid--3">
          <div className="text-center">
            <h3
              className="text-display text-xl mb-3"
              style={{ fontWeight: "500", color: "var(--color-primary)" }}
            >
              E-mail
            </h3>
            <p
              className="text-base"
              style={{ color: "var(--color-text-light)" }}
            >
              <a
                href="mailto:info@bees-platform.be"
                style={{ color: "var(--color-accent)", textDecoration: "none" }}
              >
                info@bees-platform.be
              </a>
            </p>
          </div>

          <div className="text-center">
            <h3
              className="text-display text-xl mb-3"
              style={{ fontWeight: "500", color: "var(--color-primary)" }}
            >
              Reactietijd
            </h3>
            <p
              className="text-base"
              style={{ color: "var(--color-text-light)" }}
            >
              Binnen 24 uur op werkdagen
            </p>
          </div>

          <div className="text-center">
            <h3
              className="text-display text-xl mb-3"
              style={{ fontWeight: "500", color: "var(--color-primary)" }}
            >
              Support
            </h3>
            <p
              className="text-base"
              style={{ color: "var(--color-text-light)" }}
            >
              Maandag t/m vrijdag
              <br />
              9:00 - 17:00
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
