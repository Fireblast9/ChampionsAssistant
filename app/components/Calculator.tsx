"use client";

import { IPokemon } from "@/lib/models/team";
import {
  DEFAULT_FIELD,
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
  type StatsTable,
} from "@smogon/calc";
import type {
  AbilityName,
  ItemName,
  MoveName,
  NatureName,
} from "@smogon/calc/dist/data/interface";
import { useMemo, useState } from "react";

function buildCalcPokemon(p: IPokemon): CalcPokemon {
  return new CalcPokemon(gen, p.species, {
    level: p.level ?? 100,
    ability: p.ability as AbilityName | undefined,
    item: p.item as ItemName | undefined,
    nature: p.nature as NatureName | undefined,
    evs: p.evs as Partial<StatsTable>,
    ivs: p.ivs as Partial<StatsTable>,
    gender: p.gender === "M" ? "M" : p.gender === "F" ? "F" : undefined,
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
      spikes: fs.attackerSide.spikes as 0 | 1 | 2 | 3,
      isReflect: fs.attackerSide.isReflect,
      isLightScreen: fs.attackerSide.isLightScreen,
      isAuroraVeil: fs.attackerSide.isAuroraVeil,
      isTailwind: fs.attackerSide.isTailwind,
      isHelpingHand: fs.attackerSide.isHelpingHand,
      isProtected: fs.attackerSide.isProtected,
    }),
    defenderSide: new Side({
      isSR: fs.defenderSide.isSR,
      spikes: fs.defenderSide.spikes as 0 | 1 | 2 | 3,
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
  attacker: IPokemon,
  defender: IPokemon,
  field: Field,
): (MoveResult | null)[] {
  let calcAttacker: CalcPokemon;
  let calcDefender: CalcPokemon;
  try {
    calcAttacker = buildCalcPokemon(attacker);
    calcDefender = buildCalcPokemon(defender);
  } catch {
    return [null, null, null, null];
  }

  return attacker.moves.map((moveName) => {
    if (!moveName || moveName === "(No Move)") return null;
    try {
      const move = new CalcMove(gen, moveName as MoveName);
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

function DamageBar({ low, high }: Readonly<{ low: number; high: number }>) {
  const cappedLow = low >= 100 ? 0 : Math.min(low, 100);
  const cappedHigh = Math.min(high, 100);
  const color =
    high >= 100
      ? "bg-red-500"
      : high >= 75
        ? "bg-orange-500"
        : high >= 50
          ? "bg-yellow-500"
          : "bg-green-500";
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
      <div className="px-2 py-1.5 rounded text-sm text-gray-600 italic select-none">
        —
      </div>
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
        <span className="text-xs shrink-0 tabular-nums text-gray-300">
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
  color?: "blue" | "green" | "purple" | "orange";
  onClick: () => void;
}>) {
  const colors = {
    blue: "bg-blue-600 border-blue-500 text-white",
    green: "bg-green-600 border-green-500 text-white",
    purple: "bg-purple-600 border-purple-500 text-white",
    orange: "bg-orange-600 border-orange-500 text-white",
  };
  return (
    <button
      onClick={onClick}
      className={`px-2 py-0.5 text-xs rounded border transition-colors cursor-pointer ${
        active
          ? colors[color]
          : "border-gray-600 text-gray-400 hover:border-gray-400"
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
      <span className={checked ? "text-yellow-400" : "text-gray-400"}>
        {label}
      </span>
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
        {(results ?? Array(4).fill(null)).map((r, i) => (
          <MoveRow
            key={i}
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
}: Readonly<{
  label: string;
  color: "blue" | "red";
  side: SideState;
  onChange: (patch: Partial<SideState>) => void;
}>) {
  const colorClass = color === "blue" ? "text-blue-400" : "text-red-400";
  return (
    <div>
      <div className={`text-xs ${colorClass} font-medium mb-1.5 truncate`}>
        {label}
      </div>
      <div className="flex flex-col gap-1">
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
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="flex items-center gap-1 text-xs">
      <span className={value > 0 ? "text-yellow-400" : "text-gray-400"}>
        Spikes
      </span>
      <div className="flex gap-0.5">
        {[0, 1, 2, 3].map((n) => (
          <button
            key={n}
            onClick={() => onChange(n)}
            className={`w-5 h-4 text-[10px] rounded cursor-pointer transition-colors ${
              value === n
                ? "bg-yellow-500 text-black"
                : "bg-gray-700 text-gray-400 hover:bg-gray-600"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Calculator({
  attacker,
  defender,
}: Readonly<{ attacker: IPokemon | null; defender: IPokemon | null }>) {
  const [field, setField] = useState<FieldState>(DEFAULT_FIELD);
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

  const selectedDesc =
    selectedAtk !== null && atkResults?.[selectedAtk]
      ? atkResults[selectedAtk]!.desc
      : selectedDef !== null && defResults?.[selectedDef]
        ? defResults[selectedDef]!.desc
        : null;

  function toggleWeather(w: WeatherOption) {
    setField((f) => ({ ...f, weather: f.weather === w ? "" : w }));
  }
  function toggleTerrain(t: TerrainOption) {
    setField((f) => ({ ...f, terrain: f.terrain === t ? "" : t }));
  }
  function setAtkSide(patch: Partial<SideState>) {
    setField((f) => ({ ...f, attackerSide: { ...f.attackerSide, ...patch } }));
  }
  function setDefSide(patch: Partial<SideState>) {
    setField((f) => ({ ...f, defenderSide: { ...f.defenderSide, ...patch } }));
  }

  return (
    <div className="flex flex-col gap-3 shrink-0 px-2 text-sm">
      {/* Header */}
      <div className="flex justify-between items-center text-base font-bold border-b border-gray-700 pb-1">
        <span className="text-blue-400">{attacker?.species ?? "Attacker"}</span>
        <span className="text-gray-500 text-xs">vs</span>
        <span className="text-red-400">{defender?.species ?? "Defender"}</span>
      </div>

      {!attacker || !defender ? (
        <div className="text-center text-gray-500 py-8 text-sm">
          Select a Pokémon on each side to begin
        </div>
      ) : (
        <>
          {/* Two-column move results */}
          <div className="grid grid-cols-2 gap-2">
            <MoveColumn
              species={attacker.species}
              color="blue"
              results={atkResults}
              selectedIndex={selectedAtk}
              onSelect={(i) => {
                setSelectedAtk(i);
                setSelectedDef(null);
              }}
            />
            <MoveColumn
              species={defender.species}
              color="red"
              results={defResults}
              selectedIndex={selectedDef}
              onSelect={(i) => {
                setSelectedDef(i);
                setSelectedAtk(null);
              }}
            />
          </div>

          {/* Result description */}
          <div
            className="text-xs text-gray-300 bg-gray-800/60 rounded p-2 min-h-[2.75rem] border border-gray-700 cursor-pointer leading-relaxed"
            onClick={() =>
              selectedDesc && navigator.clipboard.writeText(selectedDesc)
            }
            title={selectedDesc ? "Click to copy" : undefined}
          >
            {selectedDesc ?? (
              <span className="text-gray-500 italic">
                Click a move to see damage details
              </span>
            )}
          </div>
        </>
      )}

      {/* Field Conditions */}
      <div className="border border-gray-700 rounded p-2.5 flex flex-col gap-2.5">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          Field Conditions
        </div>

        {/* Weather */}
        <div>
          <div className="text-xs text-gray-500 mb-1">Weather</div>
          <div className="flex flex-wrap gap-1">
            {WEATHER_OPTIONS.map(([label, val]) => (
              <ToggleBtn
                key={val}
                label={label}
                active={field.weather === val}
                color="blue"
                onClick={() => toggleWeather(val)}
              />
            ))}
          </div>
        </div>

        {/* Terrain */}
        <div>
          <div className="text-xs text-gray-500 mb-1">Terrain</div>
          <div className="flex flex-wrap gap-1">
            {TERRAIN_OPTIONS.map(([label, val]) => (
              <ToggleBtn
                key={val}
                label={label}
                active={field.terrain === val}
                color="green"
                onClick={() => toggleTerrain(val)}
              />
            ))}
          </div>
        </div>

        {/* Global toggles */}
        <div className="flex gap-3 flex-wrap">
          <Toggle
            label="Gravity"
            checked={field.isGravity}
            onChange={(v) => setField((f) => ({ ...f, isGravity: v }))}
          />
          <Toggle
            label="Magic Room"
            checked={field.isMagicRoom}
            onChange={(v) => setField((f) => ({ ...f, isMagicRoom: v }))}
          />
          <Toggle
            label="Wonder Room"
            checked={field.isWonderRoom}
            onChange={(v) => setField((f) => ({ ...f, isWonderRoom: v }))}
          />
        </div>

        {/* Per-side conditions */}
        <div className="grid grid-cols-2 gap-3 border-t border-gray-700 pt-2.5">
          <SideConditions
            label={`${attacker?.species ?? "Attacker"} side`}
            color="blue"
            side={field.attackerSide}
            onChange={setAtkSide}
          />
          <SideConditions
            label={`${defender?.species ?? "Defender"} side`}
            color="red"
            side={field.defenderSide}
            onChange={setDefSide}
          />
        </div>
      </div>
    </div>
  );
}
