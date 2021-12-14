import backendApi from "./apiInstances/backendApiInstance";

const currentUser = () => {
  return backendApi.get("/account").then((response) => response.data);
};

const signup = (user) => {
  return backendApi
    .post("/account/signup", user)
    .then((response) => response.data);
};

const login = (user) => {
  return backendApi
    .post("/account/login", user)
    .then((response) => response.data);
};

const logout = () => {
  return backendApi.post("/account/logout").then((response) => response.data);
};

export default {
  currentUser,
  signup,
  login,
  logout,
};
