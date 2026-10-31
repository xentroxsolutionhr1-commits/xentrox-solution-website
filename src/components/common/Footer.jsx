import { Link } from 'react-router-dom';
import Logo from '../shared/Logo.jsx';
import Icon from '../shared/Icon.jsx';

const companyWebsite = 'https://xentroxsolutions.com/';

export default function Footer() {
  return (
    <footer id="footer" className="border-t border-slate-200 bg-white text-slate-600">
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 pt-12 pb-8 sm:pt-14 lg:pt-16 lg:pb-10">
        <div className="grid grid-cols-1 gap-8 pb-10 border-b border-slate-200 sm:grid-cols-2 lg:grid-cols-5 lg:gap-10 lg:pb-12">

          {/* Brand */}
          <div className="space-y-3 sm:col-span-2 lg:col-span-1 lg:space-y-4" data-scroll-reveal data-reveal-from="left">
            <Logo size="sm" href="/" />
            <p className="text-xs text-slate-600 leading-relaxed">
              XentroX Solutions is a software development and digital marketing company delivering innovative solutions for business growth.
            </p>
          </div>

          {/* Quick Links */}
          <div data-scroll-reveal style={{ '--reveal-delay': '70ms' }}>
            <h4 className="text-sm font-bold text-slate-900 mb-3 lg:mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 font-medium text-slate-600 sm:space-y-2.5">
              {[['/', 'Home'], ['/about', 'About Us'], ['/courses', 'Courses'], ['/projects', 'Projects'], ['/career-assistance', 'Career Assistance'], ['/blogs', 'Blogs'], ['/contact', 'Contact Us']].map(([to, label]) => (
                <li key={to}><Link to={to} className="hover:text-[#84cc16] transition-colors">{label}</Link></li>
              ))}
              <li><Link to="/enroll" className="text-[#84cc16] font-bold hover:underline">Enroll Now →</Link></li>
            </ul>
          </div>

          {/* Software Tracks */}
          <div data-scroll-reveal style={{ '--reveal-delay': '140ms' }}>
            <h4 className="text-sm font-bold text-slate-900 mb-3 lg:mb-4 uppercase tracking-wider">Software Tracks</h4>
            <ul className="space-y-2 font-medium text-slate-600 sm:space-y-2.5">
              {['Full Stack Web Dev', 'MERN Stack Engineering', 'Python & DSA', 'Java Enterprise Dev', 'Generative AI', 'Cloud & DevOps'].map((t) => (
                <li key={t}><Link to="/courses" className="hover:text-[#84cc16] transition-colors">{t}</Link></li>
              ))}
            </ul>
          </div>

          {/* Marketing Tracks */}
          <div data-scroll-reveal style={{ '--reveal-delay': '210ms' }}>
            <h4 className="text-sm font-bold text-slate-900 mb-3 lg:mb-4 uppercase tracking-wider">Marketing & Media</h4>
            <ul className="space-y-2 font-medium text-slate-600 sm:space-y-2.5">
              {['Digital Marketing', 'Technical SEO', 'Social Media & Meta Ads', 'UI/UX Design', 'Video Editing', 'Graphic Design'].map((t) => (
                <li key={t}><Link to="/courses" className="hover:text-[#84cc16] transition-colors">{t}</Link></li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div className="space-y-3 lg:space-y-4" data-scroll-reveal data-reveal-from="right">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Locations</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Icon name="mapPin" size={13} className="text-[#84cc16] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-slate-900">Marthandam Studio</p>
                  <p className="text-xs text-slate-500">Kanyakumari District, Tamil Nadu, India</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Icon name="mapPin" size={13} className="text-[#84cc16] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-slate-900">Trivandrum Tech Hub</p>
                  <p className="text-xs text-slate-500">Technopark Corridor, Kerala, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar - Centered Copyright */}
        <div className="pt-6 text-center text-slate-500 lg:pt-8" data-scroll-reveal>
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} XentroX Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
