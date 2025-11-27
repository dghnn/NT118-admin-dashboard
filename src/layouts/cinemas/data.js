// src/layouts/cinema-manager/data.js
import { useState, useEffect } from "react";
import { getToken } from "utils/auth";

const API_BASE = "http://135.171.171.14/api";

// ----------------------------
// REGION HOOK
// ----------------------------
export function useRegions() {
  const [regions, setRegions] = useState([]);
  const [loadingRegions, setLoading] = useState(true);

  const fetchRegions = async () => {
    setLoading(true);
    try {
      const token = getToken();
      const res = await fetch(`${API_BASE}/regions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setRegions(data.data || []);
    } catch (err) {
      console.error("Fetch regions error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------
  // CRUD REGION
  // ----------------------------
  const addRegion = async (payload) => {
    try {
      const token = getToken();
      const res = await fetch(`${API_BASE}/regions`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      const text = await res.text();
      if (!res.ok) throw new Error(`Add region failed: ${text}`);
    } catch (err) {
      console.error("Add region error:", err);
      throw err;
    }
  };

  const updateRegion = async (id, payload) => {
    try {
      const token = getToken();
      const res = await fetch(`${API_BASE}/regions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      const text = await res.text();
      if (!res.ok) throw new Error(`Update region failed: ${text}`);
    } catch (err) {
      console.error("Update region error:", err);
      throw err;
    }
  };

  const deleteRegion = async (id) => {
    try {
      const token = getToken();
      const res = await fetch(`${API_BASE}/regions/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const text = await res.text();
      if (!res.ok) throw new Error(`Delete region failed: ${text}`);
    } catch (err) {
      console.error("Delete region error:", err);
      throw err;
    }
  };

  useEffect(() => {
    fetchRegions();
  }, []);

  return { regions, loadingRegions, fetchRegions, addRegion, updateRegion, deleteRegion };
}

// ----------------------------
// CINEMA HOOK
// ----------------------------
export function useCinemas() {
  const [cinemas, setCinemas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  const fetchCinemasByRegion = async (regionId) => {
    try {
      const token = getToken();
      const res = await fetch(`${API_BASE}/cinemas?regionId=${regionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to fetch cinemas for region ${regionId}: ${text}`);
      }

      const data = await res.json();
      return data.data || [];
    } catch (err) {
      console.error(`Fetch cinemas by region ${regionId} error:`, err);
      setErrors((prev) => ({ ...prev, [regionId]: err.message }));
      return [];
    }
  };

  const fetchAllCinemas = async (regions) => {
    setLoading(true);
    //setError(null);
    try {
      const promises = regions.map((r) => fetchCinemasByRegion(r.id));
      const results = await Promise.all(promises);
      setCinemas(results.flat());
    } catch (err) {
      console.error("Fetch all cinemas error:", err);
      //setError("Failed to fetch cinemas");
    } finally {
      setLoading(false);
    }
  };

  const addCinema = async (payload) => {
    try {
      const token = getToken();
      const res = await fetch(`${API_BASE}/cinemas`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      const text = await res.text();
      if (!res.ok) throw new Error(`Create cinema failed: ${text}`);
    } catch (err) {
      console.error("Add cinema error:", err);
      throw err;
    }
  };

  const updateCinema = async (id, payload) => {
    try {
      const token = getToken();
      const res = await fetch(`${API_BASE}/cinemas/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      const text = await res.text();
      if (!res.ok) throw new Error(`Update cinema failed: ${text}`);
    } catch (err) {
      console.error("Update cinema error:", err);
      throw err;
    }
  };

  const deleteCinema = async (id, regions = []) => {
    try {
      const token = getToken(); // backend token
      console.log("[DEBUG] deleteCinema token:", token);

      const res = await fetch(`${API_BASE}/cinemas/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const text = await res.text();
      console.log("[DEBUG] deleteCinema response:", text);

      if (!res.ok) throw new Error(`Delete cinema failed: ${text}`);

      // Nếu bạn muốn, refresh danh sách
      if (regions.length) await fetchAllCinemas(regions);
    } catch (err) {
      console.error("[DEBUG] Delete cinema error:", err);
      throw err;
    }
  };

  return {
    cinemas,
    loading,
    errors,
    fetchCinemasByRegion,
    fetchAllCinemas,
    addCinema,
    updateCinema,
    deleteCinema,
  };
}
