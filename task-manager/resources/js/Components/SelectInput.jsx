import React from "react";

export default function SelectInput({ options, name, id, onChange }) {
    if (!options || !options.length) return;

    return (
        <div className="p-3">
            <select name={name} id={id} onChange={onChange}>
                {options.map((option, index) => {
                    return (
                        <option value={option.id} key={Math.random.toString()}>
                            <span style={`color:` + option.color`;`}></span>
                            {option.name}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}
