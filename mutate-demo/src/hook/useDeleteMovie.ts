import useSWRMutation from "swr/mutation";

interface DeleteMovieRatingArgs {
  movieId: string | number; // Assuming movieId can be a string or number
  guestSession: string;
}

// Create fecther method 
const deleteMovieRating = async (url:string, { arg }:{arg: DeleteMovieRatingArgs}) => {

  const { movieId, guestSession } = arg; // Destructure movieId and token from the arg object
  const TOKEN_KEY = process.env.NEXT_PUBLIC_CLIENT_TOKEN_KEY;
  const API_KEY = process.env.NEXT_PUBLIC_CLIENT_API_KEY;

  if (!movieId || !guestSession) {
    throw new Error("Movie ID and guestSession are required for deletion.");
  }
  if(!TOKEN_KEY && !API_KEY){
    throw new Error("The token key and api key not found.")
  }

  const endpointUrl = `${url}/${movieId}/rating?api_key=${API_KEY}&guest_session_id=${guestSession}`

  const response = await fetch(endpointUrl, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${TOKEN_KEY}`,
      "Content-Type": "application/json", // Often good practice for API requests
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.status_message || "Failed to delete movie rating.");
  }

  // Handle response
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.status_message || "Failed to delete movie rating.");
  }

  return response.status === 204 ? { success: true } : await response.json();
};


export const useDeleteMovie = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_CLIENT_WEB_URL;
  const URL = BASE_URL ? `${BASE_URL}/movie` : null;

  const {
    trigger: deleteMovie,
    isMutating,
  } = useSWRMutation(URL, deleteMovieRating, {
    populateCache: false,
    revalidate: true,// allow re-fetch
  });

  return {
    deleteMovie,
    isMutating,
  };
};

/*

const useDeleteMovieRating = () => {
  // Base URL for the movie API
  const BASE_URL = "https://api.themoviedb.org/3/movie";
  

  const { trigger, isMutating, error } = useSWRMutation(
    BASE_URL, // The key for useSWRMutation. The actual endpoint is built in the fetcher.
    deleteMovieRating 
  );

  return { 
    deleteRating: trigger, // Rename trigger to something more descriptive
    isDeleting: isMutating, // Rename isMutating to something more descriptive
    deletionError: error,
  };
};
 
export default useDeleteMovieRating;
*/