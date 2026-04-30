export interface ParsedPokemon {
  species: string;
  nickname?: string;
  gender?: "M" | "F";
  item?: string;
  ability?: string;
  level?: number;
  evs: Record<string, number>;
  ivs: Record<string, number>;
  nature?: string;
  shiny: boolean;
  moves: string[];
  sprite?: string;
}

function parseFirstLine(
  line: string,
): Pick<ParsedPokemon, "species" | "nickname" | "gender" | "item"> {
  let rest = line;
  let item: string | undefined;

  if (rest.includes(" @ ")) {
    const idx = rest.indexOf(" @ ");
    item = rest.slice(idx + 3).trim();
    rest = rest.slice(0, idx);
  }

  const genderMatch = /\s+\(([MF])\)$/.exec(rest);
  const gender = genderMatch ? (genderMatch[1] as "M" | "F") : undefined;
  rest = rest.replace(/\s+\([MF]\)$/, "").trim();

  const nicknameMatch = rest.match(/^(.+)\s+\((.+)\)$/);
  if (nicknameMatch) {
    return {
      nickname: nicknameMatch[1].trim(),
      species: nicknameMatch[2].trim(),
      gender,
      item,
    };
  }

  return { species: rest.trim(), gender, item };
}

function parseStats(value: string): Record<string, number> {
  const stats: Record<string, number> = {};
  for (const part of value.split("/").map((s) => s.trim())) {
    const match = part.match(/^(\d+)\s+(.+)$/);
    if (match) stats[match[2].trim().toLowerCase()] = Number.parseInt(match[1]);
  }
  return stats;
}

export function parseShowdown(text: string): ParsedPokemon[] {
  const blocks = text.trim().split(/\n\s*\n/);
  console.log(`[parser] Raw text length: ${text.length} chars`);
  console.log(`[parser] Split into ${blocks.length} block(s)`);

  return blocks.flatMap((block, i) => {
    const lines = block
      .trim()
      .split("\n")
      .map((l) => l.trim());
    console.log(
      `[parser] Block ${i + 1}: ${lines.length} line(s), first line: "${lines[0]}"`,
    );

    if (!lines[0]) {
      console.log(`[parser] Block ${i + 1}: skipped (empty)`);
      return [];
    }

    const firstLineParsed = parseFirstLine(lines[0]);
    console.log(
      `[parser] Block ${i + 1}: parsed first line →`,
      firstLineParsed,
    );

    const mon: ParsedPokemon = {
      ...firstLineParsed,
      evs: {},
      ivs: {},
      shiny: false,
      moves: [],
    };

    for (const line of lines.slice(1)) {
      if (line.startsWith("- ")) {
        mon.moves.push(line.slice(2).trim());
      } else if (line.startsWith("Ability: ")) {
        mon.ability = line.slice(9).trim();
      } else if (line.startsWith("Level: ")) {
        mon.level = Number.parseInt(line.slice(7));
      } else if (line.startsWith("EVs: ")) {
        mon.evs = parseStats(line.slice(5));
      } else if (line.startsWith("IVs: ")) {
        mon.ivs = parseStats(line.slice(5));
      } else if (line.endsWith(" Nature")) {
        mon.nature = line.replace(" Nature", "").trim();
      } else if (line === "Shiny: Yes") {
        mon.shiny = true;
      }
    }

    if (!mon.species) {
      return [];
    }

    return [mon];
  });
}
