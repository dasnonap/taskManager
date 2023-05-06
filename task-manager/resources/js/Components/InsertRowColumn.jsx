import React from "react";
import PrimaryButton from "./PrimaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { PopupContext } from "./PopupContext";
import TextInput from "./TextInput";
import InputLabel from "./InputLabel";
import { useForm } from "@inertiajs/react";

export default function InsertColumn({ className }) {
    const { popupInfo, setIsPopupDisplaying } = useContext(PopupContext);
    const isPopupDisplaying =
        typeof popupInfo !== "undefined" ? popupInfo.isDisplaying : false;
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        position: 1,
    });
    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const handleRowInsert = (event) => {
        event.preventDefault();

        post(
            route("row.create", {
                onSuccess: () => {
                    reset("title");
                },
            })
        );
    };

    return (
        <div className={className}>
            <PrimaryButton
                onClick={(e) => {
                    e.preventDefault();
                    setIsPopupDisplaying({
                        isDisplaying: !isPopupDisplaying,
                        type: "columns",
                    });
                }}
                type="button"
            >
                Create column
            </PrimaryButton>

            <div
                className={
                    `popup border border-1 rounded-md p-8 m-8 bg-white flex my-6 mx-auto flex-col items-center fixed h-fit inset-0 w-1/2 transition-all overflow-auto` +
                    (isPopupDisplaying === true && popupInfo.type === "columns"
                        ? ` visible opacity-100 `
                        : ` invisible opacity-0`)
                }
            >
                <div className="mb-4 flex justify-content-center">
                    <div></div>

                    <h3 className="font-extrabold text-4xl">Create Column</h3>

                    <PrimaryButton
                        onClick={(e) => {
                            e.preventDefault();
                            setIsPopupDisplaying({
                                isDisplaying: !isPopupDisplaying,
                                type: "",
                            });
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

                <form onSubmit={handleRowInsert} className="w-full">
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col w-full">
                            <InputLabel
                                for="title"
                                value="Title"
                                className="text-l font-bold tracking-wide"
                            />

                            <TextInput
                                id="title"
                                required={true}
                                type="text"
                                name="title"
                                value={data.name}
                                className="mt-1 block w-full"
                                handleChange={onHandleChange}
                            />
                        </div>

                        <div className="flex flex-col w-full">
                            <InputLabel
                                for="position"
                                value="Position"
                                className="text-l font-bold tracking-wide"
                            />

                            <TextInput
                                id="position"
                                required={true}
                                type="number"
                                name="position"
                                value={data.position}
                                className="mt-1 block w-full"
                                handleChange={onHandleChange}
                            />
                        </div>
                    </div>

                    <PrimaryButton className="mt-6" processing={processing}>
                        Add New
                    </PrimaryButton>
                </form>
            </div>
        </div>
    );
}
