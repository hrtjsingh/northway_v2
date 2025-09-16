import { connectToDatabase } from "@/lib/mongo"
import { SiteConfigModel, ISiteConfig } from "@/lib/schema"
// Static fallback only for seed/type – do not import at runtime in client
import { siteConfig as staticConfig } from "@/lib/site-config"

export type SeoConfig = {
  name: string
  title: string
  description: string
  url: string
  email?: string
  phone?: string
  address?: string
  logo?: string
  longLogo?: string
}

export async function getSeoConfig(): Promise<SeoConfig> {
  try {
    await connectToDatabase()
    const dbConfig = (await SiteConfigModel.findOne()
      .select("name title description email phone address")
      .lean()) as Partial<ISiteConfig> | null
    return {
      name: dbConfig?.name ?? staticConfig.name,
      title: dbConfig?.title ?? staticConfig.title,
      description: dbConfig?.description ?? staticConfig.description,
      url: staticConfig.url,
      email: dbConfig?.email ?? staticConfig.email,
      phone: dbConfig?.phone ?? staticConfig.phone,
      address: dbConfig?.address ?? staticConfig.address,
      logo: staticConfig.logo,
      longLogo: staticConfig.longLogo,
    }
  } catch {
    return {
      name: staticConfig.name,
      title: staticConfig.title,
      description: staticConfig.description,
      url: staticConfig.url,
      email: staticConfig.email,
      phone: staticConfig.phone,
      address: staticConfig.address,
      logo: staticConfig.logo,
      longLogo: staticConfig.longLogo,
    }
  }
}


