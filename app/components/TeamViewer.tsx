"use client";

import { ITeam, IPokemon } from "@/lib/models/team";
import { Team } from "@/lib/types";
import { useState } from "react";
import PokemonCard from "./PokemonCard";
import TeamSelect from "./TeamSelect";

type Pair = [IPokemon | null, IPokemon | null];

export default function TeamViewer({
  teamNames,
  left = true,
  onSelect,
}: Readonly<{
  teamNames: Team[];
  left?: boolean;
  onSelect: (pair: Pair) => void;
}>) {
  const [team, setTeam] = useState<ITeam | null>(null);
  const [selected, setSelected] = useState<Pair>([null, null]);

  function handleTeamChange(newTeam: ITeam | null) {
    setTeam(newTeam);
    setSelected([null, null]);
    onSelect([null, null]);
  }

  function handleClick(mon: IPokemon) {
    const [slot1, slot2] = selected;
    let next: Pair;
    if (slot1?.species === mon.species) {
      next = [null, slot2];
    } else if (slot2?.species === mon.species) {
      next = [slot1, null];
    } else if (slot1 === null) {
      next = [mon, slot2];
    } else if (slot2 === null) {
      next = [slot1, mon];
    } else {
      next = [mon, slot2];
    }
    setSelected(next);
    onSelect(next);
  }

  function getSlot(species: string): 1 | 2 | null {
    if (selected[0]?.species === species) return 1;
    if (selected[1]?.species === species) return 2;
    return null;
  }

  return (
    <div>
      <TeamSelect teamNames={teamNames} setTeam={handleTeamChange} />
      <div className={`flex flex-col ${left ? "items-start" : "items-end"}`}>
        {team?.pokemon.map((mon, i) => (
          <PokemonCard
            pokemon={mon}
            small={true}
            key={mon.species}
            left={left}
            priority={i === 0}
            slot={getSlot(mon.species)}
            onClick={() => handleClick(mon)}
          />
        ))}
      </div>
    </div>
  );
}
