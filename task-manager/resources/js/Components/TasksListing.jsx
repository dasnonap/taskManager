import React from "react";
import InsertColumn from "./InsertRowColumn";
import TaskItems from "./TaskItems";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { PrioritiesContext } from "./PrioritiesContext";

export default function TasksListing({}) {
    const queryClient = useQueryClient();
    const priorities = useContext(PrioritiesContext);
    const fetchPriorities = () => {
        return axios.get(route("priority.index"));
    };
    const displayTasks = () => {
        return axios.get(route("rows.index"));
    };
    const { isLoading, isError, data, error } = useQuery({
        queryFn: displayTasks,
        queryKey: ["tasks"],
        refetchOnWindowFocus: false,
    });
    const {
        isPrioritiesLoading,
        isPrioritiesError,
        prioritiesData,
        prioritiesError,
    } = useQuery({
        queryFn: fetchPriorities,
        queryKey: ["priorities"],
        refetchOnWindowFocus: false,
    });

    const handleTaskInsert = () => {
        queryClient.invalidateQueries("tasks");
    };
    return (
        <PrioritiesContext.Provider value={prioritiesData}>
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col">
                <div className="flex">
                    <InsertColumn className={"mr-1"} />
                </div>

                {isLoading ? (
                    "Loading ..."
                ) : (
                    <TaskItems
                        rows={data.data}
                        onInsertTask={handleTaskInsert}
                    />
                )}
            </div>
        </PrioritiesContext.Provider>
    );
}
