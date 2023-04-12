import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import TaskItems from "@/Components/TaskItems";
import InsertTask from "@/Components/InsertTask";
import { PopupContext } from "@/Components/PopupContext";

export default function Dashboard({ auth, errors }) {
    const [isPopupDisplaying, setIsPopupDisplaying] = useState(false);

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
            <PopupContext.Provider
                value={{ isPopupDisplaying, setIsPopupDisplaying }}
            >
                <div
                    className={
                        isPopupDisplaying === true
                            ? `body-test popup-active`
                            : `body-test`
                    }
                >
                    <Head title="Dashboard" />

                    <InsertTask className="" />

                    <TaskItems tasks={[]} />
                </div>
            </PopupContext.Provider>
        </AuthenticatedLayout>
    );
}
