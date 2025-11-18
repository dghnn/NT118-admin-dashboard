// src/layouts/movie-manager/data.js
import { useEffect, useState } from "react";
import axios from "axios";

export const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("https://cine-backend-app.azurewebsites.net//api/movies");
        setMovies(response.data);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { movies, setMovies, loading };
};
