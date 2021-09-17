import React, { useState, useMemo, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { TextField, makeStyles } from "@material-ui/core";

import { gpus } from "../gpus";

const useStyles = makeStyles({
  gpu: {
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
      gpus
        .filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()))
        .slice(0, 20),
    [search]
  );

  const onSelect = useCallback(
    (id: number) => {
      history.push(`/gpu-comparison/compare/${id}`);
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
        {displayedCards.map((gpu) => (
          <div
            key={gpu.id}
            onClick={() => onSelect(gpu.id)}
            className={classes.gpu}
          >
            {gpu.name}
          </div>
        ))}
      </div>
    </div>
  );
}
