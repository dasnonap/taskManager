import React from "react";
import Popup from "./Popup";
import TextInput from "./TextInput";
import { useForm } from "@inertiajs/react";
import InputLabel from "./InputLabel";
import PrimaryButton from "./PrimaryButton";

export default function RowOptionsPopup({
    className,
    rowTitle,
    rowId,
    canDelete,
    onRowDeleted,
    onRowUpdated,
}) {
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
        axios.post(route("rows.edit", rowId), data).then((response) => {
            onRowUpdated();

            console.log(response);
        });
    };

    const handleOnDeleteButtonClick = (e) => {
        e.preventDefault();

        axios.delete(route("rows.delete", rowId)).then((response) => {
            onRowDeleted();
        });
    };
    return (
        <div className={className}>
            <Popup
                iconButon={"fa-solid fa-gear"}
                openPopupButton={"Row Options"}
            >
                <form onSubmit={handleRowUpdate} className="w-full">
                    <div className="flex flex-col gap-5 mb-6">
                        <div className="flex flex-col w-full ">
                            <InputLabel
                                for="title"
                                value="Title"
                                className="text-l font-bold tracking-wide"
                            />

                            <TextInput
                                required={false}
                                id="title"
                                name="title"
                                type="text"
                                value={data.title}
                                className="mt-1 block w-full"
                                handleChange={onHandleChange}
                            />
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <PrimaryButton type="submit">Update</PrimaryButton>

                        {canDelete == true ? (
                            <PrimaryButton
                                type="button"
                                className="bg-color-danger"
                                onClick={handleOnDeleteButtonClick}
                            >
                                Delete Row
                            </PrimaryButton>
                        ) : (
                            ""
                        )}
                    </div>
                </form>
            </Popup>
        </div>
    );
}
