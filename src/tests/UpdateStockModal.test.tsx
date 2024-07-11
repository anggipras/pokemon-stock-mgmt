import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UpdateStockModal from "../components/UpdateStockModal";

const renderUpdateStockModal = (
  props: Partial<React.ComponentProps<typeof UpdateStockModal>> = {}
) => {
  const defaultProps: React.ComponentProps<typeof UpdateStockModal> = {
    isOpen: true,
    onClose: jest.fn(),
    onSave: jest.fn(),
    pcs: 0,
    dozens: 0,
  };
  return render(<UpdateStockModal {...defaultProps} {...props} />);
};

test("renders UpdateStockModal correctly", () => {
  renderUpdateStockModal();

  expect(screen.getByText(/Update stok/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Pcs/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Lusin/i)).toBeInTheDocument();
});

test("calls onSave with correct values", () => {
  const handleClose = jest.fn();
  const handleSave = jest.fn();

  renderUpdateStockModal({
    onClose: handleClose,
    onSave: handleSave,
    pcs: 3,
    dozens: 1,
  });

  const pcsInput = screen.getByLabelText(/Pcs/i);
  const dozensInput = screen.getByLabelText(/Lusin/i);
  const saveButton = screen.getByText(/Simpan/i);

  fireEvent.change(pcsInput, { target: { value: "5" } });
  fireEvent.change(dozensInput, { target: { value: "2" } });
  fireEvent.click(saveButton);

  expect(handleSave).toHaveBeenCalledWith(5, 2);
  expect(handleClose).toHaveBeenCalled();
});
