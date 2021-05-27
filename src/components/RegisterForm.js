import { useState } from "react";
import { useTransition, animated } from "react-spring";
import { useForm } from "react-hook-form";
import { createUser, isPostCode, isAddressNumber } from "../service";
import { isEmail, isStrongPassword, isAlpha, isAlphanumeric } from "validator";
import Input from "./Input";

const RegisterForm = () => {
    const [success, setSuccess] = useState(false); //true if registration was success
    const [isResponseError, setIsResponseError] = useState(false); //true if createUser returns an error
    const [responseError, setResponseError] = useState(false); //contains displayed message of response error

    const responseErrorAnimation = useTransition(isResponseError, {
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

    const onSubmit = async (data) => {
        delete data.pass_confirmation;
        const error = await createUser(data);
        if (error.success) {
            setSuccess(true);
        } else {
            switch (error.error) {
                case "user exists": {
                    setIsResponseError(true);
                    setResponseError("Użytkownik o podanym E-mailu istnieje");
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
        }
    };

    return (
        <div className="form-container">
            {!success ? (
                <form
                    id="register-form"
                    className="form"
                    onSubmit={handleSubmit(onSubmit)}
                    onClick={() => setIsResponseError(false)}
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
                                {responseError}
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
                    <a href="/logowanie">Przejdź do serwisu logowania</a>
                </div>
            )}
        </div>
    );
};

export default RegisterForm;
