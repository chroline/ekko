import { Routes, Route } from "react-router-dom";

import Home from "~/pages/Home.tsx";

function App() {
  console.log("App");
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
