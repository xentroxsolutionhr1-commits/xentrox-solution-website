const Category = require('../models/Category');
const Portfolio = require('../models/Portfolio');
const Blog = require('../models/Blog');
const Career = require('../models/Career');

const seedInitialData = async () => {
  try {
    // 1. Seed Categories if empty
    const categoryCount = await Category.countDocuments();
    let webCatId = null;
    let seoCatId = null;
    let brandCatId = null;
    let mobileCatId = null;

    if (categoryCount === 0) {
      console.log('🌱 Seeding initial categories...');
      const createdCategories = await Category.insertMany([
        {
          categoryName: 'Web Development',
          description: 'Custom web applications, responsive websites, and high-performance digital platforms.',
        },
        {
          categoryName: 'SEO & Growth',
          description: 'Data-driven search engine optimization, technical performance audits, and digital acquisition.',
        },
        {
          categoryName: 'Branding & UI/UX',
          description: 'Comprehensive brand identities, design systems, and user-centric interfaces.',
        },
        {
          categoryName: 'Mobile Apps',
          description: 'Cross-platform mobile applications for iOS and Android with seamless experiences.',
        },
        {
          categoryName: 'Cloud & Infrastructure',
          description: 'Reliable cloud computing solutions, DevOps pipelines, and scalable architectures.',
        },
      ]);
      webCatId = createdCategories[0]._id;
      seoCatId = createdCategories[1]._id;
      brandCatId = createdCategories[2]._id;
      mobileCatId = createdCategories[3]._id;
    } else {
      const existing = await Category.find();
      webCatId = existing[0]?._id;
      seoCatId = existing[1]?._id || webCatId;
      brandCatId = existing[2]?._id || webCatId;
      mobileCatId = existing[3]?._id || webCatId;
    }

    // 2. Seed Portfolio if empty
    const portfolioCount = await Portfolio.countDocuments();
    if (portfolioCount === 0 && webCatId) {
      console.log('🌱 Seeding initial portfolio projects...');
      await Portfolio.insertMany([
        {
          projectName: 'GreenRoots Organics',
          projectDescription: 'Local and technical SEO overhaul for a farm-to-table grocery chain — organic sessions tripled in six months.',
          projectTechStack: ['Technical SEO', 'Local Console', 'Schema Markup', 'Speed Optimization'],
          categoryId: seoCatId,
          imageUrl: '/portfolio/photos/greenroots-organic.jpg',
        },
        {
          projectName: 'Flowline Logistics',
          projectDescription: 'A real-time fleet-tracking dashboard built for a regional logistics operator.',
          projectTechStack: ['React', 'Node.js', 'Dashboard', 'REST APIs'],
          categoryId: webCatId,
          imageUrl: '/portfolio/photos/flowline-logistics.jpg',
        },
        {
          projectName: 'Aura Skincare',
          projectDescription: 'Full identity system and Instagram-first launch campaign for a D2C skincare line.',
          projectTechStack: ['Branding', 'Visual Identity', 'Typography', 'Figma'],
          categoryId: brandCatId,
          imageUrl: '/portfolio/photos/aura-skincare.jpg',
        },
        {
          projectName: 'CityTiffin',
          projectDescription: 'A cross-platform food-ordering app connecting home chefs with local customers.',
          projectTechStack: ['React Native', 'Mobile UI', 'Payment Gateway', 'Maps API'],
          categoryId: mobileCatId,
          imageUrl: '/portfolio/photos/citytiffin-food.jpg',
        },
      ]);
    }

    // 3. Seed Blogs if empty
    const blogCount = await Blog.countDocuments();
    if (blogCount === 0) {
      console.log('🌱 Seeding initial blog articles...');
      await Blog.insertMany([
        {
          title: 'How React 19 Actions & Server Components Change Web Architecture',
          author: 'Sherin Singh S R',
          content: 'React 19 represents one of the most practical leaps forward in modern frontend engineering. With native support for Server Actions, the useActionState hook, and automatic batching of async transitions, the boundary between client interactivity and backend processing has become fluid.\n\nKey architectural takeaways:\n1. Native Form Handling without Redux or heavy client state: Forms now natively handle pending states, optimistic rollbacks, and server validation responses.\n2. The compiler advantage: React Compiler reduces manual useMemo and useCallback ceremonies, allowing developers to write idiomatic JavaScript.\n3. Enhanced asset loading: Stylesheets, fonts, and scripts now support native hoist precedence to eliminate flash of unstyled content (FOUC).',
          tags: ['React', 'Web Development', 'Architecture'],
          published: true,
          imageUrl: '',
        },
        {
          title: 'The 2026 Technical SEO Playbook: Passing Core Web Vitals & Search Generative Experience',
          author: 'Shahaban B',
          content: "Search engines in 2026 demand more than just keywords. With AI Overviews and Google's emphasis on Interaction to Next Paint (INP), technical precision dictates who wins Page 1.\n\nEssential pillars for 2026:\n1. Interaction to Next Paint (INP): Replacing FID, INP measures whole-session responsiveness.\n2. Entity-Based Semantic Schema: Schema.org markup is no longer optional.\n3. Topic Depth over Keyword Stuffing: AI search summaries reward pages that answer questions comprehensively.",
          tags: ['SEO', 'Core Web Vitals', 'Growth'],
          published: true,
          imageUrl: '',
        },
        {
          title: 'Breaking Into Tech in 2026: Why Production Projects Beat Tutorial Certificates',
          author: 'Subin S',
          content: "The tech hiring landscape has evolved. Watching a 40-hour tutorial and following along to build another generic clone won't stand out to hiring managers.\n\nWhat engineering leads look for in 2026:\n1. Live, deployed URL with custom domains, SSL, and responsive design.\n2. Production hygiene: Clean commit history, pull requests, automated testing.\n3. Quantifiable impact: Document architectural decisions in your GitHub README.",
          tags: ['Careers', 'Software Engineering', 'Guidance'],
          published: true,
          imageUrl: '',
        },
        {
          title: 'Beyond the Hype: How Small Businesses Are Using RAG & AI Agents Profitably',
          author: 'Dr. S. Priya Vasanth',
          content: 'Generative AI has moved from speculative experiments to everyday utility. Companies that integrate LLMs into targeted internal workflows are realizing 30-40% operational efficiency gains.\n\nHigh-impact production use cases:\n1. Knowledge Base RAG Assistants\n2. Automated Invoicing & Document Extraction\n3. Personalized Outbound Messaging',
          tags: ['AI', 'Automation', 'Machine Learning'],
          published: true,
          imageUrl: '',
        },
      ]);
    }

    // 4. Seed Careers if empty
    const careerCount = await Career.countDocuments();
    if (careerCount === 0) {
      console.log('🌱 Seeding initial career openings...');
      await Career.insertMany([
        {
          title: 'Frontend Developer',
          type: 'Full Time',
          location: 'Hybrid / Remote',
          category: 'Development',
          description: 'Build modern, responsive user interfaces with React, JavaScript, and Tailwind CSS. Collaborate with backend engineers and designers.',
          skills: ['React', 'JavaScript', 'CSS', 'Tailwind CSS'],
          icon: 'code',
          active: true,
        },
        {
          title: 'Python Developer',
          type: 'Full Time',
          location: 'Remote',
          category: 'Development',
          description: 'Develop reliable backend services, RESTful APIs, data automation pipelines, and integrate AI models into production environments.',
          skills: ['Python', 'SQL', 'FastAPI', 'APIs'],
          icon: 'cpu',
          active: true,
        },
        {
          title: 'UI/UX Designer',
          type: 'Full Time',
          location: 'Hybrid',
          category: 'Design',
          description: 'Create intuitive digital experiences and user interfaces through design systems, prototypes, and user research in Figma.',
          skills: ['Figma', 'UI Design', 'Prototyping', 'User Research'],
          icon: 'layers',
          active: true,
        },
        {
          title: 'Cloud Support Associate',
          type: 'Entry Level',
          location: 'On-site / Hybrid',
          category: 'Cloud',
          description: 'Assist in monitoring cloud infrastructure, deploying applications, and supporting system operations across AWS and Linux environments.',
          skills: ['AWS', 'Linux', 'Networking', 'Docker'],
          icon: 'globe',
          active: true,
        },
      ]);
    }
  } catch (err) {
    console.error('Error seeding initial data:', err.message);
  }
};

module.exports = { seedInitialData };

