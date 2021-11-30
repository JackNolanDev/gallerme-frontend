import axios from "axios";

// const url = process.env.NODE_ENV === "development" ? "http://localhost:5000/api" : "TBD"
const url = "http://localhost:5000/api";

const instance = axios.create({
  baseURL: url,
});

instance.defaults.headers.common["Content-Type"] =
  "application/x-www-form-urlencoded";
instance.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
instance.defaults.withCredentials = true; // send session cookie

export default instance;