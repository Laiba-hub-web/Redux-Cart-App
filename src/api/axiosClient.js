import axios from "axios";

// A single configured axios instance, reused everywhere instead of
// importing raw axios and repeating the base URL in every request.
const axiosClient = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 8000, // fail fast instead of hanging indefinitely on a dead network
});

export default axiosClient;
