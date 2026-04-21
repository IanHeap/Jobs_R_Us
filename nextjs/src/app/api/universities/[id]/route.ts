import { NextRequest, NextResponse } from 'next/server';
import { getUniversityById, updateUniversity, deleteUniversity } from '../../../../../lib/db/university';

function dbError(error: unknown) {
  if (error instanceof Error && error.message.includes('UNIQUE constraint')) {
    return NextResponse.json({ error: 'A university with that email already exists' }, { status: 409 });
  }
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const university = getUniversityById(Number(id));
    if (!university) return NextResponse.json({ error: 'University not found' }, { status: 404 });
    return NextResponse.json(university);
  } catch (error) {
    return dbError(error);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const result = updateUniversity(Number(id), body);
    if (result.changes === 0) return NextResponse.json({ error: 'University not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    return dbError(error);
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const result = deleteUniversity(Number(id));
    if (result.changes === 0) return NextResponse.json({ error: 'University not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    return dbError(error);
  }
}
