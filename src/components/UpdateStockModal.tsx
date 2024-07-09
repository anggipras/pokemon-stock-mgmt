import React, { useState } from "react";

interface UpdateStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (pcs: number, dozens: number) => void;
}

const UpdateStockModal: React.FC<UpdateStockModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [pcs, setPcs] = useState<number>(0);
  const [dozens, setDozens] = useState<number>(0);

  const handleSave = () => {
    onSave(pcs, dozens);
    onClose();
    setPcs(0);
    setDozens(0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg max-w-80">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold mb-2">Update stok</h2>
          <p className="px-2">
            Masukkan jumlah stok yang tersedia di rak saat ini.
          </p>
        </div>

        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left py-2 border-b-2 border-gray-500">
                Kemasan
              </th>
              <th className="text-center py-2 border-b-2 border-gray-500">
                Jumlah
              </th>
              <th className="text-right py-2 border-b-2 border-gray-500">
                Stok
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-3 border-b">
                <label className="block mb-2">
                  <strong>Pcs</strong>
                </label>
              </td>
              <td className="py-3 border-b flex items-center">
                <p>1 x</p>
                <input
                  type="number"
                  value={pcs}
                  onChange={(e) => setPcs(Number(e.target.value))}
                  className="w-12 p-2 border rounded"
                />
                <p> =</p>
              </td>
              <td className="py-3 border-b text-right">{pcs}</td>
            </tr>
            <tr>
              <td className="py-3 border-b">
                <label className="block mb-2">
                  <strong>Lusin</strong>
                </label>
              </td>
              <td className="py-3 border-b flex items-center">
                <p>12 x </p>
                <input
                  type="number"
                  value={dozens}
                  onChange={(e) => setDozens(Number(e.target.value))}
                  className="w-12 p-2 border rounded"
                />
                <p> =</p>
              </td>
              <td className="py-3 border-b text-right">{dozens}</td>
            </tr>
          </tbody>
        </table>
        <div className="flex py-3 justify-between">
          <div>
            <b>Total stok</b> (dalam pcs)
          </div>
          <strong>{pcs + dozens * 12}</strong>
        </div>
        <div className="flex mt-8 justify-end">
          <button
            onClick={handleSave}
            className="bg-teal-700 text-white px-4 py-2 rounded mr-2"
          >
            Simpan
          </button>
          <button
            onClick={onClose}
            className="bg-gray-100 border border-gray-300 shadow-sm text-teal-700 px-4 py-2 rounded"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateStockModal;
