import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuthStore } from '../store/authStore';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { toggleAuthModal } = useAuthStore();

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Greece Cyclades - Your Travel Guide</title>
        <meta name="description" content="Discover the beauty of Greek Cyclades islands" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar onAuthClick={toggleAuthModal} />
      
      <main className="flex-grow pt-16">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
