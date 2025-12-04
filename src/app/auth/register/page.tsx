import { RegisterForm } from "@/components/forms/RegisterForm";
import { createItem } from "@/app/actions/register";
import Link from "next/link";
import Hero from "@/components/magazine/Hero";
import Section from "@/components/magazine/Section";

export default function Register() {
  return (
    <>
      <Hero
        title="Account aanmaken"
        subtitle="Start vandaag met digitale bijenwaarnemingen"
        image="/assets/hero-new.jpg"
        imageAlt="Registreer bij BEES Platform"
        showScroll={false}
      />

      <Section variant="white" size="lg">
        <div className="text-center mb-12">
          <h2
            className="text-display text-3xl mb-4"
            style={{ fontWeight: "400", color: "var(--color-primary)" }}
          >
            Maak uw gratis account aan
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
            Vul uw gegevens in om te beginnen met digitaal bijenhouden.
          </p>
        </div>

        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <RegisterForm createItem={createItem} />
          <div style={{ marginTop: "var(--space-8)", textAlign: "center" }}>
            <p
              style={{
                color: "var(--color-text-light)",
                fontSize: "var(--text-base)",
              }}
            >
              Heeft u al een account?{" "}
              <Link
                href="/auth/login"
                style={{
                  color: "var(--color-primary)",
                  textDecoration: "none",
                  fontWeight: "500",
                  borderBottom: "1px solid transparent",
                  transition: "var(--transition-fast)",
                }}
              >
                Log hier in
              </Link>
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
