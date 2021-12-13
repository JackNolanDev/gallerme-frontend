import backendApi from "./backendApi";

const getAllArt = () => {
  return backendApi.get("/art").then((response) => response.data);
};

const getArtById = (id) => {
  return backendApi.get(`/art/${id}`).then((response) => response.data);
};

const getArtByUserId = (id) => {
  return backendApi.get(`/art/user/${id}`).then((response) => response.data);
};

const getArtByColorId = (id) => {
  return backendApi.get(`/art/color/${id}`).then((response) => response.data);
};

const searchArt = (term) => {
  return backendApi
    .get("/art/search", { params: { term } })
    .then((response) => response.data);
};

const createArt = (art) => {
  return backendApi.post("/art", art).then((response) => response.data);
};

const updateArt = (art) => {
  return backendApi.put("/art", art).then((response) => response.data);
};

const deleteArt = (id) => {
  return backendApi.delete(`/art/${id}`).then((response) => response.data);
};

const getArtForCurrentUser = () => {
  return backendApi.get("/account/art").then((response) => response.data);
};

export default {
  getAllArt,
  getArtById,
  getArtByUserId,
  getArtByColorId,
  searchArt,
  createArt,
  updateArt,
  deleteArt,
  getArtForCurrentUser,
};
