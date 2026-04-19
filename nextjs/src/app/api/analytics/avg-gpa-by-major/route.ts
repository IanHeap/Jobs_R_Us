import { NextResponse } from 'next/server';
import { getAverageGPAByMajor } from '../../../../../lib/db/advanced';

export async function GET() {
  try {
    return NextResponse.json(getAverageGPAByMajor());
  } catch (_error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
