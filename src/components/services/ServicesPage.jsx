import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './ServicesPage.css';

const SvcIcon = ({ children }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-5"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const serviceIcons = {
  search: (
    <SvcIcon>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M20 20l-4.8-4.8" />
    </SvcIcon>
  ),
  pin: (
    <SvcIcon>
      <path d="M12 21s7-6.3 7-11.8A7 7 0 0 0 5 9.2C5 14.7 12 21 12 21Z" />
      <circle cx="12" cy="9.3" r="2.4" />
    </SvcIcon>
  ),
  gear: (
    <SvcIcon>
      <circle cx="12" cy="12" r="3.3" />
      <path d="M12 3.5v2.3M12 18.2v2.3M20.5 12h-2.3M5.8 12H3.5M17.8 6.2l-1.6 1.6M7.8 16.2l-1.6 1.6M17.8 17.8l-1.6-1.6M7.8 7.8 6.2 6.2" />
    </SvcIcon>
  ),
  pencil: (
    <SvcIcon>
      <path d="M4 20l.7-4L16.4 4.3a1.8 1.8 0 0 1 2.6 0l.7.7a1.8 1.8 0 0 1 0 2.6L8 19.3 4 20Z" />
      <path d="M14.3 6.4l3.3 3.3" />
    </SvcIcon>
  ),
  megaphone: (
    <SvcIcon>
      <path d="M3 10v4a1.4 1.4 0 0 0 1.4 1.4H6l7 4.6V4L6 8.6H4.4A1.4 1.4 0 0 0 3 10Z" />
      <path d="M17 8.5c1.4 1 1.4 6 0 7M20 6.5c2.4 2.2 2.4 8.8 0 11" />
    </SvcIcon>
  ),
  thumb: (
    <SvcIcon>
      <path d="M7 21H4.5A1.5 1.5 0 0 1 3 19.5V12A1.5 1.5 0 0 1 4.5 10.5H7Z" />
      <path d="M7 10.8l4-7c1.6 0 2.6 1.4 2.2 2.9L12.4 9.5H18a2 2 0 0 1 1.9 2.7l-2.2 6.7A2 2 0 0 1 15.8 21H7Z" />
    </SvcIcon>
  ),
  camera: (
    <SvcIcon>
      <path d="M3.5 8.2A1.6 1.6 0 0 1 5.1 6.6h2l1-2h7.8l1 2h2A1.6 1.6 0 0 1 20.5 8.2v9.2a1.6 1.6 0 0 1-1.6 1.6H5.1a1.6 1.6 0 0 1-1.6-1.6Z" />
      <circle cx="12" cy="12.6" r="3.6" />
    </SvcIcon>
  ),
  briefcase: (
    <SvcIcon>
      <rect x="2.7" y="7.3" width="18.6" height="12" rx="1.6" />
      <path d="M8.5 7.3V5.6a1.6 1.6 0 0 1 1.6-1.6h3.8a1.6 1.6 0 0 1 1.6 1.6v1.7M2.7 12.7h18.6" />
    </SvcIcon>
  ),
  target: (
    <SvcIcon>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.8" />
      <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
    </SvcIcon>
  ),
  compass: (
    <SvcIcon>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M15.3 8.7 13.6 13.6 8.7 15.3l1.7-4.9Z" />
    </SvcIcon>
  ),
  palette: (
    <SvcIcon>
      <path d="M12 3a9 8 0 1 0 0 16c1.4 0 1.9-1 1.4-2-.4-.8.1-1.7 1-1.7H16a5 4.3 0 0 0 5-4.3C21 6.6 17 3 12 3Z" />
      <circle cx="7.6" cy="11.5" r="1.15" fill="currentColor" stroke="none" />
      <circle cx="10.5" cy="7.6" r="1.15" fill="currentColor" stroke="none" />
      <circle cx="15" cy="7.9" r="1.15" fill="currentColor" stroke="none" />
      <circle cx="17" cy="12" r="1.15" fill="currentColor" stroke="none" />
    </SvcIcon>
  ),
  sparkle: (
    <SvcIcon>
      <path d="M12 3.5c.6 3.4 1.8 4.7 5.3 5.3-3.5.6-4.7 1.9-5.3 5.3-.6-3.4-1.8-4.7-5.3-5.3 3.5-.6 4.7-1.9 5.3-5.3Z" />
      <path d="M18.5 15.3c.3 1.7.9 2.3 2.6 2.6-1.7.3-2.3.9-2.6 2.6-.3-1.7-.9-2.3-2.6-2.6 1.7-.3 2.3-.9 2.6-2.6Z" />
    </SvcIcon>
  ),
  film: (
    <SvcIcon>
      <rect x="3" y="4.5" width="18" height="15" rx="1.6" />
      <path d="M8 4.5v15M16 4.5v15M3 9.5h5M16 9.5h5M3 14.5h5M16 14.5h5" />
    </SvcIcon>
  ),
  brush: (
    <SvcIcon>
      <path d="M15.5 3.5c1.6 0 3 1.4 3 3 0 2.3-3.4 4.6-6.3 6.5l-2.9-2.9c1.9-2.9 4.2-6.6 6.2-6.6Z" />
      <path d="M9.6 11.7 5 16.3c-1 1-1.2 3-.7 3.5.5.5 2.5.3 3.5-.7l4.6-4.6" />
    </SvcIcon>
  ),
  globe: (
    <SvcIcon>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.4 2.3 3.6 5.3 3.6 8.5s-1.2 6.2-3.6 8.5c-2.4-2.3-3.6-5.3-3.6-8.5S9.6 5.8 12 3.5Z" />
    </SvcIcon>
  ),
  react: (
    <SvcIcon>
      <circle cx="12" cy="12" r="1.9" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="9.5" ry="4" />
      <ellipse cx="12" cy="12" rx="9.5" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9.5" ry="4" transform="rotate(120 12 12)" />
    </SvcIcon>
  ),
  node: (
    <SvcIcon>
      <path d="M12 2.7 20.5 7.5v9L12 21.3 3.5 16.5v-9Z" />
      <path d="M9 10v4.4M12 9.2v5.8M15 10.6v3.2" />
    </SvcIcon>
  ),
  grid: (
    <SvcIcon>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.2" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.2" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.2" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.2" />
    </SvcIcon>
  ),
  mobile: (
    <SvcIcon>
      <rect x="6" y="2.5" width="12" height="19" rx="2.4" />
      <path d="M10.6 18h2.8" />
    </SvcIcon>
  ),
  link: (
    <SvcIcon>
      <path d="M9.5 14.5 14.5 9.5" />
      <path d="M11 6.5 12.4 5A4 4 0 1 1 18 10.6l-1.5 1.5M13 17.5 11.6 19A4 4 0 1 1 6 13.4l1.5-1.5" />
    </SvcIcon>
  ),
  wrench: (
    <SvcIcon>
      <path d="M14.7 9.3a4.6 4.6 0 0 1-6 6L4 20l-1-1 4.7-4.7a4.6 4.6 0 0 1 6-6L11 10l2 2 2.7-2.7Z" />
    </SvcIcon>
  ),
  mail: (
    <SvcIcon>
      <rect x="2.7" y="5" width="18.6" height="14" rx="1.8" />
      <path d="M3.5 6.2 12 13l8.5-6.8" />
    </SvcIcon>
  ),
  magnet: (
    <SvcIcon>
      <path d="M8.5 3.5v7.7a3.5 3.5 0 0 0 7 0V3.5" />
      <path d="M8.5 3.5H4.7v7.7a7.3 7.3 0 0 0 14.6 0V3.5h-3.8" />
      <path d="M4.7 6.8h3.8M15.5 6.8h3.8" />
    </SvcIcon>
  ),
  trend: (
    <SvcIcon>
      <path d="M3 17 9.5 10.5 13.5 14.5 21 6.5" />
      <path d="M15.5 6.5H21v5.5" />
    </SvcIcon>
  ),
  brain: (
    <SvcIcon>
      <path d="M9.5 4.2a3 3 0 0 0-3 3v.6A3 3 0 0 0 4.5 11a3 3 0 0 0 1.2 5.6 3 3 0 0 0 3 3.2 3 3 0 0 0 .8-.1V4.4a3 3 0 0 0-.8-.2Z" />
      <path d="M14.5 4.2a3 3 0 0 1 3 3v.6a3 3 0 0 1 2 3.2 3 3 0 0 1-1.2 5.6 3 3 0 0 1-3 3.2 3 3 0 0 1-.8-.1V4.4c.25-.1.5-.15.8-.2Z" />
    </SvcIcon>
  ),
};

