// /api/admin/config/seed (App Router)
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongo';
import { SiteConfigModel, ISiteConfig } from '@/lib/schema';
import { siteConfig } from '@/lib/site-config';
import { hashPassword } from '@/lib/passwordUtils';

export async function POST() {
  await connectToDatabase();

  try {
    const existing = await SiteConfigModel.findOne();
    if (existing) {
      return NextResponse.json({ message: 'Site configuration already exists' }, { status: 200 });
    }

    const {
      name,
      title,
      description,
      logo,
      longLogo,
      phone,
      email,
      address,
      hours,
      admin,
      hero,
      about,
      services,
      visaService,
      countries,
      testimonials,
      contact,
      footer,
    } = siteConfig as unknown as ISiteConfig;
// console.log(siteConfig)
    const hashedPassword = await hashPassword((admin as any).password);

    const doc = await SiteConfigModel.create({
      name,
      title,
      description,
      logo,
      longLogo,
      phone,
      email,
      address,
      hours,
      admin: { username: (admin as any).username, password: hashedPassword },
      hero,
      about,
      services,
      visaService,
      countries,
      testimonials,
      contact,
      footer
    });

    const { admin: createdAdmin, ...rest } = doc.toObject();
    const safeConfig = { ...rest, admin: { ...createdAdmin, password: '[PROTECTED]' } };

    return NextResponse.json({ message: 'Initial site configuration created', config: safeConfig }, { status: 201 });
  } catch (error) {
    console.error('Failed to seed site config:', error);
    return NextResponse.json({ message: 'Failed to seed site config' }, { status: 500 });
  }
}


