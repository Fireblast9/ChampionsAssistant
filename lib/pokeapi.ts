const SPECIES_OVERRIDES: Record<string, string> = {
  "aegislash": "aegislash-shield",
  "maushold": "maushold-family-of-four",
  "maushold-four": "maushold-family-of-four",
  "maushold-three": "maushold-family-of-three",
  "tauros-paldea": "tauros-paldea-combat-breed",
  "tauros-paldea-blaze": "tauros-paldea-blaze-breed",
  "tauros-paldea-aqua": "tauros-paldea-aqua-breed",
  "basculegion-m": "basculegion-male",
  "basculegion-f": "basculegion-female",
  "sinistcha-masterpiece": "sinistcha",
  "sinistcha-artisan": "sinistcha",
  "sinistcha-unremarkable": "sinistcha",
};

const GENDER_SPECIES = new Set(["basculegion"]);

function toPokeApiName(species: string, gender?: "M" | "F"): string {
  const slug = species.toLowerCase().replaceAll(/\s+/g, "-");

  if (GENDER_SPECIES.has(slug) && gender) {
    return `${slug}-${gender === "M" ? "male" : "female"}`;
  }

  return SPECIES_OVERRIDES[slug] ?? slug;
}

export async function getPokemonSprite(species: string, gender?: "M" | "F") {
  const name = toPokeApiName(species, gender);
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!res.ok) return null;
    const data = await res.json();
    return (
      data.sprites?.other?.["official-artwork"]?.front_default ??
      data.sprites?.front_default ??
      null
    );
  } catch {
    return null;
  }
}
