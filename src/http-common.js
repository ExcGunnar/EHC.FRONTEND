import axios from "axios";
export default axios.create({
  baseURL: "http://localhost:30499/Ehc/",
  headers: {
    "Content-type": "application/json"
  }
});