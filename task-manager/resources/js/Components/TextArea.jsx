import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function TextArea(
    {
        name,
        id,
        placeholder,
        rows,
        cols,
        className,
        autoComplete,
        required,
        isFocused,
        handleChange,
        value,
    },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="flex flex-col items-start">
            <textarea
                name={name}
                id={id}
                cols={cols}
                rows={rows}
                value={value}
                className={
                    `border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ` +
                    className
                }
                ref={input}
                autoComplete={autoComplete}
                required={required}
                onChange={(e) => handleChange(e)}
            >
                {placeholder}
            </textarea>
        </div>
    );
});
