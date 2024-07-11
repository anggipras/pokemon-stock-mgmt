import React, { useState } from "react";
import ModalButton from "./ModalButton";
import { MdOutlineClose } from "react-icons/md";
import { GrFormEdit } from "react-icons/gr";
import { Pokemon } from "../context/PokemonContext";

interface ConfirmUpdateStockProps {
  isOpen: boolean;
  onClose: () => void;
  pcs: number;
  dozens: number;
  currentStock: number;
  onConfirm: (notes: string) => void;
  onEdit: () => void;
  onResetStock: () => void;
  pokemon: Pokemon;
}

const ConfirmUpdateStock: React.FC<ConfirmUpdateStockProps> = ({
  isOpen,
  onClose,
  pcs,
  dozens,
  currentStock,
  onConfirm,
  onEdit,
  onResetStock,
  pokemon,
}) => {
  const [notes, setNotes] = useState<string>("");

  const handleConfirm = () => {
    onConfirm(notes);
    onResetStock();
    onClose();
  };

  if (!isOpen) return null;

  const total = pcs + dozens * 12;

  return (
    <div className="fixed inset-0 flex sm:items-center justify-center bg-white">
      <div className="bg-white w-full sm:h-auto sm:m-auto max-w-2xl">
        <div className="relative flex sm:hidden justify-center items-center hover:underline mb-4 max-sm:shadow-md max-sm:border-b max-sm:p-4">
          <div
            className="max-sm:absolute left-0 max-sm:ml-4 mr-2"
            onClick={onClose}
          >
            <MdOutlineClose className="text-teal-700" />
          </div>
          <div className="font-bold capitalize">
            {pokemon.name}
          </div>
        </div>
        <div className="px-4">
          <h2 className="text-4xl font-bold mb-10 capitalize">
            Konfirmasi update stok
          </h2>
          <div className="mb-6">
            <div>Selisih</div>
            <div className="text-4xl">+{total} pcs</div>
          </div>
          <div className="flex justify-between">
            <div>
              <div>Di sistem</div>
              <div className="text-2xl">{currentStock} pcs</div>
            </div>
            <div>
              <div>Hasil update stok</div>
              <div className="text-2xl">{total + currentStock} pcs</div>
            </div>
          </div>
          <table className="table-fixed min-w-full mt-10">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="w-4/12 text-left py-2">Keterangan</th>
                <th className="w-6/12 text-left py-2 max-sm:hidden">Detail</th>
                <th className="w-2/12 text-left py-2">Jumlah</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-800">
                <td className="py-3">
                  <div className="font-bold text-teal-700">
                    Hasil update stok
                  </div>
                  <p className="sm:hidden">
                    {(total + currentStock) % 12} pcs,{" "}
                    {Math.floor((total + currentStock) / 12)} lusin (12s)
                  </p>
                </td>
                <td className="py-3 max-sm:hidden">
                  <p>
                    {(total + currentStock) % 12} pcs,{" "}
                    {Math.floor((total + currentStock) / 12)} lusin (12s)
                  </p>
                </td>
                <td className="py-3 flex items-center cursor-pointer" onClick={onEdit}>
                  <div>{total + currentStock} pcs</div>
                  <GrFormEdit className="text-teal-700 text-2xl ml-3" />
                </td>
              </tr>
              <tr>
                <td className="py-3 font-bold">Total hasil stok opname</td>
                <td className="py-3 max-sm:hidden"></td>
                <td className="py-3 font-bold">{total + currentStock} pcs</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-10">
            <label className="block mb-4 font-bold">Catatan</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full h-20 p-2 border rounded"
              placeholder="Contoh: stok awal"
            />
          </div>
          <ModalButton
            handleSave={handleConfirm}
            onClose={onClose}
            cancelBtn={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmUpdateStock;
