import Sidenav from "./components/nav/Sidenav";

import "./sass/style.scss";

import Layout from "./Pages/Layout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  //protect app component
  const [authenticated, setauthenticated] = useState<boolean>(false);

  useEffect(() => {
    // const loggedUser: userInterface = JSON.parse(
    //   localStorage.getItem("name") || "{}"
    // );
    const auth: boolean = JSON.parse(
      localStorage.getItem("authenticated") || ""
    );
    if (auth) {
      setauthenticated(auth);
    } else {
      navigate("/");
      // Redirect if not loggedin
    }
  }, []);
  if (!authenticated) {
    navigate("/");
  }

  return (
    <main>
      <Sidenav />
      <Layout />
    </main>
  );
}

export default App;
