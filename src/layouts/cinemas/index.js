// src/layouts/cinema-manager/index.js
import React, { useState, useEffect } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { Card, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useCinemas, useRegions } from "./data";

export default function CinemaManager() {
  const { regions, loadingRegions, fetchRegions, addRegion, updateRegion, deleteRegion } =
    useRegions();
  const { cinemas, loading, errors, fetchAllCinemas, addCinema, updateCinema, deleteCinema } =
    useCinemas();

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", address: "", regionId: "" });

  // State form region
  const [regionForm, setRegionForm] = useState({ name: "", editingId: null });

  useEffect(() => {
    if (regions.length) fetchAllCinemas(regions);
  }, [regions]);

  const resetForm = () => {
    setEditing(null);
    setForm({ name: "", address: "", regionId: "" });
    setRegionForm({ name: "", editingId: null });
  };

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleRegionChange = (e) => setRegionForm((prev) => ({ ...prev, name: e.target.value }));

  const handleSave = async () => {
    const payload = { ...form };
    try {
      if (editing) await updateCinema(editing.id, payload);
      else await addCinema(payload);
      resetForm();
      fetchRegions();
    } catch (e) {
      alert(e.message);
    }
  };

  const handleRegionSave = async () => {
    try {
      if (regionForm.editingId) {
        await updateRegion(regionForm.editingId, { name: regionForm.name });
      } else {
        await addRegion({ name: regionForm.name });
      }
      resetForm();
      fetchRegions();
    } catch (e) {
      alert(e.message);
    }
  };

  const handleDeleteCinema = async (id) => {
    if (!window.confirm("Delete this cinema?")) return;
    try {
      await deleteCinema(id);
      fetchRegions();
    } catch (e) {
      alert(e.message);
    }
  };

  const handleEditRegion = (region) => setRegionForm({ name: region.name, editingId: region.id });
  const handleDeleteRegion = async (id) => {
    if (!window.confirm("Delete this region?")) return;
    try {
      await deleteRegion(id);
      fetchRegions();
    } catch (e) {
      alert(e.message);
    }
  };

  if (loading || loadingRegions) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3} textAlign="center">
          <MDTypography variant="h6">Loading...</MDTypography>
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3} display="flex" gap={3}>
        {/* LEFT COLUMN - Region Cards */}
        <MDBox flex={2} display="flex" flexDirection="column" gap={2}>
          {regions.map((region) => {
            const cinemasInRegion = cinemas.filter((c) => String(c.regionId) === String(region.id));
            return (
              <Card key={region.id} sx={{ p: 2 }}>
                <MDBox display="flex" alignItems="flex-start" gap={2}>
                  {/* Left: Region info */}
                  <MDBox minWidth="180px" display="flex" flexDirection="column" alignItems="center">
                    <MDTypography
                      variant="h5"
                      fontWeight="bold"
                      sx={{ color: "primary.main", textAlign: "center", py: 1, borderRadius: 1 }}
                    >
                      {region.name}
                    </MDTypography>

                    <MDBox display="flex" gap={0.5} mt={1}>
                      <MDButton
                        size="small"
                        variant="outlined"
                        color="info"
                        onClick={() => handleEditRegion(region)}
                      >
                        <EditIcon fontSize="small" />
                      </MDButton>
                      <MDButton
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => handleDeleteRegion(region.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </MDButton>
                    </MDBox>
                  </MDBox>

                  {/* Right: Cinemas */}
                  <MDBox flex={1} display="flex" flexDirection="column" gap={1}>
                    {cinemasInRegion.length > 0 ? (
                      cinemasInRegion.map((c) => (
                        <MDBox
                          key={c.id}
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          p={1}
                          sx={{ border: "1px solid #eee", borderRadius: 1 }}
                        >
                          <MDTypography variant="caption" fontWeight="bold" fontSize="12">
                            {c.name}
                          </MDTypography>
                          <MDTypography variant="caption" fontSize="10">
                            {c.address}
                          </MDTypography>
                          <MDBox display="flex" gap={0.5}>
                            <MDButton
                              size="small"
                              color="info"
                              variant="gradient"
                              onClick={() => setEditing(c) || setForm(c)}
                            >
                              EDIT
                            </MDButton>
                            <MDButton
                              size="small"
                              color="error"
                              variant="gradient"
                              onClick={() => handleDeleteCinema(c.id)}
                            >
                              DELETE
                            </MDButton>
                          </MDBox>
                        </MDBox>
                      ))
                    ) : (
                      <MDTypography
                        variant="caption"
                        color="text.secondary"
                        fontStyle="italic"
                        sx={{ p: 1 }}
                      >
                        {loading
                          ? "Loading cinemas..."
                          : errors[region.id]
                          ? errors[region.id]
                          : cinemasInRegion.length === 0
                          ? "No cinemas in this region."
                          : null}
                      </MDTypography>
                    )}
                  </MDBox>
                </MDBox>
              </Card>
            );
          })}
        </MDBox>

        {/* RIGHT COLUMN - Form thêm/sửa cinema & region */}
        <MDBox flex={1}>
          <Card sx={{ p: 3 }}>
            <MDTypography variant="h5" fontWeight="bold" mb={2}>
              {editing ? "Edit Cinema" : "Add Cinema"}
            </MDTypography>

            <MDBox display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                fullWidth
                size="small"
              />
              <TextField
                label="Address"
                name="address"
                value={form.address}
                onChange={handleChange}
                fullWidth
                size="small"
              />
              <FormControl fullWidth size="small">
                <InputLabel>Region</InputLabel>
                <Select
                  name="regionId"
                  value={form.regionId}
                  onChange={handleChange}
                  sx={{ minHeight: 40 }}
                >
                  {regions.map((r) => (
                    <MenuItem key={r.id} value={r.id}>
                      {r.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <MDBox display="flex" justifyContent="flex-end" gap={1} mt={2}>
                <MDButton variant="outlined" color="secondary" size="small" onClick={resetForm}>
                  Clear
                </MDButton>
                <MDButton variant="gradient" color="primary" onClick={handleSave}>
                  {editing ? "Save" : "Add"}
                </MDButton>
              </MDBox>

              {/* Region Form */}
              <MDTypography variant="subtitle2" fontWeight="bold" mt={2}>
                {regionForm.editingId ? "Edit Region" : "Add Region"}
              </MDTypography>
              <MDBox display="flex" gap={1} mt={1}>
                <TextField
                  label="Region Name"
                  value={regionForm.name}
                  onChange={handleRegionChange}
                  size="small"
                  fullWidth
                />

                {regionForm.editingId && (
                  <MDButton
                    variant="outlined"
                    color="secondary"
                    size="small"
                    onClick={() => setRegionForm({ name: "", editingId: null })}
                    sx={{ minWidth: "36px", padding: "4px 8px" }}
                  >
                    ×
                  </MDButton>
                )}

                <MDButton variant="gradient" color="success" onClick={handleRegionSave}>
                  {regionForm.editingId ? "Save" : "Add"}
                </MDButton>
              </MDBox>
            </MDBox>
          </Card>
        </MDBox>
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
}
