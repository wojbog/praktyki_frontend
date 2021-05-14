import { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import { createUser, login } from "./service";
/* components*/
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import ProtectedRoute from "./ProtectedRoute";
import Nothing from "./components/Nothing";

function App() {
    return (
        <>
            <Route exact path="/" render={() => <Nothing />} />
            <Route
                exact
                path="/rejestracja"
                render={() => <RegisterForm createUser={createUser} />}
            />
            <Route
                exact
                path="/logowanie"
                render={() => <LoginForm login={login} />}
            />
            <ProtectedRoute exact path="/app" component={Nothing} />
        </>
    );
}

export default App;
