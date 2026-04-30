import BackButton from "@/app/components/BackButton";
import { IPokemon } from "@/lib/models/team";
import PokemonCard from "../../components/PokemonCard";
import { getTeam } from "../actions";

export default async function TeamPage({
  params,
}: {
  readonly params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const team = await getTeam(id);

  if (!team) return <div className="p-8">Team not found.</div>;

  return (
    <div className="flex flex-col p-8 mx-auto w-full">
      <BackButton href="/teams" />
      <div className="w-fit m-auto">
        <h1 className="text-4xl mt-6 mb-6">{team.name}</h1>
        <div className="grid grid-cols-2 gap-4 max-w-3xl">
          {team.pokemon.map((pokemon: IPokemon, i: number) => (
            <PokemonCard
              key={pokemon.species}
              pokemon={pokemon}
              priority={i < 2}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
