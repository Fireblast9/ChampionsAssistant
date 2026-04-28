const SPECIES_OVERRIDES: Record<string, string> = {
  "sinistcha-masterpiece": "sinistcha",
};

const GENDER_SPECIES = new Set(["basculegion"]);

function toPokeApiName(species: string, gender?: "M" | "F"): string {
  const slug = species.toLowerCase().replaceAll(/\s+/g, "-");

  if (GENDER_SPECIES.has(slug) && gender) {
    return `${slug}-${gender === "M" ? "male" : "female"}`;
  }

  return SPECIES_OVERRIDES[slug] ?? slug;
}

export async function getPokemonSprite(
  species: string,
  gender?: "M" | "F",
): Promise<string | null> {
  let name = toPokeApiName(species, gender);
  try {
    if (species == "Aegislash") {
      name = "aegislash-shield";
    } else if (species == "Maushold-Four") {
      name = "maushold-family-of-four";
    } else if (species == "Maushold-Three") {
      name = "maushold-family-of-three";
    } else if (species == "Tauros-Paldea") {
      name = "tauros-paldea-combat-breed";
    } else if (species == "Tauros-Paldea-Blaze") {
      name = "tauros-paldea-blaze-breed";
    } else if (species == "Tauros-Paldea-Aqua") {
      name = "tauros-paldea-aqua-breed";
    }
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
