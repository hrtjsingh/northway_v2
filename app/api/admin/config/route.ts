import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongo';
import { SiteConfigModel, ISiteConfig } from '@/lib/schema'; 
import { hashPassword } from '@/lib/passwordUtils'; 

export async function GET() {
  await connectToDatabase();
  try {
    const config = await SiteConfigModel.findOne();
    if (!config) {
      return NextResponse.json({ message: 'Site configuration not found' }, { status: 404 });
    }
    const { admin, ...restConfig } = config.toObject();
    const configWithoutPassword = { ...restConfig, admin: { ...admin, password: '' } };
    return NextResponse.json(configWithoutPassword, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch site config:', error);
    return NextResponse.json({ message: 'Failed to fetch site config' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await connectToDatabase();

  // IMPORTANT: Add authentication/authorization before allowing updates.

  try {
    const updatedConfigData = (await req.json()) as ISiteConfig;

    const currentConfig = await SiteConfigModel.findOne();

    if (currentConfig && updatedConfigData.admin.password !== currentConfig.admin.password) {
      updatedConfigData.admin.password = await hashPassword(updatedConfigData.admin.password);
    } else if (!currentConfig && updatedConfigData.admin.password) {
      updatedConfigData.admin.password = await hashPassword(updatedConfigData.admin.password);
    }

    const config = await SiteConfigModel.findOneAndUpdate({}, updatedConfigData, {
      new: true,
      upsert: true,
    });

    const { admin, ...restConfig } = config.toObject();
    const configWithoutPassword = { ...restConfig, admin: { ...admin, password: '[PROTECTED]' } };

    return NextResponse.json({ message: 'Configuration saved successfully!', config: configWithoutPassword }, { status: 200 });
  } catch (error) {
    console.error('Failed to save site config:', error);
    return NextResponse.json({ message: 'Failed to save configuration' }, { status: 500 });
  }
}