"use client";

import { IPokemon } from "@/lib/models/team";
import { Team } from "@/lib/types";
import {
  DEFAULT_FIELD,
  DEFAULT_NAVIGATION_WARNING,
  type FieldState,
} from "@/lib/utilities";
import { useNavigationGuard } from "next-navigation-guard";
import { useState } from "react";
import MovePanel, { FieldPanel } from "./Calculator";
import TeamViewer from "./TeamViewer";

type Pair = [IPokemon | null, IPokemon | null];

export default function CalcShell({
  teamNames,
}: Readonly<{ teamNames: Team[] }>) {
  const [attackers, setAttackers] = useState<Pair>([null, null]);
  const [defenders, setDefenders] = useState<Pair>([null, null]);
  const [field, setField] = useState<FieldState>(DEFAULT_FIELD);

  const [atk1, atk2] = attackers;
  const [def1, def2] = defenders;

  // prompt user if they change the field conditions
  // (team selection is handled in TeamViewer component)
  useNavigationGuard({
    enabled: JSON.stringify(field) != JSON.stringify(DEFAULT_FIELD),
    confirm: () => window.confirm(DEFAULT_NAVIGATION_WARNING),
  });

  return (
    <div className="flex justify-between mx-4">
      <TeamViewer teamNames={teamNames} onSelect={setAttackers} />

      <div className="flex flex-col gap-3 shrink-0 w-200">
        <div className="grid grid-cols-2 gap-3">
          <MovePanel attacker={atk1} defender={def1} field={field} />
          <MovePanel attacker={atk1} defender={def2} field={field} />
          <MovePanel attacker={atk2} defender={def1} field={field} />
          <MovePanel attacker={atk2} defender={def2} field={field} />
        </div>
        <FieldPanel field={field} onChange={setField} />
      </div>

      <TeamViewer teamNames={teamNames} left={false} onSelect={setDefenders} />
    </div>
  );
}
