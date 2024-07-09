import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UpdateStockModal from "../components/UpdateStockModal";

test("renders UpdateStockModal", () => {
  const handleClose = jest.fn();
  const handleSave = jest.fn();

  render(
    <UpdateStockModal isOpen={true} onClose={handleClose} onSave={handleSave} />
  );

  expect(screen.getByText(/Update stok/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Pcs/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Lusin/i)).toBeInTheDocument();
});

test("calls onSave with correct values", () => {
  const handleClose = jest.fn();
  const handleSave = jest.fn();

  render(
    <UpdateStockModal isOpen={true} onClose={handleClose} onSave={handleSave} />
  );

  const pcsInput = screen.getByLabelText(/Pcs/i);
  const dozensInput = screen.getByLabelText(/Lusin/i);
  const saveButton = screen.getByText(/Simpan/i);

  fireEvent.change(pcsInput, { target: { value: "3" } });
  fireEvent.change(dozensInput, { target: { value: "1" } });
  fireEvent.click(saveButton);

  expect(handleSave).toHaveBeenCalledWith(3, 1);
  expect(handleClose).toHaveBeenCalled();
});
