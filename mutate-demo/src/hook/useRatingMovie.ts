'use client'
import useSWR from "swr";
import { useEffect, useState } from "react";
import { MovieApiResponse } from "@/type/MovieApiResponse";


const fetcher = async <T>([url, token]: [string, string]): Promise<T> => {
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.statusText} (${res.status})`);
    }
    return res.json();
};

export const useRatingMovie = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_CLIENT_WEB_URL;
  const TOKEN_KEY = process.env.NEXT_PUBLIC_CLIENT_TOKEN_KEY;
  const USER_KEY = process.env.NEXT_PUBLIC_CLIENT_API_KEY;

  const [guestSessionId, setGuestSessionId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
        const sessionId = localStorage.getItem('guest_session_id');
        if (sessionId) {
            setGuestSessionId(sessionId);
        }
    }
  }, []);

  const URL = BASE_URL && guestSessionId && USER_KEY ?
    `${BASE_URL}/guest_session/${guestSessionId}/rated/movies?api_key=${USER_KEY}` : null;
    
  const { data, isLoading, error } = useSWR<MovieApiResponse>(
    URL && TOKEN_KEY ? [URL, TOKEN_KEY] : null,
    fetcher
  );
  

  if (isLoading || error || !data) {
    return {
      response: null,      // ត្រឡប់ null ប្រសិនបើមិនទាន់មាន data/error
      isLoading: true,
      error: error || null
    };
  }

  
  return {
    response: data,     
    isLoading: false,
    error: null
  };
};