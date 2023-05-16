import React from "react";
import { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Popup({ openPopupButton, children, externalOpen }) {
    if (!openPopupButton) return;
    const [isOpened, setIsOpened] = useState(externalOpen);

    return (
        <div>
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
                    `fixed inset-0 bg-black/25` +
                    (isOpened === true ? ` block` : ` hidden`)
                }
            >
                <div
                    className={`popup border border-1 rounded-md p-8 m-8 bg-white flex my-6 mx-auto flex-col items-center  w-1/2 transition-all overflow-auto relative`}
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
            </div>
        </div>
    );
}
