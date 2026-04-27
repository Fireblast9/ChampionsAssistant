import Link from "next/link";
import BackButton from "../components/BackButton";
import CreateTeamForm from "./components/CreateTeamForm";
import { getTeams } from "./actions";

export default async function Teams() {
  const teams = await getTeams();

  return (
    <div className="flex flex-col p-8">
      <BackButton />
      <h1 className="text-4xl mt-6 mb-2">Teams</h1>
      <CreateTeamForm />
      <ul className="mt-8 flex flex-col gap-3">
        {teams.length === 0 && (
          <p className="opacity-50">No teams yet. Import one above.</p>
        )}
        {teams.map((team) => (
          <li key={team._id}>
            <Link href={`/teams/${team._id}`} className="border-2 border-current rounded-sm px-4 py-3 flex flex-col transition-colors duration-200 hover:bg-white hover:text-black">
              <p className="text-xl">{team.name}</p>
              <p className="opacity-50 text-sm mt-1">{team.pokemon?.length ?? 0} Pokémon</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
