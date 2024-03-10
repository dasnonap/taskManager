import React from "react";
import InsertColumn from "./InsertRowColumn";
import TaskItems from "./TaskItems";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { PrioritiesContext } from "./PrioritiesContext";
import { RowsContext } from "../Contexts/RowsContext";

export default function TasksListing({}) {
    const queryClient = useQueryClient();
    let priorities = useContext(PrioritiesContext);
    let allRows = useContext(RowsContext);

    const fetchPriorities = () => {
        return axios.get(route("priority.index"));
    };
    const fetchAllRows = () => {
        return axios.get(route("rows.index.all"));
    };
    const displayTasks = () => {
        return axios.get(route("rows.index"));
    };

    const allRowsQuery = useQuery({
        queryFn: fetchAllRows,
        queryKey: ["allRows"],
        refetchOnWindowFocus: false,
    });
    const prioritiesQuery = useQuery({
        queryFn: fetchPriorities,
        queryKey: ["priorities"],
        refetchOnWindowFocus: false,
    });
    const { isLoading, isError, data, error } = useQuery({
        queryFn: displayTasks,
        queryKey: ["tasks"],
        refetchOnWindowFocus: false,
    });

    if (!prioritiesQuery.isLoading) {
        priorities = prioritiesQuery.data.data;
    }
    if (!allRowsQuery.isLoading) {
        allRows = allRowsQuery.data.data.rows;
    }

    const handleTaskInsert = () => {
        queryClient.invalidateQueries("tasks");
    };
    return (
        <PrioritiesContext.Provider value={priorities}>
            <RowsContext.Provider value={allRows}>
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
            </RowsContext.Provider>
        </PrioritiesContext.Provider>
    );
}
