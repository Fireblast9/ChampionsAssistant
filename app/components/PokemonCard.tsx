import { IPokemon } from "@/lib/models/team";
import { STAT_LABELS } from "@/lib/utilities";
import Image from "next/image";

interface PokemonCardProps {
  pokemon: IPokemon;
  priority?: boolean;
  small?: boolean;
  left?: boolean;
  slot?: 1 | 2 | null;
  onClick?: () => void;
}

function slotStyles(s: 1 | 2 | null) {
  if (s === 1) return { border: "border-yellow-400", badge: "bg-yellow-400 text-black" };
  if (s === 2) return { border: "border-orange-400", badge: "bg-orange-400 text-black" };
  return { border: "border-current", badge: "" };
}

export default function PokemonCard({
  pokemon,
  priority = false,
  small = false,
  left,
  slot = null,
  onClick,
}: Readonly<PokemonCardProps>) {
  const evEntries = Object.entries(pokemon.evs ?? {}).filter(([, v]) => v > 0);
  const { border: borderClass, badge: badgeClass } = slotStyles(slot);

  return (
    <div
      className={`relative border-2 rounded-sm p-4 gap-4 ${borderClass} ${small ? "cursor-pointer w-fit my-2" : "flex"}`}
      onClick={small ? onClick : undefined}
    >
      {small && slot && (
        <div className={`absolute top-0 right-0 text-[10px] font-bold px-1 rounded-bl ${badgeClass}`}>
          {slot}
        </div>
      )}
      <div
        className={`shrink-0 ${small ? "w-18 h-18" : "w-24 h-24"} relative self-center`}
      >
        {pokemon.sprite ? (
          <Image
            src={pokemon.sprite}
            alt={pokemon.species}
            fill
            sizes={"96px"}
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
