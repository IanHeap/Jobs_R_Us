import { NextRequest, NextResponse } from 'next/server';
import { getJobById, updateJob, deleteJob } from '../../../../../lib/db/job';

function dbError(error: unknown) {
  if (error instanceof Error) {
    if (error.message.includes('FOREIGN KEY constraint')) {
      return NextResponse.json({ error: 'Referenced company not found' }, { status: 400 });
    }
  }
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const job = getJobById(Number(id));
    if (!job) return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    return NextResponse.json(job);
  } catch (error) {
    return dbError(error);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const result = updateJob(Number(id), body);
    if (result.changes === 0) return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    return dbError(error);
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const result = deleteJob(Number(id));
    if (result.changes === 0) return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    return dbError(error);
  }
}
