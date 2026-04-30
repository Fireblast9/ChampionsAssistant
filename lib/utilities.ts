import { Generations } from "@smogon/calc";

export const STAT_LABELS: Record<string, string> = {
  hp: "HP",
  atk: "Atk",
  def: "Def",
  spa: "SpA",
  spd: "SpD",
  spe: "Spe",
};

export const gen = Generations.get(9);

export type WeatherOption =
  | "Sun"
  | "Rain"
  | "Sand"
  | "Snow"
  | "Harsh Sunshine"
  | "Heavy Rain"
  | "Strong Winds"
  | "";

export type TerrainOption = "Electric" | "Grassy" | "Misty" | "Psychic" | "";

export interface SideState {
  isSR: boolean;
  spikes: number;
  isReflect: boolean;
  isLightScreen: boolean;
  isAuroraVeil: boolean;
  isTailwind: boolean;
  isHelpingHand: boolean;
  isProtected: boolean;
}

export interface FieldState {
  weather: WeatherOption;
  terrain: TerrainOption;
  attackerSide: SideState;
  defenderSide: SideState;
  isGravity: boolean;
  isMagicRoom: boolean;
  isWonderRoom: boolean;
}

export const DEFAULT_SIDE: SideState = {
  isSR: false,
  spikes: 0,
  isReflect: false,
  isLightScreen: false,
  isAuroraVeil: false,
  isTailwind: false,
  isHelpingHand: false,
  isProtected: false,
};

export const DEFAULT_FIELD: FieldState = {
  weather: "",
  terrain: "",
  attackerSide: { ...DEFAULT_SIDE },
  defenderSide: { ...DEFAULT_SIDE },
  isGravity: false,
  isMagicRoom: false,
  isWonderRoom: false,
};

export const WEATHER_OPTIONS: [string, WeatherOption][] = [
  ["Sun", "Sun"],
  ["Rain", "Rain"],
  ["Sand", "Sand"],
  ["Snow", "Snow"],
];

export const TERRAIN_OPTIONS: [string, TerrainOption][] = [
  ["Electric", "Electric"],
  ["Grassy", "Grassy"],
  ["Misty", "Misty"],
  ["Psychic", "Psychic"],
];
