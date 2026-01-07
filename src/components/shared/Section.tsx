import { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  variant?: "default" | "alternate";
  first?: boolean;
  className?: string;
};

export default function Section({
  children,
  variant = "default",
  first = false,
  className = "",
}: SectionProps) {
  const classes = [
    "section",
    variant === "alternate" && "section-alternate",
    first && "section-first",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <section className={classes}>{children}</section>;
}
