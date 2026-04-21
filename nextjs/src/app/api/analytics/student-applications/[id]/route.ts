import { NextRequest, NextResponse } from 'next/server';
import { getStudentApplications } from '../../../../../../lib/db/advanced';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    return NextResponse.json(getStudentApplications(Number(id)));
  } catch (_error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
