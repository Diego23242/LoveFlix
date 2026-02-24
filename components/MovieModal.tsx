
import React, { useState, useEffect } from 'react';
import { Memory } from '../types';
import { generateRomanticMessage } from '../services/geminiService';
import { X, Play, Plus, ThumbsUp, Volume2 } from 'lucide-react';

interface MovieModalProps {
  memory: Memory;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ memory, onClose }) => {
  const [loveLetter, setLoveLetter] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  const handleGenerateLetter = async () => {
    setLoading(true);
    const letter = await generateRomanticMessage(memory.title, memory.description);
    setLoveLetter(letter);
    setLoading(false);
  };

  return (
    <div 
      className="fixed inset-0 z-[150] flex items-start md:items-center justify-center bg-black/90 md:p-12 animate-fade-in backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-[#181818] w-full max-w-5xl md:rounded-xl overflow-hidden relative shadow-2xl flex flex-col min-h-screen md:min-h-0 mb-0 md:mb-12"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón Cerrar Flotante */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-[210] bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-colors shadow-lg border border-white/10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Cabecera con Imagen o Video */}
        <div className="relative aspect-[3/4] md:aspect-video w-full bg-black">
          {memory.videoUrl ? (
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={memory.videoUrl} type="video/mp4" />
            </video>
          ) : (
            <img src={memory.imageUrl} alt={memory.title} className="w-full h-full object-cover" />
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-black/20"></div>
          
          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-12 right-6 space-y-4 md:space-y-6">
            <h2 className="text-3xl md:text-6xl font-black text-shadow letter-spacing-wide leading-tight">
              {memory.title}
            </h2>
            <div className="flex flex-wrap items-center gap-3">
              <button className="bg-white text-black px-6 py-2 md:px-8 md:py-3 rounded-md font-black hover:bg-white/80 transition-all flex items-center space-x-2 shadow-xl text-sm md:text-base">
                 <Play className="w-5 h-5 fill-black" />
                 <span>Reproducir</span>
              </button>
              <div className="flex items-center space-x-2">
                <button className="border-2 border-gray-400 p-2 md:p-2.5 rounded-full hover:border-white transition-colors">
                  <Plus className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </button>
                <button className="border-2 border-gray-400 p-2 md:p-2.5 rounded-full hover:border-white transition-colors">
                  <ThumbsUp className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </button>
              </div>
              <button className="hidden md:block ml-auto border-2 border-gray-400 p-2.5 rounded-full hover:border-white transition-colors">
                <Volume2 className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Contenido Detallado */}
        <div className="p-6 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            <div className="flex items-center flex-wrap gap-3 text-[14px] md:text-[16px] font-bold letter-spacing-wide">
              <span className="text-green-500">98% Match</span>
              <span className="text-gray-400 font-normal">{memory.year}</span>
              <span className="border border-gray-600 px-1.5 py-0.5 rounded-sm text-[10px] md:text-[12px]">16+</span>
              <span className="text-gray-400 font-normal">{memory.duration}</span>
              <span className="border border-gray-600 px-1.5 py-0.5 rounded-sm text-[8px] md:text-[10px]">Ultra HD 4K</span>
            </div>
            
            <p className="text-base md:text-xl leading-relaxed text-gray-200 font-light letter-spacing-wide">
              {memory.description}
            </p>

            {/* Sección de IA - Carta de Amor */}
            <div className="pt-6 md:pt-8 border-t border-gray-800 space-y-4 md:space-y-6">
              <div className="flex items-center space-x-3 text-[#E50914]">
                <div className="w-1 h-6 md:h-8 bg-[#E50914]"></div>
                <h3 className="text-xl md:text-2xl font-black tracking-tighter uppercase italic">
                  San Valentín Special Cut
                </h3>
              </div>
              
              {loveLetter ? (
                <div className="bg-white/5 p-5 md:p-8 rounded-lg italic text-gray-200 leading-relaxed md:leading-[1.8] text-base md:text-lg border-l-4 border-[#E50914] animate-fade-in shadow-inner whitespace-pre-wrap letter-spacing-wide">
                  "{loveLetter}"
                </div>
              ) : (
                <button 
                  onClick={handleGenerateLetter}
                  disabled={loading}
                  className="w-full py-4 md:py-5 bg-[#E50914] text-white rounded-md font-black hover:bg-[#b90710] transition-all transform active:scale-[0.98] flex items-center justify-center space-x-4 disabled:opacity-50 shadow-2xl"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <span className="text-sm md:text-lg uppercase tracking-widest">Generar Guion de Amor</span>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Metadata lateral / inferior */}
          <div className="space-y-4 md:space-y-6 text-[13px] md:text-[14px] letter-spacing-wide pt-4 md:pt-0 border-t md:border-t-0 border-gray-800">
            <div className="flex flex-col space-y-1">
              <span className="text-gray-500 font-medium">Protagonistas:</span>
              <span className="text-gray-300">Tú, Yo, El Destino</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-gray-500 font-medium">Géneros:</span>
              <span className="text-gray-300">Romance Moderno, Épica de Vida, Comedia de Pareja</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-gray-500 font-medium">Este momento es:</span>
              <span className="text-gray-300">Apasionado, Emotivo, Único, Imprescindible</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
