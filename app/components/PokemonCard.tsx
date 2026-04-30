import { IPokemon } from "@/lib/models/team";
import { STAT_LABELS } from "@/lib/utilities";
import Image from "next/image";

interface PokemonCardProps {
  pokemon: IPokemon;
  priority?: boolean;
  small?: boolean;
  left: boolean;
}

export default function PokemonCard({
  pokemon,
  priority = false,
  small = false,
  left,
}: Readonly<PokemonCardProps>) {
  const evEntries = Object.entries(pokemon.evs ?? {}).filter(([, v]) => v > 0);

  return (
    <div
      className={`border-2 border-current rounded-sm p-4 gap-4 ${small ? "cursor-pointer w-fit my-2" : "flex"}`}
    >
      <div
        className={`shrink-0 ${small ? "w-18 h-18" : "w-24 h-24"} relative self-center`}
      >
        {pokemon.sprite ? (
          <Image
            src={pokemon.sprite}
            alt={pokemon.species}
            fill
            className={`${left && small ? "scale-x-[-1]" : ""} object-fit`}
            loading={priority ? "eager" : "lazy"}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center opacity-30 text-sm">
            ?
          </div>
        )}
      </div>

      {small ? null : (
        <div className="flex flex-col gap-1 text-sm min-w-0">
          <p className="text-lg font-bold">
            {pokemon.nickname
              ? `${pokemon.nickname} (${pokemon.species})`
              : pokemon.species}
            {pokemon.gender && (
              <span className="ml-1 opacity-60">({pokemon.gender})</span>
            )}
          </p>

          {pokemon.item && (
            <p>
              <span className="opacity-50">Item:</span> {pokemon.item}
            </p>
          )}
          {pokemon.ability && (
            <p>
              <span className="opacity-50">Ability:</span> {pokemon.ability}
            </p>
          )}
          {pokemon.nature && (
            <p>
              <span className="opacity-50">Nature:</span> {pokemon.nature}
            </p>
          )}

          {evEntries.length > 0 && (
            <p>
              <span className="opacity-50">EVs:</span>{" "}
              {evEntries
                .map(
                  ([stat, val]) =>
                    `${Number(val)} ${STAT_LABELS[stat] ?? stat}`,
                )
                .join(" / ")}
            </p>
          )}

          <div className="mt-1 flex flex-col gap-0.5">
            {pokemon.moves.map((move) => (
              <p key={move} className="opacity-80">
                {move}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
