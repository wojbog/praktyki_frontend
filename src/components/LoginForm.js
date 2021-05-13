import { useState, useEffect } from "react"
import { useTransition, animated } from "react-spring"
import { Link, useHistory} from "react-router-dom"
import { login, validateEmail } from "../service.js"
import Input from "./Input"

const LoginForm = ({ login }) => {

    const [user, setUser] = useState({
        email: "",
        pass: "",
    })
    const [isValid, setIsValid] = useState({
        email: true,
        pass: true,
    })

    const [emailValidError, setEmailValidError] = useState("") //true if email pattern is invalid

    const [isResponseError, setIsResponseError] = useState(false) //true if login returns an error
    const [responseError, setResponseError] = useState(false) //contains displayed message of response error
    const responseErrorAnimation = useTransition(responseError, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 300 },
    })

    let history = useHistory()

    const handleSubmit = (event) => {
        event.preventDefault()

        if (user.email == "" || user.pass == "") {
            //some validation
            let email = true,
                pass = true
            if (user.email === "") {
                email = false
                setEmailValidError("To pole nie może być puste!")
            }
            if (user.pass === "") {
                pass = false
            }
            setIsValid({ email: email, pass: pass })
        } else if (!validateEmail(user.email)) {
            setEmailValidError("To nie jest poprawny e-mail!")
            setIsValid({ ...isValid, email: false })
        } else {
            const err = login(user) 
            if (err !== null) {
                switch (err) {
                    case "incorret password or email": {
                        setIsResponseError(true)
                        setResponseError(
                            "E-mail lub hasło nie zgadzają się. Spróbuj ponownie"
                        )
                    }
                    default: {
                        setIsResponseError(true)
                        setResponseError(
                            "Ups, coś poszło nie tak. Spróbuj ponownie później"
                        )
                        console.log(err)
                    }
                }
            } else { //redirect to /app page
                history.push("/app") 
            }
        }
    }

    return (
        <div className="form-container">
            <form
                id="login-form"
                className="form"
                onSubmit={handleSubmit}
                data-testid="login-form"
            >
                <h1>Logowanie</h1>
                <Input
                    id="email"
                    className="login-input"
                    placeholder="E-mail"
                    isValid={isValid}
                    setIsValid={setIsValid}
                    user={user}
                    setUser={setUser}
                    invMsg={emailValidError}
                    invMsgDirection="left"
                    required={false}
                />

                <Input
                    id="pass"
                    className="login-input"
                    placeholder="Hasło"
                    type="password"
                    isValid={isValid}
                    setIsValid={setIsValid}
                    user={user}
                    setUser={setUser}
                    invMsg="To pole nie może być puste!"
                    invMsgDirection="left"
                    required={false}
                />

                <input
                    type="submit"
                    form="login-form"
                    id="register-submit"
                    className="submit"
                    value="Zaloguj się"
                />

                {responseErrorAnimation((style, item) =>
                    item ? (
                        <animated.p
                            style={style}
                            className="invalid-footage"
                            data-testid="invalid-msg"
                        >
                            {responseError}
                        </animated.p>
                    ) : (
                        ""
                    )
                )}

                <Link to="#">Zapomniałem hasła</Link>
            </form>
        </div>
    )
}

export default LoginForm
