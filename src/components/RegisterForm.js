import {useState} from 'react'
import {validate, validatePass} from "../validation"
import axios from 'axios'


const RegisterForm = () => {

    const [user, setUser] = useState({
        "name": "Adam",
	    "surname":"Mir",
	    "email": ".adam.zez@wp.pl",
	    "street": "Bosa",
	    "number": "23",
	    "city":"Poznań",
	    "post_code": "60-125",
	    "pass": ""
    })

    const [passDiff, setPassDiff] = useState(false)
    const [passStr, setPassStr] = useState(true)
    const [invalid, setInvalid] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()
        if(!passDiff &&passStr){
            
            let err = validate(user)
            // console.log(user)

            if  (err.length!==0) { //make invalid red etc.
                console.log("dup")
                setInvalid(true)
                err.forEach((id)=> {
                    let invalid = document.getElementById(id)
                    invalid.style.backgroundColor = "#ff9999"
                    invalid.onclick = (event) => {
                        event.target.style.backgroundColor = ""
                        setInvalid(false)
                    }
                })
            }else {

            axios.post("https://localhost:3001/registration",
                    {"user": user},
                    {wihCredentials:true},
            ).then(response=>{console.log("registration res: ", response)}
            ).catch(error => {console.log("registration error: ", error)})

            }
        }
           
    }


    return (  
        <form id="register-form" onSubmit={event=>{handleSubmit(event)}}>
            <div className="input-holder">
                    <input id="name" type="text" 
                        placeholder="Imię" value={user.name} 
                        onChange={event => setUser({...user, name: event.target.value})} required/>
                    <input id="surname" type="text" 
                        placeholder="Nazwisko" value={user.surname} 
                        onChange={event => setUser({...user, surname: event.target.value})} required/> 
            </div>

            <input id="email" type="text" 
                placeholder="E-mail" value={user.email} 
                onChange={event => setUser({...user, email: event.target.value})} required/>
            
            <div className="input-holder">
                <input id="street" type="text" placeholder="Ulica" 
                    value={user.street} onChange={event => setUser({...user, street: event.target.value})} required/>

                <input id="number" type="text" placeholder="Numer" 
                    value={user.number} onChange={event => setUser({...user, number: event.target.value})} required/>
                
                <input id="city" type="text" placeholder="Miasto"
                    value={user.city} onChange={event => setUser({...user, city: event.target.value})} required/>

                <input id="post_code" type="text" placeholder="Kod pocztowy"
                    value={user.post_code} onChange={event => setUser({...user, post_code: event.target.value})} required/>

            </div>
            
            <input id="pass" type="password" placeholder="Hasło"
                value={user.pass} onChange={event => {
                        setUser({...user, pass: event.target.value})
                        validatePass(event.target.value) ? setPassStr(true):setPassStr(false)
                }} required/>           
            {!passStr && <p className="invalid">Hasło jest za słabe!</p>}
            
            
            <input id="pass-confirmation" type="password" placeholder="Powtórz hasło" 
                onChange={event => {
                    event.target.value!==user.pass ? setPassDiff(true) : setPassDiff(false)}
                 } required/>
            
            {passDiff && <p className="invalid">Hasła się nie zgadzają!</p>}
            {invalid && <p className="invalid">Jedno lub więcej pól jest niepoprawnych!</p>}
            
            <input type="submit" form="register-form"  id="register-submit"  className="submit" 
                value="Zarejestruj się!"/>
        </form>        

    )
}

export default RegisterForm
