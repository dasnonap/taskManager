import React from "react";
import Row from "./Row";
import axios from "axios";
import { DragDropContext } from "react-beautiful-dnd";
import { useState } from "react";

// Search Row By Slug
const searchRowBySlug = (slug, rows) => {
    if (!slug || !rows) {
        return rows;
    }

    return rows.findIndex((rowObject, index) => {
        return rowObject.row[0].slug === slug;
    });
};

const searchTaskById = (id, tasks) => {
    if (!id || !tasks) {
        return tasks;
    }

    return tasks.filter((item, index) => {
        console.log(item);
    });
};
export default function TaskItems({ rows, onInsertTask }) {
    const [finalRows, setFinalRows] = useState(rows);

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        if (result.destination.index == result.source.index) {
            return;
        }
        const bufferRows = finalRows;

        let sourceRowIndex = searchRowBySlug(
            result.source.droppableId,
            finalRows
        );
        let destinationRowIndex = searchRowBySlug(
            result.destination.droppableId,
            finalRows
        );

        let [sourceObject] = bufferRows[sourceRowIndex].items.splice(
            result.source.index,
            1
        );

        bufferRows[destinationRowIndex].items.splice(
            result.destination.index,
            0,
            sourceObject
        );

        setFinalRows(bufferRows);

        axios
            .post(
                route(
                    "rows.edit.task.order",
                    bufferRows[sourceRowIndex].row[0].id
                ),
                {
                    tasks: bufferRows[sourceRowIndex].items,
                }
            )
            .then((response) => {
                console.log(response);
            });
        console.log(bufferRows[sourceRowIndex].items);
    };
    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className="py-12">
                <div className="grid gap-6 grid-cols-4 ">
                    {rows
                        ? rows.map(function (item) {
                              return (
                                  <Row
                                      title={item.row[0].title}
                                      id={item.row[0].id}
                                      tasks={item.items}
                                      slug={item.row[0].slug}
                                      key={Math.random().toString()}
                                      className={""}
                                      onInsertTask={onInsertTask}
                                  />
                              );
                          })
                        : "No columns to display."}
                </div>
            </div>
        </DragDropContext>
    );
}
