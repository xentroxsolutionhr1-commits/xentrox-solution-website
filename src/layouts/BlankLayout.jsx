import { Outlet } from 'react-router-dom';

function BlankLayout() {
  return (
    <main className="grid min-h-svh place-items-center bg-[#f8faf9] p-4 text-[#17231f]">
      <Outlet />
    </main>
  );
}

export default BlankLayout;
