import Patient from "./components/Tables/AppoinmentTBL";
import Sidenav from "./components/nav/Sidenav";
import "./sass/style.scss";
import DoctorTBL from "./components/Tables/Doctortable";
import NurseTBL from "./components/Tables/NurseTBL";
import TriageTBL from "./components/Tables/TriageTBL";
function App() {
  return (
    <main>
      <Sidenav />
      <TriageTBL />
    </main>
  );
}

export default App;
