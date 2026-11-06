import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Icon from '../shared/Icon.jsx';

const availableCourses = [
  'Full Stack Web Development',
  'MERN Stack Engineering',
  'Python & Data Structures',
  'Java Enterprise Development',
  'Generative AI & LLM Applications',
  'Cloud Computing (AWS / GCP)',
  'DevOps Engineering & CI/CD',
  'Digital Marketing & Growth',
  'Technical SEO & Search Analytics',
  'Social Media & Meta Ads',
  'UI/UX Design & Prototyping',
  'Video Editing & Motion Graphics',
  'Graphic Design & Visual Identity',
];

export default function EnrollPage() {
  const [searchParams] = useSearchParams();
  const preselectedCourse = searchParams.get('course') || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: availableCourses[0],
    background: 'Student / Fresh Graduate',
    batch: 'Weekday Evening',
    questions: '',
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedCourse) {
      const match = availableCourses.find(
        (c) => c.toLowerCase() === preselectedCourse.toLowerCase() || c.toLowerCase().includes(preselectedCourse.toLowerCase())
      );
      if (match) {
        setFormData((prev) => ({ ...prev, course: match }));
      }
    }
  }, [preselectedCourse]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
            Admissions Open for Next Cohort
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Apply to XentroX Professional Academy
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-200 sm:text-lg">
            Take the first step toward a high-impact tech or digital marketing career. Submit your application below to secure your seat and speak with our admissions advisors.
          </p>
        </div>
      </section>

      {/* Main Content Grid: Form + Sidebar */}
      <div className="pt-12 sm:pt-16 pb-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left: Enrollment Form (7 Cols) */}
          <div className="lg:col-span-7" data-scroll-reveal>
            <div className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-10 shadow-sm">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#84cc16]/20 text-[#064b38]">
                    <Icon name="check" size={32} />
                  </div>
                  <h2 className="mt-5 text-2xl font-bold text-[#062c23]">Application Submitted!</h2>
                  <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
                    Thank you, <span className="font-semibold text-[#062c23]">{formData.name}</span>. Our admissions team will review your application for the <span className="font-semibold text-[#062c23]">{formData.course}</span> cohort and contact you via WhatsApp/Email within 24 hours.
                  </p>

                  <div className="mt-8 rounded-2xl bg-[#f8faf9] p-5 border border-slate-200 text-left max-w-md mx-auto">
                    <p className="text-xs font-bold uppercase text-slate-400">Application Summary</p>
                    <div className="mt-2 text-xs space-y-1 text-slate-700">
                      <p><span className="font-semibold">Track:</span> {formData.course}</p>
                      <p><span className="font-semibold">Preferred Timing:</span> {formData.batch}</p>
                      <p><span className="font-semibold">Phone:</span> {formData.phone}</p>
                      <p><span className="font-semibold">Email:</span> {formData.email}</p>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
                    <a
                      href={`https://wa.me/919876543210?text=${encodeURIComponent(`Hi XentroX, I just submitted an application for ${formData.course} and would like to speak with an admissions advisor.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-[#1ebe5d] transition"
                    >
                      <Icon name="whatsapp" size={16} />
                      Chat on WhatsApp Now
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="rounded-xl border border-slate-200 px-5 py-3 text-xs sm:text-sm font-bold text-slate-600 hover:bg-slate-50 transition"
                    >
                      Submit Another Application
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h2 className="text-xl font-bold text-[#062c23]">Candidate Details</h2>
                    <p className="text-xs text-slate-500 mt-0.5">Please provide accurate contact details for admissions verification.</p>
                  </div>

                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 transition focus:border-[#84cc16] focus:outline-none focus:ring-2 focus:ring-[#84cc16]/20"
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. john@example.com"
                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 transition focus:border-[#84cc16] focus:outline-none focus:ring-2 focus:ring-[#84cc16]/20"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +91 98765 43210"
                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 transition focus:border-[#84cc16] focus:outline-none focus:ring-2 focus:ring-[#84cc16]/20"
                      />
                    </div>
                  </div>

                  {/* Course Selection */}
                  <div>
                    <label htmlFor="course" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Select Preferred Course Track *
                    </label>
                    <select
                      id="course"
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 transition focus:border-[#84cc16] focus:outline-none focus:ring-2 focus:ring-[#84cc16]/20"
                    >
                      {availableCourses.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Background & Batch */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="background" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Current Background *
                      </label>
                      <select
                        id="background"
                        name="background"
                        value={formData.background}
                        onChange={handleChange}
                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 transition focus:border-[#84cc16] focus:outline-none focus:ring-2 focus:ring-[#84cc16]/20"
                      >
                        <option value="Student / Fresh Graduate">Student / Fresh Graduate</option>
                        <option value="IT / Tech Professional">IT / Tech Professional</option>
                        <option value="Non-Tech Career Switcher">Non-Tech Career Switcher</option>
                        <option value="Freelancer / Entrepreneur">Freelancer / Entrepreneur</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="batch" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Preferred Batch Timing *
                      </label>
                      <select
                        id="batch"
                        name="batch"
                        value={formData.batch}
                        onChange={handleChange}
                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 transition focus:border-[#84cc16] focus:outline-none focus:ring-2 focus:ring-[#84cc16]/20"
                      >
                        <option value="Weekday Morning (9 AM - 12 PM)">Weekday Morning (9 AM - 12 PM)</option>
                        <option value="Weekday Evening (6 PM - 9 PM)">Weekday Evening (6 PM - 9 PM)</option>
                        <option value="Weekend Intensive (Sat & Sun)">Weekend Intensive (Sat & Sun)</option>
                      </select>
                    </div>
                  </div>

                  {/* Questions */}
                  <div>
                    <label htmlFor="questions" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Questions or Specific Learning Goals (Optional)
                    </label>
                    <textarea
                      id="questions"
                      name="questions"
                      rows={3}
                      value={formData.questions}
                      onChange={handleChange}
                      placeholder="Tell us about your learning goals, target companies, or any questions..."
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 transition focus:border-[#84cc16] focus:outline-none focus:ring-2 focus:ring-[#84cc16]/20"
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-[#062c23] py-4 text-center text-sm font-bold text-white shadow-md transition hover:bg-[#083e30]"
                  >
                    Submit Enrollment Application →
                  </button>

                  <p className="text-center text-[11px] text-slate-400">
                    By submitting, you agree to receive application updates via email and WhatsApp. No spam guaranteed.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Right: Why XentroX Sidebar (5 Cols) */}
          <div className="lg:col-span-5 space-y-6" data-scroll-reveal style={{ '--reveal-delay': '120ms' }}>
            {/* Why Learn With Us */}
            <div className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-[#062c23]">What You Get at XentroX</h3>
              <ul className="mt-5 space-y-4 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="rounded-lg bg-[#84cc16]/20 p-1.5 text-[#064b38]">
                    <Icon name="check" size={16} />
                  </span>
                  <div>
                    <strong className="text-[#062c23] block">100% Practical Capstones</strong>
                    Build production web apps and real client campaigns, not toy classroom examples.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="rounded-lg bg-[#84cc16]/20 p-1.5 text-[#064b38]">
                    <Icon name="award" size={16} />
                  </span>
                  <div>
                    <strong className="text-[#062c23] block">1-on-1 Senior Mentorship</strong>
                    Weekly code reviews and portfolio feedback directly from practicing agency tech leads.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="rounded-lg bg-[#84cc16]/20 p-1.5 text-[#064b38]">
                    <Icon name="briefcase" size={16} />
                  </span>
                  <div>
                    <strong className="text-[#062c23] block">150+ Placement Partner Pipeline</strong>
                    Exclusive hiring drives, resume polish, and mock technical interview gauntlets.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="rounded-lg bg-[#84cc16]/20 p-1.5 text-[#064b38]">
                    <Icon name="shield" size={16} />
                  </span>
                  <div>
                    <strong className="text-[#062c23] block">Verified Certificate of Completion</strong>
                    Shareable digital credentials to boost your LinkedIn profile and resume credibility.
                  </div>
                </li>
              </ul>
            </div>

            {/* Need Help Box */}
            <div className="rounded-3xl bg-[#062c23] p-7 text-white sm:p-8">
              <h3 className="text-lg font-bold text-white">Have questions about admissions?</h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                Our career counselors are available Monday through Saturday to answer questions about batch schedules, syllabus details, and fees.
              </p>
              <div className="mt-5 space-y-2.5 text-xs">
                <div className="flex items-center gap-2">
                  <Icon name="phone" size={14} className="text-[#84cc16]" />
                  <span className="text-slate-300">+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="mail" size={14} className="text-[#84cc16]" />
                  <span className="text-slate-300">admissions@xentroxsolutions.com</span>
                </div>
              </div>
              <Link
                to="/courses"
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#84cc16] py-2.5 text-xs font-bold text-[#062c23] hover:bg-[#a3e635] transition"
              >
                Browse All Courses
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
