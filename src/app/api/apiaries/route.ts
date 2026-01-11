import { getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import prisma from '@/lib/client';
import { authOptions } from '@/lib/auth-options';
import { z } from 'zod';
import { apiarySchema } from '@/lib/validators/schemas';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Niet ingelogd' }, { status: 401 });
    }

    const apiaries = await prisma.apiary.findMany({
      where: { userId: session.user.id },
      select: {
        id: true,
        name: true,
      },
      orderBy: { name: 'asc' },
    });

    return NextResponse.json(apiaries);
  } catch (error) {
    console.error('Error fetching apiaries:', error);
    return NextResponse.json(
      { error: 'Er ging iets mis bij het ophalen van de bijenstanden' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Niet ingelogd' }, { status: 401 });
    }

    const body = await req.json();
    const { name, latitude, longitude } = body;
    // Valideer input met Zod
    const validationResult = apiarySchema.safeParse({
      name,
      latitude,
      longitude,
    });
    if (!validationResult.success) {
      const { fieldErrors } = validationResult.error.flatten();
      // after flatten: fieldErrors has type Record<string, string[]>
      return NextResponse.json(
        { ok: false, errors: fieldErrors },
        { status: 400 }
      );
    }

    // Haal userId op
    const userId = session.user.id;

    if (!userId) {
      return NextResponse.json({ error: 'Niet ingelogd' }, { status: 401 });
    }

    // Maak bijenstand aan
    const apiary = await prisma.apiary.create({
      data: {
        name,
        longitude,
        latitude,
        userId,
      },
    });

    return NextResponse.json(apiary, { status: 201 });
  } catch (error) {
    console.error('Error creating apiary:', error);
    return NextResponse.json(
      { error: 'Er ging iets mis bij het aanmaken van de bijenstand' },
      { status: 500 }
    );
  }
}
