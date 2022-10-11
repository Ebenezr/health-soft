import axios from "axios";
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0LCJyb2xlIjoibnVyc2UifQ.yMX6vV7o-d5pR6fAamlSVaefltL93Jgs1klDn0ytCe4";

axios.defaults.baseURL = "http://127.0.0.1:3000/";
axios.defaults.headers.common = { Authorization: `bearer ${token}` };
export default axios;
