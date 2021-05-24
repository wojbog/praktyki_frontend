import { useState, useRef, useEffect } from "react";
import { useTransition, animated } from "react-spring";
import { useForm } from "react-hook-form";
import { createUser, isPostCode, isAddressNumber } from "../service";
import { isEmail, isStrongPassword, isAlpha, isAlphanumeric } from "validator";
import Input from "./Input";

const RegisterForm = () => {
    const [success, setSuccess] = useState(false); //true if registration was success
    const [responseError, setResponseError] = useState(false); //true if createUser returns an error

    const responseErrorAnimation = useTransition(responseError, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 300 },
    });

    const {
        handleSubmit,
        register,
        formState: { errors },
        getValues,
    } = useForm({ mode: "onBlur", reValidateMode: "onBlur" });

    const onSubmit = (data) => {
        delete data.pass_confirmation;
        const error = createUser(data);
        if (error === null) {
            setSuccess(true);
        } else {
            console.log(error);
            setResponseError(true);
        }
    };

    return (
        <div className="form-container">
            {!success ? (
                <form
                    id="register-form"
                    className="form"
                    onSubmit={handleSubmit(onSubmit)}
                    onClick={() => setResponseError(false)}
                >
                    <h1>Rejestracja</h1>
                    <div className="input-holder">
                        <Input
                            id="name"
                            name="name"
                            placeholder="Imię"
                            register={register("name", {
                                required: {
                                    value: true,
                                    message: "To pole nie może być puste!",
                                },
                                validate: (input) =>
                                    isAlpha(input, "pl-PL", { ignore: " " }) ||
                                    "Wpisz prawidłowe imię!",
                            })}
                            isError={errors.name}
                            invMsgDirection="left"
                        />
                        <Input
                            id="surname"
                            name="surname"
                            placeholder="Nazwisko"
                            register={register("surname", {
                                required: {
                                    value: true,
                                    message: "To pole nie może być puste!",
                                },
                                validate: (input) =>
                                    isAlpha(input, "pl-PL", { ignore: " " }) ||
                                    "Wpisz prawidłowe nazwisko!",
                            })}
                            isError={errors.surname}
                            invMsgDirection="right"
                        />
                    </div>
                    <Input
                        id="email"
                        name="email"
                        className="register-wide-input"
                        placeholder="E-mail"
                        register={register("email", {
                            required: {
                                value: true,
                                message: "To pole nie może być puste!",
                            },
                            validate: (input) =>
                                isEmail(input) || "E-mail jest nieprawidłowy!",
                        })}
                        isError={errors.email}
                        invMsgDirection="left"
                    />
                    <div className="input-holder">
                        <Input
                            id="street"
                            name="street"
                            placeholder="Ulica"
                            register={register("street", {
                                required: {
                                    value: true,
                                    message: "To pole nie może być puste!",
                                },
                                validate: (input) =>
                                    isAlphanumeric(input, "pl-PL", {
                                        ignore: " ",
                                    }) || "Ulica jest nieprawidłowa!",
                            })}
                            isError={errors.street}
                            invMsgDirection="left"
                        />
                        <Input
                            id="number"
                            name="number"
                            placeholder="Numer"
                            register={register("number", {
                                required: {
                                    value: true,
                                    message: "To pole nie może być puste!",
                                },
                                validate: (input) =>
                                    isAddressNumber(input) ||
                                    "Numer jest nieprawidłowy!",
                            })}
                            isError={errors.number}
                            invMsgDirection="right"
                        />
                        <Input
                            id="city"
                            name="city"
                            placeholder="Miasto"
                            register={register("city", {
                                required: {
                                    value: true,
                                    message: "To pole nie może być puste!",
                                },
                                validate: (input) =>
                                    isAlpha(input, "pl-PL", { ignore: " " }) ||
                                    "Nazwa miasta jest nieprawidłowa!",
                            })}
                            isError={errors.city}
                            invMsgDirection="left"
                        />
                        <Input
                            id="post_code"
                            name="post_code"
                            placeholder="Kod pocztowy"
                            register={register("post_code", {
                                required: {
                                    value: true,
                                    message: "To pole nie może być puste",
                                },
                                validate: (input) =>
                                    isPostCode(input) ||
                                    "Kod pocztowy musi być w formacie: __-___",
                            })}
                            isError={errors.post_code}
                            invMsgDirection="right"
                        />
                    </div>
                    <Input
                        id="pass"
                        name="pass"
                        className="register-wide-input"
                        type="password"
                        placeholder="Hasło"
                        register={register("pass", {
                            required: {
                                value: true,
                                message: "To pole nie może być puste!",
                            },
                            validate: (input) =>
                                isStrongPassword(input) ||
                                "Hasło jest za słabe!",
                        })}
                        isError={errors.pass}
                        invMsgDirection="left"
                    />
                    <Input
                        id="pass_confirmation"
                        name="pass_confirmation"
                        className="register-wide-input"
                        type="password"
                        placeholder="Potwierdź hasło"
                        register={register("pass_confirmation", {
                            required: {
                                value: true,
                                message: "To pole nie może być puste!",
                            },
                            validate: (input) =>
                                input === getValues()["pass"] ||
                                "Hasła się nie zgadzają!",
                        })}
                        isError={errors.pass_confirmation}
                        invMsgDirection="left"
                    />

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
                    <h2 data-testid="registration-succeed">
                        Rejestracja zakończona!
                    </h2>
                    <a href="#">Przejdź do serwisu</a>
                </div>
            )}
        </div>
    );
};

export default RegisterForm;
