import Patient from "./components/nav/aside";
import Sidenav from "./components/nav/Sidenav";
import "./sass/style.scss";
function App() {
  return (
    <main>
      <Sidenav />
      <Patient />
    </main>
  );
}

export default App;
