import React, { forwardRef, useRef } from "react";

export default forwardRef(function SelectInput(
    { className, options, name, id, onChange, isMulti },
    ref
) {
    if (!options || !options.length) return;
    const select = ref ? ref : useRef();

    return (
        <div className={className}>
            <select name={name} id={id} onChange={onChange} multiple={isMulti}>
                {options.map((option) => {
                    return (
                        <option
                            value={option.id}
                            key={Math.random().toString()}
                        >
                            {option.name}
                        </option>
                    );
                })}
            </select>
        </div>
    );
});
