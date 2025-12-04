import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  variant?: "white" | "cream" | "beige" | "black";
  size?: "default" | "lg" | "xl";
  className?: string;
}

export default function Section({
  children,
  variant = "white",
  size = "default",
  className = "",
}: SectionProps) {
  const sizeClass =
    size === "lg" ? "section--lg" : size === "xl" ? "section--xl" : "";
  const variantClass = `section--${variant}`;

  return (
    <section className={`section ${sizeClass} ${variantClass} ${className}`}>
      <div className="container">{children}</div>
    </section>
  );
}
