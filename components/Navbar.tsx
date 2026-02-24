
import React, { useState, useEffect } from 'react';
import { Profile } from '../types';
import { Search, Bell, ChevronDown } from 'lucide-react';

interface NavbarProps {
  isScrolled: boolean;
  activeProfile: Profile;
  onResetProfile: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled, activeProfile, onResetProfile }) => {
  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-700 px-4 md:px-12 py-3 flex items-center justify-between ${isScrolled ? 'bg-[#141414]' : 'bg-transparent bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="flex items-center space-x-6 md:space-x-12">
        <h1 
          className="text-[#E50914] text-2xl md:text-3xl font-black tracking-tighter cursor-pointer hover:scale-105 transition-transform duration-300"
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        >
          LOVEFLIX
        </h1>
        <ul className="hidden lg:flex space-x-5 text-[14px] font-normal text-gray-200 letter-spacing-wide">
          <li className="cursor-pointer hover:text-gray-400 transition-colors font-bold text-white">Inicio</li>
          <li className="cursor-pointer hover:text-gray-400 transition-colors">Momentos</li>
          <li className="cursor-pointer hover:text-gray-400 transition-colors">Películas de Amor</li>
          <li className="cursor-pointer hover:text-gray-400 transition-colors">Novedades</li>
          <li className="cursor-pointer hover:text-gray-400 transition-colors">Mi Lista</li>
        </ul>
      </div>
      
      <div className="flex items-center space-x-5 text-white">
        <Search className="w-5 h-5 cursor-pointer hover:text-gray-300" />
        <span className="hidden md:block text-sm font-light letter-spacing-wide">Pareja</span>
        <Bell className="w-5 h-5 cursor-pointer hover:text-gray-300" />
        <div className="group relative flex items-center space-x-2 cursor-pointer" onClick={onResetProfile}>
          <img src={activeProfile.avatar} alt="Profile" className="w-8 h-8 rounded-sm object-cover" />
          <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
