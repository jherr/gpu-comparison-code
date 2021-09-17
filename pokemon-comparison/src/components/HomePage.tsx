import React, { useState, useMemo, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { TextField, makeStyles } from "@material-ui/core";

import { pokemon } from "../pokemon";

const useStyles = makeStyles({
  pokemon: {
    marginTop: "0.5rem",
    fontSize: "1.2rem",
  },
});

export function HomePage() {
  const [search, setSearch] = useState("");
  const history = useHistory();

  const classes = useStyles();

  const displayedCards = useMemo(
    () =>
      pokemon
        .filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()))
        .slice(0, 20),
    [search]
  );

  const onSelect = useCallback(
    (id: number) => {
      history.push(`/pokemon-comparison/compare/${id}`);
    },
    [history]
  );

  return (
    <div>
      <TextField
        value={search}
        onChange={(evt) => setSearch(evt.target.value)}
        variant="filled"
        fullWidth
      />
      <div>
        {displayedCards.map((pokemon) => (
          <div
            key={pokemon.id}
            onClick={() => onSelect(pokemon.id)}
            className={classes.pokemon}
          >
            {pokemon.name}
          </div>
        ))}
      </div>
    </div>
  );
}
