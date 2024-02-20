import DateBlock from "@/Components/DateBlock";
import PrimaryButton from "@/Components/PrimaryButton";
import Timer from "@/Components/Timer";
import { TaskContext } from "@/Contexts/TaskContext";
import axios from "axios";
import { useContext, useState } from "react";

export default function TaskContent({}) {
    const task = useContext(TaskContext);
    const [isClosed, setIsClosed] = useState(
        task.additional_info.data.is_closed
    );

    const handleOnClickComplete = (event) => {
        event.preventDefault();

        axios
            .patch(route("tasks.edit", task.id), {
                is_closed: !isClosed,
            })
            .then(function (response) {
                setIsClosed(!isClosed);
            });
    };
    return (
        <>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-4 items-start">
                        <h1 className="text-4xl">
                            {task.title ? task.title : ""}
                        </h1>

                        <Timer />
                    </div>

                    <div className="flex flex-col gap-4 items-end">
                        <DateBlock
                            date={task.additional_info.data.start_time}
                            title="Start Time: "
                        />

                        <DateBlock
                            date={task.additional_info.data.end_time}
                            title="End Time:"
                        />

                        <PrimaryButton onClick={handleOnClickComplete}>
                            {isClosed ? "Activate Task" : "Complete Task"}
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </>
    );
}
