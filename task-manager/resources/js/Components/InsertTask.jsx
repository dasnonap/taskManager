import React from "react";
import TextInput from "./TextInput";
import TextArea from "./TextArea";
import PrimaryButton from "./PrimaryButton";
import InputLabel from "./InputLabel";
import { useForm } from "@inertiajs/react";
import Popup from "./Popup";
import axios from "axios";

export default function InsertTask({ rowId, className, onInsertTask }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        description: "",
        start_at: "",
        row_id: rowId,
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

    const handleTaskInsert = (event) => {
        event.preventDefault();

        axios
            .post(route("tasks.create"), new FormData(event.target))
            .then(function (response) {
                reset("title", "description", "start_at", "end_at");
                onInsertTask();
            })
            .catch(function (error) {});
    };
    return (
        <div className={className}>
            <Popup openPopupButton={"Insert Task"}>
                <form onSubmit={handleTaskInsert} className="w-full">
                    <TextInput
                        required={true}
                        id="row_id"
                        type="number"
                        name="row_id"
                        value={data.row_id}
                        className="mt-1 block w-full"
                        handleChange={onHandleChange}
                    />

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
            </Popup>
        </div>
    );
}
