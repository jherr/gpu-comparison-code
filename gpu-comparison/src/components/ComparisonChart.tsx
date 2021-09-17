import React, { useState, useMemo, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { ArrowDropUp, ArrowDropDown } from "@material-ui/icons";
import clsx from "clsx";
import { useSwipeable } from "react-swipeable";

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
    gridTemplateColumns: "30% 35% 35%",
  },
  deltaComparison: {
    display: "flex",
    lineHeight: "2rem",
  },
  rowItem: {
    lineHeight: "2rem",
  },
  productHeader: {
    borderBottom: "1px solid #ccc",
    fontWeight: "bold",
  },
});

const ComparisonValue: React.FunctionComponent<{
  first?: number;
  second?: number;
}> = ({ first, second }) => {
  const classes = useStyles();

  if (!first) {
    return <div>{second ?? ""}</div>;
  } else if (!second) {
    return <div />;
  }
  const delta = first - second;
  return (
    <div className={classes.deltaComparison}>
      <div className={classes.arrow}>
        {delta < 0 ? (
          <ArrowDropDown className={classes.downArrow} />
        ) : (
          <ArrowDropUp className={classes.upArrow} />
        )}
      </div>
      {delta.toFixed(0)}
    </div>
  );
};

export const ComparisonChart: React.FunctionComponent<{
  id: number;
}> = ({ id }) => {
  const classes = useStyles();
  const [recIndex, setRecIndex] = useState<number>(0);

  useEffect(() => {
    setRecIndex(0);
  }, [id]);

  const selectedGPU = useMemo(
    () => gpus.find(({ id: gpuId }) => gpuId === id),
    [id]
  );

  const recommendations = useMemo(
    () => (selectedGPU ? getRecommendations(selectedGPU) : []),
    [selectedGPU]
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

  if (!selectedGPU) {
    return null;
  }

  return (
    <div {...handlers}>
      <div className={classes.comparisonChart}>
        <div className={classes.rowItem}></div>
        <div className={clsx(classes.rowItem, classes.productHeader)}>
          {selectedGPU.name}
        </div>
        <div className={clsx(classes.rowItem, classes.productHeader)}>
          {recommendations[recIndex].name}
        </div>
        {COMPARISON_KEYS.map((key) => (
          <React.Fragment key={key}>
            <div className={classes.rowItem}>{TITLES[key]}</div>
            <div className={classes.rowItem}>{selectedGPU[key]}</div>
            <ComparisonValue
              second={recommendations[recIndex][key] as number}
              first={selectedGPU[key] as number}
            />
          </React.Fragment>
        ))}
        <div className={classes.rowItem}>Price</div>
        <div className={classes.rowItem}>
          {selectedGPU?.price && fmtMoney(selectedGPU.price)}
        </div>
        <div className={classes.rowItem}>
          {recommendations?.[recIndex]?.price &&
            fmtMoney(recommendations[recIndex]?.price ?? 0)}
        </div>
      </div>
    </div>
  );
};
