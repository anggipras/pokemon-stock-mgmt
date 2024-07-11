import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { PokemonContext } from "../context/PokemonContext";
import PokemonDetail from "../components/PokemonDetail";

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
];

const renderWithRouter = (ui: React.ReactElement, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return render(
    <MemoryRouter initialEntries={[route]}>
      <PokemonContext.Provider
        value={{
          pokemons: mockPokemons,
          updateStock: jest.fn(),
          fetchPokemons: jest.fn(),
        }}
      >
        <Routes>
          <Route path="/pokemon/:name" element={ui} />
        </Routes>
      </PokemonContext.Provider>
    </MemoryRouter>
  );
};

test("renders the Pokémon details correctly", () => {
  renderWithRouter(<PokemonDetail />, { route: "/pokemon/pikachu" });

  const stockActivityElement = screen.getByText(/Stok Awal/i, {
    selector: ".py-3.border-b.text-teal-700.font-bold",
  });

  expect(stockActivityElement).toBeInTheDocument();
  expect(screen.getByText(/10 pcs/i)).toBeInTheDocument();
});

test("opens update stock modal when button is clicked", () => {
  renderWithRouter(<PokemonDetail />, { route: "/pokemon/pikachu" });

  const updateStockButton = screen.getByText(/Update stok/i, {
    selector:
      ".bg-gray-100.text-teal-700.px-4.py-2.rounded.shadow-md.border.border-gray-300.w-fit",
  });

  fireEvent.click(updateStockButton);

  expect(
    screen.getByText(/Update stok/i, { selector: "h2.text-xl.font-bold.mb-2" })
  ).toBeInTheDocument();
  expect(
    screen.getByText(/Masukkan jumlah stok yang tersedia di rak saat ini./i)
  ).toBeInTheDocument();
});
