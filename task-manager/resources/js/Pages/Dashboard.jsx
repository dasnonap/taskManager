import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
// import { PopupContext } from "@/Components/PopupContext";
import TasksListing from "@/Components/TasksListing";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Dashboard({ auth, errors }) {
    // const [popupInfo, setIsPopupDisplaying] = useState({
    //     isDisplaying: false,
    //     type: "",
    // });

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
            {/* <PopupContext.Provider value={{ popupInfo, setIsPopupDisplaying }}> */}

            <Head title="Dashboard" />

            <QueryClientProvider client={queryClient}>
                <TasksListing />
            </QueryClientProvider>

            {/* </PopupContext.Provider> */}
        </AuthenticatedLayout>
    );
}
