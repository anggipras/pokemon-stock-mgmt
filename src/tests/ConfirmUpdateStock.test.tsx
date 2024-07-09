import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmUpdateStock from "../components/ConfirmUpdateStock";

test("renders ConfirmUpdateStock", () => {
  const handleClose = jest.fn();
  const handleConfirm = jest.fn();

  render(
    <ConfirmUpdateStock
      isOpen={true}
      onClose={handleClose}
      pcs={3}
      dozens={1}
      currentStock={0}
      onConfirm={handleConfirm}
    />
  );

  expect(screen.getByText(/Konfirmasi update stok/i)).toBeInTheDocument();
  expect(screen.getByText(/Hasil update stok/i)).toBeInTheDocument();
  expect(screen.getByText(/543 pcs/i)).toBeInTheDocument();
});

test("calls onConfirm with correct values", () => {
  const handleClose = jest.fn();
  const handleConfirm = jest.fn();

  render(
    <ConfirmUpdateStock
      isOpen={true}
      onClose={handleClose}
      pcs={3}
      dozens={1}
      currentStock={0}
      onConfirm={handleConfirm}
    />
  );

  const notesInput = screen.getByLabelText(/Catatan/i);
  const confirmButton = screen.getByText(/Simpan/i);

  fireEvent.change(notesInput, { target: { value: "Cek stok di lemari" } });
  fireEvent.click(confirmButton);

  expect(handleConfirm).toHaveBeenCalledWith("Cek stok di lemari");
  expect(handleClose).toHaveBeenCalled();
});
