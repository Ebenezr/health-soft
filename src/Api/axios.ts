import axios from "axios";

// JSON.parse(localStorage.getItem("name") || "{}");
const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0LCJyb2xlIjoibnVyc2UifQ.yMX6vV7o-d5pR6fAamlSVaefltL93Jgs1klDn0ytCe4";

axios.defaults.baseURL = " http://localhost:3000/api/v1/";
//2 hours debugging !!!
//catch JSON parse error
try {
  axios.defaults.headers.common = {
    Authorization: `bearer ${
      localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token") || undefined)
        : null
    }`,
  };
} catch (err) {}
export default axios;
