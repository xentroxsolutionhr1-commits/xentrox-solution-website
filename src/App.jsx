import { useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import Spinner from './components/common/Spinner.jsx';
import Routes from './routers/Routers.jsx';
import ScrollToTop from './components/common/ScrollToTop.js';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const routing = useRoutes(Routes);

  useEffect(() => {
    const loadingTimer = window.setTimeout(() => setIsLoading(false), 1500);
    return () => window.clearTimeout(loadingTimer);
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return <ScrollToTop>{routing}</ScrollToTop>;
}

export default App;
