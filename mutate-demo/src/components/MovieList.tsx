"use client";
import dynamic from "next/dynamic";
import { useRatingMovie } from "@/hook/useRatingMovie";
import { Movie } from "@/type/Movie";
import { useEffect } from "react";
import { mutate } from "swr";
import { motion, AnimatePresence } from "framer-motion";

const MovieCardDestop = dynamic(() => import("@/components/MovieCardDestop"));

const MoivewList = () => {
  const TOKEN_KEY = process.env.NEXT_PUBLIC_CLIENT_TOKEN_KEY;
  const USER_KEY = process.env.NEXT_PUBLIC_CLIENT_API_KEY;

  const { response, isLoading, error } = useRatingMovie();
  useEffect(() => {
    const sessionId =
      typeof window !== "undefined"
        ? localStorage.getItem("guest_session_id")
        : null;

    const key = [`https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies?api_key=${USER_KEY}`,
      TOKEN_KEY,]

    const testKey = [`https://api.themoviedb.org/3/guest_session/`,sessionId]

  


  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>មានបញ្ហា: {error.message}</p>; // បង្ហាញសារកំហុសប្រសិនបើមាន

  const ratedMovies: Movie[] = response?.results || [];

  if (ratedMovies.length === 0) {
    return <p>គ្មាន movie</p>;
  }
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2 gap-2">
        <AnimatePresence>
          {ratedMovies.map((movie) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <MovieCardDestop
                //   key={movie.id}
                title={movie.title || "no Title"}
                src={
                  `https://image.tmdb.org/t/p/w500${movie.poster_path}` ||
                  "kkkk"
                }
                releaseDate={movie.title || "no date"}
                overview={movie.overview || "no article"}
                deleteBtnId={movie.id}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MoivewList;

/*

 <MovieCardDestop 
            title="kks"
            overview="22344"
            src="https://www.themoviedb.org/t/p/w1280/ombsmhYUqR4qqOLOxAyr5V8hbyv.jpg"
            releaseDate="2022-3-4"
        />
    */
