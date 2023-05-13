import React from "react";
import InsertColumn from "./InsertRowColumn";
import TaskItems from "./TaskItems";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const displayTasks = () => {
    return axios.get(route("rows.index"));
};

const queryClient = useQueryClient();
export default function TasksListing({}) {
    const tasksQuery = useQuery({
        queryFn: displayTasks,
        queryKey: ["tasks"],
    });
    console.log(tasksQuery);

    return (
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col">
            <div className="flex">
                <InsertColumn className={"mr-1"} />
            </div>

            <TaskItems />
        </div>
    );
}
