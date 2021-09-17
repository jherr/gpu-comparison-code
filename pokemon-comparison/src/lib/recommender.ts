import createKDTree from "static-kdtree";

import { pokemon, Pokemon } from "../pokemon";

const pokemonPoint = (pokemon: Pokemon): number[] => [
  pokemon.hp,
  pokemon.attack,
  pokemon.defense,
  pokemon.special_attack,
  pokemon.special_defense,
  pokemon.speed,
];

const tree = createKDTree(pokemon.map((p) => pokemonPoint(p)));

export const getRecommendations = (p: Pokemon): Pokemon[] =>
  tree
    .knn(pokemonPoint(p), 21)
    .map((index) => pokemon[index])
    .filter((reccomenedPokemon) => reccomenedPokemon.id !== p.id);
