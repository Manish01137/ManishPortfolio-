import {
  Code2, Server, Cloud, Layers, Sparkles, Rocket,
  Search, PenTool, Send,
  Github, Linkedin, Twitter, Mail
} from 'lucide-react'

export const NAV_LINKS = [
  { label: 'About',     href: '#about' },
  { label: 'Services',  href: '#services' },
  { label: 'Skills',    href: '#skills' },
  { label: 'Projects',  href: '#projects' },
  { label: 'Journey',   href: '#experience' },
  { label: 'Process',   href: '#process' },
  { label: 'Contact',   href: '#contact' }
]

export const STATS = [
  { value: 30, suffix: '+', label: 'Projects Delivered' },
  { value: 1,  suffix: '+', label: 'Years Freelancing' },
  { value: 15, suffix: '+', label: 'International Clients' },
  { value: 100, suffix: '%', label: 'Client Satisfaction' }
]

export const SERVICES = [
  {
    icon: Code2,
    title: 'Frontend Development',
    desc: 'Pixel-perfect, accessible interfaces built with React, Next.js and modern animation libraries that feel as good as they look.',
    tags: ['React', 'Next.js', 'Tailwind', 'Framer Motion']
  },
  {
    icon: Server,
    title: 'Backend Engineering',
    desc: 'Scalable APIs, auth, payments and data layers — designed for performance, security and clean developer experience.',
    tags: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL']
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    desc: 'Production-grade deployments on AWS with CI/CD, containerization and monitoring so your product ships reliably.',
    tags: ['AWS', 'Docker', 'CI/CD', 'Vercel']
  },
  {
    icon: Layers,
    title: 'Full-Stack Solutions',
    desc: 'End-to-end ownership from idea to launch — strategy, architecture, build and post-launch iteration as one partner.',
    tags: ['MERN', 'Next.js', 'Stripe', 'Auth']
  }
]

export const SKILLS = [
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Redux', 'Vite', 'HTML / CSS']
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'REST APIs', 'GraphQL', 'MongoDB', 'PostgreSQL', 'Prisma', 'JWT / OAuth']
  },
  {
    category: 'Cloud & DevOps',
    items: ['AWS (EC2, S3, Lambda)', 'Docker', 'GitHub Actions', 'Vercel', 'Netlify', 'Nginx', 'Linux']
  },
  {
    category: 'Tools & Other',
    items: ['Git', 'Figma', 'Postman', 'Stripe', 'Firebase', 'Socket.io', 'Three.js', 'Jest']
  }
]

// Live screenshot of the site (used in the case study modal).
const shot = (url) => `https://image.thum.io/get/width/1200/crop/800/noanimate/${url}`

