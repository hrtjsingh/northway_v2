export const siteConfig = {
  name: "Northway ",
  title: "Immigration & Visa Agency Worldwide",
  description:
    "Expert immigration and visa services to help you achieve your dreams of studying and living abroad. Professional guidance for students and professionals worldwide.",
  url: "https://northwayvisa.com",
  phone: "+91-9876678717",
  email: "info@northwayvisa.com",
  address: "#J - 5 / 11 Gobind Colony, Rajpura",
  hours: "Mon - Sat: 10:00 AM - 6:00 PM",
  logo: "/logo.svg",
  longLogo: "/long_logo.svg",
  navigation: [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact Us", href: "/contact" },
  ],

  hero: {
    title: "Immigration & Visa",
    subtitle: "Agency Worldwide",
    description:
      "Northway Immigration Immigration & Visa offers expert guidance and support to make your dreams to study abroad and live in different countries come true.",
    cta: "Discover More",
    stats: [
      {
        number: "01",
        title: "Immigrations Experts",
        description: "Get expert advice on navigating immigration processes worldwide.",
      },
      {
        number: "02",
        title: "Apply for Your Student",
        description: "Easily apply for your visa with our online application support.",
      },
      {
        number: "03",
        title: "Consultation",
        description: "Receive personalized guidance to choose the right immigration path.",
      },
    ],
  },

  about: {
    title: "Immigration Services From",
    subtitle: "Experienced Agents",
    description:
      "The philosophy of our firm is to provide excellent, ethical legal services at reasonable fees, and to represent the client to the fullest extent possible, always operating within appropriate rules and regulations and showing respect for the business immigration is second to none.",
    features: [
      "We offer assistance to corporate and individuals in the field of immigration and business immigration to Canada, United Kingdom, United States of America, New Zealand, Italy, France and Germany.",
      "We operate through a network of business associates and are qualified immigration representatives across all over the world.",
    ],
  },

  services: {
    title: "We Provide Our Experts To",
    subtitle: "Generate Great Visa",
    description: "Choose your destination",
    destinations: [
      {
        title: "Study in UK",
        description:
          "Experience world-class education in the UK with top universities, diverse courses, and excellent career opportunities in a global career.",
        icon: "GraduationCap",
      },
      {
        title: "Study in USA",
        description:
          "Unlock excellent academic opportunities in the USA with world-renowned universities and cutting-edge research programs for global success.",
        icon: "BookOpen",
      },
      {
        title: "Study in Canada",
        description:
          "Benefit from high-quality education in Canada, known for its welcoming environment and excellent post-study work opportunities.",
        icon: "Users",
      },
    ],
  },

  visaService: {
    title: "Free Online Visa Service",
    description:
      "Take advantage of our Free Online Visa Service, offering hassle-free application support to help you secure your student visa quickly and efficiently for studying abroad.",
    cta: "Contact Us",
  },

  countries: [
    {
      name: "United Kingdom",
      description:
        "Explore world-class education in the United Kingdom, home to prestigious universities and rich cultural heritage. Whether you're pursuing undergraduate studies or advanced degrees, the UK offers excellent academic and career opportunities in a global career.",
      image: "/london-big-ben-tower-bridge-uk-landmarks.jpg",
      flag: "🇬🇧",
    },
    {
      name: "Australia",
      description:
        "Discover Australia's vibrant educational scene with top-ranking universities and diverse programs. Known for its high quality of life and excellent research facilities, Australia is the perfect destination for international students seeking academic success and adventure.",
      image: "/sydney-opera-house-australia-landmarks.jpg",
      flag: "🇦🇺",
    },
    {
      name: "United States",
      description:
        "Study in the United States, the global leader in innovation and research. With a wide range of universities and cutting-edge programs, the USA provides students with unmatched opportunities for academic and professional growth in diverse environments.",
      image: "/statue-of-liberty-new-york-usa-landmarks.jpg",
      flag: "🇺🇸",
    },
  ],

  testimonials: [
    {
      name: "Sarah Johnson",
      role: "Student - University of Oxford",
      content:
        "Northway Immigration made my dream of studying at Oxford a reality. Their expert guidance through the visa process was invaluable, and their support never wavered.",
      image: "/professional-woman-student.png",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Professional - Toronto, Canada",
      content:
        "The immigration process seemed overwhelming until I found Northway Immigration. Their team's expertise and personalized approach made everything smooth and stress-free.",
      image: "/professional-man-portrait.png",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      role: "Student - MIT, USA",
      content:
        "From application to arrival, Northway Immigration supported me every step of the way. I'm now pursuing my Master's at MIT thanks to their excellent service.",
      image: "/young-woman-student.png",
      rating: 5,
    },
  ],

  contact: {
    title: "Get In Touch",
    description:
      "Ready to start your immigration journey? Contact our expert team for personalized guidance and support.",
    form: {
      name: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      service: "Service Interested In",
      message: "Your Message",
      submit: "Send Message",
    },
    services: [
      "Student Visa Consultation",
      "Immigration Assessment",
      "Document Preparation",
      "Application Support",
      "Post-Arrival Services",
    ],
  },

  footer: {
    description:
      "Your trusted partner for immigration and visa services worldwide. We help make your dreams of studying and living abroad come true.",
    quickLinks: [
      { name: "About Us", href: "/about" },
      { name: "Services", href: "/services" },
      { name: "Countries", href: "/countries" },
      { name: "Contact", href: "/contact" },
    ],
    services: [
      { name: "Student Visas", href: "/contact" },
      { name: "Immigration Consultation", href: "/contact" },
      { name: "Document Services", href: "/contact" },
      { name: "Application Support", href: "/contact" },
    ],
    social: [
      { name: "Facebook", href: "#", icon: "Facebook" },
      { name: "Twitter", href: "#", icon: "Twitter" },
      { name: "LinkedIn", href: "#", icon: "Linkedin" },
      { name: "Instagram", href: "#", icon: "Instagram" },
    ],
  },
}

export type SiteConfig = typeof siteConfig
