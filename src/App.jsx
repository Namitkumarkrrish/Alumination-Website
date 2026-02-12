import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Events from "./pages/Events/Events.jsx"
import Home from "./pages/Home/Home.jsx";
import Timeline from "./pages/Timeline/Timeline.jsx";
import Alumnis from "./pages/Alumnis/Alumnis.jsx";
import Team from "./pages/Team/Team.jsx";
import CosmicBackground from "./components/Cosmicbackground/Cosmicbackground.jsx";
// 1. Import the Custom Cursor
import CustomCursor from "./components/CustomCursor/CustomCursor.jsx"; 

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;