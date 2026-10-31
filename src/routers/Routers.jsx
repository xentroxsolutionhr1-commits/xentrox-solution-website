import { lazy } from 'react';
import Error from '../components/error/Error.jsx';
const BlankLayout = lazy(() => import('../layouts/BlankLayout.jsx'));
const FullLayout = lazy(() => import('../layouts/FullLayout.jsx'));
const Dashboard = lazy(() => import('../components/home/Dashboard.jsx'));
const About = lazy(() => import('../components/about/About.jsx'));
const Portfolio = lazy(() => import('../components/portfolio/Portfolio.jsx'));
const StaticPage = lazy(() => import('../components/shared/StaticPage.jsx'));
// const Courses = lazy(() => import('../components/courses/Courses.jsx'));
const CareersPage = lazy(() => import('../components/careers/Careers.jsx'));
const Pricing = lazy(() => import('../components/pricing/Pricing.jsx'));
const Contact = lazy(() => import('../components/contact/Contact.jsx'));

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

      ...[
        'courses',
        'projects',
        'career-assistance',
        'blogs',
        'enroll',
        'services',
        'blog',
      ].map(
        (path) => ({
          path,
          element: <StaticPage />,
        }),
      ),
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
