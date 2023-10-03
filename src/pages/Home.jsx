import { useEffect, useState } from "react";
import axios from "axios";
import { PokemonCard } from "../components/PokemonCard";
import { Link } from "react-router-dom";

export function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );

        const pokemonDetails = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const detailsResponse = await axios.get(pokemon.url);
            return detailsResponse.data;
          })
        );

        setPokemonList(pokemonDetails);
        setFilteredPokemonList(pokemonDetails);
      } catch (error) {
        console.error("Erro ao buscar lista de Pokémon:", error);
      }
    };

    fetchPokemonList();
  }, []);

  const handleSearch = () => {
    const searchTermLower = searchTerm.toLowerCase();
    const filtered = pokemonList.filter((pokemon) =>
      pokemon.name.includes(searchTermLower)
    );
    setFilteredPokemonList(filtered);
  };

  return (
    <div className="text-center flex flex-col gap-4 mt-1">
      <h1 className="text-4xl text-white">Pokédex</h1>
      <div className="flex gap-2  w-full">
        <input
          type="text"
          placeholder="Digite o nome do Pokémon"
          className="p-2 rounded-md flex-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-violet-800 text-white p-2 rounded-md border border-violet-800"
          onClick={handleSearch}
        >
          Buscar
        </button>
      </div>
      <div className="grid grid-cols-4 gap-8">
        {filteredPokemonList.map((pokemon, index) => (
          <Link to={`/details/${pokemon.id}`} key={index}>
            <PokemonCard
              name={pokemon.name}
              img={pokemon.sprites.front_default}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
