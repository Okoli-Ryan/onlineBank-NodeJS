import React, { useReducer, useMemo } from "react";
import Header from "./components/header";
import { AnimatePresence } from "framer-motion";
import { Route, Switch, useLocation } from "react-router-dom";
import Signup from "./routes/signup";
import Login from "./routes/login";
import Verification from "./routes/Verification";
import UserHome from "./routes/userHome";
import SetupPin from "./routes/setUpPin";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  const loc = useLocation();

  return (
    <Provider store={store}>
      <Header />
      <div className="body">
        <AnimatePresence exitBeforeEnter>
          <Switch location={loc} key={loc.key}>
            <Route path="/" exact component={UserHome} />

            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route
              path="/verify/:vId/:vSecret"
              exact
              component={Verification}
            />
            <Route path="/setupPin" exact component={SetupPin} />
          </Switch>
        </AnimatePresence>
      </div>
    </Provider>
  );
}

export default App;
