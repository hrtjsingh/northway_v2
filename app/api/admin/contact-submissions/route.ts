// /api/admin/contact-submissions (App Router)
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongo';
import { ContactSubmissionModel } from '@/lib/schema';

export async function GET() {
  await connectToDatabase();
  try {
    const submissions = await ContactSubmissionModel.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ submissions }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch contact submissions:', error);
    return NextResponse.json({ message: 'Failed to fetch submissions' }, { status: 500 });
  }
}

