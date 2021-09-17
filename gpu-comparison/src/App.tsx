import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "@material-ui/core";

import { HomePage } from "./components/HomePage";
import { GPUComparisonPage } from "./components/GPUComparisonPage";
import { SyntheticPage } from "./components/SyntheticPage";

function App() {
  return (
    <Container>
      <Switch>
        <Route path="/gpu-comparison/compare/:id">
          <GPUComparisonPage />
        </Route>
        <Route path="/gpu-comparison/synthetic">
          <SyntheticPage />
        </Route>
        <Route path="/gpu-comparison/" exact>
          <HomePage />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
