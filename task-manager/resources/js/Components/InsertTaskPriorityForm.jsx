import React from "react";
import PrimaryButton from "./PrimaryButton";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import { useForm } from "@inertiajs/react";
import axios from "axios";

export default function InsertTaskPriorityForm({ className }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        color: "",
    });

    const handleFormSubmit = (e) => {
        e.preventDefault();

        axios
            .post(route("priority.create"), data)
            .then((response) => {
                reset("name", "color");
            })
            .catch(function (error) {});
    };

    const handleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };
    return (
        <div className={className}>
            <form onSubmit={handleFormSubmit}>
                <div className="col">
                    <div className="flex gap-8 mb-5">
                        <div className="w-1/2">
                            <InputLabel
                                for="name"
                                value="Priority Name"
                                className="text-l font-bold tracking-wide"
                            />

                            <TextInput
                                required={true}
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                handleChange={handleChange}
                            />
                        </div>

                        <div className="w-1/2">
                            <InputLabel
                                for="color"
                                value="Priority Color"
                                className="text-l font-bold tracking-wide"
                            />

                            <TextInput
                                required={true}
                                id="color"
                                type="color"
                                name="color"
                                value={data.color}
                                className="mt-1 block"
                                handleChange={handleChange}
                            />
                        </div>
                    </div>

                    <PrimaryButton type="submit">Submit</PrimaryButton>
                </div>
            </form>
        </div>
    );
}
