import React from "react";
import { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Popup({ openPopupButton, children, externalOpen }) {
    if (!openPopupButton) return;
    const [isOpened, setIsOpened] = useState(externalOpen);

    return (
        <>
            <PrimaryButton
                onClick={(e) => {
                    e.preventDefault();
                    setIsOpened(!isOpened);
                }}
                type="button"
            >
                {openPopupButton}
            </PrimaryButton>

            <div
                className={
                    `popup border border-1 rounded-md p-8 m-8 bg-white flex my-6 mx-auto flex-col items-center fixed h-fit inset-0 w-1/2 transition-all overflow-auto` +
                    (isOpened === true ? ` block` : ` hidden`)
                }
            >
                <div className="mb-4 flex justify-content-center">
                    <div></div>

                    <h3 className="font-extrabold text-4xl">
                        {openPopupButton}
                    </h3>

                    <PrimaryButton
                        onClick={(e) => {
                            e.preventDefault();
                            setIsOpened(!isOpened);
                            console.log(isOpened);
                        }}
                        className="absolute top-8 right-5 group"
                        type="button"
                    >
                        <FontAwesomeIcon
                            icon="fa-solid fa-xmark"
                            className="transition-all group-hover:rotate-45"
                        />
                    </PrimaryButton>
                </div>
                {children}
            </div>
        </>
    );
}