const serviceCategories = [
  {
    id: 'seo',
    eyebrow: 'Search & Content',
    selectorTitle: 'Search Engine Optimization',
    sectionTitleLines: ['Search Engine', 'Optimization'],
    sectionTitle: 'Search Engine Optimization',
    sectionSubtitle:
      'Rank higher, get found faster, and turn organic search into a predictable growth channel.',
    defaultActiveItem: 'technical-seo',
    items: [
      {
        id: 'seo-strategy',
        titleLines: ['Search Engine', 'Optimization'],
        title: 'Search Engine Optimization',
        description:
          'Full-funnel SEO strategy covering on-page, off-page and content signals.',
        icon: serviceIcons.search,
        contactService: 'Search Engine Optimization',
      },
      {
        id: 'local-seo',
        titleLines: ['Local', 'SEO'],
        title: 'Local SEO',
        description:
          'Google Business Profile optimization and local citations that win the map pack.',
        icon: serviceIcons.pin,
        contactService: 'Local SEO',
      },
      {
        id: 'technical-seo',
        titleLines: ['Technical', 'SEO'],
        title: 'Technical SEO',
        description:
          'Site speed, crawlability and structured data fixes that remove ranking blockers.',
        icon: serviceIcons.gear,
        contactService: 'Technical SEO',
      },
      {
        id: 'content-marketing',
        titleLines: ['Content', 'Marketing'],
        title: 'Content Marketing',
        description:
          'SEO-driven content calendars and long-form assets that build topical authority.',
        icon: serviceIcons.pencil,
        contactService: 'Content Marketing',
      },
    ],
  },
  {
    id: 'smm',
    eyebrow: 'Social & Paid',
    selectorTitle: 'Social Media Marketing',
    sectionTitleLines: ['Social Media', 'Marketing'],
    sectionTitle: 'Social Media Marketing',
    sectionSubtitle:
      'Platform-native content and paid campaigns that build community and drive demand.',
    defaultActiveItem: 'instagram-marketing',
    items: [
      {
        id: 'smm-strategy',
        titleLines: ['Social Media', 'Marketing'],
        title: 'Social Media Marketing',
        description:
          'End-to-end strategy, content calendars and community management across channels.',
        icon: serviceIcons.megaphone,
        contactService: 'Social Media Marketing',
      },
      {
        id: 'facebook-marketing',
        titleLines: ['Facebook', 'Marketing'],
        title: 'Facebook Marketing',
        description:
          'Page growth, ad funnels and retargeting campaigns built for conversions.',
        icon: serviceIcons.thumb,
        contactService: 'Facebook Marketing',
      },
      {
        id: 'instagram-marketing',
        titleLines: ['Instagram', 'Marketing'],
        title: 'Instagram Marketing',
        description:
          'Reels, carousels and influencer collaborations tuned to platform trends.',
        icon: serviceIcons.camera,
        contactService: 'Instagram Marketing',
      },
      {
        id: 'linkedin-marketing',
        titleLines: ['LinkedIn', 'Marketing'],
        title: 'LinkedIn Marketing',
        description:
          'B2B thought-leadership content and lead-gen campaigns for decision-makers.',
        icon: serviceIcons.briefcase,
        contactService: 'LinkedIn Marketing',
      },
      {
        id: 'google-ads',
        titleLines: ['Google', 'Ads'],
        title: 'Google Ads',
        description:
          'Search, display and shopping campaigns managed for maximum ROAS.',
        icon: serviceIcons.target,
        contactService: 'Google Ads',
      },
    ],
  },
  {
    id: 'branding',
    eyebrow: 'Brand & Creative',
    selectorTitle: 'Branding & Graphic Design',
    sectionTitleLines: ['Branding &', 'Graphic Design'],
    sectionTitle: 'Branding & Graphic Design',
    sectionSubtitle:
      'Visual identity and content production that makes your brand instantly recognizable.',
    defaultActiveItem: 'logo-design',
    items: [
      {
        id: 'brand-strategy',
        titleLines: ['Brand', 'Strategy'],
        title: 'Brand Strategy',
        description:
          'Positioning, messaging and voice frameworks that align every touchpoint.',
        icon: serviceIcons.compass,
        contactService: 'Brand Strategy',
      },
      {
        id: 'graphic-design',
        titleLines: ['Graphic', 'Design'],
        title: 'Graphic Design',
        description:
          'Marketing collateral, social creatives and print design built to convert.',
        icon: serviceIcons.palette,
        contactService: 'Graphic Design',
      },
      {
        id: 'logo-design',
        titleLines: ['Logo', 'Design'],
        title: 'Logo Design',
        description:
          'Distinctive marks and visual systems that scale across every channel.',
        icon: serviceIcons.sparkle,
        contactService: 'Logo Design',
      },
      {
        id: 'content-creation',
        titleLines: ['Content', 'Creation'],
        title: 'Content Creation',
        description:
          'Scroll-stopping content produced for social, web and paid campaigns.',
        icon: serviceIcons.film,
        contactService: 'Content Creation',
      },
      {
        id: 'video-editing',
        titleLines: ['Video', 'Editing'],
        title: 'Video Editing',
        description:
          'Reels, ads and brand films edited for retention and platform specs.',
        icon: serviceIcons.film,
        contactService: 'Video Editing',
      },
      {
        id: 'photography',
        titleLines: ['Photography'],
        title: 'Photography',
        description:
          'Product, brand and event photography for campaigns and catalogues.',
        icon: serviceIcons.camera,
        contactService: 'Photography',
      },
    ],
  },
  {
    id: 'webdev',
    eyebrow: 'Engineering',
    selectorTitle: 'Website Design & Development',
    sectionTitleLines: ['Website Design &', 'Development'],
    sectionTitle: 'Website Design & Development',
    sectionSubtitle:
      'Fast, accessible, conversion-ready websites built on modern frameworks.',
    defaultActiveItem: 'react-development',
    items: [
      {
        id: 'website-design',
        titleLines: ['Website', 'Design'],
        title: 'Website Design',
        description:
          'UI/UX design systems focused on clarity, brand and conversion.',
        icon: serviceIcons.brush,
        contactService: 'Website Design',
      },
      {
        id: 'website-development',
        titleLines: ['Website', 'Development'],
        title: 'Website Development',
        description:
          'Custom-built, SEO-ready websites delivered on modern, maintainable code.',
        icon: serviceIcons.globe,
        contactService: 'Website Development',
      },
      {
        id: 'react-development',
        titleLines: ['React', 'Development'],
        title: 'React Development',
        description:
          'Component-driven front-ends built for performance and scalability.',
        icon: serviceIcons.react,
        contactService: 'React Development',
      },
      {
        id: 'nodejs-development',
        titleLines: ['Node.js', 'Development'],
        title: 'Node.js Development',
        description:
          'Robust Express.js APIs and backend services that power your product.',
        icon: serviceIcons.node,
        contactService: 'Node.js Development',
      },
      {
        id: 'web-applications',
        titleLines: ['Web', 'Applications'],
        title: 'Web Applications',
        description:
          'Custom dashboards, portals and internal tools built end-to-end.',
        icon: serviceIcons.grid,
        contactService: 'Web Applications',
      },
    ],
  },
  {
    id: 'appdev',
    eyebrow: 'Mobile',
    selectorTitle: 'Mobile App Development',
    sectionTitleLines: ['Mobile App', 'Development'],
    sectionTitle: 'Mobile App Development',
    sectionSubtitle:
      'Cross-platform and native mobile apps engineered for reliability and scale.',
    defaultActiveItem: 'mobile-app-development',
    items: [
      {
        id: 'mobile-app-development',
        titleLines: ['Mobile App', 'Development'],
        title: 'Mobile App Development',
        description:
          'iOS & Android apps built from a single React Native codebase.',
        icon: serviceIcons.mobile,
        contactService: 'Mobile App Development',
      },
      {
        id: 'app-api-integration',
        titleLines: ['App & API', 'Integration'],
        title: 'App & API Integration',
        description:
          'Secure integrations connecting your app to payments, CRMs and analytics.',
        icon: serviceIcons.link,
        contactService: 'App & API Integration',
      },
      {
        id: 'maintenance-support',
        titleLines: ['Maintenance &', 'Support'],
        title: 'Maintenance & Support',
        description:
          'Ongoing updates, monitoring and support after launch.',
        icon: serviceIcons.wrench,
        contactService: 'Maintenance & Support',
      },
    ],
  },
  {
    id: 'consulting',
    eyebrow: 'Growth & Consulting',
    selectorTitle: 'Digital Consulting',
    sectionTitleLines: ['Digital', 'Consulting'],
    sectionTitle: 'Digital Consulting',
    sectionSubtitle:
      'The connective services that turn traffic and followers into revenue.',
    defaultActiveItem: 'lead-generation',
    items: [
      {
        id: 'email-marketing',
        titleLines: ['Email', 'Marketing'],
        title: 'Email Marketing',
        description:
          'Automated flows and campaigns that nurture leads into customers.',
        icon: serviceIcons.mail,
        contactService: 'Email Marketing',
      },
      {
        id: 'lead-generation',
        titleLines: ['Lead', 'Generation'],
        title: 'Lead Generation',
        description:
          'Funnels and landing pages engineered to convert visitors into pipeline.',
        icon: serviceIcons.magnet,
        contactService: 'Lead Generation',
      },
      {
        id: 'analytics',
        titleLines: ['Analytics'],
        title: 'Analytics',
        description:
          "Dashboards and tracking setups that reveal exactly what's driving growth.",
        icon: serviceIcons.trend,
        contactService: 'Analytics',
      },
      {
        id: 'digital-consulting',
        titleLines: ['Digital', 'Consulting'],
        title: 'Digital Consulting',
        description:
          "Fractional strategy support to guide your team's digital roadmap.",
        icon: serviceIcons.brain,
        contactService: 'Digital Consulting',
      },
    ],
  },
];

