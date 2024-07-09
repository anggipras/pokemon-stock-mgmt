import React from "react";
import { usePokemon } from "../context/PokemonContext";
import { Link } from "react-router-dom";

const PokemonList: React.FC = () => {
  const { pokemons } = usePokemon();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Stok Pokémon</h1>
      <input
        type="text"
        placeholder="Cari Pokémon"
        className="w-full p-2 mb-4 border rounded-lg"
      />
      <table className="min-w-full bg-white">
        <thead>
          <tr className="font-bold">
            <th className="py-3 border-b-2 border-gray-500 text-left">Nama</th>
            <th className="py-3 border-b-2 border-gray-500 text-right">Stok</th>
          </tr>
        </thead>
        <tbody>
          {pokemons.map((pokemon) => (
            <tr key={pokemon.name} className="hover:bg-gray-100">
              <td className="py-3 border-b">
                <Link
                  to={`/pokemon/${pokemon.name}`}
                  className="text-teal-700 hover:underline font-bold capitalize"
                >
                  {pokemon.name}
                </Link>
              </td>
              <td className="py-3 border-b text-right">{pokemon.stock} pcs</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PokemonList;
