
import React from 'react';
import { Memory } from '../types';
import { Play, Info } from 'lucide-react';

interface HeroProps {
  memory: Memory;
  onPlay: () => void;
}

const Hero: React.FC<HeroProps> = ({ memory, onPlay }) => {
  return (
    <section className="relative h-[70vh] md:h-[95vh] w-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        {memory.videoUrl ? (
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover object-center md:object-top"
          >
            <source src={memory.videoUrl} type="video/mp4" />
          </video>
        ) : (
          <img 
            src={memory.imageUrl} 
            alt={memory.title} 
            className="w-full h-full object-cover object-center md:object-top"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/30"></div>
      </div>

      <div className="relative z-10 h-full flex flex-col justify-end md:justify-center px-4 md:px-12 max-w-4xl space-y-4 md:space-y-6 pb-20 md:pb-0 md:pt-12">
        <div className="flex items-center space-x-2">
          <div className="bg-[#E50914] text-white px-1.5 py-0.5 text-[10px] md:text-[14px] font-black rounded-sm shadow-lg tracking-tighter">LOVEFLIX</div>
          <span className="text-white text-[12px] md:text-[18px] font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase opacity-90 text-shadow">ORIGINAL</span>
        </div>
        
        <h1 className="text-4xl md:text-8xl font-black leading-tight md:leading-[1] text-shadow letter-spacing-wide transition-all duration-500">
          {memory.title}
        </h1>
        
        <p className="text-base md:text-2xl text-white font-medium max-w-2xl line-height-relaxed text-shadow opacity-90 line-clamp-3 md:line-clamp-none">
          {memory.description}
        </p>
        
        <div className="flex space-x-3 md:space-x-4 pt-4">
          <button 
            onClick={onPlay}
            className="flex-1 md:flex-none flex items-center justify-center space-x-2 md:space-x-3 bg-white text-black px-4 py-2.5 md:px-10 md:py-4 rounded-md hover:bg-white/80 transition-all font-bold text-sm md:text-lg shadow-xl"
          >
            <Play className="w-4 h-4 md:w-6 md:h-6 fill-black" />
            <span>Reproducir</span>
          </button>
          <button 
            onClick={onPlay}
            className="flex-1 md:flex-none flex items-center justify-center space-x-2 md:space-x-3 bg-gray-500/60 text-white px-4 py-2.5 md:px-10 md:py-4 rounded-md hover:bg-gray-500/40 transition-all font-bold text-sm md:text-lg backdrop-blur-md shadow-xl"
          >
            <Info className="w-4 h-4 md:w-6 md:h-6" />
            <span>Info</span>
          </button>
        </div>
      </div>

      <div className="absolute right-0 bottom-24 bg-black/40 border-l-4 border-gray-300 py-1.5 px-4 md:py-2 md:px-8 backdrop-blur-sm">
        <span className="text-white font-bold text-sm md:text-xl tracking-widest uppercase">98% Match</span>
      </div>
    </section>
  );
};

export default Hero;
