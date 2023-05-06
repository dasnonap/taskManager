import React from "react";
import InsertColumn from "./InsertRowColumn";
import InsertTask from "./InsertTask";
import TaskItems from "./TaskItems";

export default function TasksListing({}) {
    return (
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col">
            <div className="flex">
                <InsertColumn className={"mr-1"} />

                {/* <InsertTask /> */}
            </div>

            <TaskItems />
        </div>
    );
}
