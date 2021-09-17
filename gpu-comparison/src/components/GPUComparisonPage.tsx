import React, { useMemo, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import { makeStyles, Button } from "@material-ui/core";

import { gpus } from "../gpus";
import { ComparisonChart } from "./ComparisonChart";

const useStyles = makeStyles({
  heading: {
    fontWeight: "normal",
  },
  gpu: {
    marginTop: "0.5rem",
    fontSize: "1.2rem",
  },
});

export const GPUComparisonPage: React.FunctionComponent = () => {
  const classes = useStyles();

  const { id } = useParams<{ id: string }>();

  const selectedGPU = useMemo(
    () => gpus.find(({ id: gpuId }) => gpuId === parseInt(id)),
    [id]
  );

  const history = useHistory();
  const onBack = useCallback(() => {
    history.goBack();
  }, [history]);

  if (!selectedGPU) {
    return null;
  }

  return (
    <div>
      <h4 className={classes.heading}>
        <Button onClick={onBack} variant="text">
          &lt; Back
        </Button>
        <strong>{selectedGPU.name}</strong>
      </h4>
      <ComparisonChart id={parseInt(id)} />
    </div>
  );
};