// Themed Unsplash photos for each project — direct image URLs (free under Unsplash license).
// Replace any URL below with another Unsplash photo if you want a different vibe.
export const PROJECTS = [
  {
    title: 'WorkSaura',
    category: 'Creative Portfolio · Design',
    desc: 'A bold, motion-rich portfolio for a graphic designer — full-screen project galleries, smooth page transitions and a tactile, gallery-grade browsing experience built to make the work the hero.',
    tags: ['Next.js', 'Framer Motion', 'GSAP', 'Tailwind'],
    accent: 'from-brand-pink to-brand-gold',
    url: 'https://worksaura.com',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80',
    screenshot: shot('https://worksaura.com'),
    year: '2025',
    role: 'Design & Frontend',
    metrics: [
      { label: 'Lighthouse', value: '98' },
      { label: 'Load time', value: '0.9s' },
      { label: 'Sections', value: '6' }
    ],
    highlights: [
      'GSAP + Framer Motion page transitions for a gallery-grade feel',
      'Art-directed, full-bleed project showcases with lazy-loaded media',
      'Custom cursor and scroll-driven reveals tuned for 60fps',
      'Fully responsive down to small mobile with reduced-motion support'
    ]
  },
  {
    title: 'IndiColas',
    category: 'D2C Brand · Beverage',
    desc: 'Vibrant brand experience for a homegrown fizzy-drink label — “Pop The Fizz.” Playful scroll storytelling, animated product reveals and a punchy, conversion-focused landing built to make a soda feel premium.',
    tags: ['Next.js', 'Tailwind', 'GSAP', 'Vercel'],
    accent: 'from-brand-cyan to-brand-pink',
    url: 'https://indicolas.com',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1200&q=80',
    screenshot: shot('https://indicolas.com'),
    year: '2025',
    role: 'Full-stack',
    metrics: [
      { label: 'Lighthouse', value: '96' },
      { label: 'Bounce', value: '-22%' },
      { label: 'Flavors', value: '5' }
    ],
    highlights: [
      'Scroll-storytelling landing with animated product reveals',
      'Conversion-focused hero and CTA flow for D2C sign-ups',
      'CMS-driven flavor catalog so the brand can self-update',
      'Edge-deployed on Vercel with image optimization'
    ]
  },
  {
    title: 'StayliaDXB',
    category: 'Real Estate · Hospitality',
    desc: 'End-to-end short-term rental management platform for Dubai holiday homes — multi-platform listings, dynamic pricing, guest comms and investor reporting.',
    tags: ['Next.js', 'Node.js', 'MongoDB', 'AWS'],
    accent: 'from-brand-cyan to-brand-violet',
    url: 'https://stayliadxb.com',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    screenshot: shot('https://stayliadxb.com'),
    year: '2025',
    role: 'Full-stack',
    metrics: [
      { label: 'Listings', value: '120+' },
      { label: 'Channels', value: '4' },
      { label: 'Uptime', value: '99.9%' }
    ],
    highlights: [
      'Multi-platform listing sync (Airbnb, Booking.com and direct)',
      'Dynamic pricing engine driven by occupancy and seasonality',
      'Investor reporting dashboard with revenue analytics',
      'Deployed on AWS with automated backups and monitoring'
    ]
  },
  {
    title: 'Mershil Tech',
    category: 'AI Agency',
    desc: 'Marketing site for an AI-powered agency offering web, mobile and software development services with a modern, conversion-focused design.',
    tags: ['Next.js', 'Tailwind', 'Framer Motion', 'Vercel'],
    accent: 'from-brand-violet to-brand-cyan',
    url: 'https://mershiltech.com',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
    screenshot: shot('https://mershiltech.com'),
    year: '2025',
    role: 'Design & Frontend',
    metrics: [
      { label: 'Lighthouse', value: '97' },
      { label: 'Leads', value: '+35%' },
      { label: 'Pages', value: '8' }
    ],
    highlights: [
      'Conversion-first layout with clear service-to-CTA paths',
      'Framer Motion micro-interactions across the funnel',
      'SEO-optimized, server-rendered pages for organic reach',
      'Composable section system for fast content updates'
    ]
  },
  {
    title: 'Zevolution',
    category: 'Brand · Web',
    desc: 'Premium corporate web presence with custom animations, content-managed pages and a tightly tuned mobile experience.',
    tags: ['React', 'Tailwind', 'CMS', 'SEO'],
    accent: 'from-brand-violet to-brand-pink',
    url: 'https://zevolution.in',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80',
    screenshot: shot('https://zevolution.in'),
    year: '2024',
    role: 'Frontend',
    metrics: [
      { label: 'Lighthouse', value: '95' },
      { label: 'Mobile', value: '100%' },
      { label: 'Pages', value: '10' }
    ],
    highlights: [
      'Custom scroll animations on a performance budget',
      'Headless CMS so the team can edit without a developer',
      'Technical SEO pass: metadata, sitemap and structured data',
      'Pixel-tuned responsive layout across breakpoints'
    ]
  },
  {
    title: 'Kedar Shakti',
    category: 'E-commerce',
    desc: 'Spiritual products & fragrances store — incense, attars, malas and pooja essentials. Catalog, cart, secure checkout and order management.',
    tags: ['Next.js', 'Stripe', 'MongoDB', 'Tailwind'],
    accent: 'from-brand-gold to-brand-pink',
    url: 'https://kedarshakti.com',
    image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1200&q=80',
    screenshot: shot('https://kedarshakti.com'),
    year: '2024',
    role: 'Full-stack',
    metrics: [
      { label: 'Products', value: '80+' },
      { label: 'Checkout', value: '2-step' },
      { label: 'Payments', value: 'Stripe' }
    ],
    highlights: [
      'Full catalog, cart and secure Stripe checkout',
      'Order management dashboard for fulfilment',
      'Inventory model with categories and variants',
      'Mobile-first storefront optimized for conversions'
    ]
  },
  {
    title: 'JaldiRide Connect',
    category: 'Mobility · Booking',
    desc: 'Urban commute platform connecting riders to reliable city transport — search, booking flow, driver onboarding and live trip tracking.',
    tags: ['React', 'Node.js', 'Maps API', 'Socket.io'],
    accent: 'from-brand-cyan to-brand-gold',
    url: 'https://www.jaldirideconnect.com',
    image: 'https://images.unsplash.com/photo-1485463611174-f302f6a5c1c9?auto=format&fit=crop&w=1200&q=80',
    screenshot: shot('https://www.jaldirideconnect.com'),
    year: '2024',
    role: 'Full-stack',
    metrics: [
      { label: 'Live tracking', value: 'Realtime' },
      { label: 'Roles', value: '2' },
      { label: 'Maps', value: 'Integrated' }
    ],
    highlights: [
      'Realtime trip tracking with Socket.io',
      'Separate rider and driver onboarding flows',
      'Maps API integration for search and routing',
      'Booking pipeline from request to confirmation'
    ]
  },
  {
    title: 'KVS Academy',
    category: 'EdTech',
    desc: 'Education platform website with course catalog, admissions enquiry, faculty profiles and a CMS-driven announcements module.',
    tags: ['React', 'Node.js', 'MongoDB', 'CMS'],
    accent: 'from-brand-cyan to-brand-violet',
    url: 'https://www.kvsacademy.org',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
    screenshot: shot('https://www.kvsacademy.org'),
    year: '2024',
    role: 'Full-stack',
    metrics: [
      { label: 'Courses', value: '20+' },
      { label: 'CMS', value: 'Custom' },
      { label: 'Forms', value: 'Admissions' }
    ],
    highlights: [
      'Course catalog with admissions enquiry pipeline',
      'CMS-driven announcements the staff manage themselves',
      'Faculty profiles and structured content pages',
      'Accessible, school-friendly responsive UI'
    ]
  },
  {
    title: 'Pawan Hardu',
    category: 'Creative Portfolio',
    desc: 'Portfolio site for a professional video editor — cinematic reels, project showcase, motion-rich UI and an enquiry pipeline.',
    tags: ['Next.js', 'Tailwind', 'GSAP', 'Vercel'],
    accent: 'from-brand-pink to-brand-violet',
    url: 'https://pawanhardu.org',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
    screenshot: shot('https://pawanhardu.org'),
    year: '2024',
    role: 'Design & Frontend',
    metrics: [
      { label: 'Lighthouse', value: '96' },
      { label: 'Reels', value: 'Cinematic' },
      { label: 'Enquiries', value: 'Wired' }
    ],
    highlights: [
      'Cinematic, autoplay-aware reel showcase',
      'GSAP-driven motion that matches a video-editor brand',
      'Lightweight enquiry pipeline for new gigs',
      'Optimized media delivery on Vercel edge'
    ]
  }
]

