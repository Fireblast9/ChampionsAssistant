import Link from "next/link";
import BackButton from "../components/BackButton";
import CreateTeamForm from "../components/CreateTeamForm";
import DeleteButton from "../components/DeleteButton";
import { getTeams } from "./actions";

export default async function Teams() {
  const teams = await getTeams();

  return (
    <div className="flex flex-col p-8">
      <BackButton href="/" />
      <h1 className="text-4xl mt-6 mb-2">Teams</h1>
      <CreateTeamForm />
      <ul className="mt-8 flex flex-col gap-3">
        {teams.length === 0 && (
          <p className="opacity-50">No teams yet. Import one above.</p>
        )}
        {teams.map((team) => (
          <li
            key={team._id}
            className="border-2 border-current rounded-sm flex items-center"
          >
            <Link
              href={`/teams/${team._id}`}
              className="flex-1 px-4 py-3 flex flex-col transition-colors duration-200 hover:bg-gray-200 hover:text-black"
            >
              <p className="text-xl">{team.name}</p>
              <p className="opacity-50 text-sm mt-1">
                {team.pokemon?.length ?? 0} Pokémon
              </p>
            </Link>
            <DeleteButton id={team._id} name={team.name} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export const dynamic = "force-dynamic";
