
import React, { useState, useEffect } from 'react';
import ProfileSelector from './components/ProfileSelector';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MovieRow from './components/MovieRow';
import MovieModal from './components/MovieModal';
import { Profile, Memory } from './types';

// ==========================================
// 1. CONFIGURA TUS PERFILES AQUÍ
// ==========================================
const INITIAL_PROFILES: Profile[] = [
  { 
    id: '1', 
    name: 'Tú', 
    avatar: 'https://fcb-abj-pre.s3.amazonaws.com/img/jugadors/MESSI.jpg' 
  },
  { 
    id: '2', 
    name: 'Yo', 
    avatar: 'https://assets-us-01.kc-usercontent.com/31dbcbc6-da4c-0033-328a-d7621d0fa726/bcc46436-ba6b-4e99-b6ee-17e9507b004d/2025-11-09T210026Z_700312376_UP1ELB91MCPGJ_RTRMADP_3_SOCCER-SPAIN-CEL-BAR.JPG?ver=03-06-2025?w=3840&q=75' 
  },
  { 
    id: '3', 
    name: 'Nosotros', 
    avatar: 'https://img.asmedia.epimg.net/resizer/v2/4HOFZHEQYBGZ3I3PGC3ZQ2HHVE.jpg?auth=3f19c1db58aec65854415f24f14f8914e0f7498cd4f2d72a73809a08837dbec6&width=1200&height=1200&focal=1289%2C466' 
  }
];

// ==========================================
// 2. CONFIGURA TUS MOMENTOS (IMÁGENES Y VIDEOS) AQUÍ
// ==========================================
const MEMORIES: Memory[] = [
  {
    id: 'm1',
    title: 'La Primera Cita',
    description: 'Aquel café donde el tiempo se detuvo y el universo conspiró para que no dejáramos de hablar. Fue el inicio de nuestra mayor producción.',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200',
    // videoUrl: './videos/primera-cita.mp4', // <--- Descomenta y pon tu video si tienes uno
    category: 'Estrenos Románticos',
    year: '2021',
    rating: 'A+',
    duration: 'Eterno',
    type: 'Movie'
  },
  {
    id: 'm2',
    title: 'Noche Bajo las Estrellas',
    description: 'Lejos de la ciudad, donde el cielo brillaba tanto como tus ojos. Un momento cinematográfico sin necesidad de filtros.',
    imageUrl: 'https://images.unsplash.com/photo-1532980400857-e8d9d275d858?auto=format&fit=crop&q=80&w=1200',
    category: 'Viajes Inolvidables',
    year: '2022',
    rating: '10',
    duration: '1 Noche',
    type: 'Movie'
  },
  {
    id: 'm3',
    title: 'Aniversario Mágico',
    description: 'Celebrando 365 días de complicidad, risas y crecimiento mutuo. La crítica lo aclama como el romance del año.',
    imageUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=1200',
    category: 'Top 10 Hoy',
    year: '2023',
    rating: '9.9',
    duration: 'Toda la vida',
    type: 'Movie'
  },
  {
    id: 'm4',
    title: 'Aventura en la Costa',
    description: 'Olas que borraban nuestras huellas pero no nuestros recuerdos. Un viaje refrescante lleno de adrenalina y amor.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200',
    category: 'Viajes Inolvidables',
    year: '2022',
    rating: '9.8',
    duration: '4 Días',
    type: 'Movie'
  },
  {
    id: 'm5',
    title: 'Besos en la Lluvia',
    description: 'El cielo lloraba pero nosotros reíamos. La escena que cualquier director envidiaría.',
    imageUrl: 'https://images.unsplash.com/photo-1515161352310-85892543976e?auto=format&fit=crop&q=80&w=1200',
    category: 'Momentos Épicos',
    year: '2021',
    rating: '10',
    duration: '2 Minutos',
    type: 'Movie'
  }
];

const App: React.FC = () => {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!selectedProfile) {
    return <ProfileSelector profiles={INITIAL_PROFILES} onSelect={setSelectedProfile} />;
  }

  return (
    <div className="relative min-h-screen bg-[#141414] animate-fade-in overflow-x-hidden">
      <Navbar isScrolled={isScrolled} activeProfile={selectedProfile} onResetProfile={() => setSelectedProfile(null)} />
      
      <main className="pb-32">
        <Hero memory={MEMORIES[0]} onPlay={() => setSelectedMemory(MEMORIES[0])} />
        
        <div className="relative z-10 -mt-24 md:-mt-48 space-y-12 pl-4 md:pl-12">
          <MovieRow 
            title="Las 10 Memorias más Populares de Nosotros Hoy" 
            memories={MEMORIES} 
            onSelectMemory={setSelectedMemory}
            isTop10={true}
          />

          <MovieRow 
            title="Tendencias del Corazón" 
            memories={[...MEMORIES].reverse()} 
            onSelectMemory={setSelectedMemory}
          />
          
          <MovieRow 
            title="Vueltas a ver: Maratones de Amor" 
            memories={[MEMORIES[2], MEMORIES[4], MEMORIES[1]]} 
            onSelectMemory={setSelectedMemory}
          />
        </div>
      </main>

      {selectedMemory && (
        <MovieModal 
          memory={selectedMemory} 
          onClose={() => setSelectedMemory(null)} 
        />
      )}

      <footer className="py-20 text-gray-500 text-center text-sm border-t border-gray-900 bg-[#141414]">
        <div className="flex justify-center space-x-8 mb-8 flex-wrap gap-y-4">
           <span className="hover:text-white cursor-pointer underline-offset-4 hover:underline">Audiodescripción</span>
           <span className="hover:text-white cursor-pointer underline-offset-4 hover:underline">Centro de ayuda</span>
           <span className="hover:text-white cursor-pointer underline-offset-4 hover:underline">Tarjetas de regalo</span>
           <span className="hover:text-white cursor-pointer underline-offset-4 hover:underline">Prensa de Pareja</span>
        </div>
        <p className="text-xs tracking-[0.2em] font-black text-[#E50914] mb-4 uppercase">LOVEFLIX ORIGINAL PRODUCTIONS</p>
        <p>© 2021-2024 LoveFlix Inc. Todos los momentos reservados.</p>
      </footer>
    </div>
  );
};

export default App;
