import { prisma } from '@/lib/client';
import ObservationsTable from '@/components/admin/ObservationsTable';
export default async function AdminObservationsPage() {
  const observations = await prisma.observation.findMany({
    include: {
      hive: {
        include: {
          apiary: { include: { user: true } },
        },
      },
    },
  });

  return (
    <ObservationsTable
      observations={observations}
      showHive={true}
      showApiary={true}
      showUser={true}
    />
  );
}
