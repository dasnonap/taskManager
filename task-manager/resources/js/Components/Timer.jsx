import { useContext, useState, useEffect } from "react";
import { TaskContext } from "@/Contexts/TaskContext";
import axios from "axios";

export default function TimerButton({}) {
    const task = useContext(TaskContext);
    const [time, setTime] = useState(task.additional_info.data.elapsed_time);
    const [isStarted, setIsStarted] = useState(false);

    useEffect(() => {
        setTimeout(function () {
            if (isStarted) {
                setTime(time + 1);

                // save timer to server
                if (time % 5) {
                    updateTaskTime();
                }
            }
        }, 1000);

        const updateTaskTime = () => {
            axios.put(route("tasks.update", task.id), {
                time: time,
            });
        };
    }, [time, isStarted]);

    const toggleTask = () => {
        setIsStarted(!isStarted);
    };

    return (
        <div className="bg-slate-400 text-white p-5">
            <button className="btn" onClick={toggleTask}>
                Continue Task
            </button>

            <p>{"Elapsed seconds: " + time}</p>
            <p>{"Elapsed minutes: " + parseInt(time / 60)}</p>
            <p>{"Elapsed hours: " + parseInt(time / 60 / 60)}</p>
        </div>
    );
}
