"use client";
import React from "react";
import { loginSchema } from "@/lib/validators/schemas";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Hero from "@/components/magazine/Hero";
import Section from "@/components/magazine/Section";

export default function Login() {
  type Errors = string | undefined | null;

  const [errors, setErrors] = useState<Errors>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<
    string,
    string[]
  > | null>(null);
  const [loading, setLoading] = React.useState(false);

  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors(null);
    setLoading(true);

    const fd = new FormData(event.currentTarget);
    const rawFormData = Object.fromEntries(fd.entries()) as Record<
      string,
      unknown
    >;

    // Validate with Zod
    const validationResult = loginSchema.safeParse(rawFormData);
    if (!validationResult.success) {
      const { fieldErrors } = validationResult.error.flatten();
      setFieldErrors(fieldErrors);
      setLoading(false);
      return;
    }
    try {
      const res = await signIn("credentials", {
        ...rawFormData,
        redirect: false,
        callbackUrl: "/account",
      });
      if (!res?.ok) {
        console.log("signIn errors:", res?.error);
        if (res?.error === "CredentialsSignin") {
          setErrors(
            "Onjuiste inloggegevens. Controleer uw e-mail en wachtwoord."
          );
        } else if (res?.error) {
          setErrors("Er is iets misgegaan. Probeer later opnieuw.");
        }
        setLoading(false);
        return;
      }
      router.push("/account");
    } catch (err) {
      console.error(err);
      setErrors("Er is iets misgegaan. Probeer later opnieuw.");
      setLoading(false);
    }
  }

  return (
    <>
      <Hero
        title="Inloggen"
        subtitle="Welkom terug bij uw bijenwaarnemingen"
        image="/assets/hero-new.jpg"
        imageAlt="Login bij BEES Platform"
        showScroll={false}
      />

      <Section variant="white" size="lg">
        <div className="text-center mb-12">
          <h2
            className="text-display text-3xl mb-4"
            style={{ fontWeight: "400", color: "var(--color-primary)" }}
          >
            Log in op uw account
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
            Vul uw gegevens in om toegang te krijgen tot uw bijenwaarnemingen en
            bijenstanden.
          </p>
        </div>

        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <form onSubmit={handleSubmit} className="form">
            {errors && (
              <div
                style={{
                  padding: "var(--space-4)",
                  marginBottom: "var(--space-6)",
                  backgroundColor: "#fee",
                  border: "1px solid #fcc",
                  borderRadius: "4px",
                }}
              >
                <p style={{ color: "#c33", fontSize: "var(--text-sm)" }}>
                  {errors}
                </p>
              </div>
            )}

            <div className="form__group">
              <label htmlFor="email" className="form__label">
                E-mailadres
              </label>
              <input
                id="email"
                type="email"
                name="email"
                className="form__input"
                placeholder="uw.naam@voorbeeld.be"
                onChange={(e) => {
                  if (fieldErrors?.email) {
                    setFieldErrors((prev) => ({ ...prev, email: [] }));
                  }
                }}
              />
              {fieldErrors?.email && (
                <div
                  style={{
                    marginTop: "var(--space-2)",
                    color: "#c33",
                    fontSize: "var(--text-sm)",
                  }}
                >
                  <p>{fieldErrors.email}</p>
                </div>
              )}
            </div>

            <div className="form__group">
              <label htmlFor="password" className="form__label">
                Wachtwoord
              </label>
              <input
                id="password"
                type="password"
                name="password"
                className="form__input"
                placeholder="Uw wachtwoord"
                onChange={(e) => {
                  if (fieldErrors?.password) {
                    setFieldErrors((prev) => ({ ...prev, password: [] }));
                  }
                }}
              />
              {fieldErrors?.password && (
                <div
                  style={{
                    marginTop: "var(--space-2)",
                    color: "#c33",
                    fontSize: "var(--text-sm)",
                  }}
                >
                  <p>{fieldErrors.password}</p>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "var(--space-4) var(--space-6)",
                fontSize: "var(--text-base)",
                fontFamily: "var(--font-display)",
                fontWeight: "500",
                color: "white",
                backgroundColor: "var(--color-primary)",
                border: "none",
                borderRadius: "4px",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "var(--transition-base)",
                opacity: loading ? 0.7 : 1,
                marginTop: "var(--space-4)",
              }}
            >
              {loading ? "Inloggen..." : "Inloggen"}
            </button>
          </form>

          <div style={{ marginTop: "var(--space-8)", textAlign: "center" }}>
            <p
              style={{
                color: "var(--color-text-light)",
                fontSize: "var(--text-base)",
              }}
            >
              Nog geen account?{" "}
              <Link
                href="/auth/register"
                style={{
                  color: "var(--color-primary)",
                  textDecoration: "none",
                  fontWeight: "500",
                  borderBottom: "1px solid transparent",
                  transition: "var(--transition-fast)",
                }}
              >
                Registreer hier
              </Link>
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
