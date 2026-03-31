import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps>= ({ children }) => {
  return (<div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}><Header />
      <main style={{ flex: 1, padding: '2rem' }}>{children}</main><Footer /></div>);
};

export default Layout;