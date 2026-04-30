import BackButton from "../components/BackButton";
import CalcShell from "../components/CalcShell";
import { getTeamNames } from "../teams/actions";

export default async function Calc() {
  const teamsNames = await getTeamNames();

  return (
    <>
      <BackButton href="/" />
      <CalcShell teamNames={teamsNames} />
    </>
  );
}
