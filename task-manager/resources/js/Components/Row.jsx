import React from "react";
import InsertTask from "./InsertTask";
import Task from "./Task";
import RowOptionsPopup from "./RowOptionsPopup";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function Row({ row, tasks, className, onInsertTask }) {
    const queryClient = useQueryClient();

    const handleOnRowDeleted = () => {
        queryClient.invalidateQueries("tasks");
    };

    const handleOnRowUpdated = () => {
        queryClient.invalidateQueries("tasks");
    };
    return (
        <div
            className={className + " border-2 w-100 border-gray-700 rounded-sm"}
        >
            <div className="flex flex-row px-2 py-4 justify-between text-lg font-bold text-center text-white bg-gray-700">
                <h3>{row[0].title}</h3>
                <RowOptionsPopup
                    rowId={row[0].id}
                    rowTitle={row[0].title}
                    className={"text-black"}
                    canDelete={tasks.length == 0}
                    onRowDeleted={handleOnRowDeleted}
                    onRowUpdated={handleOnRowUpdated}
                />
            </div>

            <div className="flex justify-between flex-col px-2 py-4">
                {tasks && tasks.length > 0 ? (
                    <Droppable droppableId={row[0].slug}>
                        {(provided, snapshot) => (
                            <div
                                className="flex flex-col gap-4 mb-6"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {tasks.map(function (task, index) {
                                    return (
                                        <Draggable
                                            key={task.id}
                                            draggableId={task.id}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <Task task={task} />
                                                </div>
                                            )}
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ) : (
                    <p className="opacity-75 italic mb-6">Empty...</p>
                )}
                <InsertTask rowId={row[0].id} onInsertTask={onInsertTask} />
            </div>
        </div>
    );
}
