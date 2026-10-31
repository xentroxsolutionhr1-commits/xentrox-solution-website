import { Link } from 'react-router-dom';
import Icon from '../shared/Icon.jsx';

const pillars = [
  {
    icon: 'target',
    title: '1-on-1 Mentorship',
    description:
      'Weekly personalized guidance from senior engineers and digital marketing directors. Get continuous code reviews, portfolio feedback, and tailored career direction.',
  },
  {
    icon: 'fileText',
    title: 'Resume & Portfolio Polish',
    description:
      'We craft ATS-friendly resumes and high-impact GitHub/portfolio profiles that highlight quantifiable achievements and catch recruiters’ eyes immediately.',
  },
  {
    icon: 'users',
    title: 'Rigorous Mock Interviews',
    description:
      'Practice data structures, system design, frontend architecture, and live coding with real tech leads. Overcome interview anxiety with detailed scorecards.',
  },
  {
    icon: 'award',
    title: 'Direct Hiring Network',
    description:
      'Gain direct access to 150+ corporate hiring partners across India and remote global startups. Receive dedicated interview scheduling and salary negotiation support.',
  },
];

const roadmap = [
  {
    step: '01',
    title: 'Industry Curriculum',
    desc: 'Master the technical stack through hands-on labs and enterprise coding standards.',
  },
  {
    step: '02',
    title: 'Production Capstone',
    desc: 'Build and deploy full-stack commercial apps with real databases, CI/CD, and docs.',
  },
  {
    step: '03',
    title: 'Profile Optimization',
    desc: 'Craft your ATS-proof resume, optimize your LinkedIn profile, and polish your GitHub.',
  },
  {
    step: '04',
    title: 'Mock Interview Gauntlet',
    desc: 'Complete 3+ live technical rounds and HR drills with comprehensive feedback.',
  },
  {
    step: '05',
    title: 'Interviews & Offer Letters',
    desc: 'Interview with our network of hiring partners and land your dream tech role.',
  },
];

const stats = [
  { num: '94%', label: 'Placement Rate' },
  { num: '150+', label: 'Hiring Partners' },
  { num: '₹4.8 LPA', label: 'Average Package' },
  { num: '₹12 LPA', label: 'Highest Package' },
];

const alumni = [
  {
    name: 'Aravind Mohan',
    role: 'Frontend Engineer',
    company: 'FinTech Startup',
    package: '₹7.2 LPA',
    quote: 'The mock interviews and GitHub portfolio reviews gave me the exact confidence I needed to clear 3 technical rounds with ease.',
  },
  {
    name: 'Kavitha R.',
    role: 'Full Stack Developer',
    company: 'Enterprise Software Corp',
    package: '₹8.5 LPA',
    quote: 'From a non-CS background to a high-paying developer role in just 4 months. The 1-on-1 mentorship was priceless.',
  },
  {
    name: 'Mohammed Faisal',
    role: 'SEO & Performance Lead',
    company: 'Global D2C Agency',
    package: '₹6.0 LPA',
    quote: 'Learning on real client ad budgets and live site audits set me miles ahead of other applicants.',
  },
];

export default function CareerAssistancePage() {
  return (
    <div className="relative isolate -mt-24 max-sm:-mt-20">
      {/* Full-Bleed Dark Forest Green Hero starting at margin 0 */}
      <section
        className="relative left-1/2 -ml-[50vw] w-screen overflow-hidden bg-[#064B38] px-4 pt-28 pb-14 text-white sm:px-6 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20"
        data-scroll-reveal
      >
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#84cc16]/40 bg-[#84cc16]/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#a3e635]">
            <span className="h-2 w-2 rounded-full bg-[#84cc16] animate-pulse" />
            100% Dedicated Career Support
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Launch Your High-Impact Tech Career
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-200 sm:text-lg">
            We don't just teach technology — we bridge the gap between learning and getting hired with dedicated placement assistance, resume engineering, and partner referrals.
          </p>

          {/* Stats Row */}
          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s, idx) => (
              <div
                key={s.label}
                data-scroll-reveal
                style={{ '--reveal-delay': `${idx * 80}ms` }}
                className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur text-center"
              >
                <p className="text-2xl sm:text-3xl font-black text-white">{s.num}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#a3e635]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="pt-12 sm:pt-16 pb-16">
        {/* 4 Core Pillars */}
        <section className="mb-20">
          <div className="text-center mb-10" data-scroll-reveal>
            <p className="text-xs font-bold uppercase tracking-wider text-[#84cc16]">Our Placement Framework</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-[#062c23]">4 Pillars of Career Success</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar, idx) => (
              <div
                key={pillar.title}
                data-scroll-reveal
                style={{ '--reveal-delay': `${idx * 90}ms` }}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#84cc16] hover:shadow-xl hover:shadow-[#062c23]/5"
              >
                <span className="inline-flex rounded-xl bg-[#84cc16]/15 p-3 text-[#064b38]">
                  <Icon name={pillar.icon} size={22} />
                </span>
                <h3 className="mt-4 text-lg font-bold text-[#062c23]">{pillar.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{pillar.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Step by step Roadmap */}
        <section className="mb-20 rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 shadow-sm" data-scroll-reveal>
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-wider text-[#84cc16]">The Journey</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-[#062c23]">From Classroom to Day One on the Job</h2>
            <p className="mt-2 text-sm text-slate-600 max-w-xl mx-auto">
              Our structured 5-phase career acceleration journey ensures you enter interviews as a tested, job-ready developer.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {roadmap.map((r) => (
              <div key={r.step} className="rounded-2xl border border-slate-100 bg-[#f8faf9] p-5">
                <span className="text-2xl font-black text-[#84cc16]">{r.step}</span>
                <h4 className="mt-3 text-base font-bold text-[#062c23]">{r.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{r.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Alumni Testimonials */}
        <section className="mb-20">
          <div className="text-center mb-10" data-scroll-reveal>
            <p className="text-xs font-bold uppercase tracking-wider text-[#84cc16]">Alumni Success</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-[#062c23]">Where Our Graduates Work</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {alumni.map((alum, idx) => (
              <div
                key={alum.name}
                data-scroll-reveal
                style={{ '--reveal-delay': `${idx * 100}ms` }}
                className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Icon key={i} name="star" size={14} className="fill-amber-400" />
                    ))}
                  </div>
                  <p className="mt-4 text-xs italic leading-relaxed text-slate-600">
                    "{alum.quote}"
                  </p>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#062c23]">{alum.name}</h4>
                    <p className="text-xs text-slate-500">{alum.role} • {alum.company}</p>
                  </div>
                  <span className="rounded-full bg-[#84cc16]/20 px-2.5 py-1 text-xs font-bold text-[#064b38]">
                    {alum.package}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Box */}
        <section className="overflow-hidden rounded-3xl bg-[#062c23] p-8 text-white sm:p-12 text-center" data-scroll-reveal>
          <h2 className="text-2xl font-bold sm:text-3xl">Ready to Accelerate Your Career?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-300">
            Join our next cohort and work with mentors who genuinely care about your hiring success.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              to="/enroll"
              className="inline-flex items-center gap-2 rounded-xl bg-[#84cc16] px-6 py-3 text-sm font-bold text-[#062c23] hover:bg-[#a3e635]"
            >
              Apply for Next Cohort
              <Icon name="arrowRight" size={16} />
            </Link>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-sm font-bold text-white hover:bg-white/10"
            >
              Explore Courses
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
