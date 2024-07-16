// AppLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AppLayout = () => {
  return (
    <>
      <Sidebar />
      <main className='main-content'>
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;
