import BackButton from "@/app/components/BackButton";
import PokemonCard from "./components/PokemonCard";
import { getTeam } from "../actions";
import { getPokemonSprite } from "@/lib/pokeapi";

export default async function TeamPage({
  params,
}: {
  readonly params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const team = await getTeam(id);

  if (!team) return <div className="p-8">Team not found.</div>;

  const sprites = await Promise.all(
    team.pokemon.map((p: any) => getPokemonSprite(p.species, p.gender))
  );

  return (
    <div className="flex flex-col p-8 max-w-3xl mx-auto w-full">
      <BackButton />
      <h1 className="text-4xl mt-6 mb-6">{team.name}</h1>
      <div className="grid grid-cols-2 gap-4">
        {team.pokemon.map((pokemon: any, i: number) => (
          <PokemonCard key={pokemon._id ?? i} pokemon={pokemon} sprite={sprites[i]} priority={i < 2} />
        ))}
      </div>
    </div>
  );
}
