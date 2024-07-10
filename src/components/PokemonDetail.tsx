import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { usePokemon } from "../context/PokemonContext";
import UpdateStockModal from "./UpdateStockModal";
import ConfirmUpdateStock from "./ConfirmUpdateStock";
import { FaArrowLeft } from "react-icons/fa";
import { formatDate, formatFullDate, formatTime } from "../utils/formatDate";

const PokemonDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const { pokemons, updateStock } = usePokemon();
  const pokemon = pokemons.find((p) => p.name === name);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [pcs, setPcs] = useState(0);
  const [dozens, setDozens] = useState(0);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  const handleUpdateSave = (pcs: number, dozens: number) => {
    setPcs(pcs);
    setDozens(dozens);
    setConfirmModalOpen(true);
  };

  const handleConfirmSave = (notes: string) => {
    const total = pcs + dozens * 12;
    const currentStock = pokemon.history[0].stock;
    const newStock = currentStock + total;
    const newHistory = {
      time: new Date().toISOString(),
      activity: "Update stok",
      notes,
      qty: total,
      stock: newStock,
    };
    updateStock(pokemon.name, newStock, newHistory);
  };

  return (
    <div className="container mx-auto sm:mt-10">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center max-sm:mb-10">
        <Link to="/">
          <div className="relative flex justify-center items-center hover:underline mb-4 max-sm:shadow-md max-sm:border-b max-sm:p-4">
            <div className="max-sm:absolute left-0 max-sm:ml-4 mr-2">
              <FaArrowLeft className="text-teal-700" />
            </div>
            <div className="sm:text-teal-700">Stok Pokémon</div>
          </div>
        </Link>
        <div className="max-sm:p-4">
          <h1 className="block sm:hidden text-4xl font-bold mb-10 capitalize">
            {pokemon.name}
          </h1>
          <button
            onClick={() => setUpdateModalOpen(true)}
            className="bg-gray-100 text-teal-700 px-4 py-2 rounded shadow-md border border-gray-300 w-fit"
          >
            Update stok
          </button>
        </div>
      </div>
      <div className="max-sm:p-4">
        <h1 className="hidden sm:block text-4xl font-bold mb-10 capitalize">
          {pokemon.name}
        </h1>
        <p>Sisa stok</p>
        <p className="mb-10 text-3xl">{pokemon.history[0].stock} pcs</p>
        <h2 className="text-xl font-bold">Riwayat stok</h2>
        <p className="mb-2">Satuan stok dalam pcs</p>
        <table className="min-w-full bg-white max-sm:hidden">
          <thead>
            <tr>
              <th className="text-left py-3 border-b-2 border-gray-500">
                Waktu
              </th>
              <th className="text-left py-3 border-b-2 border-gray-500">
                Kegiatan
              </th>
              <th className="text-left py-3 border-b-2 border-gray-500">
                Catatan
              </th>
              <th className="text-left py-3 border-b-2 border-gray-500">
                Jmlh
              </th>
              <th className="text-left py-3 border-b-2 border-gray-500">
                Stok
              </th>
            </tr>
          </thead>
          <tbody>
            {pokemon.history.map((item, index) => (
              <tr key={index}>
                <td className="py-3 border-b">{formatFullDate(item.time)}</td>
                <td className="py-3 border-b text-teal-700 font-bold">
                  {item.activity}
                </td>
                <td className="py-3 border-b">
                  {item.notes ? `"${item.notes}"` : null}
                </td>
                <td
                  className={`py-3 border-b ${item.qty ? "text-teal-500" : ""}`}
                >
                  {item.qty ? `+${item.qty}` : item.qty}
                </td>
                <td className="py-3 border-b">{item.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="sm:hidden">
          {pokemon.history.map((item, index) => (
            <table key={index} className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="text-left py-3 border-b-2 border-gray-500">
                    {formatDate(item.time)}
                  </th>
                  <th className="text-left py-3 border-b-2 border-gray-500">
                    Jmlh
                  </th>
                  <th className="text-left py-3 border-b-2 border-gray-500">
                    Stok
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-3 border-b">
                    <div>{formatTime(item.time)}</div>
                    <div className="text-teal-700 font-bold">
                      {item.activity}
                    </div>
                    <div className="">
                      {item.notes ? `"${item.notes}"` : null}
                    </div>
                  </td>
                  <td
                    className={`py-3 border-b ${
                      item.qty ? "text-teal-500" : ""
                    }`}
                  >
                    {item.qty ? `+${item.qty}` : item.qty}
                  </td>
                  <td className="py-3 border-b">{item.stock}</td>
                </tr>
              </tbody>
            </table>
          ))}
        </div>
      </div>

      <UpdateStockModal
        isOpen={isUpdateModalOpen}
        pcs={pcs}
        dozens={dozens}
        onClose={() => setUpdateModalOpen(false)}
        onSave={handleUpdateSave}
      />

      <ConfirmUpdateStock
        isOpen={isConfirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        pcs={pcs}
        dozens={dozens}
        currentStock={pokemon.history[0].stock}
        onConfirm={handleConfirmSave}
        onEdit={() => {
          setConfirmModalOpen(false);
          setUpdateModalOpen(true);
        }}
        onResetStock={() => {
          setPcs(0);
          setDozens(0);
        }}
      />
    </div>
  );
};

export default PokemonDetail;
