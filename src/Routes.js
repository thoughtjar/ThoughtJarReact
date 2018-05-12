import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import AboutUs from "./containers/AboutUs";
import Alligator from "./containers/Alligator";
import Baboon from "./containers/Baboon";
import Dynamik from "./containers/Dynamik";

export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/login" exact component={Login} />
    <Route path="/signup" exact component={Signup} />
    <Route path="/template/alligator" exact component={Alligator} />
    <Route path="/template/baboon" exact component={Baboon} />
    <Route path="/template/dynamik" exact component={Dynamik} />
    <Route path="/aboutus" exact component={AboutUs} />
    <Route component={NotFound} />
  </Switch>;
