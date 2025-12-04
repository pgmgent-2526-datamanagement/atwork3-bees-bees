import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "light" | "accent" | "link";
  size?: "sm" | "default" | "lg";
  fullWidth?: boolean;
  className?: string;
}

export default function Button({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  size = "default",
  fullWidth = false,
  className = "",
}: ButtonProps) {
  const baseClass = "btn";
  const variantClass = `btn--${variant}`;
  const sizeClass = size === "sm" ? "btn--sm" : size === "lg" ? "btn--lg" : "";
  const widthClass = fullWidth ? "btn--full" : "";
  const classes =
    `${baseClass} ${variantClass} ${sizeClass} ${widthClass} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} type={type} className={classes}>
      {children}
    </button>
  );
}
