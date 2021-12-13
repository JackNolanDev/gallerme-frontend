import axios from "axios";

const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api" // local server
    : "https://quiet-eyrie-60149.herokuapp.com/api"; // heroku deployment of backend

const instance = axios.create({
  baseURL: url,
});

instance.defaults.headers.common["Content-Type"] =
  "application/x-www-form-urlencoded";
instance.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
instance.defaults.withCredentials = true; // send session cookie
if (process.env.NODE_ENV !== "development") {
  instance.defaults.headers.common["X-Forwarded-Proto"] = "https";
}

export default instance;
