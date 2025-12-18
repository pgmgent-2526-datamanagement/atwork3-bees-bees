import { redirect } from 'next/navigation';
import prisma from '@/lib/client';
import HiveForm from '@/components/forms/HiveForm';

export default async function AccountApiaryNewHivePage({
  searchParams,
}: {
  searchParams: Promise<{ apiaryId?: string; apiaryName?: string }>;
}) {
  const { apiaryId, apiaryName } = await searchParams;

  // If apiaryId is provided, validate it exists
  if (apiaryId) {
    const apiaryExists = await prisma.apiary.count({
      where: { id: parseInt(apiaryId) },
    });
    if (apiaryExists === 0) redirect('/apiaries');
  }

  // Pass apiaryId and apiaryName (can be undefined) to the form
  return <HiveForm apiaryId={apiaryId} apiaryName={apiaryName} />;
}
