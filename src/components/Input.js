import { useTransition, animated } from "react-spring";

const Input = ({
    id,
    name,
    placeholder,
    className = "",
    type = "text",
    register,
    isError,
    invMsgDirection,
}) => {
    const transition = useTransition(isError, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        config: { duration: 600 },
    });

    return (
        <div className="holder">
            <input
                id={id}
                name={name}
                className={`form-input ${className} ${
                    isError ? "invalid-input" : ""
                }`}
                {...register}
                type={type}
                placeholder={placeholder}
                data-testid={name}
            />
            {transition((style, item) =>
                item ? (
                    <animated.div
                        style={style}
                        className={`invalid-message invalid-message-${invMsgDirection}`}
                        data-testid="invalid-msg"
                    >
                        {isError.message}
                    </animated.div>
                ) : (
                    ""
                )
            )}
        </div>
    );
};

export default Input;
