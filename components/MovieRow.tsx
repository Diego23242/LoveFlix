
import React, { useRef } from 'react';
import { Memory } from '../types';
import { Play, Plus, ThumbsUp, ChevronDown } from 'lucide-react';

interface MovieRowProps {
  title: string;
  memories: Memory[];
  onSelectMemory: (memory: Memory) => void;
  isTop10?: boolean;
}

const MovieRow: React.FC<MovieRowProps> = ({ title, memories, onSelectMemory, isTop10 = false }) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-2 md:space-y-4 mb-4 md:mb-8">
      <h2 className="text-lg md:text-2xl font-bold text-[#e5e5e5] px-4 md:px-0 letter-spacing-wide">
        {title}
      </h2>
      
      <div className="group/row relative">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-0 z-40 bg-black/50 w-8 md:w-12 flex items-center justify-center opacity-0 md:group-hover/row:opacity-100 transition-opacity hover:bg-black/80"
        >
          <ChevronDown className="w-6 h-6 md:w-8 md:h-8 text-white rotate-90" />
        </button>

        <div 
          ref={rowRef}
          className="netflix-row flex overflow-x-scroll overflow-y-visible space-x-2 md:space-x-3 py-6 md:py-10 px-4 md:px-0"
        >
          {memories.map((memory, index) => (
            <div 
              key={memory.id}
              className={`flex-none group/card relative ${isTop10 ? 'w-[140px] md:w-[320px] ml-10 md:ml-14' : 'w-[130px] md:w-[280px]'}`}
            >
              {isTop10 && (
                <div className="absolute -left-10 md:-left-14 bottom-0 top10-number z-0 opacity-80">
                  {index + 1}
                </div>
              )}

              <div 
                onClick={() => onSelectMemory(memory)}
                className="card-transition relative rounded-sm overflow-hidden cursor-pointer shadow-lg bg-[#181818]"
              >
                <img 
                  src={memory.imageUrl} 
                  alt={memory.title} 
                  className="w-full aspect-video md:aspect-video object-cover"
                />
                
                {/* Detalles al hover - Solo visibles en Desktop */}
                <div className="absolute inset-0 bg-[#181818] opacity-0 md:group-hover/card:opacity-100 transition-opacity duration-300 hidden md:flex flex-col">
                  <img src={memory.imageUrl} className="w-full aspect-video object-cover" alt="" />
                  <div className="p-3 space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="bg-white rounded-full p-1.5 text-black hover:bg-white/80 transition-colors"><Play size={16} fill="black" /></div>
                      <div className="border-2 border-gray-500 rounded-full p-1.5 hover:border-white transition-colors"><Plus size={16} /></div>
                      <div className="border-2 border-gray-500 rounded-full p-1.5 hover:border-white transition-colors"><ThumbsUp size={16} /></div>
                      <div className="ml-auto border-2 border-gray-500 rounded-full p-1.5 hover:border-white transition-colors"><ChevronDown size={16} /></div>
                    </div>
                    <div className="flex items-center space-x-2 text-[10px] md:text-[12px] font-bold">
                      <span className="text-green-500">98% Match</span>
                      <span className="border border-gray-500 px-1.5 py-0.5 rounded-sm text-gray-300">13+</span>
                      <span className="text-gray-300">{memory.duration}</span>
                      <span className="border border-gray-500 px-1.5 py-0.5 rounded-sm text-[8px]">HD</span>
                    </div>
                    <p className="text-white text-xs font-bold truncate tracking-wide">{memory.title}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-0 z-40 bg-black/50 w-8 md:w-12 flex items-center justify-center opacity-0 md:group-hover/row:opacity-100 transition-opacity hover:bg-black/80"
        >
          <ChevronDown className="w-6 h-6 md:w-8 md:h-8 text-white -rotate-90" />
        </button>
      </div>
    </div>
  );
};

export default MovieRow;
