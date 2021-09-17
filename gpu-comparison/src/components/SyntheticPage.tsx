import React, { useState, useMemo } from "react";
import { makeStyles, Slider, Grid } from "@material-ui/core";
import clsx from "clsx";
import { useSwipeable } from "react-swipeable";

import type { GPU } from "../gpus";
import { gpus, TITLES, COMPARISON_KEYS } from "../gpus";
import { getRecommendations } from "../lib/recommender";
import { fmtMoney } from "../lib/utilities";

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
    [key]: Math.min(...gpus.map((gpu) => gpu[key] as number)),
  }),
  {}
);
const max: Record<string, number> = COMPARISON_KEYS.reduce(
  (acc, key) => ({
    ...acc,
    [key]: Math.max(...gpus.map((gpu) => gpu[key] as number)),
  }),
  {}
);

export const SyntheticPage: React.FunctionComponent = () => {
  const classes = useStyles();
  const [recIndex, setRecIndex] = useState<number>(0);
  const [syntheticGPU, setSyntheticGPU] = useState<GPU>({
    id: 0,
    name: "Synthetic GPU",
    price: 0,
    g2d: min.g2d,
    dx9: min.dx9,
    dx10: min.dx10,
    dx11: min.dx11,
    dx12: min.dx12,
    overallSpeed: min.overallSpeed,
    pricePerG3D: 0,
  });

  const recommendations = useMemo(
    () => getRecommendations(syntheticGPU),
    [syntheticGPU]
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
        <h1>Synthetic GPU</h1>
        {COMPARISON_KEYS.map((key) => (
          <Grid container spacing={2} key={key}>
            <Grid item xs={3}>
              {TITLES[key]}
            </Grid>
            <Grid item xs={9}>
              <Slider
                value={syntheticGPU[key] as number}
                valueLabelDisplay="auto"
                min={min[key]}
                max={max[key]}
                onChange={(_, value) =>
                  setSyntheticGPU({
                    ...syntheticGPU,
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
          <div className={classes.rowItem}>Price</div>
          <div className={classes.rowItem}>
            {recommendations?.[recIndex]?.price &&
              fmtMoney(recommendations[recIndex]?.price ?? 0)}
          </div>
        </div>
      </div>
    </div>
  );
};
