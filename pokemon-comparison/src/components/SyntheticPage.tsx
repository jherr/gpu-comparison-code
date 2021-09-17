import React, { useState, useMemo } from "react";
import { makeStyles, Slider, Grid } from "@material-ui/core";
import clsx from "clsx";
import { useSwipeable } from "react-swipeable";

import type { Pokemon } from "../pokemon";
import { pokemon, TITLES, COMPARISON_KEYS } from "../pokemon";
import { getRecommendations } from "../lib/recommender";

const useStyles = makeStyles({
  downArrow: {
    color: "red",
  },
  upArrow: {
    color: "green",
  },
  arrow: {
    marginTop: 5,
  },
  comparisonChart: {
    marginTop: "1rem",
    display: "grid",
    gridTemplateColumns: "30% 70%",
  },
  rowItem: {
    lineHeight: "2rem",
  },
  productHeader: {
    borderBottom: "1px solid #ccc",
    fontWeight: "bold",
  },
});

const min: Record<string, number> = COMPARISON_KEYS.reduce(
  (acc, key) => ({
    ...acc,
    [key]: Math.min(...pokemon.map((p) => p[key] as number)),
  }),
  {}
);
const max: Record<string, number> = COMPARISON_KEYS.reduce(
  (acc, key) => ({
    ...acc,
    [key]: Math.max(...pokemon.map((p) => p[key] as number)),
  }),
  {}
);

export const SyntheticPage: React.FunctionComponent = () => {
  const classes = useStyles();
  const [recIndex, setRecIndex] = useState<number>(0);
  const [syntheticPokemon, setSyntheticPokemon] = useState<Pokemon>({
    id: 0,
    name: "Synthetic Pokemon",
    type: [],
    hp: min.hp,
    attack: min.attack,
    defense: min.defense,
    special_attack: min.special_attack,
    special_defense: min.special_defense,
    speed: min.speed,
  });

  const recommendations = useMemo(
    () => getRecommendations(syntheticPokemon),
    [syntheticPokemon]
  );

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setRecIndex((recIndex + 1) % recommendations.length);
    },
    onSwipedRight: () => {
      setRecIndex(recIndex > 0 ? recIndex - 1 : recommendations.length - 1);
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
    trackTouch: true,
  });

  return (
    <div>
      <div>
        <h1>Synthetic Pokemon</h1>
        {COMPARISON_KEYS.map((key) => (
          <Grid container spacing={2} key={key}>
            <Grid item xs={3}>
              {TITLES[key]}
            </Grid>
            <Grid item xs={9}>
              <Slider
                value={syntheticPokemon[key] as number}
                valueLabelDisplay="auto"
                min={min[key]}
                max={max[key]}
                onChange={(_, value) =>
                  setSyntheticPokemon({
                    ...syntheticPokemon,
                    [key]: value as number,
                  })
                }
              />
            </Grid>
          </Grid>
        ))}
      </div>
      <div {...handlers}>
        <div className={classes.comparisonChart}>
          <div className={classes.rowItem}></div>
          <div className={clsx(classes.rowItem, classes.productHeader)}>
            {recommendations[recIndex].name}
          </div>
          {COMPARISON_KEYS.map((key) => (
            <React.Fragment key={key}>
              <div className={classes.rowItem}>{TITLES[key]}</div>
              <div className={classes.rowItem}>
                {recommendations[recIndex][key]}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
