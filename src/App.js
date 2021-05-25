import { Route, Switch } from "react-router-dom";

import "./App.css";
/* components*/
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import ProtectedRoute from "./ProtectedRoute";
import Nothing from "./components/Nothing";
import Animals from './components/Animals'

function App() {
    return (

        <Switch>
            <Route exact path="/" component={Nothing} />
            <Route exact path="/rejestracja" component={RegisterForm} />
            <Route exact path="/logowanie" component={LoginForm} />
            <ProtectedRoute exact path="/animals"  component={Animals}/>
        </Switch>
    );
}

export default App;
