import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { PokemonContext } from "../context/PokemonContext";
import PokemonList from "../components/PokemonList";

const mockPokemons = [
  {
    name: "pikachu",
    stock: 10,
    history: [
      {
        time: new Date().toISOString(),
        activity: "Stok Awal",
        notes: "",
        qty: 10,
        stock: 10,
      },
    ],
  },
  {
    name: "bulbasaur",
    stock: 5,
    history: [
      {
        time: new Date().toISOString(),
        activity: "Stok Awal",
        notes: "",
        qty: 5,
        stock: 5,
      },
    ],
  },
  {
    name: "charmander",
    stock: 8,
    history: [
      {
        time: new Date().toISOString(),
        activity: "Stok Awal",
        notes: "",
        qty: 8,
        stock: 8,
      },
    ],
  },
];

const renderWithRouter = (ui: React.ReactElement) => {
  return render(
    <MemoryRouter>
      <PokemonContext.Provider
        value={{
          pokemons: mockPokemons,
          updateStock: jest.fn(),
          fetchPokemons: jest.fn(),
        }}
      >
        {ui}
      </PokemonContext.Provider>
    </MemoryRouter>
  );
};

describe("PokemonList", () => {
  test("renders the list of pokemons", () => {
    renderWithRouter(<PokemonList />);

    expect(screen.getByText(/Stok Pokémon/i)).toBeInTheDocument();
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
  });

  test("filters the list of pokemons based on search input", () => {
    renderWithRouter(<PokemonList />);

    const searchInput = screen.getByPlaceholderText(/Cari Pokémon/i);

    fireEvent.change(searchInput, { target: { value: "bulbasaur" } });

    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.queryByText(/pikachu/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/charmander/i)).not.toBeInTheDocument();
  });
});
