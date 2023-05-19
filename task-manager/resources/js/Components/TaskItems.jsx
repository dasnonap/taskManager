import React from "react";
import Row from "./Row";

export default function TaskItems({ rows, onInsertTask }) {
    console.log(rows);
    return (
        <div className="py-12">
            <div className="grid gap-6 grid-cols-4 ">
                {rows
                    ? rows.map(function (item) {
                          return (
                              <Row
                                  title={item.title}
                                  id={item.id}
                                  tasks={item.tasks}
                                  key={Math.random().toString()}
                                  className={""}
                                  onInsertTask={onInsertTask}
                              />
                          );
                      })
                    : "No columns to display."}
            </div>
        </div>
    );
}
