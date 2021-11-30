import backendApi from "./backendApi";

const getAllColors = () => {
  return backendApi.get("/colors").then((response) => response.data);
};

const getColorById = (id) => {
  return backendApi.get(`/colors/${id}`).then((response) => response.data);
};

const createColor = (color) => {
  return backendApi.post("/colors", color).then((response) => response.data);
};

const updateColor = (color) => {
  return backendApi.put("/colors", color).then((response) => response.data);
};

const deleteColor = (id) => {
  return backendApi.delete(`/colors/${id}`).then((response) => response.data);
};

export default {
  getAllColors,
  getColorById,
  createColor,
  updateColor,
  deleteColor,
};
