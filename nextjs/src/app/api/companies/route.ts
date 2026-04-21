import { NextRequest, NextResponse } from 'next/server';
import { getAllCompanies, searchCompaniesByRequirement, insertCompany } from '../../../../lib/db/company';

function dbError(error: unknown) {
  if (error instanceof Error && error.message.includes('UNIQUE constraint')) {
    return NextResponse.json({ error: 'A company with that email already exists' }, { status: 409 });
  }
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
}

export async function GET(req: NextRequest) {
  try {
    const keyword = req.nextUrl.searchParams.get('keyword');
    return NextResponse.json(keyword ? searchCompaniesByRequirement(keyword) : getAllCompanies());
  } catch (error) {
    return dbError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.Cmp_Name) {
      return NextResponse.json({ error: 'Cmp_Name is required' }, { status: 400 });
    }
    const result = insertCompany(body);
    return NextResponse.json({ Cmp_id: result.lastInsertRowid }, { status: 201 });
  } catch (error) {
    return dbError(error);
  }
}
