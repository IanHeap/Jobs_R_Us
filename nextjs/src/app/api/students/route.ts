import { NextRequest, NextResponse } from 'next/server';
import { searchStudents, insertStudent } from '../../../../lib/db/student';

function dbError(error: unknown) {
  if (error instanceof Error) {
    if (error.message.includes('UNIQUE constraint')) {
      return NextResponse.json({ error: 'A student with that email already exists' }, { status: 409 });
    }
    if (error.message.includes('FOREIGN KEY constraint')) {
      return NextResponse.json({ error: 'Referenced university not found' }, { status: 400 });
    }
  }
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const major = searchParams.get('major') ?? undefined;
    const course = searchParams.get('course') ?? undefined;
    const gradYr = searchParams.get('gradYr') ? Number(searchParams.get('gradYr')) : undefined;
    return NextResponse.json(searchStudents({ major, course, gradYr }));
  } catch (error) {
    return dbError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { Stu_Name, Stu_Email, Uni_id } = body;
    if (!Stu_Name || !Stu_Email || !Uni_id) {
      return NextResponse.json({ error: 'Stu_Name, Stu_Email, and Uni_id are required' }, { status: 400 });
    }
    const result = insertStudent(body);
    return NextResponse.json({ Stu_id: result.lastInsertRowid }, { status: 201 });
  } catch (error) {
    return dbError(error);
  }
}
