import { NextResponse } from 'next/server';
import { getStudentsWithUniversity } from '../../../../../lib/db/advanced';

export async function GET() {
  try {
    return NextResponse.json(getStudentsWithUniversity());
  } catch (_error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
