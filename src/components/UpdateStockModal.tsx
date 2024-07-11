import React, { useEffect, useState } from "react";
import ModalButton from "./ModalButton";

interface UpdateStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (pcs: number, dozens: number) => void;
  pcs: number;
  dozens: number;
}

const UpdateStockModal: React.FC<UpdateStockModalProps> = ({
  isOpen,
  onClose,
  onSave,
  pcs,
  dozens,
}) => {
  const [pcsUpdate, setPcs] = useState<number>(pcs);
  const [dozensUpdate, setDozens] = useState<number>(dozens);
  const [disabledSave, setDisabledSave] = useState<boolean>(!pcs && !dozens);

  const handleSave = () => {
    onSave(pcsUpdate, dozensUpdate);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      setDisabledSave(!pcs && !dozens);
    }
    setPcs(pcs);
    setDozens(dozens);
  }, [pcs, dozens, isOpen]);

  useEffect(() => {
    if (!pcsUpdate && !dozensUpdate) {
      setDisabledSave(true);
    }
  }, [pcsUpdate, dozensUpdate]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg max-w-[90%] sm:max-w-96">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold mb-2">Update stok</h2>
          <p className="px-2">
            Masukkan jumlah stok yang tersedia di rak saat ini.
          </p>
        </div>

        <table className="table-fixed min-w-full">
          <thead>
            <tr className="border-b-2 border-gray-500">
              <th className="pb-3 text-left">Kemasan</th>
              <th className="pb-3 text-right">Jumlah</th>
              <th className="pb-3 text-right">Stok</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-3">
                <label className="block mb-2" htmlFor="pcs-input">
                  <strong>Pcs</strong>
                </label>
              </td>
              <td className="py-3 flex items-center gap-2 justify-end">
                <p>1 x</p>
                <input
                  id="pcs-input"
                  type="text"
                  inputMode="tel"
                  value={pcsUpdate !== 0 ? pcsUpdate : undefined}
                  onChange={(e) => {
                    if (Number(e.target.value)) {
                      setPcs(Number(e.target.value));
                      setDisabledSave(false);
                    } else {
                      setPcs(0);
                    }
                  }}
                  className="w-12 p-2 border rounded shadow-inner"
                />
                <p> =</p>
              </td>
              <td className="py-3 text-right">{pcsUpdate}</td>
            </tr>
            <tr className="border-b">
              <td className="py-3">
                <label className="block mb-2" htmlFor="dozens-input">
                  <strong>Lusin</strong>
                </label>
              </td>
              <td className="py-3 flex items-center gap-2 justify-end">
                <p>12 x </p>
                <input
                  id="dozens-input"
                  type="text"
                  inputMode="tel"
                  value={dozensUpdate !== 0 ? dozensUpdate : undefined}
                  onChange={(e) => {
                    if (Number(e.target.value)) {
                      setDozens(Number(e.target.value));
                      setDisabledSave(false);
                    } else {
                      setDozens(0);
                    }
                  }}
                  className="w-12 p-2 border rounded shadow-inner"
                />
                <p> =</p>
              </td>
              <td className="py-3 text-right">{dozensUpdate * 12}</td>
            </tr>
          </tbody>
        </table>
        <div className="flex py-3 justify-between">
          <div>
            <b>Total stok</b> (dalam pcs)
          </div>
          <strong>{pcsUpdate + dozensUpdate * 12}</strong>
        </div>
        <ModalButton
          onDisabled={disabledSave}
          handleSave={handleSave}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default UpdateStockModal;
