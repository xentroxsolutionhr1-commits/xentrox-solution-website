import { lazy } from 'react';
import Error from '../components/error/Error.jsx';

const BlankLayout = lazy(() => import('../layouts/BlankLayout.jsx'));
const FullLayout = lazy(() => import('../layouts/FullLayout.jsx'));
const Dashboard = lazy(() => import('../components/home/Dashboard.jsx'));
const About = lazy(() => import('../components/about/About.jsx'));
const Portfolio = lazy(() => import('../components/portfolio/Portfolio.jsx'));
const CareersPage = lazy(() => import('../components/careers/Careers.jsx'));
const Pricing = lazy(() => import('../components/pricing/Pricing.jsx'));
const Contact = lazy(() => import('../components/contact/Contact.jsx'));

// Dedicated custom pages
const CoursesPage = lazy(() => import('../components/courses/CoursesPage.jsx'));
const ServicesPage = lazy(() => import('../components/services/ServicesPage.jsx'));
const ProjectsPage = lazy(() => import('../components/projects/ProjectsPage.jsx'));
const CareerAssistancePage = lazy(() => import('../components/career/CareerAssistancePage.jsx'));
const BlogPage = lazy(() => import('../components/blog/BlogPage.jsx'));
const EnrollPage = lazy(() => import('../components/enroll/EnrollPage.jsx'));

const Routes = [
  {
    element: <FullLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'careers',
        element: <CareersPage />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'portfolio',
        element: <Portfolio />,
      },
      {
        path: 'pricing',
        element: <Pricing />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'courses',
        element: <CoursesPage />,
      },
      {
        path: 'services',
        element: <ServicesPage />,
      },
      {
        path: 'projects',
        element: <ProjectsPage />,
      },
      {
        path: 'career-assistance',
        element: <CareerAssistancePage />,
      },
      {
        path: 'blogs',
        element: <BlogPage />,
      },
      {
        path: 'blog',
        element: <BlogPage />,
      },
      {
        path: 'enroll',
        element: <EnrollPage />,
      },
    ],
  },
  {
    element: <BlankLayout />,
    children: [
      { path: '*', element: <Error /> },
    ],
  },
];

export default Routes;
