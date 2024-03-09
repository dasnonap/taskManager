import React from "react";
import InsertTask from "./InsertTask";
import Task from "./Task";
import RowOptionsPopup from "./RowOptionsPopup";
import { Droppable, Draggable } from "react-beautiful-dnd";

export default function Row({
    id,
    title,
    tasks,
    slug,
    className,
    onInsertTask,
}) {
    const grid = 8;
    const getListStyle = (isDraggingOver) => ({
        background: isDraggingOver ? "lightblue" : "lightgrey",
        display: "flex",
        padding: grid,
        overflow: "auto",
    });

    const getItemStyle = (isDragging, draggableStyle) => ({
        userSelect: "none",
        padding: grid * 2,
        margin: `0 ${grid}px 0 0`,
        background: isDragging ? "lightgreen" : "grey",
        ...draggableStyle,
    });

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
                    <Droppable droppableId={slug}>
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
                <InsertTask rowId={id} onInsertTask={onInsertTask} />
            </div>
        </div>
    );
}
