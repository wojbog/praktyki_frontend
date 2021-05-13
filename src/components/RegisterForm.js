import { useState } from "react";
import { useTransition, animated } from "react-spring";
import { validateUser, validatePass } from "../service";
import Input from "./Input";

const RegisterForm = ({ createUser }) => {
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    street: "",
    number: "",
    city: "",
    post_code: "",
    pass: "",
  });

  const [passDiff, setPassDiff] = useState(false); //true if "pass" and "pass-confirmation" are not equal
  const passDiffAnimation = useTransition(passDiff, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 300 },
  });

  const [passStr, setPassStr] = useState(true); //true if password is strong enough
  const passStrAnimation = useTransition(!passStr, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 300 },
  });

  const [invalid, setInvalid] = useState(false); //true if after submiting at least one field is invalid
  const invalidAnimation = useTransition(invalid, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 300 },
  });

  const [passConf, setPassConf] = useState(""); //contains pass_confirmation value

  const [isValid, setIsValid] = useState({
    name: true,
    surname: true,
    email: true,
    street: true,
    number: true,
    city: true,
    post_code: true,
    pass: true,
    pass_confirmation: true,
  });

  const [success, setSuccess] = useState(false); //true if registration was success
  const [responseError, setResponseError] = useState(false); //true if createUser returns an error

  const responseErrorAnimation = useTransition(responseError, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 300 },
  });

  /** Go through validation process. If passed calls createUser function.
   * with response error shows response-error message
   * with success shows registration-end message*/
  const handleSubmit = (event) => {
    event.preventDefault();
    setInvalid(false);

    if (!passDiff && passStr) {
      const err = validateUser(user); //err is an array of invalids user keys
      if (err.length !== 0) {
        //make invalid fields red and pop info under form
        setInvalid(true);
        setIsValid({
          ...err.reduce((res, item) => {
            //change all invalid keys to false
            res[item] = false;
            return res;
          }, isValid),
        });
      } else {
        const error = createUser(user);

        if (error === null) {
          setSuccess(true);
        } else {
          console.log(error);
          setResponseError(true);
        }
      }
    }
  };

  return (
    <div className="form-container">
      {!success ? (
        <form id="register-form" className="form" onSubmit={handleSubmit}>
          <h1>Rejestracja</h1>
          <div className="input-holder">
            <Input
              id="name"
              placeholder="Imię"
              isValid={isValid}
              setIsValid={setIsValid}
              user={user}
              setUser={setUser}
              invMsg="Wpisz prawidłowe imię!"
              invMsgDirection="left"
            />

            <Input
              id="surname"
              placeholder="Nazwisko"
              isValid={isValid}
              setIsValid={setIsValid}
              user={user}
              setUser={setUser}
              invMsg="Wpisz prawidłowe nazwisko!"
              invMsgDirection="right"
            />
          </div>

          <Input
            id="email"
            className="register-wide-input"
            placeholder="E-mail"
            isValid={isValid}
            setIsValid={setIsValid}
            user={user}
            setUser={setUser}
            invMsg="E-mail jest nieprawidłowy!"
            invMsgDirection="left"
          />

          <div className="input-holder">
            <Input
              id="street"
              placeholder="Ulica"
              isValid={isValid}
              setIsValid={setIsValid}
              user={user}
              setUser={setUser}
              invMsg="Ulica jest nieprawidłowa!"
              invMsgDirection="left"
            />

            <Input
              id="number"
              placeholder="Numer"
              isValid={isValid}
              setIsValid={setIsValid}
              user={user}
              setUser={setUser}
              invMsg="Numer jest nieprawidłowy!"
              invMsgDirection="right"
            />

            <Input
              id="city"
              placeholder="Miasto"
              isValid={isValid}
              setIsValid={setIsValid}
              user={user}
              setUser={setUser}
              invMsg="Nazwa miasta jest nieprawidłowa!"
              invMsgDirection="left"
            />

            <Input
              id="post_code"
              placeholder="Kod pocztowy"
              isValid={isValid}
              setIsValid={setIsValid}
              user={user}
              setUser={setUser}
              invMsg="Kod pocztowy musi być w formacie: __-___"
              invMsgDirection="right"
            />
          </div>

          <Input
            id="pass"
            placeholder="Hasło"
            type="password"
            className="register-wide-input"
            isValid={isValid}
            setIsValid={setIsValid}
            user={user}
            setUser={setUser}
            invMsg=""
            invMsgDirection="left"
            onChange={(event) => {
              setUser({ ...user, pass: event.target.value });
              validatePass(event.target.value)
                ? setPassStr(true)
                : setPassStr(false);
              passConf === event.target.value && setPassDiff(false);
            }}
          />

          {passStrAnimation((style, item) =>
            item ? (
              <animated.p
                style={style}
                className="invalid-footage"
                data-testid="invalid-msg"
              >
                Hasło jest za słabe!
              </animated.p>
            ) : (
              ""
            )
          )}

          <Input
            id="pass_confirmation"
            placeholder="Potwierdź hasło"
            type="password"
            className="register-wide-input"
            value={passConf}
            isValid={isValid}
            setIsValid={setIsValid}
            invMsg=""
            invMsgDirection="left"
            onChange={(event) => {
              setPassConf(event.target.value);
              event.target.value !== user.pass
                ? setPassDiff(true)
                : setPassDiff(false);
            }}
          />

          {passDiffAnimation((style, item) =>
            item ? (
              <animated.p
                style={style}
                className="invalid-footage"
                data-testid="invalid-msg"
              >
                Hasła się nie zgadzają!
              </animated.p>
            ) : (
              ""
            )
          )}

          {invalidAnimation((style, item) =>
            item ? (
              <animated.p
                style={style}
                className="invalid-footage"
                data-testid="invalid-msg"
              >
                Jedno lub więcej pól jest nieprawidłowych!
              </animated.p>
            ) : (
              ""
            )
          )}

          {responseErrorAnimation((style, item) =>
            item ? (
              <animated.p
                style={style}
                className="invalid-footage"
                data-testid="invalid-msg"
              >
                Coś poszło nie tak, spróbuj ponownie później
              </animated.p>
            ) : (
              ""
            )
          )}

          <input
            type="submit"
            form="register-form"
            id="register-submit"
            className="submit"
            value="Zarejestruj się!"
          />
        </form>
      ) : (
        <div>
          <h2 data-testid="registration-succeed">Rejestracja zakończona!</h2>
          <a href="#">Przejdź do serwisu</a>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
