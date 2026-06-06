"use client";

import { ITeam, IPokemon } from "@/lib/models/team";
import { Team } from "@/lib/types";
import { MEGA_MAP } from "@/lib/utilities";
import { useState } from "react";
import PokemonCard from "./PokemonCard";
import TeamSelect from "./TeamSelect";

type Pair = [IPokemon | null, IPokemon | null];

function getMegaEntry(mon: IPokemon) {
  return (
    (MEGA_MAP[mon.species] ?? []).find(
      (m) => m.stone === mon.item || (m.stone === "Dragon Ascent" && mon.moves.includes("Dragon Ascent")),
    ) ?? null
  );
}

function applyMega(pair: Pair, mega: Set<string>): Pair {
  const transform = (mon: IPokemon | null): IPokemon | null => {
    if (!mon) return null;
    const entry = getMegaEntry(mon);
    if (entry && mega.has(mon.species))
      return { ...mon, species: entry.megaSpecies };
    return mon;
  };
  return [transform(pair[0]), transform(pair[1])];
}

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
  const [megaActive, setMegaActive] = useState<Set<string>>(new Set());

  function handleTeamChange(newTeam: ITeam | null) {
    setTeam(newTeam);
    setSelected([null, null]);
    setMegaActive(new Set());
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

    const nextSpecies = new Set(
      [next[0]?.species, next[1]?.species].filter((s): s is string => s !== undefined),
    );
    const nextMega = new Set([...megaActive].filter((s) => nextSpecies.has(s)));

    setMegaActive(nextMega);
    setSelected(next);
    onSelect(applyMega(next, nextMega));
  }

  function handleMegaToggle(species: string) {
    const nextMega = new Set(megaActive);
    if (nextMega.has(species)) nextMega.delete(species);
    else nextMega.add(species);
    setMegaActive(nextMega);
    onSelect(applyMega(selected, nextMega));
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
            isMega={megaActive.has(mon.species)}
            onMegaToggle={getMegaEntry(mon) ? () => handleMegaToggle(mon.species) : undefined}
            onClick={() => handleClick(mon)}
          />
        ))}
      </div>
    </div>
  );
}
