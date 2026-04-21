import { NextRequest, NextResponse } from 'next/server';
import { seedDatabase } from '../../../../lib/db/seed';

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const force = searchParams.get('force') === 'true';
    const result = seedDatabase(force);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
  }
}
