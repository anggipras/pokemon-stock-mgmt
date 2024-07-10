import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { PokemonContext } from "../context/PokemonContext";
import PokemonList from "../components/PokemonList";

const mockPokemons = [
  {
    name: "pikachu",
    stock: 10,
    url: "https://pokeapi.co/api/v2/pokemon/25/",
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
    url: "https://pokeapi.co/api/v2/pokemon/1/",
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
    url: "https://pokeapi.co/api/v2/pokemon/4/",
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
  test("renders correctly with initial data", () => {
    renderWithRouter(<PokemonList />);

    expect(screen.getByText("Stok Pokémon")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Cari Pokémon")).toBeInTheDocument();
    expect(screen.getByText("pikachu")).toBeInTheDocument();
    expect(screen.getByText("bulbasaur")).toBeInTheDocument();
    expect(screen.getByText("charmander")).toBeInTheDocument();
  });

  test("filters the list of pokemons based on search input", () => {
    renderWithRouter(<PokemonList />);

    const searchInput = screen.getByPlaceholderText("Cari Pokémon");
    fireEvent.change(searchInput, { target: { value: "pika" } });

    expect(screen.getByText("pikachu")).toBeInTheDocument();
    expect(screen.queryByText("bulbasaur")).not.toBeInTheDocument();
    expect(screen.queryByText("charmander")).not.toBeInTheDocument();
  });

  test("handles navigation to pokemon detail page", () => {
    renderWithRouter(<PokemonList />);

    const pikachuLink = screen.getByText("pikachu");
    fireEvent.click(pikachuLink);

    expect(window.location.pathname).toBe("/pokemon/pikachu");
  });
});
