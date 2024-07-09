import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getPokemons } from "../services/api";

interface Pokemon {
  name: string;
  url: string;
  stock: number;
  history: {
    time: string;
    activity: string;
    notes: string;
    qty: number;
    stock: number;
  }[];
}

interface PokemonContextProps {
  pokemons: Pokemon[];
  fetchPokemons: () => void;
  updateStock: (
    name: string,
    newStock: number,
    newHistory: {
      time: string;
      activity: string;
      notes: string;
      qty: number;
      stock: number;
    }
  ) => void;
}

interface PokemonProviderProps {
  children: ReactNode;
}

const PokemonContext = createContext<PokemonContextProps | undefined>(
  undefined
);

export const PokemonProvider: React.FC<PokemonProviderProps> = ({
  children,
}) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const fetchPokemons = async () => {
    const data = await getPokemons();
    const pokemonsWithStock = data.map(
      (pokemon: { name: string; url: string }) => ({
        ...pokemon,
        stock: 10,
        history: [
          {
            time: new Date().toLocaleString(),
            activity: "Stok Awal",
            notes: "",
            qty: 10,
            stock: 10,
          },
        ],
      })
    );
    setPokemons(pokemonsWithStock);
  };

  const updateStock = (
    name: string,
    newStock: number,
    newHistory: {
      time: string;
      activity: string;
      notes: string;
      qty: number;
      stock: number;
    }
  ) => {
    setPokemons((prevPokemons) =>
      prevPokemons.map((pokemon) =>
        pokemon.name === name
          ? {
              ...pokemon,
              stock: newStock,
              history: [newHistory, ...pokemon.history],
            }
          : pokemon
      )
    );
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <PokemonContext.Provider value={{ pokemons, fetchPokemons, updateStock }}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error("usePokemon must be used within a PokemonProvider");
  }
  return context;
};
