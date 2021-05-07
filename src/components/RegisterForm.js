import {useState, useEffect} from 'react'
import {createUser, validate, validatePass} from "../service"

const RegisterForm = () => {

    const [user, setUser] = useState({
        "name": "",
        "surname":"",
        "email": "",
        "street": "",
        "number": "",
        "city":"",
        "post_code": "",
        "pass": ""
    })

    const [passDiff, setPassDiff] = useState(false) //true if "pass" and "pass-confirmation" are not equal
    const [passStr, setPassStr] = useState(true) //true if password is strong enough
    const [invalid, setInvalid] = useState(false) //true if after submiting at least one field is invalid

    const [passConf, setPassConf] = useState("") //contains pass_confirmation value

    const [isValid, setIsValid] = useState({
        "name": true,
        "surname":true,
        "email": true,
        "street": true,
        "number": true,
        "city": true,
        "post_code": true,
        "pass": true   
 
    })
    
    const handleSubmit = (event) => {
        event.preventDefault()
        setInvalid(false)

        if(!passDiff && passStr){
            
            const err = validate(user) //err is an array of invalids user keys
            if  (err.length!==0) { //make invalid fields red and pop info under form
                setInvalid(true)
                setIsValid( {...err.reduce((res, item, _) => { //change all invalid keys to false
                    res[item] = false
                    return res
                },isValid) } ) 

            }else {
                createUser(user)            
            }
        }
           
    }


    return (  
        <form id="register-form" onSubmit={event=>{handleSubmit(event)}}>
            <div className="input-holder" >
                    <input id="name" type="text" className={`${isValid.name?"":"invalid-input"}`}
                        placeholder="Imię" value={user.name} 
                        onChange={event => setUser({...user, name: event.target.value})}
                        onMouseDown={(event) => setIsValid({...isValid, name: true})}
                        required/>

                    <input id="surname" type="text" className={`${isValid.surname?"":"invalid-input"}`}
                        placeholder="Nazwisko" value={user.surname} 
                        onChange={event => setUser({...user, surname: event.target.value})} 
                        onMouseDown={(event) => setIsValid({...isValid, surname: true})}
                        required/> 
            </div>

            <input id="email" type="text" 
                className={`${isValid.email?"":"invalid-input"}`}
                placeholder="E-mail" value={user.email} 
                onChange={event => setUser({...user, email: event.target.value})}
                onMouseDown={(event) => setIsValid({...isValid, email: true})}
                required/>
            
            <div className="input-holder">
                <input id="street" type="text" placeholder="Ulica" 
                    className={`${isValid.street?"":"invalid-input"}`}
                    value={user.street} 
                    onChange={event => setUser({...user, street: event.target.value})}
                    onMouseDown={(event) => setIsValid({...isValid, street: true})}
                    required/>

                <input id="number" type="text" placeholder="Numer"
                    className={`${isValid.number?"":"invalid-input"}`} 
                    value={user.number} 
                    onChange={event => setUser({...user, number: event.target.value})}
                    onMouseDown={(event) => setIsValid({...isValid, number: true})}
                    required/>
                
                <input id="city" type="text" placeholder="Miasto"
                    className={`${isValid.city?"":"invalid-input"}`}
                    value={user.city} 
                    onChange={event => setUser({...user, city: event.target.value})}
                    onMouseDown={(event) => setIsValid({...isValid, city: true})}
                    required/>

                <input id="post_code" type="text" placeholder="Kod pocztowy"
                    className={`${isValid.post_code?"":"invalid-input"}`}
                    value={user.post_code} 
                    onChange={event => setUser({...user, post_code: event.target.value})} 
                    onMouseDown={(event) => setIsValid({...isValid, post_code: true})}
                    required/>

            </div>
            
            <input id="pass" type="password" placeholder="Hasło"
                className={`${isValid.pass?"":"invalid-input"}`}
                value={user.pass} 
                onChange={event => {
                        setUser({...user, pass: event.target.value})
                        validatePass(event.target.value) ? setPassStr(true):setPassStr(false)
                        passConf===event.target.value  && setPassDiff(false)
                }} required/>           
            {!passStr && <p className="invalid">Hasło jest za słabe!</p>}
            
            
            <input id="pass-confirmation" type="password" placeholder="Powtórz hasło" 
                value = {passConf} onChange={event => {
                    setPassConf(event.target.value)
                    event.target.value!==user.pass ? setPassDiff(true) : setPassDiff(false)}
                 } required/>
            
            {passDiff && <p className="invalid">Hasła się nie zgadzają!</p>}
            {invalid && <p className="invalid">Jedno lub więcej pól jest nieprawidłowych!</p>}
            
            <input type="submit" form="register-form"  id="register-submit"  className="submit" 
                value="Zarejestruj się!"/>
        </form>        

    )
}

export default RegisterForm