export const PROCESS = [
  {
    icon: Search,
    step: '01',
    title: 'Discovery',
    desc: 'Understand goals, users and constraints — turn vague ideas into a clear, scoped roadmap.'
  },
  {
    icon: PenTool,
    step: '02',
    title: 'Design & Architecture',
    desc: 'Wireframes, UI direction and system design that balance speed-to-ship with long-term maintainability.'
  },
  {
    icon: Code2,
    step: '03',
    title: 'Build',
    desc: 'Iterative development with weekly demos, clean code and reviews so there are no surprises at launch.'
  },
  {
    icon: Rocket,
    step: '04',
    title: 'Launch & Iterate',
    desc: 'Deploy to production, monitor real users and ship continuous improvements based on real feedback.'
  }
]

// Career / experience timeline — edit freely to match your real journey.
export const EXPERIENCE = [
  {
    period: '2025 — Present',
    role: 'Freelance Full-Stack & Cloud Engineer',
    org: 'Self-employed · Global clients',
    desc: 'Designing and shipping end-to-end web products for international clients — from D2C brands to real-estate platforms. Own the full stack: UI, APIs, cloud and deployment.',
    tags: ['Next.js', 'Node.js', 'AWS', 'MongoDB']
  },
  {
    period: '2024',
    role: 'Full-Stack Developer (Contract)',
    org: 'Multiple startups & agencies',
    desc: 'Built e-commerce, EdTech and mobility platforms with realtime features, payments and CMS layers. Shipped fast without trading away maintainability.',
    tags: ['React', 'Express', 'Stripe', 'Socket.io']
  },
  {
    period: '2023',
    role: 'Frontend Developer',
    org: 'Early freelance projects',
    desc: 'Started taking on client work — marketing sites and brand portfolios with a focus on motion, performance and pixel-perfect responsive UI.',
    tags: ['JavaScript', 'Tailwind', 'Framer Motion', 'SEO']
  },
  {
    period: 'Foundations',
    role: 'Self-taught Engineer',
    org: 'Open source & side projects',
    desc: 'Learned by building in public — daily commits, experiments and continuous shipping that still drive how I work today.',
    tags: ['Git', 'DSA', 'System Design', 'Linux']
  }
]

export const TESTIMONIALS = [
  {
    quote: 'Manish delivered our MVP in record time without compromising quality. His ability to own both frontend and backend made the project incredibly smooth.',
    name: 'International Client',
    role: 'Founder, SaaS Startup'
  },
  {
    quote: 'One of the most reliable engineers I have worked with. Communicates clearly, ships fast, and treats the product like his own.',
    name: 'Product Lead',
    role: 'E-commerce Platform'
  },
  {
    quote: 'From cloud setup to a polished UI, Manish handled every layer of our stack. The end result felt premium and performed flawlessly.',
    name: 'CTO',
    role: 'AI Startup'
  }
]

export const SOCIALS = [
  { icon: Github,   href: 'https://github.com/',     label: 'GitHub'   },
  { icon: Linkedin, href: 'https://linkedin.com/',   label: 'LinkedIn' },
  { icon: Twitter,  href: 'https://twitter.com/',    label: 'Twitter'  },
  { icon: Mail,     href: 'mailto:hello@example.com', label: 'Email'   }
]

export const SendIcon = Send
export const SparkleIcon = Sparkles
