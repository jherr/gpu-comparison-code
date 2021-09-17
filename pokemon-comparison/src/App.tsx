import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "@material-ui/core";

import { HomePage } from "./components/HomePage";
import { SyntheticPage } from "./components/SyntheticPage";
import { PokemonComparisonPage } from "./components/PokemonComparisonPage";

function App() {
  return (
    <Container>
      <Switch>
        <Route path="/pokemon-comparison/compare/:id">
          <PokemonComparisonPage />
        </Route>
        <Route path="/pokemon-comparison/synthetic" exact>
          <SyntheticPage />
        </Route>
        <Route path="/pokemon-comparison/" exact>
          <HomePage />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
