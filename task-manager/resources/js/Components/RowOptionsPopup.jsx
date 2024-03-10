import React from "react";
import Popup from "./Popup";
import TextInput from "./TextInput";
import { useForm } from "@inertiajs/react";
import InputLabel from "./InputLabel";
import PrimaryButton from "./PrimaryButton";
import SelectInput from "./SelectInput";
import { useState } from "react";
import { useContext } from "react";
import { RowsContext } from "../Contexts/RowsContext";

export default function RowOptionsPopup({
    className,
    rowTitle,
    rowId,
    hasItems,
    onRowDeleted,
    onRowUpdated,
}) {
    const [openRowsChoiceForm, setOpenRowsChoiceForm] = useState(false);
    const allRows = useContext(RowsContext)
        .filter((row) => {
            return row.id != rowId;
        })
        .map((row) => {
            return {
                id: row.id,
                name: row.title,
            };
        });
    const { data, setData, post, processing, errors, reset } = useForm(
        "updateData",
        {
            title: rowTitle,
        }
    );
    const deleteFormOptions = useForm("deleteData", {
        destination_row_id: allRows[0].id,
    });

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };
    const onHandleChangeDeleteForm = (event) => {
        deleteFormOptions.setData(event.target.id, event.target.value);
    };

    const handleRowUpdate = (e) => {
        e.preventDefault();
        axios.post(route("rows.edit", rowId), data).then((response) => {
            onRowUpdated();
        });
    };
    const sendDeleteRowRequest = (rowId, data) => {
        if (!rowId) {
            return;
        }

        axios
            .delete(route("rows.delete", rowId), {
                data: data,
            })
            .then((response) => {
                onRowDeleted();
            });
    };

    const handleOnDeleteButtonClick = (e) => {
        e.preventDefault();

        // If row has connected tasks open dropdown form
        // else delete the row
        if (hasItems) {
            setOpenRowsChoiceForm(true);
            return;
        }

        sendDeleteRowRequest(rowId);
    };

    const handleDeleteRow = (e) => {
        e.preventDefault();
        sendDeleteRowRequest(rowId, deleteFormOptions.data);
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

                        <PrimaryButton
                            type="button"
                            className="bg-red-700 hover:bg-red-800"
                            onClick={handleOnDeleteButtonClick}
                        >
                            Delete Row
                        </PrimaryButton>
                    </div>
                </form>

                {openRowsChoiceForm && allRows ? (
                    <div className="flex justify-between w-100 mt-5">
                        <form onSubmit={handleDeleteRow}>
                            <div className="flex flex-row gap-4 items-center">
                                <InputLabel
                                    required={true}
                                    for="destination_row_id"
                                    value={"Move active tasks to:"}
                                />

                                <SelectInput
                                    options={allRows}
                                    name={"destination_row_id"}
                                    id={"destination_row_id"}
                                    selectedId={
                                        deleteFormOptions.data
                                            .destination_row_id
                                    }
                                    onChange={onHandleChangeDeleteForm}
                                />

                                <PrimaryButton type="submit">
                                    Confirm
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                ) : (
                    ""
                )}
            </Popup>
        </div>
    );
}
