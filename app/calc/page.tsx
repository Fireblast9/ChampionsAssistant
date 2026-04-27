import BackButton from "../components/BackButton";
import TeamSelect from "../components/TeamSelect";
import { getTeamNames } from "../teams/actions";

export default async function Calc() {
    const teams = await getTeamNames();
    console.log(teams)

    return (
        <div className="flex flex-col">
            <BackButton />
            <TeamSelect teams={teams} />
        </div>
    );
}
