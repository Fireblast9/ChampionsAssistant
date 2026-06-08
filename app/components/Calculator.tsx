"use client";

import { IPokemon } from "@/lib/models/team";
import {
  buttonColor,
  gen,
  TERRAIN_OPTIONS,
  WEATHER_OPTIONS,
  type FieldState,
  type SideState,
  type TerrainOption,
  type WeatherOption,
} from "@/lib/utilities";
import {
  Move as CalcMove,
  Pokemon as CalcPokemon,
  calculate,
  Field,
  Side,
} from "@smogon/calc";
import type {
  AbilityName,
  ItemName,
  NatureName,
} from "@smogon/calc/dist/data/interface";
import { useMemo, useState } from "react";

function buildCalcPokemon(p: IPokemon): CalcPokemon {
  return new CalcPokemon(gen, p.species, {
    level: p.level ?? 100,
    ability: p.ability as AbilityName | undefined,
    item: p.item as ItemName | undefined,
    nature: p.nature as NatureName | undefined,
    evs: p.evs,
    ivs: p.ivs,
    gender: p.gender,
  });
}

function buildField(fs: FieldState): Field {
  return new Field({
    weather: fs.weather || undefined,
    terrain: fs.terrain || undefined,
    isGravity: fs.isGravity,
    isMagicRoom: fs.isMagicRoom,
    isWonderRoom: fs.isWonderRoom,
    attackerSide: new Side({
      isSR: fs.attackerSide.isSR,
      spikes: fs.attackerSide.spikes,
      isReflect: fs.attackerSide.isReflect,
      isLightScreen: fs.attackerSide.isLightScreen,
      isAuroraVeil: fs.attackerSide.isAuroraVeil,
      isTailwind: fs.attackerSide.isTailwind,
      isHelpingHand: fs.attackerSide.isHelpingHand,
      isProtected: fs.attackerSide.isProtected,
    }),
    defenderSide: new Side({
      isSR: fs.defenderSide.isSR,
      spikes: fs.defenderSide.spikes,
      isReflect: fs.defenderSide.isReflect,
      isLightScreen: fs.defenderSide.isLightScreen,
      isAuroraVeil: fs.defenderSide.isAuroraVeil,
      isTailwind: fs.defenderSide.isTailwind,
      isHelpingHand: fs.defenderSide.isHelpingHand,
      isProtected: fs.defenderSide.isProtected,
    }),
  });
}

interface MoveResult {
  name: string;
  desc: string;
  range: [number, number];
  damagePct: [number, number];
  koText: string;
}

function calcMoves(
  movingMon: IPokemon,
  targetMon: IPokemon,
  field: Field,
): (MoveResult | null)[] {
  let calcAttacker: CalcPokemon;
  let calcDefender: CalcPokemon;
  try {
    calcAttacker = buildCalcPokemon(movingMon);
    calcDefender = buildCalcPokemon(targetMon);
  } catch {
    return [null, null, null, null];
  }

  return movingMon.moves.map((moveName) => {
    if (!moveName || moveName === "(No Move)") return null;
    try {
      const move = new CalcMove(gen, moveName);
      const result = calculate(gen, calcAttacker, calcDefender, move, field);
      const range = result.range();
      const hp = calcDefender.stats.hp;
      const ko = result.kochance();
      return {
        name: moveName,
        desc: result.desc(),
        range,
        damagePct: [
          Math.floor((range[0] / hp) * 1000) / 10,
          Math.floor((range[1] / hp) * 1000) / 10,
        ] as [number, number],
        koText: ko.text,
      };
    } catch {
      return null;
    }
  });
}

function damageColor(high: number): string {
  if (high >= 100) return "bg-red-500";
  if (high >= 75) return "bg-orange-500";
  if (high >= 50) return "bg-yellow-500";
  return "bg-green-500";
}

function DamageBar({ low, high }: Readonly<{ low: number; high: number }>) {
  const cappedLow = low >= 100 ? 0 : Math.min(low, 100);
  const cappedHigh = Math.min(high, 100);
  const color = damageColor(high);
  return (
    <div className="w-full h-1.5 bg-gray-700 rounded mt-0.5 relative">
      <div
        className={`absolute h-full rounded ${color} transition-all`}
        style={{ left: `${cappedLow}%`, width: `${cappedHigh - cappedLow}%` }}
      />
    </div>
  );
}

