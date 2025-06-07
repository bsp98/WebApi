import { HeaderAdmin } from './HeaderAdmin';
import { Footer } from '../Footer';
import { Outlet } from 'react-router-dom';

export const AdminLayout = () => {
  return (
    <>
      <HeaderAdmin />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
