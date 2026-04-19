import { NextRequest, NextResponse } from 'next/server';
import { getStudentById, deleteStudent, updateStudent } from '../../../../../lib/db/student';

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

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const student = getStudentById(Number(id));
    if (!student) return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    return NextResponse.json(student);
  } catch (error) {
    return dbError(error);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const result = updateStudent(Number(id), body);
    if (result.changes === 0) return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    return dbError(error);
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const result = deleteStudent(Number(id));
    if (result.changes === 0) return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    return dbError(error);
  }
}
