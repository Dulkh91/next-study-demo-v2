export interface RatedMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

export interface RatedMovieResponse {
  page: number;
  results: RatedMovie[];
  total_pages: number;
  total_results: number;
}