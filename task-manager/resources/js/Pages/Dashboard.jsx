import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import TaskItems from "@/Components/TaskItems";
import InsertTask from "@/Components/InsertTask";
import { PopupContext } from "@/Components/PopupContext";
import InsertColumn from "@/Components/InsertRowColumn";

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

                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col">
                        <div className="flex">
                            <InsertColumn className={"mr-1"} />

                            <InsertTask />
                        </div>

                        <TaskItems tasks={[]} />
                    </div>
                </div>
            </PopupContext.Provider>
        </AuthenticatedLayout>
    );
}
