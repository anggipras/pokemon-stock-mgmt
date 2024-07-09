import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { usePokemon } from "../context/PokemonContext";
import UpdateStockModal from "./UpdateStockModal";
import ConfirmUpdateStock from "./ConfirmUpdateStock";

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
      time: new Date().toLocaleString(),
      activity: "Update stok",
      notes,
      qty: total,
      stock: newStock,
    };
    updateStock(pokemon.name, newStock, newHistory);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="hidden sm:flex justify-between items-center">
        <Link to="/" className="text-teal-700 hover:underline mb-4 block">
          ← Stok Pokémon
        </Link>
        <button
          onClick={() => setUpdateModalOpen(true)}
          className="bg-gray-100 text-teal-700 px-4 py-2 rounded shadow-md border border-gray-300"
        >
          Update stok
        </button>
      </div>
      <h1 className="text-4xl font-bold mb-10 capitalize">{pokemon.name}</h1>
      <p>Sisa stok</p>
      <p className="mb-10 text-3xl">{pokemon.history[0].stock} pcs</p>

      <h2 className="text-xl font-bold">Riwayat stok</h2>
      <p className="mb-2">Satuan stok dalam pcs</p>
      <table className="min-w-full bg-white max-sm:hidden">
        <thead>
          <tr>
            <th className="text-left py-3 border-b-2 border-gray-500">Waktu</th>
            <th className="text-left py-3 border-b-2 border-gray-500">
              Kegiatan
            </th>
            <th className="text-left py-3 border-b-2 border-gray-500">
              Catatan
            </th>
            <th className="text-left py-3 border-b-2 border-gray-500">Jmlh</th>
            <th className="text-left py-3 border-b-2 border-gray-500">Stok</th>
          </tr>
        </thead>
        <tbody>
          {pokemon.history.map((item, index) => (
            <tr key={index}>
              <td className="py-3 border-b">{item.time}</td>
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
      {pokemon.history.map((item, index) => (
        <table key={index} className="min-w-full bg-white sm:hidden">
          <thead>
            <tr>
              <th className="text-left py-3 border-b-2 border-gray-500">
                {item.time}
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
                <div>{item.time}</div>
                <div className="text-teal-700 font-bold">{item.activity}</div>
                <div className="">{item.notes ? `"${item.notes}"` : null}</div>
              </td>
              <td
                className={`py-3 border-b ${item.qty ? "text-teal-500" : ""}`}
              >
                {item.qty ? `+${item.qty}` : item.qty}
              </td>
              <td className="py-3 border-b">{item.stock}</td>
            </tr>
          </tbody>
        </table>
      ))}

      <UpdateStockModal
        isOpen={isUpdateModalOpen}
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
      />
    </div>
  );
};

export default PokemonDetail;
