import React from "react";
import InsertTask from "./InsertTask";
import Task from "./Task";
import RowOptionsPopup from "./RowOptionsPopup";

export default function Row({ id, title, tasks, className, onInsertTask }) {
    return (
        <div
            className={className + " border-2 w-100 border-gray-700 rounded-sm"}
        >
            <div className="flex flex-row px-2 py-4 justify-between text-lg font-bold text-center text-white bg-gray-700">
                <h3>{title}</h3>
                <RowOptionsPopup rowTitle={title} className={"text-black"} />
            </div>

            <div className="flex justify-between flex-col px-2 py-4">
                {tasks && tasks.length > 0 ? (
                    <div className="flex flex-col gap-4 mb-6">
                        {tasks.map(function (task) {
                            return (
                                <Task
                                    task={task}
                                    key={Math.random().toString()}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <p className="opacity-75 italic mb-6">Empty...</p>
                )}
                <InsertTask rowId={id} onInsertTask={onInsertTask} />
            </div>
        </div>
    );
}
