import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo";
import Home from "./Home";

function App() {
  return (
    <Router>
      <Switch>
        <ApolloProvider client={client}>
          <Route path="/" exact component={Home} />
        </ApolloProvider>
      </Switch>
    </Router>
  );
}

export default App;
