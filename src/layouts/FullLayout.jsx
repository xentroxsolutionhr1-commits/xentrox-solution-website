import { Outlet } from 'react-router-dom';
import Footer from '../components/common/Footer.jsx';
import Navbar from '../components/home/NavBar.jsx';

function FullLayout() {
  return (
    <div className="min-h-screen overflow-x-clip bg-[#f8faf9] text-[#17231f]">
      <Navbar />
      <main className="mx-auto min-h-[calc(100vh-4.5rem)] w-full max-w-[1200px] pt-24 pb-8 max-sm:pt-[5.5rem] max-sm:pb-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default FullLayout;