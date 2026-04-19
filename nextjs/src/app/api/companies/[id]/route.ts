import { NextRequest, NextResponse } from 'next/server';
import { getCompanyById, deleteCompany, updateCompany } from '../../../../../lib/db/company';

function dbError(error: unknown) {
  if (error instanceof Error && error.message.includes('UNIQUE constraint')) {
    return NextResponse.json({ error: 'A company with that email already exists' }, { status: 409 });
  }
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const company = getCompanyById(Number(id));
    if (!company) return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    return NextResponse.json(company);
  } catch (error) {
    return dbError(error);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const result = updateCompany(Number(id), body);
    if (result.changes === 0) return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    return dbError(error);
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const result = deleteCompany(Number(id));
    if (result.changes === 0) return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    return dbError(error);
  }
}
