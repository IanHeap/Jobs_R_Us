import { NextRequest, NextResponse } from 'next/server';
import { filterStudentsByGPA } from '../../../../../lib/db/student';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const min = searchParams.get('min') !== null ? Number(searchParams.get('min')) : 0;
    const max = searchParams.get('max') !== null ? Number(searchParams.get('max')) : 4.0;

    if (Number.isNaN(min) || Number.isNaN(max)) {
      return NextResponse.json({ error: 'min and max must be valid numbers' }, { status: 400 });
    }

    const students = filterStudentsByGPA(min, max);
    return NextResponse.json(students);
  } catch (_error) {
    return NextResponse.json({ error: 'Failed to filter students' }, { status: 500 });
  }
}
