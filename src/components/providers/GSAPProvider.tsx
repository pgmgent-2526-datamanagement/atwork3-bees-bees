"use client";

import { useEffect } from "react";
import useGSAPAnimations from "@/hooks/useGSAPAnimations";

export default function GSAPProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useGSAPAnimations();

  return <>{children}</>;
}
