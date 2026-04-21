import { NextRequest, NextResponse } from 'next/server';
import { getAllUniversities, insertUniversity } from '../../../../lib/db/university';

function dbError(error: unknown) {
  if (error instanceof Error && error.message.includes('UNIQUE constraint')) {
    return NextResponse.json({ error: 'A university with that email already exists' }, { status: 409 });
  }
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
}

export async function GET() {
  try {
    return NextResponse.json(getAllUniversities());
  } catch (error) {
    return dbError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.Uni_Name) {
      return NextResponse.json({ error: 'Uni_Name is required' }, { status: 400 });
    }
    const result = insertUniversity(body);
    return NextResponse.json({ Uni_id: result.lastInsertRowid }, { status: 201 });
  } catch (error) {
    return dbError(error);
  }
}
