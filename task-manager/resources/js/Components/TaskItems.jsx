import React from "react";
import Row from "./Row";

export default function TaskItems({ tasks }) {
    return (
        <div className="py-12">
            <div className="grid gap-6 grid-cols-5 ">
                <Row title="Backlog" id={2} tasks={[]} />

                <Row title="Testing blallalala" id={3} tasks={[]} />
            </div>
        </div>
    );
}
