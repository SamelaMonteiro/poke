import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "phosphor-react";

export function Details() {
  const { id } = useParams();
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        setPokemonData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar detalhes do Pokémon:", error);
        setPokemonData(null);
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  return (
    <div className="text-center mt-4 flex items-center justify-center text-white">
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="border rounded-md p-12 flex items-center justify-center w-full flex-col border-black shadow-md">
          <div className="w-full mt-[-25px] ml-[-70px]">
            <ArrowLeft size={32} className="cursor-pointer" onClick={goBack} />
          </div>
          <h1 className="text-8xl font-semibold">{pokemonData.name}</h1>
          <img
            src={pokemonData.sprites.front_default}
            alt={pokemonData.name}
            className="w-72 object-scale-cover"
          />
          <div className="text-start flex flex-col flex-1 justify-start items-start w-full">
            <h3 className="text-lg mt-4 font-bold text-neutral-200">
              Detalhes do Pokémon:
            </h3>
            <p>Altura: {pokemonData.height / 10} metros</p>
            <p>Peso: {pokemonData.weight / 10} kg</p>
            <p>
              Tipo(s):{" "}
              {pokemonData.types.map((type) => type.type.name).join(", ")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
