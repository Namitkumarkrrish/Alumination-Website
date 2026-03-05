import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Events from "./pages/Events/Events.jsx"
import Home from "./pages/Home/Home.jsx";
import Timeline from "./pages/Timeline/Timeline.jsx";
import Alumnis from "./pages/Alumnis/Alumnis.jsx";
import Team from "./pages/Team/Team.jsx";
import CosmicBackground from "./components/Cosmicbackground/Cosmicbackground.jsx";
import CustomCursor from "./components/CustomCursor/CustomCursor.jsx"; 
import Tshirt from "./pages/Tshirt/Tshirt.jsx";
import Footer from "./components/Footer/Footer.jsx";
import RegisterLinkedin from "./components/Register/RegisterLinkedin/RegisterLinkedin.jsx";
import RegisterMock from "./components/Register/RegisterMock/RegisterMock.jsx";
import RegisterCase from "./components/Register/RegisterCase/RegisterCase.jsx";
import RegisterIdeathon from "./components/Register/RegisterIdeathon/RegisterIdeathon.jsx";

function App() {
  return (
    <BrowserRouter>
      {/* 2. The Custom Cursor (Placed high so it tracks everywhere) */}
      <CustomCursor />

      {/* 3. The 3D Background (Placed behind everything) */}
      <CosmicBackground />

      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/alumnis" element={<Alumnis />} />
        <Route path="/team" element={<Team />} />
        <Route path="/merchandise" element={<Tshirt />} />
        <Route path="registerLinkedin" element={<RegisterLinkedin />} />
        <Route path="/registerMock" element={<RegisterMock />} />
        <Route path="/registerCase" element={<RegisterCase />} />
        <Route path="/registerIdeathon" element={<RegisterIdeathon />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;