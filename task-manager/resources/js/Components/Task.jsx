import { Link } from "@inertiajs/react";

export default function Task({ task }) {
    if (!task) return;
    return (
        <div className="border-2 rounded-sm p-2 bg-white ">
            <div className="text-sm mb-4">
                {task.title ? <p>{task.title}</p> : ""}
            </div>

            <div className="flex justify-between items-center">
                <Link
                    href={route("tasks.show", task.id)}
                    className="text-xs p-0.5 px-0
                            transition ease-in-out delay-100
                            border-b-2 border-transparent
                            hover:border-gray-700"
                >
                    Review Notes
                </Link>

                <div className="text-xs">{task.priority.name}</div>
            </div>
        </div>
    );
}
