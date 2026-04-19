import { NextResponse } from 'next/server';
import { getApplicationCountPerCompany } from '../../../../../lib/db/advanced';

export async function GET() {
  try {
    return NextResponse.json(getApplicationCountPerCompany());
  } catch (_error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
