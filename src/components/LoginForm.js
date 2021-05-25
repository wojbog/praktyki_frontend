import { useState } from "react";
import { useTransition, animated } from "react-spring";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { login } from "../service.js";
import { isEmail } from "validator";
import Input from "./Input";

const LoginForm = () => {
    const [isResponseError, setIsResponseError] = useState(false); //true if login returns an error
    const [responseError, setResponseError] = useState(false); //contains displayed message of response error
    const responseErrorAnimation = useTransition(isResponseError, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 300 },
    });

    let history = useHistory();

    const onSubmit =async (data) => {
        const error = await login(data);
        if (!error.success) {
            switch (error.error) {
                case "incorrect password or email": {
                    setIsResponseError(true);
                    setResponseError(
                        "E-mail lub hasło nie zgadzają się. Spróbuj ponownie"
                    );
                    break;
                }
                default: {
                    setIsResponseError(true);
                    setResponseError(
                        "Ups, coś poszło nie tak. Spróbuj ponownie później"
                    );
                    break;
                }
            }
        } else {
            history.push("/animals");
        }
    };

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm({ mode: "onBlur" });

    return (
        <div className="form-container">
            <form
                id="login-form"
                className="form"
                onSubmit={handleSubmit(onSubmit)}
                data-testid="login-form"
            >
                <h1>Logowanie</h1>
                <Input
                    id="email"
                    className="login-input"
                    name="email"
                    placeholder="E-mail"
                    register={register("email", {
                        required: {
                            value: true,
                            message: "To pole nie może być puste!",
                        },
                        validate: (input) =>
                            isEmail(input) || "To nie jest poprawny e-mail!",
                    })}
                    isError={errors.email}
                    invMsgDirection="left"
                />

                <Input
                    id="pass"
                    className="login-input"
                    name="pass"
                    type="password"
                    placeholder="Hasło"
                    register={register("pass", {
                        required: {
                            value: true,
                            message: "To pole nie może być puste!",
                        },
                    })}
                    isError={errors.pass}
                    invMsgDirection="left"
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
    );
};

export default LoginForm;
