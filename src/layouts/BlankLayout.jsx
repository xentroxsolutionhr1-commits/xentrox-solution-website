import { Outlet } from 'react-router-dom';
import FloatingActionWidgets from '../components/common/FloatingActionWidgets.jsx';

function BlankLayout() {
  return (
    <main className="grid min-h-svh place-items-center bg-[#f8faf9] p-4 text-[#17231f]">
      <Outlet />
      <FloatingActionWidgets />
    </main>
  );
}

export default BlankLayout;
