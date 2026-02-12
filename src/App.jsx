import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Events from "./pages/Events/Events.jsx"
import Home from "./pages/Home/Home.jsx";
import Timeline from "./pages/Timeline/Timeline.jsx";
import Alumnis from "./pages/Alumnis/Alumnis.jsx";
import Team from "./pages/Team/Team.jsx";
import CosmicBackground from "./components/Cosmicbackground/Cosmicbackground.jsx";
function App() {
  return (
    <BrowserRouter>
    {/* <CosmicBackground /> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/alumnis" element={<Alumnis />} />
        <Route path="/team" element={<Team />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
