import { useTransition, animated } from "react-spring";

const Input = ({
    id,
    className,
    placeholder,
    type = "text",
    value,
    isValid,
    setIsValid,
    user,
    setUser,
    invMsg,
    invMsgDirection,
    onChange,
    required = true,
}) => {
    const transition = useTransition(!isValid[`${id}`], {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 600 },
    });

    return (
        <div className="holder">
            <input
                id={id}
                type={type}
                className={`form-input ${className} ${
                    isValid[`${id}`] ? "" : "invalid-input"
                }`}
                placeholder={placeholder}
                value={value === undefined ? user[`${id}`] : value}
                onChange={
                    onChange == undefined
                        ? (event) =>
                              setUser({
                                  ...user,
                                  [`${id}`]: event.target.value,
                              })
                        : onChange
                }
                data-testid={`${id}`}
                onMouseDown={(event) => setIsValid({ ...isValid, [id]: true })}
                required={required}
            />

            {transition((style, item) =>
                item ? (
                    <animated.div
                        style={style}
                        className={`invalid-message invalid-message-${invMsgDirection}`}
                        data-testid="invalid-msg"
                        onMouseDown={(event) =>
                            setIsValid({ ...isValid, [id]: true })
                        }
                    >
                        {invMsg}
                    </animated.div>
                ) : (
                    ""
                )
            )}
        </div>
    );
};

export default Input;
