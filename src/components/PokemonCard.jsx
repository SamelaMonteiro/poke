export function PokemonCard(props) {
  return (
    <div className="border p-2 rounded-2 rounded-md hover:scale-105 hover:cursor-pointer text-white hover:bg-white transition hover:text-black">
      <img src={props.img} alt="" className="w-72 object-scale-cover" />
      <h1>{props.name}</h1>
    </div>
  );
}
