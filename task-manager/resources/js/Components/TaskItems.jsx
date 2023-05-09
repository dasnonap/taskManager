import React from "react";
import Row from "./Row";

export default function TaskItems({ tasks }) {
    return (
        <div className="py-12">
            <div className="columns-1">
                <Row title="Backlog" id={2} tasks={[]} />

                <Row title="Testing blallalala" id={3} tasks={[]} />
            </div>
        </div>
    );
}
