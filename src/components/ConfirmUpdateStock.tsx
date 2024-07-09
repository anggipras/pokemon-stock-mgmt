import React, { useState } from "react";

interface ConfirmUpdateStockProps {
  isOpen: boolean;
  onClose: () => void;
  pcs: number;
  dozens: number;
  currentStock: number;
  onConfirm: (notes: string) => void;
}

const ConfirmUpdateStock: React.FC<ConfirmUpdateStockProps> = ({
  isOpen,
  onClose,
  pcs,
  dozens,
  currentStock,
  onConfirm,
}) => {
  const [notes, setNotes] = useState<string>("");

  const handleConfirm = () => {
    onConfirm(notes);
    onClose();
  };

  if (!isOpen) return null;

  const total = pcs + dozens * 12;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div className="bg-white w-full h-auto m-auto max-w-2xl">
        <h2 className="text-4xl font-bold mb-10 capitalize">
          Konfirmasi update stok
        </h2>
        <div>
          Selisih
          <span className="text-4xl">+{total} pcs</span>
        </div>
        <div className="flex justify-between">
          <div>
            Di sistem
            <span className="text-2xl">{currentStock} pcs</span>
          </div>
          <div>
            Hasil update stok
            <span className="text-2xl">{total + currentStock}</span>
          </div>
        </div>
        {/* <div className="mb-4">
          <p>Hasil update stok: {total} pcs</p>
          <p>
            Pcs: {pcs}, Lusin: {dozens}
          </p>
        </div> */}
        <div className="mb-4">
          <label className="block mb-2">Catatan</label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            Simpan
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmUpdateStock;
