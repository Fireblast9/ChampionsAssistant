import mongoose, { Schema } from "mongoose";

export interface IPokemon {
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
}

export interface ITeam {
  _id: string;
  name: string;
  pokemon: IPokemon[];
  createdAt: Date;
}

const PokemonSchema = new Schema<IPokemon>({
  species: { type: String, required: true },
  nickname: String,
  gender: { type: String, enum: ["M", "F"] },
  item: String,
  ability: String,
  level: Number,
  evs: { type: Object, default: {} },
  ivs: { type: Object, default: {} },
  nature: String,
  shiny: { type: Boolean, default: false },
  moves: [String],
});

const TeamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true },
    pokemon: { type: [PokemonSchema], default: [] },
  },
  { timestamps: true }
);

export const Team = mongoose.models.Team ?? mongoose.model<ITeam>("Team", TeamSchema);
