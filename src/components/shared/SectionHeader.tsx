import { ReactNode } from "react";

type SectionHeaderProps = {
  children: ReactNode;
  className?: string;
};

export default function SectionHeader({
  children,
  className = "",
}: SectionHeaderProps) {
  return <div className={`section-header ${className}`}>{children}</div>;
}
