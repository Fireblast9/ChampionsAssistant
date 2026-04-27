"use server";

import { connectDB } from "@/lib/db";
import { Team } from "@/lib/models/team";
import { parseShowdown } from "@/lib/showdown-parser";
import { revalidatePath } from "next/cache";

export async function getTeam(id: string) {
  await connectDB();
  const team = await Team.findById(id).lean();
  if (!team) return null;
  return {
    ...team,
    _id: team._id.toString(),
    pokemon: team.pokemon?.map((p: any) => ({ ...p, _id: p._id?.toString() })) ?? [],
  };
}

export async function getTeams() {
  await connectDB();
  const teams = await Team.find().sort({ createdAt: -1 }).lean();
  return teams.map((t) => ({ ...t, _id: t._id.toString() }));
}

export async function deleteTeam(id: string){
    await connectDB();
    await Team.deleteOne({"_id": id});
    revalidatePath("/teams")
}

export async function getTeamNames() {
  await connectDB();
  const teams = await Team.find().select("_id name").sort({ createdAt: -1 }).lean();
  return teams.map((t) => ({ _id: t._id.toString(), name: t.name as string }));
}

export async function createTeam(_prevState: unknown, formData: FormData) {
  const mode = formData.get("mode") as string;

  let name: string;
  let paste: string;

  if (mode === "paste") {
    name = (formData.get("name") as string)?.trim();
    paste = (formData.get("paste") as string)?.trim();
    if (!name || !paste) return;
  } else {
    const raw = (formData.get("url") as string)?.trim();
    const url = raw.startsWith("http") ? raw : `https://${raw}`;
    const id = url.split("pokepast.es/")[1]?.replace(/\/$/, "");

    if (!id) {
      console.error("[createTeam] Invalid pokepaste URL");
      return;
    }

    const res = await fetch(`https://pokepast.es/${id}/json`);
    if (!res.ok) {
      console.error("[createTeam] Failed to fetch pokepaste:", res.statusText);
      return;
    }

    const data = await res.json();
    name = data.title || "Untitled";
    paste = data.paste;
  }

  const pokemon = parseShowdown(paste);
  console.log(`[createTeam] Parsed ${pokemon.length} Pokémon:`, pokemon.map((p) => p.species));

  await connectDB();
  const team = await Team.create({ name, pokemon });
  console.log("[createTeam] Team saved with ID:", team._id.toString());

  revalidatePath("/teams");
}
