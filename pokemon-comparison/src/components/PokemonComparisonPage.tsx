import React, { useMemo, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import { makeStyles, Button } from "@material-ui/core";

import { pokemon } from "../pokemon";
import { ComparisonChart } from "./ComparisonChart";

const useStyles = makeStyles({
  heading: {
    fontWeight: "normal",
  },
  pokemon: {
    marginTop: "0.5rem",
    fontSize: "1.2rem",
  },
});

export const PokemonComparisonPage: React.FunctionComponent = () => {
  const classes = useStyles();

  const { id } = useParams<{ id: string }>();

  const selectedPokemon = useMemo(
    () => pokemon.find(({ id: pId }) => pId === parseInt(id)),
    [id]
  );

  const history = useHistory();
  const onBack = useCallback(() => {
    history.goBack();
  }, [history]);

  if (!selectedPokemon) {
    return null;
  }

  return (
    <div>
      <h4 className={classes.heading}>
        <Button onClick={onBack} variant="text">
          &lt; Back
        </Button>
        <strong>{selectedPokemon.name}</strong>
      </h4>
      <ComparisonChart id={parseInt(id)} />
    </div>
  );
};
