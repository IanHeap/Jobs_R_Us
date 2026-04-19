import { NextRequest, NextResponse } from 'next/server';
import { getAllApplications, insertApplication } from '../../../../lib/db/application';

function dbError(error: unknown) {
  if (error instanceof Error) {
    if (error.message.includes('UNIQUE constraint')) {
      return NextResponse.json({ error: 'Student has already applied to this company' }, { status: 409 });
    }
    if (error.message.includes('FOREIGN KEY constraint')) {
      return NextResponse.json({ error: 'Student or company not found' }, { status: 400 });
    }
  }
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
}

export async function GET() {
  try {
    return NextResponse.json(getAllApplications());
  } catch (error) {
    return dbError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { Stu_id, Cmp_id } = await req.json();
    if (!Stu_id || !Cmp_id) {
      return NextResponse.json({ error: 'Stu_id and Cmp_id are required' }, { status: 400 });
    }
    const result = insertApplication(Number(Stu_id), Number(Cmp_id));
    return NextResponse.json({ App_id: result.lastInsertRowid }, { status: 201 });
  } catch (error) {
    return dbError(error);
  }
}
