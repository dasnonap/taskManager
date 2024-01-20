import React from "react";
import Row from "./Row";

export default function TaskItems({ rows, onInsertTask }) {
    return (
        <div className="py-12">
            <div className="grid gap-6 grid-cols-4 ">
                {rows
                    ? rows.map(function (item) {
                          return (
                              <Row
                                  title={item.row[0].title}
                                  id={item.row[0].id}
                                  tasks={item.items}
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
