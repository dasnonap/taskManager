import React from "react";
import InsertColumn from "./InsertRowColumn";
import TaskItems from "./TaskItems";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function TasksListing({}) {
    const queryClient = useQueryClient();
    const displayTasks = () => {
        return axios.get(route("rows.index"));
    };
    const tasksQuery = useQuery({
        queryFn: displayTasks,
        queryKey: ["tasks"],
    });
    console.log(tasksQuery.data);

    return (
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col">
            <div className="flex">
                <InsertColumn className={"mr-1"} />
            </div>

            <TaskItems rows={[]} />
        </div>
    );
}
