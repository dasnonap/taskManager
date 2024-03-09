import React from "react";
import PrimaryButton from "./PrimaryButton";
import TextInput from "./TextInput";
import InputLabel from "./InputLabel";
import Popup from "./Popup";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

export default function InsertColumn({ className }) {
    const queryClient = useQueryClient();
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

    const handleRowInsert = async (event) => {
        event.preventDefault();

        await axios
            .post(route("rows.create"), new FormData(event.target))
            .then(function (response) {
                reset("title");
                queryClient.invalidateQueries("tasks");
            })
            .catch(function (error) {
                console.log(error.response);
            });
    };

    return (
        <div className={className}>
            <Popup openPopupButton={"Create Column"}>
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
            </Popup>
        </div>
    );
}
