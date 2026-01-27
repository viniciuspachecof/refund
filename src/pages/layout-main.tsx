import { Outlet } from 'react-router-dom';
import { MainHeader } from '../components/main-header';

export function LayoutMain() {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
}
