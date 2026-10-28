import { lazy } from 'react';
import Error from '../components/error/Error.jsx';
const BlankLayout = lazy(() => import('../layouts/BlankLayout.jsx'));
const FullLayout = lazy(() => import('../layouts/FullLayout.jsx'));
const Dashboard = lazy(() => import('../components/home/Dashboard.jsx'));
const About = lazy(() => import('../components/about/About.jsx'));
const StaticPage = lazy(() => import('../components/shared/StaticPage.jsx'));

const Routes = [
  {
    element: <FullLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'about',
        element: <About />,
      },
      ...[
        'courses',
        'projects',
        'career-assistance',
        'blogs',
        'contact',
        'enroll',
        'services',
        'portfolio',
        'pricing',
        'blog',
        'careers',
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