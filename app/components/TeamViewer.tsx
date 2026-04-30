"use client";

import { ITeam } from "@/lib/models/team";
import { Team } from "@/lib/types";
import { useState } from "react";
import PokemonCard from "./PokemonCard";
import TeamSelect from "./TeamSelect";

export default function TeamViewer({
  teamNames,
  left = true,
  onSelect,
}: Readonly<{ teamNames: Team[]; left?: boolean; onSelect: (mon: ITeam["pokemon"][number]) => void }>) {
  const [team, setTeam] = useState<ITeam | null>(null);
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null);

  return (
    <div>
      <TeamSelect teamNames={teamNames} setTeam={setTeam} />
      <div className={`flex flex-col ${left ? "items-start" : "items-end"}`}>
        {team?.pokemon.map((mon, i) => (
          <PokemonCard
            pokemon={mon}
            small={true}
            key={mon.species}
            left={left}
            priority={i === 0}
            selected={selectedSpecies === mon.species}
            onClick={() => { setSelectedSpecies(mon.species); onSelect(mon); }}
          />
        ))}
      </div>
    </div>
  );
}
