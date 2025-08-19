'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, User, LogOut, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import IMAGES from '@/lib/images';
import Image from 'next/image';
import { Twitter, Facebook, Linkedin, Instagram, Mail } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logoutUser } from '@/store/slices/authSlice';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isAdmin } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Our Services', href: '/services' },
    { name: 'Fashion Forecast', href: '/fashion-forecast' },
    { name: 'FAQ', href: '/faq' },
  ];



  return (
    <>
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white/95 shadow-md'}`}>
        {/* Top Bar */}
        <div className="hidden lg:block border-t-4 border-[#8B0000] bg-black text-white text-sm">
          <div className="container mx-auto px-4 py-2">
            <div className="flex justify-between items-center">
              
              {/* Social Icons */}
              <div className="flex space-x-4">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="w-4 h-4 text-white hover:text-brand" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <Facebook className="w-4 h-4 text-white hover:text-brand" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-4 h-4 text-white hover:text-brand" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-4 h-4 text-white hover:text-brand" />
                </a>
              </div>

              {/* Email + Internship Text */}
              <div className="flex items-center text-[12px] space-x-4">
                <div className="flex items-center space-x-1">
                  <Mail className="w-4 h-4 text-white text-[10px]" />
                  <span>info@outrecouture.com</span>
                </div>
                <span className="text-brand">
                  Apply for the internship / Part-time
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navbar */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link href="/" className="flex items-center ml-[-15px]">
              <Image src={IMAGES.HomeNew.logo} alt="Outre Couture Logo" className='w-[280px]'/>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative font-medium text-base text-gray hover:text-black transition ${
                    link.name === 'Home' ? 'font-bold text-black' : ''
                  }`}
                >
                  {link.name}
                  {link.name === 'Home' && (
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-brand"></span>
                  )}
                </Link>
              ))}
            </nav>

            {/* Admin Access */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                href="/admin"
                className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-red-800 transition-colors flex items-center"
              >
                <Settings size={16} className="mr-2" />
                Admin Panel
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-brand">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white text-brand border-t"
            >
              <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-gray-700 font-medium py-2"
                    >
                      {link.name}
                    </Link>
                  ))}
                  
                  {/* Mobile Admin Access */}
                  <div className="border-t pt-4">
                    <Link
                      href="/admin"
                      className="block text-brand font-medium py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Admin Panel
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>


    </>
  );
};

export default Header;
