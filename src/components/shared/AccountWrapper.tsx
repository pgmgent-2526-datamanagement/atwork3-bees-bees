'use client';

import { ReactNode } from 'react';
import ScrollAnimations from '@/components/home/ScrollAnimations';

export default function AccountWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollAnimations />
      {children}
    </>
  );
}
