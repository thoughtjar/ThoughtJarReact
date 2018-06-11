import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AboutUs from "./containers/AboutUs";
import Alligator from "./containers/Alligator";
import Baboon from "./containers/Baboon";
import Dynamik from "./containers/Dynamik";
import MyJars from "./containers/MyJars";
import MyJar from "./containers/MyJar";
import FillJars from "./containers/FillJars";
import FillJar from "./containers/FillJar";

export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/login" exact component={Login} />
    <Route path="/template/alligator" exact component={Alligator} />
    <Route path="/template/baboon" exact component={Baboon} />
    <Route path="/template/dynamik" exact component={Dynamik} />
    <Route path="/myjars" exact component={MyJars} />
    <Route path="/myjar" exact component={MyJar} />
    <Route path="/filljars" exact component={FillJars} />
    <Route path="/filljar" exact component={FillJar} />
    <Route path="/aboutus" exact component={AboutUs} />
    <Route component={NotFound} />
  </Switch>;
