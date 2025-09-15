// /api/admin/auth (App Router)
import { NextResponse } from 'next/server';
import { validatePassword } from '@/lib/passwordUtils';
import { connectToDatabase } from '@/lib/mongo';
import { SiteConfigModel } from '@/lib/schema';

export async function POST(req: Request) {
  await connectToDatabase();

  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ message: 'Username and password are required' }, { status: 400 });
  }

  try {
    const siteConfig = await SiteConfigModel.findOne();

    if (!siteConfig) {
      return NextResponse.json({ message: 'Admin configuration not found' }, { status: 401 });
    }

    const storedUsername = siteConfig.admin.username;
    const storedHashedPassword = siteConfig.admin.password;

    if (username !== storedUsername) {
      return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
    }

    const isValidPassword = await validatePassword(password, storedHashedPassword);

    if (isValidPassword) {
      return NextResponse.json({ message: 'Login successful' }, { status: 200 });
    }

    return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json({ message: 'An error occurred during login' }, { status: 500 });
  }
}