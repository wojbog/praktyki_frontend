import { useState } from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import { createUser, login } from "./service";
/* components*/
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import ProtectedRoute from "./ProtectedRoute";
import Nothing from "./components/Nothing";

function App() {
    return (
        <Switch>
            <Route exact path="/" component={Nothing} />
            <Route exact path="/rejestracja" component={RegisterForm} />
            <Route exact path="/logowanie" component={LoginForm} />
            <ProtectedRoute path="/app" component={Nothing} />
        </Switch>
    );
}

export default App;
