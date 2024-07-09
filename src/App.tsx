import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PokemonProvider } from "./context/PokemonContext";
import Home from "./pages/Home";
import PokemonDetailPage from "./pages/PokemonDetailPage";

const App: React.FC = () => {
  return (
    <PokemonProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:name" element={<PokemonDetailPage />} />
        </Routes>
      </Router>
    </PokemonProvider>
  );
};

export default App;
