'use client';

import { useState } from 'react';
import { getTeam } from '../teams/actions';

type Team = { _id: string; name: string };
type LoadedTeam = Awaited<ReturnType<typeof getTeam>>;

export default function TeamSelect({ teams }: Readonly<{ teams: Team[] }>) {
    const [value, setValue] = useState('');
    const [team, setTeam] = useState<LoadedTeam>(null);

    async function handleSelect(id: string) {
        setValue(id);
        const loaded = await getTeam(id);
        setTeam(loaded);
    }

    return (
        <div>
            <select value={value} onChange={e => handleSelect(e.target.value)}>
                <option value="" disabled hidden>Choose your team!</option>
                {teams.map((t) => (
                    <option key={t._id} value={t._id}>{t.name}</option>
                ))}
            </select>

            {team && (
                <div>
                    {team.pokemon.map((mon: NonNullable<LoadedTeam>['pokemon'][number]) => (
                        <div key={mon._id}>{mon.species}</div>
                    ))}
                </div>
            )}
        </div>
    );
}
