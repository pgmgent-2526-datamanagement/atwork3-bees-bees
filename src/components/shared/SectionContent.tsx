import { ReactNode } from "react";

type SectionContentProps = {
  children: ReactNode;
  grid?: "two" | "three" | "four";
  className?: string;
};

export default function SectionContent({
  children,
  grid,
  className = "",
}: SectionContentProps) {
  const gridClass = grid
    ? `grid grid-${grid}-columns`
    : "";

  const classes = [gridClass, className].filter(Boolean).join(" ");

  return <div className={classes}>{children}</div>;
}
