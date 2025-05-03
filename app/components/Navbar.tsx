'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { MdOutlineMenu, MdOutlineClose } from 'react-icons/md';

const NavLinks = [
  { title: 'About', path: '#about' },
  { title: 'Portfolio', path: '#portfolio' },
  { title: 'Technologies', path: '#technologies' },
  { title: 'Testimonials', path: '#testimonials' },
  { title: 'Contact', path: '#contact' },
];

export const Navbar = () => {
  const [nav, setNav] = useState(false);

  // Use effect to control body scrolling when nav is open
  useEffect(() => {
    if (nav) {
      // Prevent scrolling on body when nav is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling when nav is closed
      document.body.style.overflow = 'auto';
    }

    // Cleanup function to ensure we re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [nav]);

  const toggleNav = () => {
    setNav(!nav);
  };

  const CloseNav = () => {
    setNav(false);
  };

  return (
    <div className="z-50 fixed flex justify-center w-full text-white font-bold">
      <div className="border border-white/20 mt-8 backdrop-blur-3xl rounded-3xl hidden md:flex items-center justify-center p-2 max-w-[800px] mx-auto">
        <ul className="flex flex-row p-2 space-x-8">
          {NavLinks.map((link, index) => (
            <li key={index}>
              <Link
                href={link.path}
                className="transform hover:text-white/50 transition-all duration-300 ease-in-out"
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div
        onClick={toggleNav}
        className="md:hidden absolute top-5 right-14 border rounded z-50 text-white/70 border-white/70 p-2"
      >
        {nav ? <MdOutlineClose size={30} /> : <MdOutlineMenu size={30} />}
      </div>

      <div
        className={`fixed left-0 top-0 w-full h-full bg-black/90 transform transition-transform duration-300 
           ${nav ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <ul className="flex flex-col items-center justify-center space-y-8 h-full">
          {NavLinks.map((link, index) => (
            <li key={index}>
              <Link href={link.path} onClick={CloseNav} className="text-5xl">
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
