import { NextResponse } from 'next/server';
import { getAverageGPAByUniversity } from '../../../../../lib/db/advanced';

export async function GET() {
  try {
    return NextResponse.json(getAverageGPAByUniversity());
  } catch (_error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
