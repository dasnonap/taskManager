import React from "react";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import PrimaryButton from "./PrimaryButton";
import InputLabel from "./InputLabel";
import { useForm } from "@inertiajs/react";
import { useContext } from "react";
import { PopupContext } from "./PopupContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function InsertTask({ className }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        description: "",
        start_at: "",
        end_at: "",
    });
    let { isPopupDisplaying, setIsPopupDisplaying } = useContext(PopupContext);
    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const handleTaskInsert = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        post(
            route("task.create", {
                onSuccess: () =>
                    reset("title", "description", "start_at", "end_at"),
            })
        );
    };
    return (
        <div>
            <PrimaryButton
                onClick={(e) => {
                    e.preventDefault();
                    setIsPopupDisplaying(!isPopupDisplaying);
                }}
                type="button"
            >
                Create Task
            </PrimaryButton>

            <div
                className={
                    `popup border border-1 rounded-md w-1/3 p-8 m-8 bg-white flex my-6 mx-auto flex-col items-center fixed inset-0 w-1/2 transition-all overflow-auto` +
                    className +
                    (isPopupDisplaying === true
                        ? ` visible opacity-100 `
                        : ` invisible opacity-0`)
                }
            >
                <div className="mb-4 flex justify-content-center">
                    <div></div>

                    <h3 className="font-extrabold text-4xl">Create new Task</h3>

                    <PrimaryButton
                        onClick={(e) => {
                            e.preventDefault();
                            setIsPopupDisplaying(!isPopupDisplaying);
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

                <form onSubmit={handleTaskInsert} className="w-full">
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col w-full">
                            <InputLabel
                                for="title"
                                value="Title"
                                className="text-l font-bold tracking-wide"
                            />

                            <TextInput
                                required={true}
                                id="title"
                                type="text"
                                name="title"
                                value={data.title}
                                className="mt-1 block w-full"
                                handleChange={onHandleChange}
                            />
                        </div>

                        <div className="flex flex-col w-full">
                            <InputLabel
                                for="description"
                                value="Description"
                                className="text-l font-bold tracking-wide"
                            />

                            <TextArea
                                name="description"
                                id="description"
                                cols="20"
                                rows="10"
                                className="mt-1 block w-full"
                                handleChange={onHandleChange}
                                value={data.description}
                            />
                        </div>

                        <div className="flex flex-col w-full">
                            <InputLabel
                                for="start_at"
                                value="Choose starting date"
                                className="text-l font-bold tracking-wide"
                            />

                            <input
                                required={true}
                                type="date"
                                id="start_at"
                                name="start_at"
                                onChange={onHandleChange}
                            />
                        </div>

                        <div className="flex flex-col w-full">
                            <InputLabel
                                for="end_at"
                                value="Choose ending date"
                                className="text-l font-bold tracking-wide"
                            />

                            <input
                                required={true}
                                type="date"
                                id="end_at"
                                name="end_at"
                                onChange={onHandleChange}
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
