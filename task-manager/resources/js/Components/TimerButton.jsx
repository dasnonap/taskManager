import { useContext } from "react";
import { TaskContext } from "@/Contexts/TaskContext";

export default function TimerButton({}) {
    const task = useContext(TaskContext);

    console.log(task);
    return <button className="btn">Continue Task</button>;
}
