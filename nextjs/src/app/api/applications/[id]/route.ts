import { NextRequest, NextResponse } from 'next/server';
import { updateApplicationStatus, deleteApplication } from '../../../../../lib/db/application';
import type { AppStatus } from '../../../../../lib/db/types';

const VALID_STATUSES: AppStatus[] = ['applied', 'reviewing', 'accepted', 'rejected'];

function dbError(error: unknown) {
  if (error instanceof Error) {
    if (error.message.includes('UNIQUE constraint')) {
      return NextResponse.json({ error: 'Duplicate entry' }, { status: 409 });
    }
    if (error.message.includes('FOREIGN KEY constraint')) {
      return NextResponse.json({ error: 'Referenced record not found' }, { status: 400 });
    }
  }
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { App_Status } = await req.json();

    if (!App_Status) {
      return NextResponse.json({ error: 'App_Status is required' }, { status: 400 });
    }
    if (!VALID_STATUSES.includes(App_Status)) {
      return NextResponse.json(
        { error: `App_Status must be one of: ${VALID_STATUSES.join(', ')}` },
        { status: 400 }
      );
    }

    const result = updateApplicationStatus(Number(id), App_Status as AppStatus);
    if (result.changes === 0) return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    return dbError(error);
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const result = deleteApplication(Number(id));
    if (result.changes === 0) return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    return dbError(error);
  }
}
