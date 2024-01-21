import { Head } from "@inertiajs/react";
import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { QueryClient } from "@tanstack/react-query";
import TaskMain from "./Task/TaskMain";
import TaskContent from "./Task/TaskContent";
import { QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Task({ auth, errors, data }) {
    return (
        <>
            <AuthenticatedLayout auth={auth} errors={errors}>
                <QueryClientProvider client={queryClient}>
                    <TaskContent task={data} />

                    <TaskMain task={data} />
                </QueryClientProvider>
            </AuthenticatedLayout>
        </>
    );
}