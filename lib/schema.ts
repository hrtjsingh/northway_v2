import mongoose, { Schema, Document } from "mongoose";

// Define interfaces for the nested objects to ensure type safety
export interface IAdmin {
  username: string;
  password: string; // In a real application, this should be hashed!
}

export interface IHeroStat {
  number: string;
  title: string;
  description: string;
}

export interface IHero {
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  bg: string;
  stats: IHeroStat[];
}

export interface IAbout {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
}

export interface IDestination {
  title: string;
  description: string;
  icon: string;
}

export interface IVisaService {
  title: string;
  description: string;
  cta: string;
}

export interface IServices {
  title: string;
  subtitle: string;
  destinations: IDestination[];
}

export interface ICountry {
  name: string;
  description: string;
  image: string;
  flag: string;
}

export interface ITestimonial {
  name: string;
  role: string;
  content: string;
  image: string;
  rating: number;
}

export interface IContactSubmission extends Document {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  createdAt: Date;
}
type FooterLink = {
  name: string;
  href: string;
};

type SocialLink = {
  name: string;
  href: string;
  icon: string; // or a more specific union type if you have fixed icons
};

export type IFooter = {
  description: string;
  quickLinks: FooterLink[];
  services: FooterLink[];
  social: SocialLink[];
};

export type Contact = {
  title: string;
  description: string;
  form: {
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
    submit: string;
  };
  services: string[];
};
// Main SiteConfig interface
export interface ISiteConfig extends Document {
  name: string;
  title: string;
  description: string;
  logo?: string;
  longLogo?: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
  admin: IAdmin;
  hero: IHero;
  about: IAbout;
  services: IServices;
  visaService: IVisaService; // Moved visaService out of services, as it's a top-level tab
  countries: ICountry[];
  testimonials: ITestimonial[];
  contact: Contact;
  footer: IFooter;
}

// Define the Mongoose schema
const AdminSchema = new Schema<IAdmin>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true }, // Store hashed passwords in production!
  },
  { _id: false }
); // No _id for subdocuments unless specifically needed

const HeroStatSchema = new Schema<IHeroStat>(
  {
    number: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false }
);

const HeroSchema = new Schema<IHero>(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    cta: { type: String, required: true },
    bg: { type: String, required: true },
    stats: [HeroStatSchema], // Array of HeroStatSchema
  },
  { _id: false }
);

const AboutSchema = new Schema<IAbout>(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    features: [{ type: String, required: true }], // Array of strings
  },
  { _id: false }
);

const DestinationSchema = new Schema<IDestination>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
  },
  { _id: false }
);

const VisaServiceSchema = new Schema<IVisaService>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    cta: { type: String, required: true },
  },
  { _id: false }
);

const ServicesSchema = new Schema<IServices>(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    destinations: [DestinationSchema], // Array of DestinationSchema
  },
  { _id: false }
);

const CountrySchema = new Schema<ICountry>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  flag: { type: String, required: true },
});

const TestimonialSchema = new Schema<ITestimonial>({
  name: { type: String, required: true },
  role: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
});

const ContactSubmissionSchema = new Schema<IContactSubmission>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const FooterLinkSchema = new Schema(
  {
    name: { type: String, required: true },
    href: { type: String, required: true },
  },
  { _id: false }
);

const SocialLinkSchema = new Schema(
  {
    name: { type: String, required: true },
    href: { type: String, required: true },
    icon: { type: String, required: true },
  },
  { _id: false }
);

const FooterSchema = new Schema(
  {
    description: { type: String, required: true },
    quickLinks: { type: [FooterLinkSchema], required: true },
    services: { type: [FooterLinkSchema], required: true },
    social: { type: [SocialLinkSchema], required: true },
  },
  { _id: false }
);

const ContactSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    form: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      service: { type: String, required: true },
      message: { type: String, required: true },
      submit: { type: String, required: true },
    },
    services: [{ type: String, required: true }],
  },
  { _id: false }
);
const SiteConfigSchema = new Schema<ISiteConfig>({
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  logo: { type: String, required: false },
  longLogo: { type: String, required: false },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  hours: { type: String, required: true },
  admin: { type: AdminSchema, required: true },
  hero: { type: HeroSchema, required: true },
  about: { type: AboutSchema, required: true },
  services: { type: ServicesSchema, required: true },
  visaService: { type: VisaServiceSchema, required: true },
  countries: [CountrySchema],
  testimonials: [TestimonialSchema],
  contact: { type: ContactSchema, required: true },
  footer: { type: FooterSchema, required: true },
});

export const SiteConfigModel =
  mongoose.models.SiteConfig ||
  mongoose.model<ISiteConfig>("SiteConfig", SiteConfigSchema);

export const ContactSubmissionModel =
  mongoose.models.ContactSubmission ||
  mongoose.model<IContactSubmission>(
    "ContactSubmission",
    ContactSubmissionSchema
  );
