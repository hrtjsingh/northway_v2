// /api/contact (App Router)
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongo';
import { ContactSubmissionModel } from '@/lib/schema';

export async function POST(req: Request) {
  await connectToDatabase();
  try {
    const { name, email, phone, service, message } = await req.json();

    if (!name || !email || !phone || !service || !message) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    await ContactSubmissionModel.create({ name, email, phone, service, message });
    return NextResponse.json({ message: 'Message received' }, { status: 201 });
  } catch (error) {
    console.error('Contact submission failed:', error);
    return NextResponse.json({ message: 'Failed to submit message' }, { status: 500 });
  }
}

