import backendApi from "./apiInstances/backendApiInstance";

const getAllColors = () => {
  return backendApi.get("/colors").then((response) => response.data);
};

const getColorById = (id) => {
  return backendApi.get(`/colors/${id}`).then((response) => response.data);
};

const getColorByUserId = (id) => {
  return backendApi.get(`/colors/user/${id}`).then((response) => response.data);
};

const getColorByArtId = (id) => {
  return backendApi.get(`/colors/art/${id}`).then((response) => response.data);
};

const searchColors = (term) => {
  return backendApi
    .get("/colors/search", { params: { term } })
    .then((response) => response.data);
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

const getColorsForCurrentUser = () => {
  return backendApi.get("/account/colors").then((response) => response.data);
};

export default {
  getAllColors,
  getColorById,
  getColorByUserId,
  getColorByArtId,
  searchColors,
  createColor,
  updateColor,
  deleteColor,
  getColorsForCurrentUser,
};
