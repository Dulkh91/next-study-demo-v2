"use client";
import { MdDeleteOutline } from "react-icons/md";
import { useDeleteMovie } from "@/hook/useDeleteMovie";
import { mutate } from "swr";

import { useState } from "react";
import { MovieApiResponse } from "@/type/MovieApiResponse";

const DeleteBtn = ({ id }: { id: string }) => {
  const TOKEN_KEY = process.env.NEXT_PUBLIC_CLIENT_TOKEN_KEY;
  const USER_KEY = process.env.NEXT_PUBLIC_CLIENT_API_KEY;

  const [deleting, setDeleting] = useState<boolean>(false);
  const [guestSessionId, setGuestSessionId] = useState<string | null>(null);

  const { deleteMovie } = useDeleteMovie();

  const handleDelete = async () => {
    setDeleting(true);

    try {
      let sessionId = guestSessionId;

      if (!sessionId && typeof window !== "undefined") {
        sessionId = localStorage.getItem("guest_session_id");

        if (sessionId) {
          setGuestSessionId(sessionId);
        }
      }

      if (!sessionId) {
        alert("The guestion sesstion not found.");
        return;
      }

      await deleteMovie({
        movieId: id,
        guestSession: sessionId,
      });

      const key = [`https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies?api_key=${USER_KEY}`,TOKEN_KEY,]

      mutate(key,
        (prev: MovieApiResponse | undefined): MovieApiResponse | undefined => {
          if (!prev) return prev;

          return {
            ...prev,
            results: prev.results.filter((movie) => String(movie.id) !== id),
          };
        },
        false // don't refetch
      );
    } catch (err) {
      console.error("បរាជ័យក្នុងការលុប rating", err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="group-hover">
      <div
        className="absolute top-0 left-0 w-6 h-6 bg-gray-400/60 hover:bg-gray-400/20 rounded-full flex justify-center items-center cursor-pointer"
        onClick={!deleting ? handleDelete : undefined}
      >
        <MdDeleteOutline className="text-2xl text-white/70 hover:text-white" />
      </div>
    </div>
  );
};

export default DeleteBtn;
