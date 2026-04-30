import BackButton from "../components/BackButton";
import TeamViewer from "../components/TeamViewer";
import { getTeamNames } from "../teams/actions";

export default async function Calc() {
  const teamsNames = await getTeamNames();

  return (
    <>
      <BackButton href="/" />
      <div className="flex justify-between mx-4">
        <TeamViewer teamNames={teamsNames} />
        {/* <Calculator /> */}
        <TeamViewer teamNames={teamsNames} left={false} />
      </div>
    </>
  );
}