function MoveRow({
  result,
  selected,
  onClick,
}: Readonly<{
  result: MoveResult | null;
  selected: boolean;
  onClick: () => void;
}>) {
  if (!result) {
    return (
      <div className="px-2 py-1.5 rounded text-sm italic select-none">—</div>
    );
  }
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-2 py-1.5 rounded text-sm transition-colors cursor-pointer border ${
        selected
          ? "bg-yellow-500/20 border-yellow-500/50"
          : "border-transparent hover:bg-white/5"
      }`}
    >
      <div className="flex justify-between items-center gap-2">
        <span className="font-medium truncate">{result.name}</span>
        <span className="text-xs shrink-0 tabular-nums">
          {result.damagePct[0]}–{result.damagePct[1]}%
        </span>
      </div>
      <DamageBar low={result.damagePct[0]} high={result.damagePct[1]} />
    </button>
  );
}

function ToggleBtn({
  label,
  active,
  color = "blue",
  onClick,
}: Readonly<{
  label: string;
  active: boolean;
  color?: buttonColor;
  onClick: () => void;
}>) {
  const colors = {
    blue: "bg-blue-600 border-blue-500 text-white",
    green: "bg-green-600 border-green-500 text-white",
    purple: "bg-purple-600 border-purple-500 text-white",
    orange: "bg-orange-600 border-orange-500 text-white",
    yellow: "bg-yellow-400 border-yellow-300 text-gray-900",
    brown: "bg-yellow-700 border-yellow-600 text-white",
    white: "bg-gray-100 border-gray-300 text-gray-900",
    pink: "bg-pink-300 border-pink-300 text-black",
    darkpink: "bg-pink-500 border-pink-300 text-white-900",
  };
  return (
    <button
      onClick={onClick}
      className={`px-2 py-0.5 text-xs rounded border transition-colors cursor-pointer ${
        active ? colors[color] : "border-gray-600 hover:border-gray-400"
      }`}
    >
      {label}
    </button>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: Readonly<{
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}>) {
  return (
    <label className="flex items-center gap-1 text-xs cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="accent-yellow-500"
      />
      <span className={checked ? "text-yellow-400" : ""}>{label}</span>
    </label>
  );
}

function MoveColumn({
  species,
  color,
  results,
  selectedIndex,
  onSelect,
}: Readonly<{
  species: string;
  color: "blue" | "red";
  results: (MoveResult | null)[] | null;
  selectedIndex: number | null;
  onSelect: (i: number) => void;
}>) {
  const colorClass = color === "blue" ? "text-blue-400" : "text-red-400";
  return (
    <div>
      <div
        className={`text-xs ${colorClass} font-semibold mb-1 uppercase tracking-wide truncate`}
      >
        {species} →
      </div>
      <div className="flex flex-col gap-0.5">
        {(results ?? new Array(4).fill(null)).map((r, i) => (
          <MoveRow
            key={r?.name ?? `slot-${i}`}
            result={r}
            selected={selectedIndex === i}
            onClick={() => onSelect(i)}
          />
        ))}
      </div>
    </div>
  );
}

function SideConditions({
  label,
  color,
  side,
  onChange,
  align = "left",
}: Readonly<{
  label: string;
  color: "blue" | "red";
  side: SideState;
  onChange: (patch: Partial<SideState>) => void;
  align?: "left" | "right";
}>) {
  const colorClass = color === "blue" ? "text-blue-400" : "text-red-400";
  const isRight = align === "right";
  return (
    <div className={isRight ? "flex flex-col items-end" : ""}>
      <div className={`text-xs ${colorClass} font-medium mb-1.5 truncate`}>
        {label}
      </div>
      <div className={`flex flex-col gap-2 ${isRight ? "direction-rtl" : ""}`}>
        <Toggle
          label="Helping Hand"
          checked={side.isHelpingHand}
          onChange={(v) => onChange({ isHelpingHand: v })}
        />
        <Toggle
          label="Tailwind"
          checked={side.isTailwind}
          onChange={(v) => onChange({ isTailwind: v })}
        />
        <Toggle
          label="Reflect"
          checked={side.isReflect}
          onChange={(v) => onChange({ isReflect: v })}
        />
        <Toggle
          label="Light Screen"
          checked={side.isLightScreen}
          onChange={(v) => onChange({ isLightScreen: v })}
        />
        <Toggle
          label="Aurora Veil"
          checked={side.isAuroraVeil}
          onChange={(v) => onChange({ isAuroraVeil: v })}
        />
        <Toggle
          label="Stealth Rock"
          checked={side.isSR}
          onChange={(v) => onChange({ isSR: v })}
        />
        <SpikesControl
          value={side.spikes}
          onChange={(n) => onChange({ spikes: n })}
        />
      </div>
    </div>
  );
}

function SpikesControl({
  value,
  onChange,
}: Readonly<{
  value: number;
  onChange: (n: number) => void;
}>) {
  return (
    <div className="flex items-center gap-1 text-xs">
      <span className={value > 0 ? "text-yellow-400" : ""}>Spikes</span>
      <div className="flex gap-0.5">
        {[0, 1, 2, 3].map((n) => (
          <button
            key={n}
            onClick={() => onChange(n)}
            className={`w-5 h-4 text-[10px] rounded cursor-pointer transition-colors ${
              value === n
                ? "bg-yellow-500 text-black"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}

// Shared field conditions panel — rendered once in CalcShell
export function FieldPanel({
  field,
  onChange,
}: Readonly<{
  field: FieldState;
  onChange: (f: FieldState) => void;
}>) {
  function toggleWeather(w: WeatherOption) {
    onChange({ ...field, weather: field.weather === w ? "" : w });
  }
  function toggleTerrain(t: TerrainOption) {
    onChange({ ...field, terrain: field.terrain === t ? "" : t });
  }

  return (
    <div className="border border-gray-700 rounded p-2.5 flex flex-col gap-2.5 text-sm">
      <div className="text-xs font-semibold uppercase tracking-wide">
        Field Conditions
      </div>

      <div className="flex gap-6">
        <div>
          <div className="text-xs mb-1">Weather</div>
          <div className="flex flex-wrap gap-1">
            {WEATHER_OPTIONS.map(([label, val, color]) => (
              <ToggleBtn
                key={val}
                label={label}
                active={field.weather === val}
                color={color}
                onClick={() => toggleWeather(val)}
              />
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs mb-1">Terrain</div>
          <div className="flex flex-wrap gap-1">
            {TERRAIN_OPTIONS.map(([label, val, color]) => (
              <ToggleBtn
                key={val}
                label={label}
                active={field.terrain === val}
                color={color}
                onClick={() => toggleTerrain(val)}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-3 flex-wrap items-end pb-0.5">
          <Toggle
            label="Gravity"
            checked={field.isGravity}
            onChange={(v) => onChange({ ...field, isGravity: v })}
          />
          <Toggle
            label="Magic Room"
            checked={field.isMagicRoom}
            onChange={(v) => onChange({ ...field, isMagicRoom: v })}
          />
          <Toggle
            label="Wonder Room"
            checked={field.isWonderRoom}
            onChange={(v) => onChange({ ...field, isWonderRoom: v })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 border-t border-gray-700 pt-2.5">
        <SideConditions
          label="Attacker side"
          color="blue"
          side={field.attackerSide}
          onChange={(patch) =>
            onChange({
              ...field,
              attackerSide: { ...field.attackerSide, ...patch },
            })
          }
        />
        <SideConditions
          label="Defender side"
          color="red"
          side={field.defenderSide}
          onChange={(patch) =>
            onChange({
              ...field,
              defenderSide: { ...field.defenderSide, ...patch },
            })
          }
          align="right"
        />
      </div>
    </div>
  );
}

// Per-matchup move panel — rendered 4× in CalcShell
export default function MovePanel({
  attacker,
  defender,
  field,
}: Readonly<{
  attacker: IPokemon | null;
  defender: IPokemon | null;
  field: FieldState;
}>) {
  const [selectedAtk, setSelectedAtk] = useState<number | null>(null);
  const [selectedDef, setSelectedDef] = useState<number | null>(null);

  const calcField = useMemo(() => buildField(field), [field]);
  const defCalcField = useMemo(
    () =>
      buildField({
        ...field,
        attackerSide: field.defenderSide,
        defenderSide: field.attackerSide,
      }),
    [field],
  );

  const atkResults = useMemo(
    () =>
      attacker && defender ? calcMoves(attacker, defender, calcField) : null,
    [attacker, defender, calcField],
  );

  const defResults = useMemo(
    () =>
      defender && attacker ? calcMoves(defender, attacker, defCalcField) : null,
    [defender, attacker, defCalcField],
  );

  let selectedDesc: string | null = null;
  if (selectedAtk !== null && atkResults?.[selectedAtk]) {
    selectedDesc = atkResults[selectedAtk].desc;
  } else if (selectedDef !== null && defResults?.[selectedDef]) {
    selectedDesc = defResults[selectedDef].desc;
  }

  return (
    <div className="flex flex-col gap-2 text-sm border border-gray-700 rounded p-2.5">
      <div className="flex justify-between items-center text-xs font-bold border-b border-gray-700 pb-1.5">
        <span className="text-blue-400 truncate">
          {attacker?.species ?? "—"}
        </span>
        <span className="shrink-0 mx-1">vs</span>
        <span className="text-red-400 truncate text-right">
          {defender?.species ?? "—"}
        </span>
      </div>

      {!attacker || !defender ? (
        <div className="text-center py-4 italic text-xs">
          Select a Pokémon on each side
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-2 min-h-0">
            <MoveColumn
              species={attacker.species}
              color="blue"
              results={atkResults}
              selectedIndex={selectedAtk}
              onSelect={(i) => {
                setSelectedAtk((prev) => (prev === i ? null : i));
                setSelectedDef(null);
              }}
            />
            <MoveColumn
              species={defender.species}
              color="red"
              results={defResults}
              selectedIndex={selectedDef}
              onSelect={(i) => {
                setSelectedDef((prev) => (prev === i ? null : i));
                setSelectedAtk(null);
              }}
            />
          </div>

          <div
            className="text-xs bg-gray-800/60 rounded p-2 min-h-0 flex-none overflow-y-auto border border-gray-700 cursor-pointer leading-relaxed"
            onClick={() =>
              selectedDesc && navigator.clipboard.writeText(selectedDesc)
            }
            title={selectedDesc ? "Click to copy" : undefined}
          >
            {selectedDesc ?? (
              <span className="italic">Click a move to see damage details</span>
            )}
          </div>
        </>
      )}
    </div>
  );
}
