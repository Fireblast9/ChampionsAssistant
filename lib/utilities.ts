import { Generations } from "@smogon/calc";

export const DEFAULT_NAVIGATION_WARNING =
  "Leave the page? You have unsaved changes that will be lost.";

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

export interface MegaEntry {
  stone: string;
  megaSpecies: string;
}

export const MEGA_MAP: Record<string, MegaEntry[]> = {
  // Gen 6 / 7
  Venusaur: [{ stone: "Venusaurite", megaSpecies: "Venusaur-Mega" }],
  Charizard: [
    { stone: "Charizardite X", megaSpecies: "Charizard-Mega-X" },
    { stone: "Charizardite Y", megaSpecies: "Charizard-Mega-Y" },
  ],
  Blastoise: [{ stone: "Blastoisinite", megaSpecies: "Blastoise-Mega" }],
  Beedrill: [{ stone: "Beedrillite", megaSpecies: "Beedrill-Mega" }],
  Pidgeot: [{ stone: "Pidgeotite", megaSpecies: "Pidgeot-Mega" }],
  Alakazam: [{ stone: "Alakazite", megaSpecies: "Alakazam-Mega" }],
  Slowbro: [{ stone: "Slowbronite", megaSpecies: "Slowbro-Mega" }],
  Gengar: [{ stone: "Gengarite", megaSpecies: "Gengar-Mega" }],
  Kangaskhan: [{ stone: "Kangaskhanite", megaSpecies: "Kangaskhan-Mega" }],
  Pinsir: [{ stone: "Pinsirite", megaSpecies: "Pinsir-Mega" }],
  Gyarados: [{ stone: "Gyaradosite", megaSpecies: "Gyarados-Mega" }],
  Aerodactyl: [{ stone: "Aerodactylite", megaSpecies: "Aerodactyl-Mega" }],
  Mewtwo: [
    { stone: "Mewtwonite X", megaSpecies: "Mewtwo-Mega-X" },
    { stone: "Mewtwonite Y", megaSpecies: "Mewtwo-Mega-Y" },
  ],
  Ampharos: [{ stone: "Ampharosite", megaSpecies: "Ampharos-Mega" }],
  Steelix: [{ stone: "Steelixite", megaSpecies: "Steelix-Mega" }],
  Scizor: [{ stone: "Scizorite", megaSpecies: "Scizor-Mega" }],
  Heracross: [{ stone: "Heracronite", megaSpecies: "Heracross-Mega" }],
  Houndoom: [{ stone: "Houndoominite", megaSpecies: "Houndoom-Mega" }],
  Tyranitar: [{ stone: "Tyranitarite", megaSpecies: "Tyranitar-Mega" }],
  Sceptile: [{ stone: "Sceptilite", megaSpecies: "Sceptile-Mega" }],
  Blaziken: [{ stone: "Blazikenite", megaSpecies: "Blaziken-Mega" }],
  Swampert: [{ stone: "Swampertite", megaSpecies: "Swampert-Mega" }],
  Gardevoir: [{ stone: "Gardevoirite", megaSpecies: "Gardevoir-Mega" }],
  Sableye: [{ stone: "Sableyite", megaSpecies: "Sableye-Mega" }],
  Mawile: [{ stone: "Mawilite", megaSpecies: "Mawile-Mega" }],
  Aggron: [{ stone: "Aggronite", megaSpecies: "Aggron-Mega" }],
  Medicham: [{ stone: "Medichamite", megaSpecies: "Medicham-Mega" }],
  Manectric: [{ stone: "Manectite", megaSpecies: "Manectric-Mega" }],
  Sharpedo: [{ stone: "Sharpedonite", megaSpecies: "Sharpedo-Mega" }],
  Camerupt: [{ stone: "Cameruptite", megaSpecies: "Camerupt-Mega" }],
  Altaria: [{ stone: "Altarianite", megaSpecies: "Altaria-Mega" }],
  Banette: [{ stone: "Banettite", megaSpecies: "Banette-Mega" }],
  Absol: [
    { stone: "Absolite", megaSpecies: "Absol-Mega" },
    { stone: "Absolite Z", megaSpecies: "Absol-Mega-Z" },
  ],
  Glalie: [{ stone: "Glalitite", megaSpecies: "Glalie-Mega" }],
  Salamence: [{ stone: "Salamencite", megaSpecies: "Salamence-Mega" }],
  Metagross: [{ stone: "Metagrossite", megaSpecies: "Metagross-Mega" }],
  Latias: [{ stone: "Latiasite", megaSpecies: "Latias-Mega" }],
  Latios: [{ stone: "Latiosite", megaSpecies: "Latios-Mega" }],
  Lopunny: [{ stone: "Lopunnite", megaSpecies: "Lopunny-Mega" }],
  Gallade: [{ stone: "Galladite", megaSpecies: "Gallade-Mega" }],
  Garchomp: [
    { stone: "Garchompite", megaSpecies: "Garchomp-Mega" },
    { stone: "Garchompite Z", megaSpecies: "Garchomp-Mega-Z" },
  ],
  Lucario: [
    { stone: "Lucarionite", megaSpecies: "Lucario-Mega" },
    { stone: "Lucarionite Z", megaSpecies: "Lucario-Mega-Z" },
  ],
  Abomasnow: [{ stone: "Abomasite", megaSpecies: "Abomasnow-Mega" }],
  Audino: [{ stone: "Audinite", megaSpecies: "Audino-Mega" }],
  Diancie: [{ stone: "Diancite", megaSpecies: "Diancie-Mega" }],
  // Legends: Z-A base game
  Clefable: [{ stone: "Clefablite", megaSpecies: "Clefable-Mega" }],
  Victreebel: [{ stone: "Victreebelite", megaSpecies: "Victreebel-Mega" }],
  Starmie: [{ stone: "Starminite", megaSpecies: "Starmie-Mega" }],
  Dragonite: [{ stone: "Dragoninite", megaSpecies: "Dragonite-Mega" }],
  Meganium: [{ stone: "Meganiumite", megaSpecies: "Meganium-Mega" }],
  Feraligatr: [{ stone: "Feraligite", megaSpecies: "Feraligatr-Mega" }],
  Emboar: [{ stone: "Emboarite", megaSpecies: "Emboar-Mega" }],
  Skarmory: [{ stone: "Skarmorite", megaSpecies: "Skarmory-Mega" }],
  Chimecho: [{ stone: "Chimechite", megaSpecies: "Chimecho-Mega" }],
  Hawlucha: [{ stone: "Hawluchanite", megaSpecies: "Hawlucha-Mega" }],
  Barbaracle: [{ stone: "Barbaracite", megaSpecies: "Barbaracle-Mega" }],
  Froslass: [{ stone: "Frosslassite", megaSpecies: "Froslass-Mega" }],
  Floette: [{ stone: "Floettite", megaSpecies: "Floette-Eternal-Mega" }],
  "Floette-Eternal": [
    { stone: "Floettite", megaSpecies: "Floette-Eternal-Mega" },
  ],
  Eelektross: [{ stone: "Eelektrossite", megaSpecies: "Eelektross-Mega" }],
  Falinks: [{ stone: "Falinksite", megaSpecies: "Falinks-Mega" }],
  Scolipede: [{ stone: "Scolipite", megaSpecies: "Scolipede-Mega" }],
  Dragalge: [{ stone: "Dragalgite", megaSpecies: "Dragalge-Mega" }],
  Scrafty: [{ stone: "Scraftinite", megaSpecies: "Scrafty-Mega" }],
  Pyroar: [{ stone: "Pyroarite", megaSpecies: "Pyroar-Mega" }],
  Malamar: [{ stone: "Malamarite", megaSpecies: "Malamar-Mega" }],
  Chesnaught: [{ stone: "Chesnaughtite", megaSpecies: "Chesnaught-Mega" }],
  Delphox: [{ stone: "Delphoxite", megaSpecies: "Delphox-Mega" }],
  Greninja: [{ stone: "Greninjite", megaSpecies: "Greninja-Mega" }],
  Excadrill: [{ stone: "Excadrite", megaSpecies: "Excadrill-Mega" }],
  Chandelure: [{ stone: "Chandelurite", megaSpecies: "Chandelure-Mega" }],
  Drampa: [{ stone: "Drampanite", megaSpecies: "Drampa-Mega" }],
  Zygarde: [{ stone: "Zygardite", megaSpecies: "Zygarde-Mega" }],
  // Legends: Z-A DLC
  Raichu: [
    { stone: "Raichunite X", megaSpecies: "Raichu-Mega-X" },
    { stone: "Raichunite Y", megaSpecies: "Raichu-Mega-Y" },
  ],
  Meowstic: [{ stone: "Meowsticite", megaSpecies: "Meowstic-Mega" }],
  Staraptor: [{ stone: "Staraptite", megaSpecies: "Staraptor-Mega" }],
  Heatran: [{ stone: "Heatranite", megaSpecies: "Heatran-Mega" }],
  Darkrai: [{ stone: "Darkranite", megaSpecies: "Darkrai-Mega" }],
  Crabominable: [{ stone: "Crabominite", megaSpecies: "Crabominable-Mega" }],
  Golurk: [{ stone: "Golurkite", megaSpecies: "Golurk-Mega" }],
  Golisopod: [{ stone: "Golisopite", megaSpecies: "Golisopod-Mega" }],
  Baxcalibur: [{ stone: "Baxcalibrite", megaSpecies: "Baxcalibur-Mega" }],
  Tatsugiri: [{ stone: "Tatsugirinite", megaSpecies: "Tatsugiri-Mega" }],
  Glimmora: [{ stone: "Glimmoranite", megaSpecies: "Glimmora-Mega" }],
  Scovillain: [{ stone: "Scovillainite", megaSpecies: "Scovillain-Mega" }],
  Magearna: [{ stone: "Magearnite", megaSpecies: "Magearna-Mega" }],
  Zeraora: [{ stone: "Zeraorite", megaSpecies: "Zeraora-Mega" }],
  // Primal Reversions
  Kyogre: [{ stone: "Blue Orb", megaSpecies: "Kyogre-Primal" }],
  Groudon: [{ stone: "Red Orb", megaSpecies: "Groudon-Primal" }],
  Rayquaza: [{ stone: "Dragon Ascent", megaSpecies: "Rayquaza-Mega" }],
};

export type buttonColor =
  | "blue"
  | "green"
  | "purple"
  | "orange"
  | "yellow"
  | "brown"
  | "white"
  | "pink"
  | "darkpink";

export const WEATHER_OPTIONS: [string, WeatherOption, buttonColor][] = [
  ["Sun", "Sun", "yellow"],
  ["Rain", "Rain", "blue"],
  ["Sand", "Sand", "brown"],
  ["Snow", "Snow", "white"],
];

export const TERRAIN_OPTIONS: [string, TerrainOption, buttonColor][] = [
  ["Electric", "Electric", "yellow"],
  ["Grassy", "Grassy", "green"],
  ["Misty", "Misty", "pink"],
  ["Psychic", "Psychic", "darkpink"],
];
