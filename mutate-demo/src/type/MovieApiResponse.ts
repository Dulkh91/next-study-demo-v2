import { Movie } from "./Movie" // Import Movie interface ដែលបានកំណត់ខាងលើ


export interface MovieApiResponse {
  page: number;
  results: Movie[]; // នេះគឺជា array នៃ Movie objects
  total_pages: number;
  total_results: number;
}