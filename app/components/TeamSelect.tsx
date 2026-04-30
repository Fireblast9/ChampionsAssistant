"use client";

import { ITeam } from "@/lib/models/team";
import { Team } from "@/lib/types";
import { Dispatch, SetStateAction, useState } from "react";
import { getTeam } from "../teams/actions";

export default function TeamSelect({
  teamNames,
  setTeam,
}: Readonly<{
  teamNames: Team[];
  setTeam: Dispatch<SetStateAction<ITeam | null>>;
}>) {
  const [value, setValue] = useState("");

  async function handleSelect(id: string) {
    setValue(id);
    const loaded = await getTeam(id);
    console.log(loaded);
    setTeam(loaded);
  }

  return (
    <div>
      <select
        value={value}
        onChange={(e) => handleSelect(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="" disabled hidden>
          Choose your team!
        </option>
        {teamNames.map((t) => (
          <option key={t._id} value={t._id}>
            {t.name}
          </option>
        ))}
      </select>
    </div>
  );
}
