import Footer from '@/components/common/Footer/Footer';
import Header from '@/components/common/Header/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
