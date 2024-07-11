import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmUpdateStock from "../components/ConfirmUpdateStock";
import { Pokemon } from "../context/PokemonContext";

const mockPokemon: Pokemon = {
  name: "bulbasaur",
  stock: 10,
  history: [
    {
      time: "2024-01-01T00:00:00.000Z",
      activity: "Stok Awal",
      notes: "",
      qty: 10,
      stock: 10,
    },
  ],
};

const renderConfirmUpdateStock = (
  props: Partial<React.ComponentProps<typeof ConfirmUpdateStock>> = {}
) => {
  const defaultProps: React.ComponentProps<typeof ConfirmUpdateStock> = {
    isOpen: true,
    onClose: jest.fn(),
    pcs: 0,
    dozens: 0,
    currentStock: 10,
    onConfirm: jest.fn(),
    onEdit: jest.fn(),
    onResetStock: jest.fn(),
    pokemon: mockPokemon,
  };
  return render(<ConfirmUpdateStock {...defaultProps} {...props} />);
};

test("renders ConfirmUpdateStock correctly", () => {
  renderConfirmUpdateStock();

  expect(screen.getByText(/Konfirmasi update stok/i)).toBeInTheDocument();
  const UpdateStockResultElement = screen.getByText(/Hasil update stok/i, {
    selector: ".font-bold.text-teal-700",
  });
  expect(UpdateStockResultElement).toBeInTheDocument();
});

test("calls onConfirm with correct values", () => {
  const handleConfirm = jest.fn();
  const handleClose = jest.fn();
  const handleResetStock = jest.fn();

  renderConfirmUpdateStock({
    onConfirm: handleConfirm,
    onClose: handleClose,
    onResetStock: handleResetStock,
    pcs: 5,
    dozens: 1,
  });

  const notesInput = screen.getByPlaceholderText(/Contoh: stok awal/i);
  const confirmButton = screen.getByText(/Simpan/i);

  fireEvent.change(notesInput, { target: { value: "Stock checked" } });
  fireEvent.click(confirmButton);

  expect(handleConfirm).toHaveBeenCalledWith("Stock checked");
  expect(handleResetStock).toHaveBeenCalled();
  expect(handleClose).toHaveBeenCalled();
});
