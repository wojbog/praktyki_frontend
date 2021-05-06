import './App.css';
import './components/RegisterForm'
import { useState } from 'react'

import RegisterForm from './components/RegisterForm';



function App() {

  //const [registration, setRegistration] = useState(true)

  return (
    <div className="form-container">
      <RegisterForm />
    </div>
  );
}

export default App;
