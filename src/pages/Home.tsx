import React from "react";
import PokemonList from "../components/PokemonList";

const Home: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <PokemonList />
    </div>
  );
};

export default Home;
