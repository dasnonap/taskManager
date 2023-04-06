import React from "react";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import PrimaryButton from "./PrimaryButton";
import InputLabel from "./InputLabel";
import { useForm } from "@inertiajs/react";

export default function InsertTask({ className, onInsertTask }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        description: "",
        start_at: "",
        end_at: "",
    });

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };
    return (
        <div
            className={
                `border border-1 w-1/3 p-8 m-8 bg-white flex my-6 mx-auto flex-col items-center` +
                className
            }
        >
            <div className="mb-4">
                <h3 className="font-extrabold text-4xl">Create new Task</h3>
            </div>

            <form onSubmit={onInsertTask} className="w-full">
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col w-full">
                        <InputLabel
                            for="title"
                            value="Title"
                            className="text-l font-bold tracking-wide"
                        />

                        <TextInput
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
    );
}
