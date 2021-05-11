import './App.css';
import './components/RegisterForm'
import {createUser} from "./service"

import RegisterForm from './components/RegisterForm';



function App() {

  return (
    <div className="form-container">
      <RegisterForm createUser={createUser}/>
    </div>
  );
}

export default App;
