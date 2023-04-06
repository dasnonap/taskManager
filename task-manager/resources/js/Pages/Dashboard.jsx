import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import TaskItems from "@/Components/TaskItems";
import InsertTask from "@/Components/InsertTask";

export default function Dashboard({ auth, errors }) {
    const handleTaskInsert = (event) => {
        event.preventDefault();

        console.log("Creating...");
        // post(route("task.create"));
    };

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
            <Head title="Dashboard" />

            <InsertTask className="" onInsertTaks={handleTaskInsert} />

            <TaskItems tasks={[]} />
        </AuthenticatedLayout>
    );
}
