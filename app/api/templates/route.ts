import { NextResponse } from 'next/server';
import { templates } from '@/lib/templates';

export async function GET() {
  try {
    return NextResponse.json({ success: true, data: templates });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
