import React from "react";
import Popup from "./Popup";
import TextInput from "./TextInput";
import { useForm } from "@inertiajs/react";
import InputLabel from "./InputLabel";

export default function RowOptionsPopup({ className, rowTitle }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: rowTitle,
    });
    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };
    const handleRowUpdate = (e) => {
        e.preventDefault();
        console.log("submitting");
    };

    return (
        <div className={className}>
            <Popup
                iconButon={"fa-solid fa-gear"}
                openPopupButton={"Row Options"}
            >
                <form onSubmit={handleRowUpdate} className="w-full">
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col w-full ">
                            <InputLabel
                                for="title"
                                value="Title"
                                className="text-l font-bold tracking-wide"
                            />

                            <TextInput
                                required={"false"}
                                id="title"
                                type="text"
                                value={data.title}
                                className="mt-1 block w-full"
                                handleChange={onHandleChange}
                            />
                        </div>
                    </div>
                </form>
            </Popup>
        </div>
    );
}
