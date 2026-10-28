import { Link } from 'react-router-dom';
import Logo from '../shared/Logo.jsx';
import Icon from '../shared/Icon.jsx';

const companyWebsite = 'https://xentroxsolutions.com/';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer id="footer" className="border-t border-[#E2EBE5] relative z-10 pt-16 pb-10 bg-[#F7FAF8] text-slate-600 text-xs">
      <div className="max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">

        {/* Contact Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E2EBE5] mb-14 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-6" data-scroll-reveal>
          <div className="flex items-center gap-4">
            <Logo size="lg" href="/" />
            <div className="hidden sm:block border-l border-[#E2EBE5] pl-4 py-1">
              <h3 className="text-sm font-black text-slate-900 tracking-wider font-heading">XentroX Solutions</h3>
              <p className="text-[10px] font-bold text-lime-600 tracking-wider uppercase mt-0.5">
                Official Academy: XentroX Labs
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3">
            <a href={companyWebsite} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#F4F9F6] border border-[#E2EBE5] hover:border-lime-500 hover:text-[#003831] text-slate-800 font-bold transition-all text-xs">
              <Icon name="globe" size={16} className="text-lime-600" />
              <span>xentroxsolutions.com</span>
            </a>
          </div>
        </div>

        {/* Footer Nav Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#E2EBE5]">

          {/* Brand */}
          <div className="space-y-4 lg:col-span-1" data-scroll-reveal data-reveal-from="left">
            <Logo size="md" href="/" />
            <p className="text-xs text-slate-600 leading-relaxed">
              XentroX Labs is the official training academy of XentroX Solutions. We bridge academic education with production-grade engineering and real client systems.
            </p>
          </div>

          {/* Quick Links */}
          <div data-scroll-reveal style={{ '--reveal-delay': '70ms' }}>
            <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider font-heading">Quick Links</h4>
            <ul className="space-y-2.5 font-medium text-slate-600">
              {[['/', 'Home'], ['/about', 'About Us'], ['/courses', 'Courses'], ['/projects', 'Projects'], ['/career-assistance', 'Career Assistance'], ['/blogs', 'Blogs'], ['/contact', 'Contact Us']].map(([to, label]) => (
                <li key={to}><Link to={to} className="hover:text-lime-600 transition-colors">{label}</Link></li>
              ))}
              <li><Link to="/enroll" className="text-lime-600 font-bold hover:underline">Enroll Now →</Link></li>
            </ul>
          </div>

          {/* Software Tracks */}
          <div data-scroll-reveal style={{ '--reveal-delay': '140ms' }}>
            <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider font-heading">Software Tracks</h4>
            <ul className="space-y-2.5 font-medium text-slate-600">
              {['Full Stack Web Dev', 'MERN Stack Engineering', 'Python & DSA', 'Java Enterprise Dev', 'Generative AI', 'Cloud & DevOps'].map((t) => (
                <li key={t}><Link to="/courses" className="hover:text-lime-600 transition-colors">{t}</Link></li>
              ))}
            </ul>
          </div>

          {/* Marketing Tracks */}
          <div data-scroll-reveal style={{ '--reveal-delay': '210ms' }}>
            <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider font-heading">Marketing & Media</h4>
            <ul className="space-y-2.5 font-medium text-slate-600">
              {['Digital Marketing', 'Technical SEO', 'Social Media & Meta Ads', 'UI/UX Design', 'Video Editing', 'Graphic Design'].map((t) => (
                <li key={t}><Link to="/courses" className="hover:text-lime-600 transition-colors">{t}</Link></li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div className="space-y-4" data-scroll-reveal data-reveal-from="right">
            <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider font-heading">Locations</h4>
            <div className="p-3.5 rounded-xl bg-white border border-[#E2EBE5] space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <Icon name="mapPin" size={14} className="text-lime-600" />
                <span>Marthandam Studio</span>
              </div>
              <p className="text-[11px] text-slate-500">Kanyakumari District, Tamil Nadu, India</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-[#E2EBE5] space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <Icon name="mapPin" size={14} className="text-lime-600" />
                <span>Trivandrum Tech Hub</span>
              </div>
              <p className="text-[11px] text-slate-500">Technopark Corridor, Kerala, India</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500" data-scroll-reveal>
          <p className="text-center sm:text-left text-xs">
            © {new Date().getFullYear()} XentroX Labs. All rights reserved. A brand of{' '}
            <a href={companyWebsite} target="_blank" rel="noopener noreferrer" className="text-lime-600 font-bold hover:underline">
              XentroX Solutions
            </a>.
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-lime-600 transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <Icon name="arrowUp" size={14} className="text-lime-500" />
          </button>
        </div>
      </div>
    </footer>
  );
}