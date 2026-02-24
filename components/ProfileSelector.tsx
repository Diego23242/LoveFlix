
import React from 'react';
import { Profile } from '../types';

interface ProfileSelectorProps {
  profiles: Profile[];
  onSelect: (profile: Profile) => void;
}

const ProfileSelector: React.FC<ProfileSelectorProps> = ({ profiles, onSelect }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#141414] animate-fade-in p-4 overflow-hidden">
      <h1 className="text-4xl md:text-6xl text-white mb-12 font-medium letter-spacing-wide text-center">
        ¿Quién protagoniza hoy?
      </h1>
      <div className="flex flex-wrap justify-center gap-8 md:gap-14">
        {profiles.map((profile) => (
          <button
            key={profile.id}
            onClick={() => onSelect(profile)}
            className="group flex flex-col items-center space-y-4 focus:outline-none transition-transform duration-300 hover:scale-105"
          >
            <div className="relative">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-28 h-28 md:w-40 md:h-40 rounded-md object-cover border-4 border-transparent group-hover:border-white transition-all duration-300 shadow-2xl"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity rounded-md"></div>
            </div>
            <span className="text-gray-400 text-xl font-light group-hover:text-white transition-colors letter-spacing-wide">
              {profile.name}
            </span>
          </button>
        ))}
      </div>
      <button className="mt-16 px-10 py-2.5 border-2 border-gray-600 text-gray-500 hover:text-white hover:border-white transition-all tracking-[0.3em] text-[12px] md:text-[14px] font-bold uppercase">
        Administrar Historia
      </button>
    </div>
  );
};

export default ProfileSelector;
