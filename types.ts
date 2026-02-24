
export interface Memory {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl?: string; // Nuevo: Para videos .mp4
  category: string;
  year: string;
  rating: string;
  duration: string;
  type: 'Movie' | 'Series';
}

export interface Profile {
  id: string;
  name: string;
  avatar: string;
}

export interface Category {
  id: string;
  title: string;
  memories: Memory[];
}
