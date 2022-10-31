import React from "react";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Index from "./router/Index"
import Register from "./router/Register"

import Home from "./router/Home"
import Book from "./router/Book"
import Profile from "./router/Profile"

import Staff_Home from "./router/Staff_Home"
import Staff_Book from "./router/Staff_Book"
import Staff_Profile from "./router/Staff_Profile"

export default function App() {
  return (
    <Router>
        <Switch>
          <Route path="/staffProfile">
            <Staff_Profile />
          </Route>
          <Route path="/staffBook">
            <Staff_Book />
          </Route>
          <Route path="/staffHome">
            <Staff_Home />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/book">
            <Book />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Index />
          </Route>
        </Switch>
    </Router>
  );
}