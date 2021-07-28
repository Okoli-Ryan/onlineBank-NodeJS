import React, { useReducer, useMemo } from "react";
import Header from "./components/header";
import { AnimatePresence } from "framer-motion";
import { Route, Switch, useLocation } from "react-router-dom";
import Signup from "./routes/signup";
import Login from "./routes/login";
import Verification from "./routes/Verification";
import UserHome from "./routes/userHome";
import SetupPin from "./routes/setUpPin";
import { UserContext, reducer } from "./context";

function App() {
  const loc = useLocation();

  const [userState, userDispatch] = useReducer(reducer, {});

  const userValue = useMemo(() => {
    return { userState, userDispatch };
  }, [userState, userDispatch]);

  return (
    <UserContext.Provider value={userValue}>
      <Header />
      <div className="body">
        <AnimatePresence exitBeforeEnter>
          <Switch location={loc} key={loc.key}>
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/verify" exact component={Verification} />
            <Route path="/setupPin" exact component={SetupPin} />
            <Route path="/" exact component={UserHome} />
          </Switch>
        </AnimatePresence>
      </div>
    </UserContext.Provider>
  );
}

export default App;
