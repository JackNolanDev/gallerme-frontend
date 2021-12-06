import backendApi from "./backendApi";

const getAllUsers = () => {
  return backendApi.get("/users").then((response) => response.data);
};

const getUserById = (id) => {
  return backendApi.get(`/users/${id}`).then((response) => response.data);
};

const createUser = (user) => {
  return backendApi.post("/users", user).then((response) => response.data);
};

const updateUser = (user) => {
  return backendApi.put("/users", user).then((response) => response.data);
};

const deleteUser = (id) => {
  return backendApi.delete(`/users/${id}`).then((response) => response.data);
};

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
