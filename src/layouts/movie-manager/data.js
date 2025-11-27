// src/layouts/movie-manager/data.js
import { useEffect, useState } from "react";
import { getToken } from "utils/auth";

const API_URL = "http://135.171.171.14/api/movies";

export const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Fetch danh sách phim ---
  const fetchMovies = async () => {
    setLoading(true);
    try {
      const token = getToken();
      const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const text = await res.text();
      if (!res.ok) throw new Error(`Fetch movies failed: ${text}`);

      const data = JSON.parse(text);
      setMovies(data);
    } catch (err) {
      console.error("Fetch movies error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // --- Thêm phim mới ---
  const addMovie = async (movieData) => {
    try {
      const token = getToken();
      console.log("[DEBUG] Add movie payload:", movieData);

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(movieData),
      });

      const text = await res.text();
      console.log("[DEBUG] Add movie response:", text);

      if (!res.ok) throw new Error(`Add movie failed: ${text}`);

      const newMovie = JSON.parse(text);
      setMovies((prev) => [...prev, newMovie]);
      return newMovie;
    } catch (err) {
      console.error("Add movie error:", err);
      throw err;
    }
  };

  // --- Cập nhật phim ---
  const updateMovie = async (id, updatedData) => {
    try {
      const token = getToken();
      console.log("[DEBUG] Update movie id:", id, "payload:", updatedData);

      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      const text = await res.text();
      console.log("[DEBUG] Update movie response:", text);

      if (!res.ok) throw new Error(`Update movie failed: ${text}`);

      const updatedMovie = JSON.parse(text);
      setMovies((prev) => prev.map((movie) => (movie.id === id ? updatedMovie : movie)));
      return updatedMovie;
    } catch (err) {
      console.error("Update movie error:", err);
      throw err;
    }
  };

  // --- Xóa phim ---
  const deleteMovie = async (id) => {
    try {
      const token = getToken();
      console.log("[DEBUG] Delete movie id:", id);

      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const text = await res.text();
      console.log("[DEBUG] Delete movie response:", text);

      if (!res.ok) throw new Error(`Delete movie failed: ${text}`);

      setMovies((prev) => prev.filter((movie) => movie.id !== id));
      return true;
    } catch (err) {
      console.error("Delete movie error:", err);
      throw err;
    }
  };

  return {
    movies,
    setMovies,
    loading,
    fetchMovies,
    addMovie,
    updateMovie,
    deleteMovie,
  };
};
