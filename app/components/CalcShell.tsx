"use client";

import { IPokemon } from "@/lib/models/team";
import { Team } from "@/lib/types";
import { useState } from "react";
import Calculator from "./Calculator";
import TeamViewer from "./TeamViewer";

export default function CalcShell({
  teamNames,
}: Readonly<{ teamNames: Team[] }>) {
  const [attacker, setAttacker] = useState<IPokemon | null>(null);
  const [defender, setDefender] = useState<IPokemon | null>(null);

  return (
    <div className="flex justify-between mx-4">
      <TeamViewer
        teamNames={teamNames}
        onSelect={setAttacker}
      />
      <Calculator attacker={attacker} defender={defender} />
      <TeamViewer
        teamNames={teamNames}
        left={false}
        onSelect={setDefender}
      />
    </div>
  );
}
