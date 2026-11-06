import { Suspense, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import Spinner from './components/common/Spinner.jsx';
import Routes from './routers/Routers.jsx';
import ScrollToTop from './components/common/ScrollToTop.js';

function App() {
  const [isIntroActive, setIsIntroActive] = useState(true);
  const routing = useRoutes(Routes);
  const handleIntroComplete = () => {
    window.dispatchEvent(new Event('xentrox:logo-intro-complete'));
    setIsIntroActive(false);
  };

  return (
    <div
      data-logo-intro-active={isIntroActive ? 'true' : undefined}
      data-logo-intro-complete={!isIntroActive ? 'true' : undefined}
    >
      <Suspense fallback={null}>
        <ScrollToTop>{routing}</ScrollToTop>
      </Suspense>
      {isIntroActive && <Spinner onComplete={handleIntroComplete} />}
    </div>
  );
}

export default App;