export default function ServicesPage() {
  const { hash } = useLocation();
  const [activeCategory, setActiveCategory] = useState('seo');
  const [activeItemId, setActiveItemId] = useState('technical-seo');

  // Sync with URL hash if navigated with #seo, #smm, #branding, #webdev, #appdev, #consulting
  useEffect(() => {
    if (hash) {
      const cleanHash = hash.replace('#', '').toLowerCase();
      if (cleanHash === 'seo' || cleanHash === 'content') {
        setActiveCategory('seo');
        setActiveItemId('technical-seo');
      } else if (cleanHash === 'smm' || cleanHash === 'social') {
        setActiveCategory('smm');
        setActiveItemId('instagram-marketing');
      } else if (cleanHash === 'branding' || cleanHash === 'design') {
        setActiveCategory('branding');
        setActiveItemId('logo-design');
      } else if (cleanHash === 'webdev' || cleanHash === 'web' || cleanHash === 'development') {
        setActiveCategory('webdev');
        setActiveItemId('react-development');
      } else if (cleanHash === 'appdev' || cleanHash === 'mobile' || cleanHash === 'app') {
        setActiveCategory('appdev');
        setActiveItemId('mobile-app-development');
      } else if (cleanHash === 'consulting' || cleanHash === 'growth') {
        setActiveCategory('consulting');
        setActiveItemId('lead-generation');
      }
    }
  }, [hash]);

  const currentCategory =
    serviceCategories.find((cat) => cat.id === activeCategory) || serviceCategories[0];

  const handleSelectCategory = (cat) => {
    setActiveCategory(cat.id);
    setActiveItemId(cat.defaultActiveItem);
  };

  return (
    <div className="services-page">
      {/* 1. TOP HERO BANNER */}
      <section className="services-hero-section" aria-label="Services Introduction">
        <div className="services-container">
          <div className="services-hero-intro">
            <div className="services-hero-copy">
              <div className="services-tag" data-scroll-reveal>
                <span className="services-tag-dash" aria-hidden="true" />
                <span>What We Offer</span>
              </div>

              <h1 className="services-hero-title" data-scroll-reveal>
                Every discipline your growth needs,{' '}
                <span className="services-title-highlight">under one roof.</span>
              </h1>

              <p className="services-hero-subtext" data-scroll-reveal>
                SEO, social, branding, and full-stack development — delivered by one integrated team.
              </p>
            </div>

            {/* Curved bottom edge wave with soft mint-green fade into section below */}
            <div className="services-hero-wave" aria-hidden="true">
              <svg viewBox="0 0 1440 80" preserveAspectRatio="none" fill="none">
                <defs>
                  <linearGradient id="servicesWaveFade" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D2F4E0" />
                    <stop offset="100%" stopColor="#DCF6E6" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,30 C350,76 730,2 1090,42 C1255,60 1375,52 1440,30 L1440,80 L0,80 Z"
                  fill="#C4F1D6"
                  fillOpacity="0.52"
                />
                <path
                  d="M0,45 C360,85 740,15 1100,55 C1260,72 1380,65 1440,45 L1440,80 L0,80 Z"
                  fill="url(#servicesWaveFade)"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EDITORIAL INTERACTIVE SERVICES SECTION BELOW BANNER */}
      <section
        id={currentCategory.id}
        className="services-editorial-section"
        aria-label={currentCategory.sectionTitle}
      >
        {/* Soft Out-of-Focus Botanical Palm Leaf Shadows (Top-Right & Bottom-Left) */}
        <svg
          className="services-botanical-shadow services-botanical-shadow--top-right"
          viewBox="0 0 560 540"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M575,15 C445,35 335,88 250,165 C345,120 450,92 565,85 Z" />
          <ellipse cx="355" cy="48" rx="76" ry="10" transform="rotate(-26 355 48)" />
          <ellipse cx="412" cy="66" rx="84" ry="11" transform="rotate(-16 412 66)" />
          <ellipse cx="320" cy="118" rx="80" ry="10" transform="rotate(-30 320 118)" />
          <ellipse cx="378" cy="144" rx="90" ry="11.5" transform="rotate(-12 378 144)" />
          <ellipse cx="440" cy="170" rx="94" ry="12" transform="rotate(10 440 170)" />
          <ellipse cx="486" cy="202" rx="96" ry="12" transform="rotate(24 486 202)" />
          <path d="M580,235 C475,265 390,325 328,408 C405,358 490,332 575,325 Z" />
          <ellipse cx="420" cy="268" rx="82" ry="10.5" transform="rotate(-32 420 268)" />
          <ellipse cx="385" cy="326" rx="86" ry="11" transform="rotate(-20 385 326)" />
          <ellipse cx="445" cy="360" rx="92" ry="11.5" transform="rotate(-4 445 360)" />
          <ellipse cx="485" cy="402" rx="96" ry="12" transform="rotate(18 485 402)" />
        </svg>

        <svg
          className="services-botanical-shadow services-botanical-shadow--bottom-left"
          viewBox="0 0 520 520"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M-25,110 C85,138 185,192 258,272 C168,225 72,198 -20,190 Z" />
          <ellipse cx="138" cy="145" rx="74" ry="9.5" transform="rotate(26 138 145)" />
          <ellipse cx="86" cy="168" rx="82" ry="10.5" transform="rotate(16 86 168)" />
          <ellipse cx="168" cy="216" rx="78" ry="10" transform="rotate(30 168 216)" />
          <ellipse cx="114" cy="244" rx="88" ry="11" transform="rotate(12 114 244)" />
          <path d="M-30,305 C65,332 142,388 198,465 C124,420 48,395 -25,388 Z" />
          <ellipse cx="92" cy="338" rx="76" ry="10" transform="rotate(32 92 338)" />
          <ellipse cx="126" cy="392" rx="80" ry="10.5" transform="rotate(20 126 392)" />
          <ellipse cx="72" cy="428" rx="86" ry="11" transform="rotate(4 72 428)" />
        </svg>

        <div className="services-container services-editorial-container">
          <div className="services-editorial-grid">
            {/* LEFT COLUMN: Label, Title, Supportive Copy & Vertical Pill Navigation */}
            <div className="services-editorial-left" data-scroll-reveal>
              <div className="services-editorial-eyebrow">
                <span className="services-editorial-eyebrow-line" aria-hidden="true" />
                <span>OUR SERVICES</span>
              </div>

              <h2 className="services-editorial-heading">
                {currentCategory.sectionTitleLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>

              <p className="services-editorial-subtitle">
                {currentCategory.sectionSubtitle}
              </p>

              {/* Vertical Navigation Tabs with Left Timeline & Active Dark-Green Pill */}
              <div
                className="services-vertical-tabs"
                role="tablist"
                aria-label="Service categories"
              >
                <span className="services-vertical-tabs-line" aria-hidden="true" />

                {serviceCategories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => handleSelectCategory(cat)}
                      className={`services-vertical-tab ${isActive ? 'is-active' : ''}`}
                    >
                      {!isActive && (
                        <span className="services-vertical-tab-dot" aria-hidden="true" />
                      )}
                      <span>{cat.selectorTitle}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RIGHT COLUMN: 2-Column Interactive Service Items Grid */}
            <div
              key={currentCategory.id}
              className="services-editorial-right"
              data-scroll-reveal
            >
              <div className="services-editorial-cards-grid">
                {currentCategory.items.map((item) => {
                  const isItemActive = item.id === activeItemId;
                  return (
                    <Link
                      key={item.id}
                      to={`/contact?service=${encodeURIComponent(item.contactService)}`}
                      onMouseEnter={() => setActiveItemId(item.id)}
                      onFocus={() => setActiveItemId(item.id)}
                      className={`services-editorial-card ${
                        isItemActive ? 'is-active' : ''
                      }`}
                    >
                      <div className="services-editorial-icon-box" aria-hidden="true">
                        {item.icon}
                      </div>

                      <h3 className="services-editorial-card-title">
                        {item.titleLines.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </h3>

                      <p className="services-editorial-card-desc">
                        {item.description}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
