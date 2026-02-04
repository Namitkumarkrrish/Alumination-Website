import { useEffect, useState } from "react";
import Preloader from "./components/Preloader/Preloader";

function App() {
  const hasSeenPreloader = sessionStorage.getItem("alumination_preloader_seen");

  const [loading, setLoading] = useState(!hasSeenPreloader);

  // const handlePreloaderFinish = () => {
  //   sessionStorage.setItem("alumination_preloader_seen", "true");
  //   setLoading(false);
  // };
  useEffect(() => { 
    const timer = setTimeout(() => { setLoading(false); }, 0); 
    return () => clearTimeout(timer); 
  }, []);//remove this when website is complete

  return (
    <>
      {loading && <Preloader onFinish={false} />}

      {!loading && (
        <main>
          <h1>ALUMINATION</h1>
          <p>Welcome to the Alumni Meet</p>
        </main>
      )}
    </>
  );
}

export default App;
