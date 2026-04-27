"use client";

import { useState, useActionState } from "react";
import { createTeam } from "../actions";

export default function CreateTeamForm() {
  const [mode, setMode] = useState<"url" | "paste">("url");
  const [, action, pending] = useActionState(createTeam, null);

  return (
    <form action={action} className="flex flex-col gap-3 mt-4">
      <input type="hidden" name="mode" value={mode} />

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode("url")}
          className={`px-4 py-1 border-2 border-current rounded-sm transition-colors duration-200 ${mode === "url" ? "bg-white text-black" : "hover:bg-white hover:text-black"}`}
        >
          Pokepaste URL
        </button>
        <button
          type="button"
          onClick={() => setMode("paste")}
          className={`px-4 py-1 border-2 border-current rounded-sm transition-colors duration-200 ${mode === "paste" ? "bg-white text-black" : "hover:bg-white hover:text-black"}`}
        >
          Showdown Paste
        </button>
      </div>

      {mode === "url" ? (
        <input
          type="text"
          name="url"
          placeholder="https://pokepast.es/..."
          required
          className="border-2 border-current rounded-sm px-3 py-1 bg-transparent"
        />
      ) : (
        <>
          <input
            type="text"
            name="name"
            placeholder="Team name"
            required
            className="border-2 border-current rounded-sm px-3 py-1 bg-transparent"
          />
          <textarea
            name="paste"
            placeholder="Paste Showdown export here..."
            required
            rows={10}
            className="border-2 border-current rounded-sm px-3 py-2 bg-transparent font-mono text-sm resize-y"
          />
        </>
      )}

      <button
        type="submit"
        disabled={pending}
        className="self-start border-2 border-current rounded-sm px-4 py-1 transition-colors duration-200 hover:bg-white hover:text-black disabled:opacity-50"
      >
        {pending ? "Importing..." : "Import"}
      </button>
    </form>
  );
}
