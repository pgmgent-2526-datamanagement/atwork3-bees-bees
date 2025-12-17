import { redirect } from 'next/navigation';
import prisma from '@/lib/client';
import HiveForm from '@/components/forms/HiveForm';

export default async function AccountApiaryNewHivePage({
  searchParams,
}: {
  searchParams: Promise<{ apiaryId?: string; apiaryName?: string }>;
}) {
  const { apiaryId, apiaryName } = await searchParams;

  if (!apiaryId) {
    redirect('/account/apiaries');
  }
  const apiaryExists = await prisma.apiary.count({
    where: { id: parseInt(apiaryId) },
  });
  if (apiaryExists === 0) redirect('/account/apiaries');

  return <HiveForm apiaryId={apiaryId} apiaryName={apiaryName} />;
}
