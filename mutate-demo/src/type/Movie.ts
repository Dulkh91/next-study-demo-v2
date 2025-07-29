export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null; // អាច null ប្រសិនបើគ្មាន poster
  release_date: string;
  
  vote_average: number;
  backdrop_path: string | null;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
  vote_count: number;
  rating?: number;
}
