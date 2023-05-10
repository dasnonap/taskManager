import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { PopupContext } from "@/Components/PopupContext";
import TasksListing from "@/Components/TasksListing";

export default function Dashboard({ auth, errors }) {
    const [popupInfo, setIsPopupDisplaying] = useState({
        isDisplaying: false,
        type: "",
    });

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <PopupContext.Provider value={{ popupInfo, setIsPopupDisplaying }}>
                <div
                    className={
                        popupInfo.isDisplaying === true
                            ? `body-test popup-active`
                            : `body-test`
                    }
                >
                    <Head title="Dashboard" />

                    <TasksListing />
                </div>
            </PopupContext.Provider>
        </AuthenticatedLayout>
    );
}
