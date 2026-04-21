import { NextRequest, NextResponse } from 'next/server';
import { getAllJobs, searchJobs, insertJob } from '../../../../lib/db/job';

function dbError(error: unknown) {
  if (error instanceof Error) {
    if (error.message.includes('FOREIGN KEY constraint')) {
      return NextResponse.json({ error: 'Referenced company not found' }, { status: 400 });
    }
  }
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const keyword = searchParams.get('keyword') ?? undefined;
    const category = searchParams.get('category') ?? undefined;

    if (keyword || category) {
      return NextResponse.json(searchJobs(keyword, category));
    }
    return NextResponse.json(getAllJobs());
  } catch (error) {
    return dbError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { Job_Title, Cmp_id } = body;
    if (!Job_Title || !Cmp_id) {
      return NextResponse.json({ error: 'Job_Title and Cmp_id are required' }, { status: 400 });
    }
    const result = insertJob(body);
    return NextResponse.json({ Job_id: result.lastInsertRowid }, { status: 201 });
  } catch (error) {
    return dbError(error);
  }
}
