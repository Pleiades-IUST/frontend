import React from 'react';
import Dashboard from './Dashboard';
import Navbar from '@/components/Navbar';
// import SidebarWithHeader from '@/components/SidebarWithHeader';

function AppLayout() {
  return (
    <>
      {/* <SidebarWithHeader /> */}
      <Navbar />
      <Dashboard />;
    </>
  );
}

export default AppLayout;
