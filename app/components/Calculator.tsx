import { IPokemon } from "@/lib/models/team";

import { Generations } from "@smogon/calc";

const gen = Generations.get(9);

export default function Calculator({
  attacker,
  defender,
}: Readonly<{ attacker: IPokemon | null; defender: IPokemon | null }>) {
  console.log(defender, attacker);
  return (
    <div>
      <p>{attacker?.species ?? "No attacker"}</p>
      <p>{defender?.species ?? "No defender"}</p>
    </div>
  );
}
